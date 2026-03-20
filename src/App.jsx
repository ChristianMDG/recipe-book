import recipes from './data/recipes.json'
import styles from './App.module.css'
import RecipeList from './components/RecipeList/RecipeList.jsx'

export default function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>Recipe Book</h1>
      </header>
      <main className={styles.main}>
        <RecipeList recipes={recipes} />
      </main>
    </div>
  )
}
