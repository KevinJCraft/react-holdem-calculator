import React from "react";
import HoleCard from "../HoleCard";
import "./PlayerBlock.css";

const defaultCard = { color: "purple", rankName: "", suit: "" };

const PlayerBlock = ({
  player,
  handleClick,
  isFocused,
  index,
  handleDeletePlayer,
  handleHoleCardClick
}) => {
  let winP = player.hand.getWinPercentage();
  let tieP = player.hand.getTiePercentage();

  return (
    <div
      className={`player-card ${isFocused && "is-focused"}`}
      onClick={event => handleClick(event)}
    >
      <div className="player-card-cards">
        <HoleCard
          handleHoleCardClick={handleHoleCardClick}
          index={index}
          card={player.hand.cards[0] ? player.hand.cards[0] : defaultCard}
        />
        <HoleCard
          handleHoleCardClick={handleHoleCardClick}
          index={index}
          card={player.hand.cards[1] ? player.hand.cards[1] : defaultCard}
        />
      </div>
      <h3>{`Player ${index + 1}`}</h3>
      <div className="player-card-results">
        <span>{`win: ${winP ? winP : "--"}`}</span>
        <span>{`tie: ${tieP ? tieP : "--"}`}</span>
      </div>
      <button className="player-card-delete" onClick={handleDeletePlayer}>
        X
      </button>
    </div>
  );
};

export default PlayerBlock;
