
import {useState,useEffect} from 'react'
import Token from './Token';

export const Slot = ({ tokens,x,y }) => {
    // render the token that is on this slot 
    //  -> if there is a token on this slot, then we render it

    //--- initialize this slot with a NULL token
    const [tokenName,setTokenName] = useState('');
    const [token,setToken] = useState(null);
    
    useEffect(() => {
        //--- figure out what token should render in this slot
        // this needs to happen every time there is an update to the table (as slots can have values change)
        setToken(null)
        for (let i = 0; i < tokens.length; i++) {
            if(tokens[i].x === x && tokens[i].y === y) {
                setTokenName(tokens[i].name);
                console.log(tokens[i]);
                setToken(<Token name={tokens[i].name} token_id={tokens[i].token_id} x={tokens[i].x} y={tokens[i].y} image={tokens[i].image}/>);
                // console.log(token)
                console.log(`found token ${tokens[i].name} at slot [${x}, ${y}]`);
                break; // don't need to iterate, we found our token
            }
        }
    }, [tokens])

    return (
        <>
             {token}
        </>
    )
    
}