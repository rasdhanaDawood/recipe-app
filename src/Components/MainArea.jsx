import React, { useState } from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";

export default function Main() {
    const [ingredients, setIngredients] = useState(["Beef", "Tomato", "Onion", "Garlic", "Pasta"])
    const [isShown, setIsShown] = useState(false)

    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    function buttonClicked() {
        setIsShown(isShown => !isShown) 
    }
    function addIngredients(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return (
        <main>
            <form onSubmit={addIngredients} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button name="add-button">Add ingredient</button>
            </form>
            {ingredients.length > 0 && <IngredientsList ingredients={ingredientsListItems} click={buttonClicked} />}

            {isShown && <ClaudeRecipe />}
        </main> 
    )
}