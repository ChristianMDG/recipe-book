import { useState } from 'react'
import recipes from './data/recipes.json'
import styles from './App.module.css'
import RecipeList from './components/RecipeList/RecipeList.jsx'
import SearchBar from './components/SearchBar/SearchBar.jsx'
import Filtre from './components/Filtre/Filtre.jsx'

export default function App() {
  const [orderedRecipes, setOrderedRecipes] = useState(recipes)
  const ingredients = [...new Set(recipes.flatMap(r => r.ingredients))]
  console.log(ingredients);
  

  function handleToggleOrder() {
    setOrderedRecipes((prev) => [...prev].reverse())
  }
  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      setOrderedRecipes(recipes)
      return
    }
    const filteredRecipes = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm)
    )
    setOrderedRecipes(filteredRecipes)
  }

  const handleFilter = (filter) => {
    if (filter === "all") {
      setOrderedRecipes(recipes)
      return
    }
    const filteredRecipes = recipes.filter((recipe) =>
      recipe.category.includes(filter.toLowerCase())
    )
    setOrderedRecipes(filteredRecipes)
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Recipe Book</h1>
          {ingredients.map((ingredient) => (
            <span key={ingredient} className={styles.ingredient}>
              {ingredient}
            </span>
          ))}
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
  )
}
