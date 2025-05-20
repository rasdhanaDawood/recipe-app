import React from "react";
// import "../App.css";
import chefIcon from "/src/assets/cook.jpg"

export default function Header() {
  return (
    <header>
      <img src={chefIcon} alt="React Logo" width={40}/>
      <h1>RecipeBook</h1>
    </header>
  );
  
}

