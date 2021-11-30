import React, {useState} from 'react';
import DiceForm from './DiceForm'
import "bootstrap/dist/css/bootstrap.css";

const Input = () => {
    return <DiceForm/>
}

function Test() {

const [diceList, setDiceList] = useState([])

const addDice = () => {
    setDiceList(diceList.concat(<Input key={diceList.length}/>))
}

const removeDice = () => {
    const newArray = diceList.slice(0,-1)
    setDiceList(newArray)
}

return (
    <div id="diceContainer" className="container">
        More dice?
        <button onClick={addDice}>+</button>
        {diceList.length > 0 ? 
        <button onClick={removeDice}>-</button>
        : null
        }
        <DiceForm/>
        {diceList}
    </div>

)

}

export default Test;