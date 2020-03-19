import React from "react";
import "./Card.css";
import { GiHearts, GiClubs, GiSpades, GiDiamonds } from "react-icons/gi";

function getSuitIcon(suit) {
	switch (suit) {
		case "heart":
			return <GiHearts />;

		case "spade":
			return <GiSpades />;

		case "diamond":
			return <GiDiamonds />;

		case "club":
			return <GiClubs />;

		default:
			return "";
	}
}
function getSuitColor(suit) {
	switch (suit) {
		case "heart":
			return "red";

		case "spade":
			return "black";

		case "diamond":
			return "blue";

		case "club":
			return "green";

		default:
			return "purple";
	}
}

function getRankName(rank) {
	if (rank < 10) {
		return rank;
	} else {
		switch (rank) {
			case 10:
				return "T";

			case 11:
				return "J";

			case 12:
				return "Q";

			case 13:
				return "K";

			case 14:
				return "A";

			default:
				return "";
		}
	}
}

const Card = ({ card, setHoleCard, focusIndex, players }) => {
	function getLocationStyle(location) {
		if (location === "deck") return "in-deck";
		if (location === players[focusIndex].name) return "in-current-hand";
		return "in-other-hand";
	}

	return (
		<div
			className={`card ${getSuitColor(card.suit)} ${getLocationStyle(
				card.location
			)}`}
			onClick={setHoleCard}
		>
			<span>{getRankName(card.rank)}</span>
			<div>{getSuitIcon(card.suit)}</div>
		</div>
	);
};

export default Card;
