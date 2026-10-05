import Link from "next/link";

export default function DishList({ dishes }) {
  return (
    <div>
      <h2>Our Dishes</h2>

      <div className="dish-list">
        {dishes.map((dish) => (
          <div className="dish-card" key={dish.id}>
            <h3>
              <Link href={`/menu/${dish.slug}`}>
                {dish.nameEn}
              </Link>
            </h3>

            <p>{dish.description}</p>

            <p className="dish-price">{dish.priceETB} ETB</p>
          </div>
        ))}
      </div>
    </div>
  );
}