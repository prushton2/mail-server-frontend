import { useState } from "react";
import { Mail } from "../lib/ajax.ts";
import "./Registration.css"

export function RegisterEmail({isOpen, close}: {isOpen: boolean, close: () => void}) {

    const [address, setAddress] = useState<string>("");
    const [domain, setDomain] = useState<string>("eastarcti.ca");

    return <div className="modal" style={{display: isOpen ? "block" : "none"}}>
            <div className="modal-content">
                <input onChange={(e) => {setAddress(e.target.value)}}></input>
                @
                <select onChange={(e) => {setDomain(e.target.value)}}>
                    <option value="eastarcti.ca">
                        eastarcti.ca
                    </option>
                </select>
                <br /><br />
                <button className="close" onClick={(e) => {close()}}>Cancel</button>
                <button className="confirm" onClick={(e) => {sendRequest(address, domain)}}>Confirm</button>
            </div>
        </div>

    async function sendRequest(address: string, domain: string) {
        let authtoken = localStorage.getItem("Authorization");
        if(!authtoken) {
            alert("You are not logged in");
            return;
        }
        let response = await Mail.registerEmail(`${address}@${domain}`, authtoken);
        close();
        if(response.success) {
            alert("Email added");
        } else {
            alert("Error");
        }
    }
}