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
  return (
    <div
      className={`player-card ${isFocused && "is-focused"}`}
      onClick={event => handleClick(event)}
    >
      <div className="player-card-cards">
        <HoleCard
          handleHoleCardClick={handleHoleCardClick}
          index={player.index}
          card={player.cards[0] ? player.cards[0] : defaultCard}
        />
        <HoleCard
          handleHoleCardClick={handleHoleCardClick}
          index={player.index}
          card={player.cards[1] ? player.cards[1] : defaultCard}
        />
      </div>
      <h3>{`Player ${index + 1}`}</h3>
      <div className="player-card-results">
        <span>{player.winPercent && `win: ${player.winPercent}`}</span>
        <span>{player.tiePercent && `tie: ${player.tiePercent}`}</span>
      </div>
      <button
        className="player-card-delete"
        onClick={event => handleDeletePlayer(event, player)}
      >
        X
      </button>
    </div>
  );
};

export default PlayerBlock;
