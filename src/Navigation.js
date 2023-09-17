import { logoutUser } from './redux part/userSlice';
import {setLogout} from './redux part/initialUserSlice';
import { useDispatch } from 'react-redux';


function Navigation({issignedin, onroutechange}){
    const dispatch =useDispatch();
    if(issignedin)
    {
        return(<div style={{display:"flex", justifyContent:"flex-end"}}>
                    <h1 onClick={() => {
                        onroutechange("signin");
                        dispatch(setLogout());
                        dispatch(logoutUser());
                        }} 
                        style={{textDecoration:"underline", cursor:"pointer", paddingRight:"10px"}}>SignOut</h1>
                </div>)
    }
    else
    {return(
            <div style={{display:"flex", justifyContent:"flex-end"}} >
                <h1 onClick={()=>{onroutechange("signin")}} style={{textDecoration:"underline", cursor:"pointer", paddingRight:"10px"}}>SignIn</h1>
                <h1 onClick={()=>{onroutechange("register")}} style={{textDecoration:"underline", cursor:"pointer", paddingRight:"10px"}}>Register</h1>
            </div>)
    }
       
}

export default Navigation;