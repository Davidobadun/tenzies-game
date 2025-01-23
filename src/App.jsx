import React from "react"
import Die from "./Die.jsx"
import { useState, useRef } from "react"
import { nanoid } from "nanoid"
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import { FaStopwatch } from 'react-icons/fa';
import dieImage from "/images/dice.png"


export default function App() {
    const [dice, setDice] = React.useState(() => generateAllNewDice())
    const [rollcount, setRollCount] = React.useState(0) //number of rolls
    const [time, setTime] = React.useState(0) // Timer in seconds
    const [isTimerRunning, setIsTimerRunning] = React.useState(false) // Tracks if timer is active
    const [gameStarted, setGameStarted] = React.useState(false) // Tracks if the game has started

    const newGameButtonRef = React.useRef(null)

    const gameWon =
        dice.every(die => die.isHeld) &&
        dice.every(die => die.value === dice[0].value)


    // Focus "New Game" button when the game is won
    React.useEffect(() => {
        if (gameWon) {
            newGameButtonRef.current.focus()
            setIsTimerRunning(false) // Stop the timer
        }
    }, [gameWon])

    // Timer effect
    React.useEffect(() => {
        let timer;
        if (isTimerRunning) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1)
            }, 1000)
        } else {
            clearInterval(timer)
        }
        return () => clearInterval(timer)
    }, [isTimerRunning])


    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map((item) => (
                item = {
                    value: Math.ceil(Math.random() * 6),
                    isHeld: false,
                    id: nanoid()
                }
            ))
    }

    const dieElements = dice.map((dieObj) => (
        <Die key={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
            hold={() => hold(dieObj.id)} />

    ))

    function hold(id) {
        if (!gameStarted) {
            setGameStarted(true)
            setIsTimerRunning(true) // Start the timer on the first die click
        }

        setDice(oldDice => (
            oldDice.map((dieObj) => {
                return (
                    dieObj.id === id ?
                        { ...dieObj, isHeld: !dieObj.isHeld } : dieObj
                )
            })
        ))
    }

    function HandleRollDice() {
        setDice(oldDice => (
            oldDice.map((dieObj) => {
                return (
                    dieObj.isHeld ?
                        dieObj : { ...dieObj, value: Math.ceil(Math.random() * 6) }
                )
            })))
        setRollCount(prevCount => prevCount + 1)
    }

    function StartNewGame() {
        setDice(generateAllNewDice())
        setRollCount(0)// reset roll count
        setTime(0) // Reset the timer
        setIsTimerRunning(true) // Start the timer
        setGameStarted(true) // Mark the game as started

    }


    function formatTime() {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        return `${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`
    }




    return (
        <>


            <main className="tenzies-container">
                {gameWon && <Confetti />}
                <div aria-live="polite" className="sr-only">
                    {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
                </div>
                <div>
                    <img src={dieImage} alt="Die Icon" className="die-image" />
                </div>

                <h1 className="title">
                    {gameWon ? "Game Completed!" : "Tenzies"}

                </h1>
                <p className="instructions">
                    Rules: Roll until all dice are the same.
                    Click each die to freeze it at its current value between rolls.
                </p>
                <div className="rollCount-container">
                    <span calssName="timer-icon">
                        <FaStopwatch size={18} style={{ marginRight: "5px", marginLeft: "10px" }} />
                        {formatTime()}
                    </span>
                    <span className="rollCount">Roll Count: {rollcount}</span>
                
                </div>
                <div className="die-container" >
                    {dieElements}
                </div>

                <button className="roll-dice-button"
                    onClick={gameWon ? StartNewGame : HandleRollDice}
                    ref={newGameButtonRef}
                >
                    {gameWon ? "New Game" : "Roll"}

                </button>


            </main>
        </>


    )
}