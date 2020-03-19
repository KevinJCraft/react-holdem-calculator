import React, { useState } from "react";
import Header from "./Components/Header";
import PlayerBlock from "./Components/PlayerBlock";
import Hand from "./Utils/hands";
import DisplayDeck from "./Components/Deck";
import "./Calculator.css";

const INITIAL_STATE = [
	{ name: "Hero", hand: new Hand() },
	{ name: "Villian 1", hand: new Hand() }
];

const Calculator = () => {
	const [players, setPlayers] = useState(INITIAL_STATE);
	const [focusIndex, setFocusIndex] = useState(0);

	const setHoleCard = card => {
		if (players[focusIndex].hand.cards.length < 2 && card.location === "deck") {
			let newPlayers = [...players];
			newPlayers[focusIndex].hand.cards.push(card);
			card.location = players[focusIndex].name;
			setPlayers(newPlayers);
		} else if (card.location === players[focusIndex].name) {
			let newPlayers = [...players];
			newPlayers[focusIndex].hand.cards = newPlayers[
				focusIndex
			].hand.cards.filter(obj => obj.identifier !== card.identifier);
			card.location = "deck";
			setPlayers(newPlayers);
		}
	};

	return (
		<div className="Calculator">
			<Header />
			<div>
				{players.map((player, index) => (
					<PlayerBlock
						player={player}
						key={index}
						handleClick={() => setFocusIndex(index)}
						isFocused={index === focusIndex}
					/>
				))}
			</div>

			<DisplayDeck
				setHoleCard={setHoleCard}
				players={players}
				focusIndex={focusIndex}
			/>
		</div>
	);
};

export default Calculator;
