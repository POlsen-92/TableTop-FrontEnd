import { useEffect, useState } from 'react';
import { GridSquare } from './GridSquare';
import { Slot } from './Slot';
import Token from './Token';

const tableStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
};
const tokensList = [{
    name:"cd",
    x:1,
    y:1,
    id:0
},
{
    name:"ms",
    x:2,
    y:2,
    id:1
},
{
    name:"MARK",
    x:2,
    y:4,
    id:1
},
]

 const Table = () => {
    const [tokens, setTokens] = useState(tokensList);
    const [coordinates,setCoordinates] = useState([]);
    const [side,setSide] = useState(15);
    
    useEffect(()=>{
        const tempCords = tokens.map((token)=>{
            return [token.x, token.y]
        })
        setCoordinates(tempCords);
    },[tokens])
    const dragHandler = (item,x,y) => {
        const tempTokens = tokens;
        tempTokens[item.id].x = x;
        tempTokens[item.id].y = y;
        setTokens(tempTokens);
    }
    
    function renderSquare(i) {
        const x = i % (side);
        const y = Math.floor(i / (side));
        let array = [x,y]
        return (<div key={i} style={{ width: `${100/side}%`, height: `${100/side}%` }}>
				<GridSquare x={x} y={y} dragHandler={dragHandler} key={array.join('')}>
                    <Slot tokens={tokens} x={x} y={y} />)
				</GridSquare>          
			</div>);
    }


    const squares = [];
    for (let i = 0; i < (Math.pow(side,2)); i += 1) {
        squares.push(renderSquare(i));
    }
    return <div style={tableStyle}>{squares}</div>;
};
export default Table