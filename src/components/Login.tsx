import { useState } from "react";
import { Account } from "../lib/ajax";
import Header from "./Header";

import "./Login.css";
import { AxiosError } from "axios";


function Window({isSignup, onLogin}: {
    isSignup:boolean, 
    onLogin: (username: string, password: string, invite: string) => void}) {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const [invite, setInvite] = useState("");

    return <div className="logincontainer">
        <Header state={"login"}/>
        <div className="loginWindow">
            Login <br />
            <input placeholder="Username" onChange={(e) => setUsername(e.target.value)}/> <br />
            <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} type="password" />

            {isSignup ?
            <input placeholder="Invite" onChange={(e) => setInvite(e.target.value)}/>
            : <></>
            }

            <button className="loginButton" onClick={() => {login()}}>Log in</button>
        </div>
    </div>

    function login() {
        onLogin(username, password, invite);
    }
}



export function Login() {

    skipPage();
    
    return <Window isSignup={false} onLogin={(un, pw) => Login(un, pw)} />
    function skipPage() {
        if(localStorage.getItem("Authorization")) {
            window.location.href = "/mail"
        }
    }
    
    async function Login(username: string, password: string) {
        let response: {success: boolean, token: string, error: string}
        try {
            response = await Account.login(username, password);
            localStorage.setItem("Authorization", response.token);
            skipPage();
        } catch (err: any) {
            err = err as AxiosError;
            alert(err.response.data.error);
        }
    }
}


export function SignUp() {
    return <Window isSignup={true} onLogin={(un, pw, inv) => Signup(un, pw, inv)} />
    
    function Signup(username: string, password: string, invite: string) {
        console.log(username, password, invite);
    }
}

