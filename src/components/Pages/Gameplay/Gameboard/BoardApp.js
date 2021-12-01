import { useMemo } from 'react';
import { Board } from './Board';
import { Game } from './game';
const containerStyle = {
    height: '90vh',
    border: '1px solid gray',
};


export const BoardApp = () => {
    const game = useMemo(() => new Game(), []);
    const game2 = useMemo(() => new Game(), []);
    return (<div style={containerStyle}>
			<Board game={game} game2={game2}/>
		</div>);
};
