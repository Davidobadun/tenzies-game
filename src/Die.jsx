import React from "react"

export default function Die(props) {

  

    function handleDieClick() {
        setHoldDie(prev => !prev)
       
    }
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : null
    }


    return (
        <button
            className="die"
            onClick={props.hold}
            style={styles}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not held"}`}
        >
            {props.value}
        </button>
    )
}