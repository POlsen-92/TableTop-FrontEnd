import { DragPreviewImage, useDrag } from 'react-dnd';
import { ItemTypes } from '../Gameboard/ItemTypes';
import { knightImage } from '../Gameboard/knightImage';

const tokenStyle = {
    fontWeight: 'bold',
    cursor: 'move',
    position: "relative",
    
};
const Token = ({name,token_id,x,y,image}) => {
    console.log(name,"DRAGGINGGGG")
    // console.log(token_id);
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