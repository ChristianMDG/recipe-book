import React from 'react'

function Filtre(props) {
  return (
    <div>
        <label htmlFor="filtre">Filtre:</label>
        <select id="filtre" name="filtre"
        onChange={(event) => {props.onFilter(event.target.value)}}>
            <option value="all">All</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Gluten-Free</option>
        </select>
    </div>
  )
}

export default Filtre