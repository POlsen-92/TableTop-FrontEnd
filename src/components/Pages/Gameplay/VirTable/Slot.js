import {useState,useEffect} from 'react'
import Token from './Token';

export const Slot = ({ x,y,tokens }) => {
    const [name,setName] = useState('');
    const [token,setToken] =useState(null);
    function isToken() {
        let isToken = false;
        for (let i = 0; i < tokens.length; i++) {
            if(tokens[i].x === x && tokens[i].y === y){
                isToken = true;
                setName(tokens[i].name);
            }       
        } 
        return isToken
    }
    useEffect(() => {
        if(isToken()){
            console.log('I RAN----------------------');
            setToken(<Token name={name}/>)
        } 
    }, [name])
    return (
        <>
        {token}
        </>
    )
    
}

