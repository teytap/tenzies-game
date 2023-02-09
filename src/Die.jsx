import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
} from "@fortawesome/free-solid-svg-icons";

export default function Die(props) {
  const styles = {
    color: props.isHeld === true ? "#59E391" : "white",
  };
  const valueImageArray = [
    <FontAwesomeIcon icon={faDiceOne} className="icons"></FontAwesomeIcon>,
    <FontAwesomeIcon icon={faDiceTwo} className="icons"></FontAwesomeIcon>,
    <FontAwesomeIcon icon={faDiceThree} className="icons"></FontAwesomeIcon>,
    <FontAwesomeIcon icon={faDiceFour} className="icons"></FontAwesomeIcon>,
    <FontAwesomeIcon icon={faDiceFive} className="icons"></FontAwesomeIcon>,
    <FontAwesomeIcon icon={faDiceSix} className="icons"></FontAwesomeIcon>,
  ];
  return (
    <div className="die" style={styles} onClick={props.holdDice}>
      {valueImageArray[props.value]}
    </div>
  );
}
