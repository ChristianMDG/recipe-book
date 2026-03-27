import { useState, useEffect } from "react";
import recipes from "./data/recipes.json";
import RecipeList from "./components/RecipeList/RecipeList.jsx";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import Filtre from "./components/Filtre/Filtre.jsx";
import FilterByIngredient from "./components/FiltredByIngredient/FilterByIngredient.jsx";

export default function App() {
  const [orderedRecipes, setOrderedRecipes] = useState(recipes);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
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
      recipe.name.toLowerCase().includes(searchTerm)
    );
    setOrderedRecipes(filteredRecipes);
  };

  const handleFilter = (filter) => {
    if (filter === "all") {
      setOrderedRecipes(recipes);
      return;
    }
    const filteredRecipes = recipes.filter((recipe) =>
      recipe.category.includes(filter.toLowerCase())
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
      selectedIngredients.every((ing) => recipe.ingredients.includes(ing))
    );

    setOrderedRecipes(filtered);
  }, [selectedIngredients]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Recipe Book</h1>
            
            <div className="flex flex-wrap items-center gap-3">
              <FilterByIngredient 
                ingredients={ingredients} 
                selectedIngredients={selectedIngredients}
                onCheckboxChange={handleCheckboxChange} 
              />
              <SearchBar onSearch={handleSearch} />
              <Filtre onFilter={handleFilter} />
              <button
                type="button"
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 font-medium"
                onClick={handleToggleOrder}
              >
                Reverse order
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RecipeList recipes={orderedRecipes} />
      </main>
    </div>
  );
}