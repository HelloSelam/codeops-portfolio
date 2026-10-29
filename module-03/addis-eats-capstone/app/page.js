import Link from "next/link";

const highlights = [
  {
    number: "01",
    title: "Authentic Ethiopian Flavours",
    description:
    "Discover familiar Ethiopian favourites, prepared with the flavours and traditions we love.",
  },
  {
    number: "02",
    title: "Explore the Menu",
    description:
    "Browse our selection of dishes, check prices, and find something delicious for your next meal.",
  },
  {
    number: "03",
    title: "Order with Ease",
    description:
    "Choose your dishes, add them to your cart, and review your order before checkout.",
  },
];

export default function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-content">
        <span className="home-eyebrow">
          A taste of Ethiopia
        </span>

        <h1>Good food brings us together.</h1> 
        <p className="home-intro"> 
          Discover Ethiopian favourites with Addis Eats. Explore the menu, find your next favourite dish, and order in just a few simple steps. 
        </p>

        <div className="home-actions"> 
          <Link href="/menu" className="home-primary-button"> 
            Explore Our Menu 
          </Link> 
          
          <Link href="/cart" className="home-secondary-button"> 
            View Your Cart 
          </Link> 
        </div> 
        
        <div className="home-note"> 
          Ethiopian dishes · Clear prices · Simple ordering 
        </div> 
        
        </div> <div className="home-hero-art" aria-hidden="true"> 
          <span className="hero-decoration hero-decoration-one" /> 
          <span className="hero-decoration hero-decoration-two" /> 
          <div className="hero-food-mark">እንኳን ደህና መጡ</div> 
          <div className="hero-food-circle"> 
            <span>ADDIS</span> 
            <strong>EATS</strong> 
            <span>ETHIOPIAN FLAVOURS</span> 
          </div> 
        </div> 
      </section>

      <section className="home-highlights"> 
        <div className="home-section-heading"> 
          <span className="home-eyebrow">Made for your next meal</span> 
          <h2>A simpler way to enjoy your favourites</h2> 
          <p>
            From discovering a dish to reviewing your cart, Addis Eats keeps the ordering journey simple. 
          </p> 
        </div> 
        
        <div className="home-highlight-grid"> 
          {highlights.map((item) => ( 
            <article className="home-highlight-card" key={item.number}> 
              <span className="highlight-number">{item.number}</span> 
              <h3>{item.title}</h3> 
              <p>{item.description}</p> 
            </article> 
          ))} 
        </div> 
      </section> 
      
      <section className="home-menu-cta"> 
        <div> 
          <h2>Ready to find your next favourite?</h2> 
          <p>Take a look at the dishes available on our menu.</p> 
        </div> 
        
        <Link href="/menu" className="home-primary-button">
          Browse the Menu 
        </Link> 
      </section>
    </main>
  )
}