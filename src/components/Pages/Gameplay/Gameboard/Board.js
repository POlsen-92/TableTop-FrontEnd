import { useEffect, useState } from 'react';
import { BoardSquare } from './BoardSquare';
import { Token } from './Token';
/** Styling properties applied to the board element */
const boardStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
};
/** Styling properties applied to each square element */
const squareStyle = { width: '10%', height: '10%' };
/**
 * The chessboard component
 * @param props The react props
 */
export const Board = ({ game }) => {
    const [[tokenX, tokenY], setTokenPos] = useState(game.tokenPosition);
    const [side,setSide] = useState(10)
    useEffect(() => game.observe(setTokenPos));
    function renderSquare(i) {
        const x = i % (side);
        const y = Math.floor(i / (side));
        return (<div key={i} style={squareStyle}>
				<BoardSquare x={x} y={y} game={game}>
					<Token isToken={x === tokenX && y === tokenY}/>
				</BoardSquare>
			</div>);
    }
    const squares = [];
    for (let i = 0; i < (Math.pow(side,2)); i += 1) {
        squares.push(renderSquare(i));
    }
    return <div style={boardStyle}>{squares}</div>;
};