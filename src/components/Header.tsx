import { useEffect, useState } from "react";
import "./Header.css"

function Header({state}: {state: string}) {

    const [buttons, setButtons] = useState<JSX.Element[]>([]);

    let about = <button className='headerButton'>About</button>;
    let signup = <button className='headerButton' onClick={() => {window.location.href = "/Signup"}} >Sign Up</button>; 
    let login = <button className='headerButton' onClick={() => {window.location.href = "/Login"}} >Log In</button>; 
    let logout = <button className='headerButton' onClick={() => {window.location.href = "/Login"}} >Log Out</button>; 
    let home = <button className='headerButton' onClick={() => {window.location.href = "/"}} >Home</button>; 

    useEffect(() => {
        switch(state) {
            case "home" :
                setButtons([
                    signup, login, about
                ]);
                break;
            case "login":
                setButtons([
                    home, about
                ]);
                break;
            case "window":
                setButtons([
                    logout, home, about
                ]);
                break;
            default:
                break;
        }
    }, [state])
    

    function renderHeaderElements(buttons: JSX.Element[]) {
        let jsx: JSX.Element[] = [];
        buttons.forEach((element) => {
            jsx.push(
                <div className='headerMenu'>
                    {element}
                </div>
            )
        })
        return jsx.reverse();
    }

    return  <div className='header'>
                <div className='headerMenu'>
                    Logo Here
                </div>
                { //is this proper form??? idk //no its not you dumbass //now it is
                    renderHeaderElements(buttons) //this way it rerenders when buttons changes!
                }


                {/* <div className='headerMenu'>
                    <button className='headerButton' onClick={() => {window.location.href = "/Signup"}} >Sign Up</button> 
                </div>
                <div className='headerMenu'>
                    <button className='headerButton' onClick={() => {window.location.href = "/Login"}} >Log In</button> 
                </div> */}
            </div>
}

export default Header;