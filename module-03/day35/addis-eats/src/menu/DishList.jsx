import DishCard from "./DishCard";

function DishList({ dishes }) {
  return (
    <div>
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
}

export default DishList;