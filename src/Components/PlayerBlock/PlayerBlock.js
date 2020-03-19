import React from "react";
import HoleCard from "./HoleCard";
import "./PlayerBlock.css";

const PlayerBlock = ({ player, handleClick, isFocused }) => {
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
			<h3>{player.name}</h3>
			<div className="player-card-results">
				<span>win: 100%</span>
				<span>ties: 0%</span>
			</div>
		</div>
	);
};

export default PlayerBlock;
