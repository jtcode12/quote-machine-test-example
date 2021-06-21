import { FunctionComponent, useEffect, useState } from 'react';
import { Subscription } from 'rxjs';
import { Quote, QuoteMachine } from '../qm';

const qm = new QuoteMachine();

const Index: FunctionComponent = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);
  
  useEffect(() => {
    setSubscription(qm.current.subscribe((q) => {
      setQuote(q);
    }));
    window.addEventListener('keyup', handleKeyboardNavigation);
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleKeyboardNavigation = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowRight':
        return qm.goForward();
      case 'ArrowLeft':
        return qm.goBack();
      default:
        return undefined;
    }
  };

  const mapFontSize = (text: string) => {
    console.log(text.length);
    if (text.length < 20) return 'xxxl';
    if (text.length < 40) return 'xxl';
    if (text.length < 75) return 'xl';
    if (text.length < 125) return 'l';
    if (text.length < 200) return 'm';
    return 's';
  }

  return quote && (
    <div className="quotebox">
      <div className="quotebox-body">
        <h1 sa-font-size={mapFontSize(quote.text)}>{ quote.text }</h1>
        <cite sa-font-size="xl">{ quote.author }</cite>
      </div>
      <div className="quotebox-cta">
        <button type="button" onClick={qm.goBack.bind(qm)}><span x-direction="left">◄</span></button>
        <button type="button" onClick={qm.goForward.bind(qm)}><span x-direction="right">►</span></button>
      </div>
    </div>
  );
};

export default Index;
