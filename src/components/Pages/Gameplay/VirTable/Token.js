import { DragPreviewImage, useDrag } from 'react-dnd';
import { ItemTypes } from '../Gameboard/ItemTypes';
import { knightImage } from '../Gameboard/knightImage';

const tokenStyle = {
    fontSize: '2vw',
    fontWeight: 'bold',
    cursor: 'move',
};
const Token = ({tokenName,id}) => {
    console.log(tokenName,"DRAGGINGGGG")
    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: ItemTypes.TOKEN,
        item: {
            name: tokenName,
            id: id
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
            {tokenName}
        </div>
    </>);
};
export default Token