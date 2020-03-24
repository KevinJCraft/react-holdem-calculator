import React, { useState } from "react";
import Header from "./Components/Header";
import PlayerBlock from "./Components/PlayerBlock";
import Hand from "./Utils/hands";
import Deck from "./Utils/deck"
import DisplayDeck from "./Components/DisplayDeck";
import Board from "./Components/Board"
import "./Calculator.css";
import shortid from 'shortid'

const INITIAL_PLAYERS_STATE = [
	{  name: "Player 1", hand: new Hand(), key: shortid() },
	{  name: "Player 2", hand: new Hand(), key: shortid() }
];

const INITIAL_BOARD_STATE = {cards: [], key: shortid()}

const INITIAL_DECK_STATE = new Deck()


const Calculator = () => {
	const [players, setPlayers] = useState(INITIAL_PLAYERS_STATE);
	const [focusIndex, setFocusIndex] = useState(0);
	const [board, setBoard] = useState(INITIAL_BOARD_STATE)
	const [deck, setDeck] = useState(INITIAL_DECK_STATE);

	
	const setHoleCard = (card) => {
		//when the board is focused
		if(focusIndex === 99) {
			if(card.location === "deck" && board.cards.length < 5) {
				let newBoard = {...board}
				newBoard.cards.push(card)
				card.location = "board"
				setBoard(newBoard)
			} else if ( card.location === "board") {
				let newBoardHand = board.cards.filter(obj => obj.identifier !== card.identifier);
				let newBoard = {...board, cards: newBoardHand}
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

	const compare = ( calcPlayers, calcBoard) => {

		calcPlayers.forEach( calcPlayer => {
			if (calcPlayer.hand.cards.length > 0) {
	
				calcPlayer.hand.cards = [...calcPlayer.hand.cards, ...calcBoard]
				calcPlayer.hand.evaluate();
				calcPlayer.hand.cards = calcPlayer.hand.cards.filter( card => !calcBoard.includes(card));
			}
		
		})
	
		
	
		let winningValue = calcPlayers.reduce((maxValue, calcPlayer) => (
			maxValue > calcPlayer.hand.value ? maxValue : calcPlayer.hand.value
		), 0)
		let winningHands = calcPlayers.filter( calcPlayer => calcPlayer.hand.value === winningValue);
	
		if (winningHands.length > 1) {
			winningHands.forEach( calcPlayer => calcPlayer.hand.ties++);
		} else {
			winningHands.forEach( calcPlayer => calcPlayer.hand.wins++);
		}
	
		calcPlayers.forEach((calcPlayers) => {
			calcPlayers.hand.value = 0;
			calcPlayers.hand.handsPlayed++;
		});
	
	};
	

	const handleCalculate = () => {
		let deckStub = new Deck();
		deckStub.cards = [...deck.cards].filter( card => card.location === "deck");	
		let calcBoard = [...board.cards]
		let calcPlayers = [...players]

		calcPlayers.forEach (calcPlayer => calcPlayer.hand.resetResults())
	
			if (calcBoard.length < 5) {
	
				for (let i = 0; i < deckStub.cards.length; i++) {
	
	
					calcBoard.push(deckStub.copyCard(i));
	
					if (calcBoard.length === 5) {
	
						compare(calcPlayers, calcBoard);
						calcBoard.pop();
	
					} else {
	
						for (let j = i + 1; j < deckStub.cards.length; j++) {
	
							calcBoard.push(deckStub.copyCard(j));
	
							if (calcBoard.length === 5) {
	
								compare(calcPlayers, calcBoard);
								calcBoard.pop();
	
							} else {
	
								for (let a = j + 1; a < deckStub.cards.length; a++) {
	
									calcBoard.push(deckStub.copyCard(a));
	
									if (calcBoard.length === 5) {
	
										compare(calcPlayers, calcBoard);
										calcBoard.pop();
			
									} else {
	
										for (let b = a + 1; b < deckStub.cards.length; b++) {
	
											calcBoard.push(deckStub.copyCard(b));
	
											if (calcBoard.length === 5) {
	
												compare(calcPlayers, calcBoard);
												calcBoard.pop();
					
											} else {
	
												for (let c = b + 1; c < deckStub.cards.length; c++) {
	
													calcBoard.push(deckStub.copyCard(c));
	
													if (calcBoard.length === 5) {
	
														compare(calcPlayers, calcBoard);
														calcBoard.pop();
													}
												}
												calcBoard.pop();
											}
										}
										calcBoard.pop();
									}
								}
								calcBoard.pop();
							}
						}
						calcBoard.pop();
					}
				}
			} else {
				compare(calcPlayers, calcBoard);
			}
		
		setPlayers(calcPlayers)	
	}

	const handleClearCards = () => {
		setPlayers([
			{  name: "Player 1", hand: new Hand(), key: shortid() },
			{  name: "Player 2", hand: new Hand(), key: shortid() }
		])
		setDeck( new Deck())
		setBoard( {cards: [], key: shortid()})
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
			<button onClick={handleCalculate}>RUN</button>
			<button onClick={handleClearCards}>CLEAR</button>

			<DisplayDeck
				setHoleCard={setHoleCard}
				players={players}
				focusIndex={focusIndex}
				deck={deck}
			/>
		</div>
	);
};

export default Calculator;
