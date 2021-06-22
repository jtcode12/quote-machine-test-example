import { FunctionComponent, useEffect, useState } from 'react';
import { Subscription } from 'rxjs';
import Heading from '../components/heading';
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



  return quote && (
    <div className="quotebox">
      <div className="quotebox-body">
        <Heading title={quote.text} />
        <cite sa-font-size="xl">{ quote.author }</cite>
      </div>
      <div className="quotebox-cta">
        <button type="button" onClick={qm.goBack.bind(qm)} aria-label="Previous Quote">
          <span x-direction="left">◄</span>
        </button>
        <button type="button" onClick={qm.goForward.bind(qm)} aria-label="Next Quote">
          <span x-direction="right">►</span>
        </button>
      </div>
    </div>
  );
};

export default Index;
