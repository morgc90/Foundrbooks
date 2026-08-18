import { Link, useSearchParams } from "react-router-dom";
import { CONTACT } from "../data";

export default function Success() {
  const [params] = useSearchParams();
  const plan = params.get("plan");

  return (
    <div className="success-screen">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h1>Welcome to FoundrBooks!</h1>
        <p>
          {plan ? (
            <>Your <strong>{plan}</strong> subscription is confirmed.</>
          ) : (
            <>Your subscription is confirmed.</>
          )}{" "}
          We'll be in touch within 24 hours to get you set up.
        </p>
        <p className="success-contact">
          Questions? Email us at <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </p>
        <Link to="/" className="success-back">Back to site</Link>
      </div>
    </div>
  );
}
