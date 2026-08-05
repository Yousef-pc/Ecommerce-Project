import { Link } from 'react-router';
import './CheckoutHeader.css';
import logoWhite from '../../assets/images/logo.png';
import mobileLogoImg from '../../assets/images/mobile-logo.png';
import checkoutLockIconImg from '../../assets/images/icons/checkout-lock-icon.png';

export function CheckoutHeader() {
  return (
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <Link to="/">
            <img className="logo" src={logoWhite} />
            <img className="mobile-logo" src={mobileLogoImg} />
          </Link>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (<Link className="return-to-home-link"
            to="/">3 items</Link>)
        </div>

        <div className="checkout-header-right-section">
          <img src={checkoutLockIconImg} />
        </div>
      </div>
    </div>
  );
}