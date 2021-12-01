import { DragPreviewImage, useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { knightImage } from './knightImage';
const tokenStyle = {
    fontSize: 40,
    fontWeight: 'bold',
    cursor: 'move',
};
export const Piece = () => {
    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: ItemTypes.TOKEN,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), []);
    return (<>
			<DragPreviewImage connect={preview} src={knightImage}/>
			<div ref={drag} style={{
            ...tokenStyle,
            opacity: isDragging ? 0.5 : 1,
        }}>
				♘
			</div>
		</>);
};