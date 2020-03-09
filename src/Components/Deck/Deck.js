import React, { useState } from "react";
import Card from "../Card";
import Deck from "../../Utils/deck";
import "./Deck.css";

const DisplayDeck = () => {
	const [deck, setDeck] = useState(new Deck());

	return (
		<div className="deck">
			{deck.cards.map((card, index) => (
				<Card card={card} key={index} />
			))}
		</div>
	);
};

export default DisplayDeck;
