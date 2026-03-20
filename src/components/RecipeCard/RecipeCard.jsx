import styles from './RecipeCard.module.css'

export default function RecipeCard({ recipe }) {
  return (
    <article className={styles.card}>
      <img
        className={styles.image}
        src={recipe.image}
        alt=""
      />
      <div className={styles.body}>
        <h2 className={styles.name}>{recipe.name}</h2>
        <span className={styles.badge}>{recipe.category}</span>
        <p className={styles.duration}>{recipe.duration} min</p>
      </div>
    </article>
  )
}
