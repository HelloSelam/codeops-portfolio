import { useParams } from "react-router-dom";

function DishDetail() {
  const { id } = useParams();

  return (
    <section>
      <h1>Dish Details</h1>
      <p>Dish ID: {id}</p>
    </section>
  );
}

export default DishDetail;