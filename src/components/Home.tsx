// import { useState } from 'react'
import './Home.css'

function App() {

  return (
    <>
        <div className='header'>
            Jacks Mail Service
            <br />
            <div className='headerMenu'>
                Logo Here
            </div>
            <div className='headerMenu'>
                <button className='headerButton'>About</button> 
            </div>
            <div className='headerMenu'>
                <button className='headerButton' onClick={() => {window.location.href = "/Login"}} >Sign Up</button> 
            </div>
            <div className='headerMenu'>
                <button className='headerButton' onClick={() => {window.location.href = "/Login"}} >Log In</button> 
            </div>
        </div>
        Jack youre putting stuff here
    </>
  )
}

export default App