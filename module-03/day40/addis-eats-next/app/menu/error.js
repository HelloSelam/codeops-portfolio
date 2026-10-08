"use client";

export default function Error({ reset }) {
  return (
    <main>
      <h1>Something went wrong</h1>
      <button onClick={() => reset()}>Try again</button>
    </main>
  );
}