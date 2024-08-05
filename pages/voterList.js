import React, {useState, useContext, useEffect} from 'react'
import Image from "next/image";
import Link from "next/link";
import {AiFillLock, AiFillUnlock} from "react-icons/ai";


// INTERNALL IMPORTSSS
import {VotingContext} from "../context/Voter";
import Style from "../styles/voterList.module.css";
// import loading from "../../assets/loading.gif";

const voterList = () => {

  const {getAllVoterData, voterArray}= useContext(VotingContext);
  useEffect(()=> {getAllVoterData()}, []);
  return (
    <div className={Style.voterList}>
      <VoterCard voterArray={voterArray}/>
    </div>
  )
}

export default voterList