import { DragPreviewImage, useDrag } from 'react-dnd';
import { ItemTypes } from '../Gameboard/ItemTypes';
import { knightImage } from '../Gameboard/knightImage';

// TOKEN STYLING
const tokenStyle = {
    fontWeight: 'bold',
    cursor: 'move',
    position: "relative",
    
};

// TOKEN DISPLAY FUNCTION
const Token = ({name,token_id,x,y,image}) => {
    // MAKES THE TOKEN DRAGGABLE
    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: ItemTypes.TOKEN,
        item: {
            name: name,
            token_id: token_id,
            x:x,
            y:y,
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), []);
    return (<>
        <DragPreviewImage connect={preview} src={knightImage} />
        <div ref={drag} style={{
            ...tokenStyle,
            opacity: isDragging ? 0.5 : 1,
        }}>
            <img className="" alt={name} style={{height:'8vh' }}src={image}/>
        </div>
    </>);
};
export default Token