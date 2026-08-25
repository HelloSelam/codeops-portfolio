import Header from "./Header";
import Dish from "./Dish";

const dishes = [
  { id: 1, name: "Doro Wat", price: 350 },
  { id: 2, name: "Shiro", price: 180 },
  { id: 3, name: "Kitfo", price: 450 },
  { id: 4, name: "Tibs", price: 400 },
];

function App() {
  return (
    <>
      <Header />

      <main>
        <h2>Our Menu</h2>

        {dishes.map((dish) => (
          <Dish
            key={dish.id}
            name={dish.name}
            price={dish.price}
          />
        ))}
      </main>
    </>
  );
}

export default App;