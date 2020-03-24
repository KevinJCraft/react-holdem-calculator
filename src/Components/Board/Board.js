import React from "react";
import HoleCard from "../HoleCard";
import "./Board.css";

const Board = ({ board, handleClick, isFocused, index, handleDeletePlayer }) => {
    const displayBoardCards = () => {
        let boardCards = []
        for(let i = 0; i < 5; i++) {
            board.cards[i] ? (
              boardCards.push(  <HoleCard card={board.cards[i]} key={i} />)
            ) : (
              boardCards.push(<HoleCard card={{ color: "purple", rankName: "", suit: "" }} key={i} />)
            )
        }
        return boardCards
    }
	return (
		<div
			className={`player-card ${isFocused && "is-focused"}`}
			onClick={handleClick}
		>
			<div className="player-card-cards">
                {displayBoardCards()}
			</div>
			<h3>Board</h3>
		</div>
	);
};

export default Board;
