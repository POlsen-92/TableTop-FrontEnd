import { DragPreviewImage, useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { knightImage } from './knightImage';
const tokenStyle = {
    fontSize: '2vw',
    fontWeight: 'bold',
    cursor: 'move',
};
export const Piece = ({name}) => {
    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: ItemTypes.TOKEN,
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
            {name}
        </div>
    </>);
};

// export const NewPiece = ({name}) => {
//     const [{ isDragging2 }, drag2, preview2] = useDrag(() => ({
//         type: ItemTypes.TOKEN,
//         collect: (monitor) => ({
//             isDragging2: !!monitor.isDragging(),
//         }),
//     }), []);
//     return (<>
//         <DragPreviewImage connect={preview2} src={knightImage} />
//         <div ref={drag2} style={{
//             ...tokenStyle,
//             opacity: isDragging2 ? 0.5 : 1,
//         }}>
//            {name}
//         </div>
//     </>);
// };