import { useDrop } from 'react-dnd';
import { Square } from './Square';
import { ItemTypes } from '../Gameboard/ItemTypes';
import { Overlay, OverlayType } from '../Gameboard/Overlay';

export const GridSquare = ({ x, y,tokens,dragHandler, children}) => { 
    // tokens are appearing here    
    // console.log(tokens) 
    const [{isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.TOKEN,
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
        {/* {isOver && !canDrop && <Overlay type={OverlayType.IllegalMoveHover} />} */}
         {/* {!isOver && <Overlay type={OverlayType.PossibleMove} />} */}
        {isOver && <Overlay type={OverlayType.LegalMoveHover} />}
    </div>);
};