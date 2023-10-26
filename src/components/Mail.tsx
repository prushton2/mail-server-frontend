import { useEffect, useState } from "react";
import { fetchData } from "../lib/ajax.ts";
import { senderAddress } from "../lib/models/senderAddress.ts";
import ReactLogo from "../assets/react.svg"
import "./Mail.css"

function Mail() {
    const [icons, setIcon] = useState<JSX.Element>(<><img src={ReactLogo}/></>);
    const [addresses, setAddresses] = useState<JSX.Element[]>([]);
    const [inbox, setInbox] = useState<JSX.Element[]>([]);
    const [activeMail, setActiveMail] = useState<JSX.Element>(<></>);

    const [currentAddress, setCurrentAddress] = useState<string>("");


    useEffect(() => {
        async function get() {

            let fetchedAddresses: senderAddress[] = (await fetchAddresses())["addresses"];

            if(fetchedAddresses) {
                setAddresses(RenderAddresses(fetchedAddresses));
                setCurrentAddress(`${fetchedAddresses[0].username}@${fetchedAddresses[0].domain}`);
            }

        }
        get();
    }, [])

    return <div className="container">
        <div className="bar0">
            {icons}
        </div>

        <div className="bar1">

            <button className="refreshbtn">↺</button> 
            <button className="registerbtn">Register an Address</button> 

            <select onChange={(e) => {setCurrentAddress(e.target.value)}}>
                {addresses}
            </select>
            <br />
            {inbox}
        </div>

        <div className="bar2">
            {activeMail}
        </div>

    </div>
}


async function fetchAddresses(): Promise<{"addresses": Array<senderAddress>}> {
    
    let authtoken: string | null = localStorage.getItem("Authorization");
    let data;
    if(authtoken) {
        data = await fetchData.fetchAddresses(authtoken);
    } else {
        // return "No User Found ";
        throw "No user found 💀";
    }
    return data;
}

function RenderAddresses(addresses: senderAddress[]): JSX.Element[] {

    let jsx: JSX.Element[] = [];

    addresses.forEach((element) => {
        jsx.push(
            <option value={`${element.username}@${element.domain}`} key={`${element.username}@${element.domain}`}>
                {element.username}@{element.domain}
            </option>);
    })

    return jsx;
}


function fetchEmails():   {

}

export default Mail;