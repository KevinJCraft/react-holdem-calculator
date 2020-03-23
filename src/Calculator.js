import React, { useState } from "react";
import Header from "./Components/Header";
import PlayerBlock from "./Components/PlayerBlock";
import Hand from "./Utils/hands";
import Deck from "./Components/Deck";
import Board from "./Components/Board"
import "./Calculator.css";
import shortid from 'shortid'

const INITIAL_STATE = [
	{  name: "Player 1", hand: new Hand(), key: shortid() },
	{  name: "Player 2", hand: new Hand(), key: shortid() }
];


const Calculator = () => {
	const [players, setPlayers] = useState(INITIAL_STATE);
	const [focusIndex, setFocusIndex] = useState(0);
	const [board, setBoard] = useState({hand: [], key: shortid()})

	const setHoleCard = (card) => {
		//when the board is focused
		if(focusIndex === 99) {
			if(card.location === "deck" && board.hand.length < 5) {
				let newBoard = {...board}
				newBoard.hand.push(card)
				card.location = "board"
				setBoard(newBoard)
			} else if ( card.location === "board") {
				let newBoardHand = board.hand.filter(obj => obj.identifier !== card.identifier);
				let newBoard = {...board, hand: newBoardHand}
				card.location = "deck"
				setBoard(newBoard)
	
			}
		// when a player hand is focused	
		} else {
			if (players[focusIndex].hand.cards.length < 2 && card.location === "deck") {
				let newPlayers = [...players];
				newPlayers[focusIndex].hand.cards.push(card);
				card.location = players[focusIndex].key;
				setPlayers(newPlayers);
			} else  if (card.location === players[focusIndex].key) {
				let newPlayers = [...players];
				newPlayers[focusIndex].hand.cards = newPlayers[
					focusIndex
				].hand.cards.filter(obj => obj.identifier !== card.identifier);
				card.location = "deck";
				setPlayers(newPlayers);
			} 
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
			<Board 
				board={board} 
				handleClick={() => setFocusIndex(99)} 
				isFocused={focusIndex === 99} 
			/>
			<button onClick={handleAddPlayer}>ADD PLAYER</button>

			<Deck
				setHoleCard={setHoleCard}
				players={players}
				focusIndex={focusIndex}
			/>
		</div>
	);
};

export default Calculator;
