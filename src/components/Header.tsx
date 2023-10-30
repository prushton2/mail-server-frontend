import "./Header.css"

function Header() {
    return  <div className='header'>
                <div className='headerMenu'>
                    Logo Here
                </div>
                <div className='headerMenu'>
                    <button className='headerButton'>About</button> 
                </div>
                <div className='headerMenu'>
                    <button className='headerButton' onClick={() => {window.location.href = "/Signup"}} >Sign Up</button> 
                </div>
                <div className='headerMenu'>
                    <button className='headerButton' onClick={() => {window.location.href = "/Login"}} >Log In</button> 
                </div>
            </div>
}

export default Header;