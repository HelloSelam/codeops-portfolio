import Link from "next/link";
import { redirect } from "next/navigation";
import { signIn } from "../action";
import { getSession } from "../../lib/session";

export default async function SignInPage({ searchParams }) {
  const session = await getSession(); 
  
  if (session?.userId) { 
    redirect(session.role === "staff" ? "/dashboard" : "/orders"); 
  }

  const params = await searchParams;
  const hasError = params?.error === "invalid";

  return (
    <main className="signin-page">
      <section className="signin-card">
        <h1>Welcome Back</h1>
        <p>Sign in to your Addis Eats account.</p>

        {hasError && (
          <p role="alert" className="signin-error">
            Invalid email or password. Please try again.
          </p>
        )}

        <form action={signIn} className="signin-form">
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit">Sign In</button>
        </form>

        <p className="signin-footer">
          New to Addis Eats? <Link href="/menu">Explore our menu</Link>
        </p>
      </section>
    </main>
  );
}