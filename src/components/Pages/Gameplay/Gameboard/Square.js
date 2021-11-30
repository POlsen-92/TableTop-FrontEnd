const squareStyle = {
    width: '100%',
    height: '100%',
    border: 'solid',
    borderWidth: '1px',
    borderColor: 'rgba(201, 201, 201, 0.5)'
};
export const Square = ({ black, children }) => {
    const backgroundColor = black ? 'black' : 'white';
    const color = black ? 'white' : 'black';
    return (<div style={{
            ...squareStyle,
        }}>
			{children}
		</div>);
};
