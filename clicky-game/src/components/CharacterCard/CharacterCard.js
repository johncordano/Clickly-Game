import React from "react";
import "./CharacterCard.css";

// Use the processClicked property for the onClick function.
const CharacterCard = props => (
  <div onClick={() => props.processClicked(props.id)} className="card">
    <div className="img-container">
      <img alt={props.id} src={props.image} />
    </div>
  </div>
);

export default CharacterCard;
