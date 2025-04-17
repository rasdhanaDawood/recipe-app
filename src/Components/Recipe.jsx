import { all } from "axios";
import React, { useState, useEffect } from "react";
import '../index.css' ;

export default function Recipe({ingredients}) {
    const [meals, setMeals] = React.useState([])
    useEffect(() => {
        if (!ingredients) return;
        const fetchMeals = async () => {
            try {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients[0]}`)
                const data = await res.json()
                if(!data.meals) return;
                const commonMeals = data.meals;
                const mealsIds = commonMeals.map(meal => meal.idMeal);
                console.log("mealsIds:", mealsIds);
                const mealData = await Promise.all(
                    mealsIds.map(async (id) => {
                        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                        const data = await res.json()
                        if(!data.meals) return;
                        return data.meals[0]
                    })
                );
                console.log("mealData:", mealData);

                const matchedItems = mealData.filter(meal => {
                    for (let i = 1; i <= 20; i++){
                        const item = meal[`strIngredient${i}`];
                        
                        if ((item && item.toLowerCase() === ingredients[1].toLowerCase())
                            || (item && item.toLowerCase() === ingredients[2].toLowerCase())) {
                            return meal
                        }
                    }
                })
                if(matchedItems.length === 0) return;
                console.log("ingredients:", ingredients);
                console.log("matchedItems:", matchedItems);
                const randomIndex = Math.floor(Math.random() * matchedItems.length)
                console.log("randomIndex:", randomIndex);
                setMeals(matchedItems[randomIndex])
            } catch (error) {
                console.log("Error fetching meals:", error)
            }
        }
        fetchMeals()
    }, [])
    console.log("meals length:", meals.length)
    console.log("meals:", meals)

    return (
        <section>
            <h2>RecipeBook Recommends:</h2>
            <article className="suggested-recipe-container" aria-live="polite">
            {meals && Object.keys(meals).length > 0 ? (
                    <div key={meals.idMeal}>
                        <h3>{meals.strMeal}</h3>
                        <div className="suggested-recipe">

                        <div className="image-container">
                        <img src={meals.strMealThumb} alt={meals.strMeal} width="200" />
                            </div>
                            <div className="ingredients-container">
                            <h4>Ingredients:</h4>
                        <ul className="ingredients-listItems">
                            {Object.keys(meals).map((key) => {
                                if (key.startsWith("strIngredient") && meals[key]) {
                                    return <li key={key}>{meals[key]}</li>;
                                }
                                return null;
                            })}
                        </ul>
                    </div>
                            </div>
                <p>{ meals.strInstructions}</p>
          </div>
        
      ) : (
        <p>No meals found.</p>
      )}       
    </article>
</section>
    
)}