import { useEffect, useState } from "react";
import { fetchData } from "../lib/ajax.ts";
import { senderAddress } from "../lib/models/senderAddress.ts";
import { Email, Address } from "../lib/models/email.ts";
import ReactLogo from "../assets/react.svg"
import "./Mail.css"

function Mail() {
    const [icons, setIcon] = useState<JSX.Element>(<><img src={ReactLogo}/></>);
    const [addresses, setAddresses] = useState<JSX.Element[]>([]);
    
    const [inbox, setInbox] = useState<JSX.Element[]>([]);
    const [allMail, setAllMail] = useState<Email[]>([]);
    
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

    useEffect(() => {
        async function get() {
            let emails: Email[] | null = (await fetchEmails(currentAddress));
    
            if(!emails) {
                return;
            }
            setAllMail(emails);
        }
        if(currentAddress) {
            get();
        }
    }, [currentAddress])

    useEffect(() => {
        setInbox(renderEmails(allMail));
    }, [allMail])

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
            <div style={{"borderTop": "3px solid black"}}>
                {inbox}
            </div>
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


async function fetchEmails(currentAddress: string): Promise<Array<Email> | null> {

    let token = localStorage.getItem("Authorization")
    if(!token) {
        return null;
    }

    let emails = (await fetchData.fetchMail(token, 25, 0, currentAddress))["emails"];
    return emails;
}


function renderEmails(emails: Email[]): JSX.Element[] {
    
    let emailjsx: JSX.Element[] = [];

    emails.forEach((email: Email) => {
        emailjsx.push(
        <div key={email._id} className="inboxElement">
            {email.subject} <br/>
            <label className="inboxElementBodyPreview">{email.text}</label>
        </div>)
    })
    
    return emailjsx;
}
export default Mail;