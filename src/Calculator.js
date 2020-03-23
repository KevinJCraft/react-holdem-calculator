import React, { useState } from "react";
import Header from "./Components/Header";
import PlayerBlock from "./Components/PlayerBlock";
import Hand from "./Utils/hands";
import DisplayDeck from "./Components/Deck";
import "./Calculator.css";
import shortid from 'shortid'

const INITIAL_STATE = [
	{  name: "Player 1", hand: new Hand(), key: shortid() },
	{  name: "Player 2", hand: new Hand(), key: shortid() }
];


const Calculator = () => {
	const [players, setPlayers] = useState(INITIAL_STATE);
	const [focusIndex, setFocusIndex] = useState(0);

	const setHoleCard = card => {
		if (players[focusIndex].hand.cards.length < 2 && card.location === "deck") {
			let newPlayers = [...players];
			newPlayers[focusIndex].hand.cards.push(card);
			card.location = players[focusIndex].key;
			setPlayers(newPlayers);
		} else if (card.location === players[focusIndex].key) {
			let newPlayers = [...players];
			newPlayers[focusIndex].hand.cards = newPlayers[
				focusIndex
			].hand.cards.filter(obj => obj.identifier !== card.identifier);
			card.location = "deck";
			setPlayers(newPlayers);
		}
	};

	const handleAddPlayer= () => {

		if(players.length < 6) {

			let newPlayer = {
				name: `Player ${players.length + 1}`,
				hand: new Hand(),
				key: shortid()
			}
			let newPlayers = [
				...players,
				newPlayer
				]
	
			setPlayers(newPlayers)
		}
	}

	const handleDeletePlayer =(indexToDelete) => {
		if(players.length > 2) {

			players[indexToDelete].hand.cards.forEach( card => card.location = "deck")
			let newPlayers = players.filter( (player, index) => index !== indexToDelete)
			setPlayers(newPlayers)
		}
	}

	return (
		<div className="Calculator">
			<Header />
			<div>
				{players.map((player, index) => (
					<PlayerBlock
						player={player}
						key={index}
						handleClick={() => setFocusIndex(index)}
						handleDeletePlayer={() => handleDeletePlayer(index)}
						isFocused={index === focusIndex}
						index={index}
					/>
				))}
			</div>
			<button onClick={handleAddPlayer}>ADD PLAYER</button>

			<DisplayDeck
				setHoleCard={setHoleCard}
				players={players}
				focusIndex={focusIndex}
			/>
		</div>
	);
};

export default Calculator;
