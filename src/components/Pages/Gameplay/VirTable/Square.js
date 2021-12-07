const squareStyle = {
    width: '100%',
    height: '100%',
    border: 'solid',
    borderWidth: '1px',
    borderColor: 'rgba(201, 201, 201, 0.5)'
};
// CREATE SQUARE ELEMENT THAT CONTAINS CHILDREN PROP
export const Square = ({  children }) => {
    return (<div style={{
        ...squareStyle,
    }}>
        {children}
    </div>);
};
