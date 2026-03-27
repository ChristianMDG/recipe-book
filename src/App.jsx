import { useState,useEffect } from "react";
import recipes from "./data/recipes.json";
import styles from "./App.module.css";
import RecipeList from "./components/RecipeList/RecipeList.jsx";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import Filtre from "./components/Filtre/Filtre.jsx";
import FilterByIngredient from "./components/FiltredByIngredient/FilterByIngredient.jsx";

export default function App() {
  const [orderedRecipes, setOrderedRecipes] = useState(recipes);
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const ingredients = [...new Set(recipes.flatMap((r) => r.ingredients))];

  function handleToggleOrder() {
    setOrderedRecipes((prev) => [...prev].reverse());
  }
  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      setOrderedRecipes(recipes);
      return;
    }
    const filteredRecipes = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm),
    );
    setOrderedRecipes(filteredRecipes);
  };

  const handleFilter = (filter) => {
    if (filter === "all") {
      setOrderedRecipes(recipes);
      return;
    }
    const filteredRecipes = recipes.filter((recipe) =>
      recipe.category.includes(filter.toLowerCase()),
    );
    setOrderedRecipes(filteredRecipes);
  };

  const handleCheckboxChange = (event, ingredient) => {
    const isChecked = event.target.checked;
    setSelectedIngredients((prevSelected) => {
      if (isChecked) {
        return [...prevSelected, ingredient];
      } else {
        return prevSelected.filter((ing) => ing !== ingredient);
      }
    });
  };

  useEffect(() => {
    if (selectedIngredients.length === 0) {
      setOrderedRecipes(recipes);
      return;
    }
  
    const filtered = recipes.filter((recipe) =>
      selectedIngredients.every((ing) =>
        recipe.ingredients.includes(ing)
      )
    );
  
    setOrderedRecipes(filtered);
  }, [selectedIngredients]);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Recipe Book</h1>
         < FilterByIngredient ingredients={ingredients} onCheckboxChange={handleCheckboxChange} />
          <SearchBar onSearch={handleSearch} />
          <Filtre onFilter={handleFilter} />
          <button
            type="button"
            className={styles.toggle}
            onClick={handleToggleOrder}
          >
            Reverse order
          </button>
        </div>
      </header>
      <main className={styles.main}>
        <RecipeList recipes={orderedRecipes} />
      </main>
    </div>
  );
}
