import React from "react";
import Card from "../../Card";

const PlayerBlock = ({ player }) => {
	return (
		<div>
			<h3>{player.name}</h3>
			{player.hand.cards.map(card => (
				<Card card={card} />
			))}
		</div>
	);
};

export default PlayerBlock;
