import React from 'react'
function FilterByIngredient({ ingredients, onCheckboxChange }) {
    return (
      <div>
        {ingredients.map((ingredient) => (
          <label key={ingredient} className="ingredient">
            <input
              type="checkbox"
              value={ingredient}
              onChange={(event) => onCheckboxChange(event, ingredient)}
            />
            {ingredient}
          </label>
        ))}
      </div>
    )
  }

export default FilterByIngredient