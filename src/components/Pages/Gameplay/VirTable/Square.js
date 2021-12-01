const squareStyle = {
    width: '100%',
    height: '100%',
    border: 'solid',
    borderWidth: '1px',
    borderColor: 'rgba(201, 201, 201, 0.5)'
};
export const Square = ({  children }) => {
    return (<div style={{
        ...squareStyle,
    }}>
        {/* this is the issue maybe*/}
        {children}
    </div>);
};
