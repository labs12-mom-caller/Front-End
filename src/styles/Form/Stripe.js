import styled from 'styled-components';
import StripeCheckout from 'react-stripe-checkout';

const Stripe = styled(StripeCheckout)`
  background: linear-gradient(rgb(40, 160, 229), rgb(1, 94, 148));
  margin: 20px 0 10px;
  width: 50%;
  @media (max-width: 993px) {
    height: 50px !important;

    span {
      font-size: 2.5rem !important;
      background-image: none !important;
      box-shadow: none !important;
    }
  }
  @media (max-width: 992px) {
    max-height: 30px !important;
    font-size: 1.5rem;
    width: 127px;

    span {
      font-size: 1.3rem !important;
    }
  }
  @media (max-width: 400px) {
    max-height: 30px !important;
    width: 95px;
    font-size: 1.1rem;

    span {
      font-size: 1rem !important;
    }
  }
`;

export default Stripe;
