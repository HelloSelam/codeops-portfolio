import { signIn } from "../action";

export default function SignInPage() {
  return (
    <main>
      <h1>Sign in to Addis Eats</h1>

      <form action={signIn}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue="abebe@example.com"
          required
        />

        <button type="submit">Sign in</button>
      </form>
    </main>
  );
}