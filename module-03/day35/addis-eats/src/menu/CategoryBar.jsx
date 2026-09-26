import { useSearchParams } from "react-router-dom";

function CategoryBar({ categories }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";

  function handleCategoryChange(category) {
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  }

  return (
    <div className="category-bar">
      {categories.map((category) => (
        <button 
          type="button"
          key={category}
          className={selectedCategory === category ? "active" : ""}
          onClick={() => handleCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;