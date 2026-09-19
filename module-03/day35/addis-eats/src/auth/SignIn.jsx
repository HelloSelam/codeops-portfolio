import { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "./AuthProvider";

function SignIn() {
  const [mode, setMode] = useState("signin");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const { signIn, signUp } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });

    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (mode === "signup" && !form.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!form.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!form.password) {
      setError("Please enter your password.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (mode === "signup") {
      signUp(form.name.trim(), form.email.trim());
    } else {
      signIn(
        form.name.trim() || "Addis Eats Customer",
        form.email.trim()
      );
    }

    const destination =
      location.state?.from?.pathname || "/";

    navigate(destination, { replace: true });
  }

  return (
    <section className="auth-page">
      <div className="auth-card">

        <p className="eyebrow">ADDIS EATS</p>

        <h1>
          {mode === "signin"
            ? "Welcome back."
            : "Join Addis Eats."}
        </h1>

        <p className="auth-description">
          {mode === "signin"
            ? "Sign in to continue with your order."
            : "Create an account to make ordering easier."}
        </p>

        <div className="auth-tabs">
          <button
            type="button"
            className={mode === "signin" ? "active" : ""}
            onClick={() => {
              setMode("signin");
              setError("");
            }}
          >
            Sign In
          </button>

          <button
            type="button"
            className={mode === "signup" ? "active" : ""}
            onClick={() => {
              setMode("signup");
              setError("");
            }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          {mode === "signup" && (
            <div className="form-field">
              <label htmlFor="name">
                Full name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
              />
            </div>
          )}

          <div className="form-field">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
            />
          </div>

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="primary-button auth-submit"
          >
            {mode === "signin"
              ? "Sign In"
              : "Create Account"}
          </button>

        </form>
      </div>
    </section>
  );
}

export default SignIn;