import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import PropTypes from 'prop-types';

const FIREBASE_FUNCTION =
  'https://us-central1-recaller-14a1f.cloudfunctions.net/charge';
const chargeAmount = 500;
const chargeCurrency = 'usd';

export default class TakeMoney extends React.Component {
  onToken = token => {
    fetch(FIREBASE_FUNCTION, {
      method: 'POST',
      body: JSON.stringify({
        token,
        charge: {
          amount: chargeAmount,
          currency: chargeCurrency,
        },
      }),
    }).then(res => {
      res.json().then(data => {
        data.body = JSON.parse(data.body);
        return data;
      });
    });
  };

  // ...

  render() {
    const { children } = this.props;
    return (
      // ...
      <StripeCheckout
        token={res => this.onToken(res)}
        description='Thank you for becoming a Pro User'
        name='ReCaller'
        image='https://raw.githubusercontent.com/labs12-mom-caller/Front-End/master/public/favicon.ico'
        stripeKey={process.env.REACT_APP_STRIPEKEY}
      >
        {children}
      </StripeCheckout>
    );
  }
}
TakeMoney.propTypes = {
  children: PropTypes.element.isRequired,
};
