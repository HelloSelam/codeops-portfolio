import { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { authSchema } from "./schema";

function SignIn() {
  const [mode, setMode] = useState("signin");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const { signIn, signUp } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const result = authSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];

        if (field) {
          fieldErrors[field] = issue.message;
        }
      });

      if (mode === "signup" && !form.name.trim()) {
        fieldErrors.name = "Name is required";
      }

      setErrors(fieldErrors);
      return;
    }

    if (mode === "signup" && !form.name.trim()) {
      setErrors({
        name: "Name is required",
      });
      return;
    }

    setErrors({});

    if (mode === "signup") {
      signUp(form.name.trim(), form.email.trim());
    } else {
      signIn(
        form.name.trim() || "Addis Eats Customer",
        form.email.trim()
      );
    }

    const destination = location.state?.from?.pathname || "/";
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
              setErrors({});
            }}
          >
            Sign In
          </button>

          <button
            type="button"
            className={mode === "signup" ? "active" : ""}
            onClick={() => {
              setMode("signup");
              setErrors({});
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
                className={errors.name ? "input-error" : ""}
                placeholder="Your full name"
              />

              {errors.name && (
                <p className="field-error">{errors.name}</p>
              )}
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
              className={errors.email ? "input-error" : ""}
              placeholder="you@example.com"
            />

            {errors.email && (
              <p className="field-error">{errors.email}</p>
            )}
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
              className={errors.password ? "input-error" : ""}
              placeholder="At least 6 characters"
            />

            {errors.password && (
              <p className="field-error">{errors.password}</p>
            )}
          </div>

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