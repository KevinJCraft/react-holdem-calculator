import React, { useState } from "react";
import Header from "./Components/Header";
import Players from "./Components/Players";
import Hand from "./Utils/hands";
import DisplayDeck from "./Components/Deck";
import "./Calculator.css";

const INITIAL_STATE = [
	{ name: "Hero", hand: new Hand() },
	{ name: "Villian 1", hand: new Hand() }
];

const Calculator = () => {
	const [players, setPlayers] = useState(INITIAL_STATE);

	console.log(players);
	return (
		<div className="Calculator">
			<Header />
			<Players players={players} />
			<DisplayDeck />
		</div>
	);
};

export default Calculator;
