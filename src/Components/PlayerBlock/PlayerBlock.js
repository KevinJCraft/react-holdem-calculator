import React from "react";
import HoleCard from "../HoleCard";
import "./PlayerBlock.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

const defaultCard = { color: "default", rankName: "", suit: "" };

const PlayerBlock = ({
  player,
  numOfPlayers,
  handleClick,
  isFocused,
  index,
  handleDeletePlayer,
  handleHoleCardClick,
}) => {
  return (
    <Row
      className={`player-card ${isFocused && "is-focused"} shadow  `}
      onClick={(event) => handleClick(event)}
    >
      <Col
        className="player-card-cards d-flex align-items-center justify-content-around p-0 p-sm-2"
        xs="auto"
      >
        <HoleCard
          handleHoleCardClick={handleHoleCardClick}
          index={player.index}
          card={player.cards[0] ? player.cards[0] : defaultCard}
        />
        <HoleCard
          handleHoleCardClick={handleHoleCardClick}
          index={player.index}
          card={player.cards[1] ? player.cards[1] : defaultCard}
        />
      </Col>
      <Col className="d-flex align-items-center p-0 p-sm-2">
        <h3 className="m-0 ">{`Player ${index + 1}`}</h3>
      </Col>
      <Col
        className="player-card-results d-flex align-items-center justify-content-around p-1 p-sm-2 p-sm-1"
        xs="auto"
      >
        <Badge className="p-1" variant="success">
          {player.winPercent && `WIN: ${player.winPercent}`}
        </Badge>
        <Badge className="p-1" variant="warning">
          {player.tiePercent && `TIE: ${player.tiePercent}`}
        </Badge>
      </Col>
      {numOfPlayers > 2 && (
        <Col
          xs="auto"
          className="d-flex align-items-center justify-content-around p-0 p-sm-2"
        >
          <Button
            onClick={(event) => handleDeletePlayer(event, player)}
            variant="danger"
          >
            X
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default PlayerBlock;
