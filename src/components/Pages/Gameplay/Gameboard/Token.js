import { Piece,NewPiece } from './Piece';
export const Token = ({ isToken,name }) => isToken ? <Piece name={name} key={2}/> : null;
export const Token2 = ({ isToken,name }) => isToken ? <Piece name={name} key={1}/> : null;

// export const Token = ({name}) => {
//     const [{ isDragging }, drag, preview] = useDrag(() => ({
//         type: ItemTypes.TOKEN,
//         collect: (monitor) => ({
//             isDragging: !!monitor.isDragging(),
//         }),
//     }), []);
//     return (<>
//         <DragPreviewImage connect={preview} src={knightImage} />
//         <div ref={drag} style={{
//             ...tokenStyle,
//             opacity: isDragging ? 0.5 : 1,
//         }}>
//             {name}
//         </div>
//     </>);
// };

