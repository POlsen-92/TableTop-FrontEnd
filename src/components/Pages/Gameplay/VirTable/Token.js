import { DragPreviewImage, useDrag } from 'react-dnd';
import { ItemTypes } from '../Gameboard/ItemTypes';
import { knightImage } from '../Gameboard/knightImage';
const tokenStyle = {
    fontSize: '2vw',
    fontWeight: 'bold',
    cursor: 'move',
};
const Token = ({name, id, x, y,}) => {
    const [{ isDragging }, drag, preview] = useDrag(() => ({
        item: {
            id: id,
            x: x,
            y: y,
        },
        type: ItemTypes.TOKEN,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), []);
    return (<>
        <DragPreviewImage connect={preview} src={knightImage} />
        <div ref={drag} id={id} style={{
            ...tokenStyle,
            opacity: isDragging ? 0.5 : 1,
        }}>
            {name}
        </div>
    </>);
};
export default Token