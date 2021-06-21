import fetch from 'isomorphic-unfetch';
import { BehaviorSubject } from 'rxjs';

export interface Quote {
  text: string;
  author: string;
}

const INITIAL_APP_QUOTE: Quote = {
  text: 'Test your apps, otherwise they will start testing you.',
  author: 'Snigo Ogins',
};

export class QuoteMachine {
  private quotes: Quote[] = [INITIAL_APP_QUOTE];

  private index = 0;

  public current: BehaviorSubject<Quote> = new BehaviorSubject<Quote>(this.quotes[this.index]);

  private async getRandom(): Promise<void> {
    const quote = await fetch('https://cw-quotes.herokuapp.com/api/quotes/random')
      .then((res) => res.json())
      .then(({ result }) => result);
    
    this.index = this.quotes.push(quote) - 1;
    this.current.next(quote);
  }

  public goBack(): void {
    this.index && this.current.next(this.quotes[--this.index]);
  }

  public goForward() {
    this.index < this.quotes.length - 1
      ? this.current.next(this.quotes[++this.index])
      : this.getRandom();
  }
}