import React, { useState } from 'react'

function FilterByIngredient({ ingredients, onCheckboxChange, selectedIngredients = [] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.toLowerCase().includes(searchTerm.toLowerCase())
  )

  
  const selectedCount = selectedIngredients.length

  const handleClearAll = () => {
    if (selectedIngredients && Array.isArray(selectedIngredients) && selectedIngredients.length > 0) {
      selectedIngredients.forEach(ingredient => {
        const event = { target: { checked: false } }
        onCheckboxChange(event, ingredient)
      })
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 font-medium flex items-center gap-2"
      >
        <svg 
          className="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" 
          />
        </svg>
        Ingredients
        {selectedCount > 0 && (
          <span className="ml-1 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
            {selectedCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
            <div className="p-3 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-700">
                  Filter by Ingredients
                </h3>
                <button
                  onClick={handleClearAll}
                  className="text-xs text-red-600 hover:text-red-700 font-medium"
                >
                  Clear all {selectedCount > 0 && `(${selectedCount})`}
                </button>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search ingredients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
                <svg 
                  className="absolute left-2.5 top-2 w-4 h-4 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2 top-1.5 text-gray-400 hover:text-gray-600 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {filteredIngredients.length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No ingredients found
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredIngredients.map((ingredient) => (
                    <label 
                      key={ingredient} 
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-150 group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedIngredients.includes(ingredient)}
                        onChange={(event) => onCheckboxChange(event, ingredient)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 capitalize flex-1">
                        {ingredient}
                      </span>
                      <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        {selectedIngredients.includes(ingredient) ? '✓ Selected' : 'Select'}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default FilterByIngredient