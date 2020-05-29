import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

const HelpSection = ({ helpHighlights }) => {
  const rules = [
    "There must be at least 2 players with cards",
    "Each player must have 2 cards",
    "If a player has no cards, they need to be deleted",
    "The board cannot have an incomplete flop (no cards or a minimum of 3)",
    "If the board is empty, calculations will be based on 100k random board samples to give an accurate estimate of the odds",
    "If the board has at least 3 cards, then an exhaustive calculation will be done with 100% accuracy",
  ];
  return (
    <div className="position-relative" style={{ zIndex: "100" }}>
      <ListGroup>
        {rules.map((rule, index) => (
          <ListGroup.Item
            variant={helpHighlights.includes(index) ? "danger" : "warning"}
            key={index}
          >
            {rule}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default HelpSection;
