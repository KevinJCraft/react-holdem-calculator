import React from "react";
import "./Card.css";
import { GiHearts, GiClubs, GiSpades, GiDiamonds } from "react-icons/gi";

function getSuitIcon(suit) {
  switch (suit) {
    case "h":
      return <GiHearts />;

    case "s":
      return <GiSpades />;

    case "d":
      return <GiDiamonds />;

    case "c":
      return <GiClubs />;

    default:
      return "";
  }
}
function getSuitColor(suit) {
  switch (suit) {
    case "h":
      return "red";

    case "s":
      return "black";

    case "d":
      return "blue";

    case "c":
      return "green";

    default:
      return "default";
  }
}

const Card = ({ card, setHoleCard, focusIndex, players }) => {
  function getLocationStyle(location) {
    if (location === "deck") return "in-deck";
    if (location === focusIndex) return "in-current-hand";
    return "in-other-hand";
  }

  return (
    <div
      className={`deckCard ${card.rank === "J" && "jack"} ${getSuitColor(
        card.suit
      )} ${getLocationStyle(card.location)}`}
      onClick={() => setHoleCard(card)}
    >
      <span>{card.rank}</span>
      <div>{getSuitIcon(card.suit)}</div>
    </div>
  );
};

export default Card;
