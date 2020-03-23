import React, { useState } from "react";
import Card from "./Card";
import Deck from "../../Utils/deck";
import "./Deck.css";

const DisplayDeck = ({ setHoleCard, players, focusIndex }) => {
	const [deck, setDeck] = useState(new Deck());

	return (
		<div className="deck">
			{deck.cards.map((card, index) => (
				<Card
					card={card}
					key={index}
					setHoleCard={() => setHoleCard(card, 2)}
					players={players}
					focusIndex={focusIndex}
				/>
			))}
		</div>
	);
};

export default DisplayDeck;
