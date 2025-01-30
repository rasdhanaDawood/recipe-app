import React from "react";
// import "../App.css";
import chefClaudeIcon from "/src/assets/chef-claude-icon.png"

export default function Header() {
  return (
    <header>
      <img src={chefClaudeIcon} alt="React Logo" width={40}/>
      <h1>Chef Claude</h1>
    </header>
  );
  
}

