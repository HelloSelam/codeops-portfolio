import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function SignIn() {
  const [name, setName] = useState("");

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    signIn(name.trim());

    const destination = location.state?.from?.pathname || "/";

    navigate(destination, { replace: true });
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">WELCOME TO ADDIS EATS</p>

        <h1>Sign in to continue</h1>

        <p>
          Sign in before continuing to checkout.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Your name</label>

          <input
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
          />

          <button type="submit" className="primary-button">
            Sign in
          </button>
        </form>
      </div>
    </section>
  );
}

export default SignIn;