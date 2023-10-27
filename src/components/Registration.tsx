import { useState } from "react";
import "./Registration.css"

export function RegisterEmail({isOpen, close}: {isOpen: boolean, close: () => void}) {

    const [address, setAddress] = useState<string>("");
    const [domain, setDomain] = useState<string>("eastarcti.ca");

    return <div className="modal" style={{display: isOpen ? "block" : "none"}}>
            <div className="modal-content">
                <button className="close" onClick={(e) => {close()}}>X</button>
                <input onChange={(e) => {setAddress(e.target.value)}}></input>
                @
                <select onChange={(e) => {setDomain(e.target.value)}}>
                    <option value="eastarcti.ca">
                        eastarcti.ca
                    </option>
                </select>
            </div>
        </div>;
}