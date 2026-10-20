import { db } from "../../db";
import DishGrid from "../../components/DishGrid";
import SearchBox from "./SearchBox";
import { Suspense } from "react";

export const revalidate = 3600;

export const metadata = {
  title: "Menu",
  description:
    "Explore Ethiopian dishes, browse our menu, and discover your next favorite meal.",
};

export default async function MenuPage() {
  const dishes = await db.dish.findMany();
  return (
    <main className="menu-page"> 
      <h1>Our Menu</h1>
      <p>Discover delicious Ethiopian dishes made for you.</p>

      <hr /> 

      <h2>Search and Explore</h2> 
      <Suspense fallback={<p>Loading search...</p>}>
        <SearchBox />
      </Suspense>

      <DishGrid dishes={dishes} />

    </main>
  );
}