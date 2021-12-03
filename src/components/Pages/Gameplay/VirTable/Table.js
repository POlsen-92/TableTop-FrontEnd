import { useEffect, useState } from 'react';
import { GridSquare } from './GridSquare';
import { Slot } from './Slot';
import Token from './Token';
import API from '../../../../utils/API';
import { SelectionState } from 'draft-js';
const tableStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
};
// useEffect(()=>{

//     const tokensList = [{
//         tokenName:"cd",
//         x:1,
//         y:1,
//         id:0
//     },
//     {
//         tokenName:"ms",
//         x:2,
//         y:2,
//         id:1
//     },
//     {
//         tokenName:"MARK",
//         x:2,
//         y:4,
//         id:2
//     },
// ]
// })

 const Table = ({camp_id}) => {
     const [side,setSide] = useState(20);
     const [tokens, setTokens] = useState([]);
     const [count,setCount] = useState(0);
     
    useEffect(()=>{
        API.findTokens(camp_id).then((res)=>{
            setTokens(res.data)
            console.log(res.data ,"dataaaaaaaaaaaaaaaaaaaaaa")
            console.log('---------------------',tokens)
        })
        setCount(1)
    },[
        // this lets it move only once
        count
    
    ]);
    let squares = [];
    // useEffect(()=>{

    //     setTokens([{
    //         tokenName:"cd",
    //         x:1,
    //         y:1,
    //         id:0
    //     },
    //     {
    //         tokenName:"ms",
    //         x:2,
    //         y:2,
    //         id:1
    //     },
    //     {
    //         tokenName:"MARK",
    //         x:2,
    //         y:4,
    //         id:2
    //     },
    // ])
    // },[])
    // const [squares,setSquares] = useState([]);
    const dragHandler = (item,x,y) => {
        setCount(2)
        console.log(item,x,y);
        console.log(tokens);
        const tempTokens = [tokens]
        tempTokens[item.id].x = x;
        tempTokens[item.id].y = y;

        console.log(tempTokens);
        setTokens(tempTokens);
        
        API.updateToken(camp_id,{
            id:item.id,
            x:x,
            y:y
        })
    }
    // useEffect(()=>{
    //     console.log('use effect re render ran----')
    //     // squares = [];
    //     // for (let i = 0; i < (Math.pow(side,2)); i += 1) {
    //     //     squares.push(renderSquare(i));
    //     // }
    // },[tokens])   
    
    function renderSquare(i) {
        const x = i % (side);
        const y = Math.floor(i / (side));
        let array = [x,y];
        return ({
            x,y,array,
        });
}


        for (let i = 0; i < (Math.pow(side,2)); i += 1) {
            squares.push(renderSquare(i));
        }
        return <div style={tableStyle}>{squares.map((square,key)=>(
            
             <div key={key} style={{ width: `${100/side}%`, height: `${100/side}%` }}>
            <GridSquare x={square.x} y={square.y} dragHandler={dragHandler} key={square.array.join('')}>
                <Slot tokens={tokens} x={square.x} y={square.y}/>
            </GridSquare>          
        </div>)
        )}</div>;

};
export default Table 