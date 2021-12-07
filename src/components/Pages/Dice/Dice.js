import React, { useState } from 'react';
import DiceForm from './DiceForm'
import "bootstrap/dist/css/bootstrap.css";

// used to be able to add multiple dice components

const Input = () => {
    return <DiceForm />
}

function Dice() {

    const [diceList, setDiceList] = useState([])

    // adds a dice component

    const addDice = () => {
        setDiceList(diceList.concat(<Input key={diceList.length} />))
    }

    // removes a dice component

    const removeDice = () => {
        const newArray = diceList.slice(0, -1)
        setDiceList(newArray)
    }

    return (
        <div id="diceContainer">
            More dice?
            <button onClick={addDice}>+</button>
            {diceList.length > 0 ?
                <button onClick={removeDice}>-</button>
                : null
            }
            <DiceForm />
            {diceList}
        </div>

    )

}

export default Dice;