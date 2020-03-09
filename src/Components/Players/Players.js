import React from "react";
import PlayerBlock from "./PlayerBlock";

const Players = ({ players }) => {
	return (
		<div>
			{players.map((player, index) => (
				<PlayerBlock player={player} key={index} />
			))}
		</div>
	);
};

export default Players;
