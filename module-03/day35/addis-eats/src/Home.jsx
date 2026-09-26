import { Link } from "react-router-dom";
import DishCard from "./menu/DishCard";
import useFetch from "./hooks/useFetch";

function Home() {
  const {
    data: specials,
    loading,
    error,
  } = useFetch("/specials.json");


  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">WELCOME TO ADDIS EATS</p>

          <h1>
            Authentic Addis,
            <br />
            served with heart.
          </h1>

          <p>
            Traditional Ethiopian flavors, rich spices, and
            comforting dishes made for the table.
          </p>

          <div className="hero-actions">
            <a href="#today-specials" className="primary-button">
              Explore Today's Specials
            </a>

            <Link to="/menu" className="secondary-button">
              View Full Menu
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="/images/hero-2.jpg"
            alt="Traditional Ethiopian dishes served at Addis Eats"
          />
        </div>
      </section>

      <section className="specials-section" id="today-specials">
        <div className="section-heading">
          <p className="eyebrow">TODAY'S SPECIALS</p>

          <h2>Something special for today.</h2>

          <p>
            A few of our favorite dishes, selected from the Addis Eats menu.
          </p>
        </div>

        {loading && (
          <p className="status-message">Loading today's specials...</p>
        )}

        {error && (
          <p className="status-message">
            Sorry, we couldn't load today's specials.
          </p>
        )}

        {!loading && !error && (
          <div className="dish-grid">
            {specials.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        )}
      </section>

      <section className="home-cta">
        <p className="eyebrow">HUNGRY?</p>

        <h2>Find your next favorite Ethiopian dish.</h2>

        <Link to="/menu" className="primary-button">
          Browse the full menu
        </Link>
      </section>
    </div>
  );
}

export default Home;