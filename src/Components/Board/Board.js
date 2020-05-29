import React from "react";
import HoleCard from "../HoleCard";
import "./Board.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const defaultCard = { color: "purple", rankName: "", suit: "" };

const Board = ({ board, handleClick, isFocused, handleHoleCardClick }) => {
  const displayBoardCards = () => {
    let boardCards = [];
    for (let i = 0; i < 5; i++) {
      boardCards.push(
        <HoleCard
          index={"board"}
          handleHoleCardClick={handleHoleCardClick}
          card={board.cards[i] ? board.cards[i] : defaultCard}
          key={i}
        />
      );
    }
    return boardCards;
  };
  return (
    <Row
      className={`board-card ${
        isFocused && "is-focused"
      } shadow d-flex align-items-center`}
      onClick={handleClick}
    >
      <Col className="board-card-cards p-0 p-sm-2" xs="auto">
        {displayBoardCards()}
      </Col>
      <Col className="p-0 p-sm-2">
        <h3>Board</h3>
      </Col>
    </Row>
  );
};

export default Board;
