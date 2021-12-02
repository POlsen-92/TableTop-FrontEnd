import { useDrop } from 'react-dnd';
import { Square } from './Square';
import { ItemTypes } from '../Gameboard/ItemTypes';
import { Overlay, OverlayType } from '../Gameboard/Overlay';
export const GridSquare = ({ x, y, children,dragHandler,}) => {    
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: ItemTypes.TOKEN,
        drop: (item) => dragHandler(item,x,y),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    }), []);

    return (<div ref={drop} role="Space" data-testid={`(${x},${y})`} style={{
        position: 'relative',
        width: '100%',
        height: '100%',
    }}>
        <Square >{children}</Square>
        {isOver && !canDrop && <Overlay type={OverlayType.IllegalMoveHover} />}
        {!isOver && canDrop && <Overlay type={OverlayType.PossibleMove} />}
        {isOver && canDrop && <Overlay type={OverlayType.LegalMoveHover} />}
    </div>);
};