import { useEffect, useState } from 'react';
import { BoardSquare } from './BoardSquare';
import { Token,Token2 } from './Token';
/** Styling properties applied to the board element */
const boardStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
};
// const tokensList = [{
//     name:"cd",
//     x:1,
//     y:1,
//     id:0
// },
// {
//     name:"ms",
//     x:2,
//     y:9,
//     id:1
// }]
/** Styling properties applied to each square element */
// const squareStyle = { width: '10%', height: '10%' };
/**
 * The board component
 * @param props The react props
 */
export const Board = ({ game,game2 }) => {
    // const [tokens, setTokens] = useState(tokensList);
    const [[tokenX, tokenY], setTokenPos] = useState(game.tokenPosition);
    // game2.moveTokenNoEmit(2,9);
    const [[token2X, token2Y], setToken2Pos] = useState(game2.tokenPosition);
    const [side,setSide] = useState(15)
    useEffect(function(){
        game.observe(setTokenPos)
        game2.observe(setToken2Pos)
    });
    // useEffect(function(){
    // });
    function renderSquare(i) {
        const x = i % (side);
        const y = Math.floor(i / (side));
        let array = [x,y]
        return (<div key={i} style={{ width: `${100/side}%`, height: `${100/side}%` }}>
				<BoardSquare x={x} y={y} game={game} key={array.join('')}>
                    {/* {tokens.map((token)=>{
                    return (<Token isToken={x === token.x && y === token.y} name={token.name} id={token.id}/>)    
                    })} */} 
                    <Token2 isToken={x === token2X && y === token2Y} name={"ms"}/>
					<Token isToken={x === tokenX && y === tokenY} name={"cd"}/>
                   
                    {/* <Token1 isToken={x === tokenX && y === tokenY}/> */}
				</BoardSquare>
                
			</div>);
    }

    // function renderSquare2(i) {
    //     const x = i % (side);
    //     const y = Math.floor(i / (side));
    //     return (<div key={i} style={squareStyle}>
	// 			<BoardSquare x={x} y={y} game={game}>
    //                 <Token1 isToken={x === tokenX && y === tokenY}/>
	// 			</BoardSquare>
	// 		</div>);
    // }
    const squares = [];
    for (let i = 0; i < (Math.pow(side,2)); i += 1) {
        squares.push(renderSquare(i));
    }
    return <div style={boardStyle}>{squares}</div>;
};