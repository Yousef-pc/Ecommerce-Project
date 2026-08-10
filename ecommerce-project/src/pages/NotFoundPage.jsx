import { Header } from "../components/Header";
import './NotFoundPage.css';

export function NotFoundPage ({ cart }) {
  return (
    <>
      <Header cart={cart} />

      <div className="not-found-container">
        <p className="not-found-text">Page not Found! Please get back to home.</p>
      </div>
    </>
  );
}