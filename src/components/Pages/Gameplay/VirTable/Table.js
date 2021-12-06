import { useEffect, useState } from 'react';
import { GridSquare } from './GridSquare';
import { Slot } from './Slot';
import Token from './Token';
import API from '../../../../utils/API';

const tableStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
};

 const Table = ({camp_id, newToken,deletedToken}) => {
     const [side,setSide] = useState(12);
     const [tokens, setTokens] = useState([]);
    //  const [count,setCount] = useState(0)
    //  setCount(1)
    useEffect(()=>{
        API.findTokens(camp_id).then((res)=>{
            setTokens(res.data)
            console.log(res.data ,"dataaaaaaaaaaaaaaaaaaaaaa")
            console.log('---------------------',tokens)
        })
    },[newToken,deletedToken]);
    let squares = [];
    
    const dragHandler = (tokensList,item,x,y,) => {
        console.log(tokensList);
        console.log(tokens) 
        // setCount(1)
        // if(tokensList ===[]){

            const tempTokens = [...tokens]
            // console.log(tempTokens);
            tempTokens[item.token_id].x = x;
            tempTokens[item.token_id].y = y;
            
            setTokens(tempTokens);
        // }
        
        API.updateToken(camp_id,{
            token_id:item.token_id,
            x:x,
            y:y
        })
        setTokens([...tokens])
    }
    
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
            <GridSquare x={square.x} y={square.y} tokens={tokens} dragHandler={dragHandler} key={square.array.join('')}>
                <Slot tokens={tokens} x={square.x} y={square.y}/>
            </GridSquare>          
        </div>)
        )}</div>;

};
export default Table 