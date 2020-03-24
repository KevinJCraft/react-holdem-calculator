import React from "react";
import HoleCard from "../HoleCard";
import "./PlayerBlock.css";

const PlayerBlock = ({ player, handleClick, isFocused, index, handleDeletePlayer }) => {
	return (
		<div
			className={`player-card ${isFocused && "is-focused"}`}
			onClick={handleClick}
		>
			<div className="player-card-cards">
				{player.hand.cards[0] ? (
					<HoleCard card={player.hand.cards[0]} />
				) : (
					<HoleCard card={{ color: "purple", rankName: "", suit: "" }} />
				)}
				{player.hand.cards[1] ? (
					<HoleCard card={player.hand.cards[1]} />
				) : (
					<HoleCard card={{ color: "purple", rankName: "", suit: "" }} />
				)}
			</div>
			<h3>{`Player ${index + 1}`}</h3>
			<div className="player-card-results">
				<span>win: {player.hand.getWinPercentage() ? `${player.hand.getWinPercentage()}%` : "--"}</span>
				<span>ties: {player.hand.getTiePercentage() ? `${player.hand.getTiePercentage()}%` : "--"}</span>
			</div>
			<button className="player-card-delete" onClick={handleDeletePlayer}>X</button>
		</div>
	);
};

export default PlayerBlock;
