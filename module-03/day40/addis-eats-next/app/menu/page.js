import { db } from "../../db";
import DishGrid from "../../components/DishGrid";

export const revalidate = 3600;

export default async function MenuPage() {
  const dishes = await db.dish.findMany();
  return (
    <main className="menu-page"> 
      <h1>Our Menu</h1>
      <p>Discover delicious Ethiopian dishes made for you.</p>

      <DishGrid dishes={dishes} />
    </main>
  );
}