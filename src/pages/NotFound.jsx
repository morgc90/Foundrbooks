import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <div className="app">
      <div className="page-head">
        <Nav />
        <div className="page-head-inner">
          <div className="hero-badge">404</div>
          <h1>That page doesn't exist.</h1>
          <p className="hero-sub page-head-sub">
            The link may be out of date, or the page may have moved.
          </p>
          <div className="hero-btns">
            <Link to="/" className="btn-primary">Back to homepage</Link>
            <Link to="/saas-accounting" className="btn-ghost">SaaS accounting →</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
