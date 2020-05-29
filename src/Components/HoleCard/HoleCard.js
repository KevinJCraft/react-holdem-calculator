import React from "react";
import "./HoleCard.css";
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
      return "back-of-card";
  }
}

const HoleCard = ({ card, index, handleHoleCardClick }) => {
  return (
    <div
      className={`holeCard ${card.rank === "J" && "jack"} ${getSuitColor(
        card.suit
      )}`}
      onClick={(event) => handleHoleCardClick(event, card, index)}
    >
      <span>{card.rank}</span>
      <div>{getSuitIcon(card.suit)}</div>
    </div>
  );
};

export default HoleCard;
