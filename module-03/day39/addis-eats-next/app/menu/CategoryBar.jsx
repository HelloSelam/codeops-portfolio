"use client";

export default function CategoryBar({ children }) {
  return (
    <div>
      <div>
        <button>All</button>
        <button>Traditional</button>
        <button>Tibs</button>
        <button>Fasting</button>
        <button>Drinks</button>
      </div>

      {children}
    </div>
  );
}