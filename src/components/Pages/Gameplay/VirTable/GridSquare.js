import { useDrop } from 'react-dnd';
import { Square } from './Square';
import { ItemTypes } from '../Gameboard/ItemTypes';
import { Overlay, OverlayType } from '../Gameboard/Overlay';

export const GridSquare = ({ x, y,tokens,dragHandler, children}) => { 
    // HANDLE THE DROPPING OF DRAGGABLE ITEMS
    const [{isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.TOKEN,
        // FUNCTION RUNS WHEN A DRAGGABLE ITEM IS DROPPED
        drop: (item,monitor) => dragHandler(tokens,item,x,y),
         collect: (monitor) => ({
             isOver: !!monitor.isOver(),

         }),
    }), [tokens]);

    return (<div ref={drop}  role="Space" data-testid={`(${x},${y})`} style={{
        position: 'relative',
        width: '100%',
        height: '100%',
    }}>
        <Square >{children}</Square>
        {isOver && <Overlay type={OverlayType.LegalMoveHover} />}
    </div>);
};