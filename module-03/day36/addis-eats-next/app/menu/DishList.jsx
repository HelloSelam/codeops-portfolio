import Link from "next/link";
import link from "next/link";

const dishes = [
  { id: "kitfo", name: "Kitfo" },
  { id: "doro-wat", name: "Doro Wat" },
  { id: "shiro", name: "Shiro" },
];

export default function DishList() {
  return (
    <div>
      <h2>Our Dishes</h2>

      {dishes.map((dish) => (
        <div key={dish.id}>
          <Link href={`/menu/${dish.id}`}>
            {dish.name}
          </Link>
        </div>
      ))}
    </div>
  );
}