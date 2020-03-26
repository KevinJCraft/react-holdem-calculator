import React from "react";
import Card from "./Card";
import "./Deck.css";

const DisplayDeck = ({ setHoleCard, players, focusIndex, deck }) => {
  return (
    <div className="deck">
      {deck.cards.map((card, index) => (
        <Card
          card={card}
          key={index}
          setHoleCard={setHoleCard}
          players={players}
          focusIndex={focusIndex}
        />
      ))}
    </div>
  );
};

export default DisplayDeck;
