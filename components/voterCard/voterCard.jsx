import React from 'react';

// INTERNAL IMPORTS
import { VotingContext } from "../../context/Voter";
import Style from "./card/Card.module.css"; // Ensure this path is correct
import voterCardStyle from "./voterCard.module.css"; // Ensure this path is correct

const VoterCard = ({ voterArray }) => {
  return (
    <div className={voterCardStyle.voterCard}>
      {voterArray.map((el, i) => (
        <div key={i} className={voterCardStyle.card_box}>
          <div className={voterCardStyle.image}>
            <img src={el[4]} alt="Profile photo" />
          </div>
          <div className={voterCardStyle.card_info}>
            <h2>
              {el[1]} #{el[0].toNumber()}
            </h2>
            <p>Address: {el[3].slice(0, 30)}...</p>
            <p>Details</p>
            <p className={voterCardStyle.vote_Status}>
              {el[6] ? "You already voted" : "Not voted yet"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VoterCard;
