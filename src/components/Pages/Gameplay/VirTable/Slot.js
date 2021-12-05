
// this code no work

// import {useState,useEffect} from 'react'
// import Token from './Token';

// export const Slot = ({ x,y,tokens }) => {
//     const [tokenName,setTokenName] = useState('');
//     const [token,setToken] = useState(null);
//     // const [count,setCount] = useState(1)
//     function isToken() {
//         let aaaisToken = false;
//         for (let i = 0; i < tokens.length; i++) {
//             if(tokens[i].x === x && tokens[i].y === y){
//                 aaaisToken = true;
//                 setTokenName(tokens[i].tokenName);
//                 console.log(tokenName,'name--------------------------')
//                 break;
//             }       
//         } 
//         return aaaisToken
//     }
//     useEffect(() => {
//         if(isToken()){
//             console.log('I RAN----------------------',tokenName);
//              setToken(<Token tokenName={tokenName}/>)
//         } 
//     }, [tokenName])
//     return (
//         <>
//         {/* <Token name={name} token={token}/> */}
//         {token}
//         </>
//     )
    
// }

import {useState,useEffect} from 'react'
import Token from './Token';

export const Slot = ({ tokens,x,y }) => {
    // console.log(tokens,'-----------tokens prop inside of Slot----------------')
    // render the token that is on this slot 
    //  -> if there is a token on this slot, then we render it

    //--- initialize this slot with a NULL token
    const [tokenName,setTokenName] = useState('');
    const [token,setToken] = useState(null);
    // const [currentToken,setCurrentToken] = useState();
    
    useEffect(() => {
        //--- figure out what token should render in this slot
        // this needs to happen every time there is an update to the table (as slots can have values change)
        // console.log('--------sssssssssssss----------')
        // console.log(tokens)
        setToken(null)
        for (let i = 0; i < tokens.length; i++) {
            if(tokens[i].x === x && tokens[i].y === y) {
                setTokenName(tokens[i].name);
                console.log(tokens[i]);
                // setCurrentToken(tokens[i])
                // console.log(currentToken)
                setToken(<Token name={tokens[i].name} token_id={tokens[i].token_id} x={tokens[i].x} y={tokens[i].y} image={tokens[i].image}/>);
                // console.log(token)
                console.log(`found token ${tokens[i].name} at slot [${x}, ${y}]`);
                break; // don't need to iterate, we found our token
            }
        }
    }, [tokens])

    return (
        <>
            {/* <Token name={currentToken.name} token_id={tokens[i].token_id} x={tokens[i].x} y={tokens[i].y}/>        */}
             {token}
        </>
    )
    
}