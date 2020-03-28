import React from "react";
import HoleCard from "../HoleCard";
import "./Board.css";

const defaultCard = { color: "purple", rankName: "", suit: "" };

const Board = ({ board, handleClick, isFocused, handleHoleCardClick }) => {
  const displayBoardCards = () => {
    let boardCards = [];
    for (let i = 0; i < 5; i++) {
      boardCards.push(
        <HoleCard
          index={"board"}
          handleHoleCardClick={handleHoleCardClick}
          card={board.cards[i] ? board.cards[i] : defaultCard}
          key={i}
        />
      );
    }
    return boardCards;
  };
  return (
    <div
      className={`player-card ${isFocused && "is-focused"}`}
      onClick={handleClick}
    >
      <div className="player-card-cards">{displayBoardCards()}</div>
      <h3>Board</h3>
    </div>
  );
};

export default Board;
