import React from "react";
import Die from "./Die";
import Confetti from "react-confetti";
import "./index.css";

export default function App() {

    function allNewDice() {
        const arr = []
        for (let i = 0; i < 10; i++) {
            arr[i] = {
                id: i,
                value: Math.ceil(Math.random() * 6),
                isHeld: false
            }
        }
        return arr
    }

    function roll() {
        setNumRolls(prevState => prevState + 1)
        setDieNum(prevState => prevState.map(
            die => die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        ))
    }

    function newGame() {
        setTenzies(false)
        setDieNum(allNewDice())
        setNumRolls(0);
    }

    function holdDice(id) {
        setDieNum(prevState => prevState.map(die => {
            return die.id === id ? { ...die, isHeld: !die.isHeld } : die
        }))
    }

    function themeSelect() {
        setTheme(prevState => !prevState)
    }

    const [tenzies, setTenzies] = React.useState(false)

    const [numRolls, setNumRolls] = React.useState(0)

    const [dieNum, setDieNum] = React.useState(allNewDice())

    const [best, setBest] = React.useState(localStorage.getItem("totalRolls") || false)

    const [theme, setTheme] = React.useState(false)

    const die = dieNum.map(dice =>
        <Die
            id={dice.id}
            isHeld={dice.isHeld}
            value={dice.value}
            holdDice={() => holdDice(dice.id)}
            theme={theme}
        />)

    React.useEffect(
        () => {
            const firstValue = dieNum[0].value
            if (dieNum.every(dice => dice.isHeld) & dieNum.every(die => die.value === firstValue)) {
                setTenzies(true)
                if (!best || numRolls < best) {
                    setBest(numRolls);
                    localStorage.setItem("totalRolls", numRolls)
                }
            }
        },
        [dieNum]
    )

    return (
        <div className={theme ? "theme-dark main" : "main"}>
            {tenzies && <Confetti style={{ position: "fixed" }} />}
            <button className={"theme"} onClick={themeSelect}>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192V448c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" /></svg>
            </button>
            <div className="center">
                <h1>Tenzies</h1>
                <p className="game_details">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </div>
            <div className="container">
                {die}
            </div>
            <button onClick={tenzies ? newGame : roll} className={theme ? "theme-dark" : ""} >{tenzies ? "New Game" : "Roll"}</button>
            <p class="rolls">{`Best : ${best ? best : "None"}`}<br /> {tenzies && `Total number of rolls took:${numRolls}`}</p>
        </div>
    )
}
