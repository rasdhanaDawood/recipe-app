import React, { useState } from "react";
import Recipe from "./Recipe";
import IngredientsList from "./IngredientsList";

export default function Main() {
    const [ingredients, setIngredients] = useState([])
    const [isShown, setIsShown] = useState(false)
    const [input,setInput]=useState("")

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
        setInput('')
    }

    return (
        <main>
            <form onSubmit={addIngredients} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. Chicken"
                    aria-label="Add ingredient"
                    name="ingredient"
                    value={input} required
                    onChange={((e)=>setInput(e.target.value))}
                />
                <button name="add-button">Add ingredient</button>
            </form>
            {ingredients.length > 0 && <IngredientsList ingredients={ingredientsListItems} click={buttonClicked} />}
            {isShown && <Recipe ingredients={ingredients}/>}
        </main> 
    )
}