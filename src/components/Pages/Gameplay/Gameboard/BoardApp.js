import { useMemo } from 'react';
import { Board } from './Board';
import { Game } from './game';
const containerStyle = {
    width: 500,
    height: 500,
    border: '1px solid gray',
};
/**
 * The Chessboard Tutorial Application
 */
export const BoardApp = () => {
    const game = useMemo(() => new Game(), []);
    return (<div style={containerStyle}>
			<Board game={game}/>
		</div>);
};
