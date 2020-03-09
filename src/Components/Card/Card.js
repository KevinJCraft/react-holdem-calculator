import React from "react";
import "./Card.css";
import { GiHearts, GiClubs, GiSpades, GiDiamonds } from "react-icons/gi";

function setSuit(suit) {
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
			throw new Error();
	}
}

const Card = ({ card }) => {
	return (
		<div className={`card ${card.color}`}>
			{console.log(card)}
			<span>{card.rankName}</span>
			<div>{setSuit(card.suit)}</div>
		</div>
	);
};

export default Card;
