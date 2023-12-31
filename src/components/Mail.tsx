import { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";

import Header from "./Header.tsx";
import { fetchData } from "../lib/ajax.ts";
import { senderAddress } from "../lib/models/senderAddress.ts";
import { Email } from "../lib/models/email.ts";
import { RegisterEmail } from "./Registration.tsx";

import ReactLogo from "../assets/react.svg"
import "./Mail.css"



function Mail() {
    const [icons] = useState<JSX.Element>(<><img src={ReactLogo}/></>); //deal with later
    
    const [addresses, setAddresses] = useState<JSX.Element[]>([]);
    const [currentAddress, setCurrentAddress] = useState<string>("");

    const [allMail, setAllMail] = useState<Email[]>([]);
    
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        async function get() {

            let fetchedAddresses: senderAddress[] = (await fetchAddresses())["addresses"];

            if(fetchedAddresses) {
                setAddresses(RenderAddresses(fetchedAddresses));
                setCurrentAddress(`${fetchedAddresses[0].username}@${fetchedAddresses[0].domain}`);
            }
        }
        get();
    }, [modalOpen])

    useEffect(() => {
        setSelectedIndex(-1);
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

    return <>
        <Header state="window"/>
        <div className="mailcontainer">
            <RegisterEmail isOpen={modalOpen} close={() => {setModalOpen(false); setCurrentAddress(currentAddress)}}/>
            <div className="bar0">
                {icons}
            </div>

            <div className="bar1">
                <button className="refreshbtn" onClick={() => {setCurrentAddress(currentAddress)}}>↺</button> 
                <button className="registerbtn" onClick={() => {setModalOpen(true)}}>Register an Address</button> 

                <select onChange={(e) => {setCurrentAddress(e.target.value)}}>
                    {addresses}
                </select>
                <div style={{"borderTop": "1px solid black"}}></div>
                <br />
                <br />
                <div style={{"borderTop": "1px solid black"}}>
                    {renderEmails(allMail)}
                </div>
            </div>

            <div className="bar2">
                {renderAndSanitizeMail()}
            </div>

        </div>
    </>

    function renderAndSanitizeMail(): JSX.Element {
        if(allMail.length === 0 || selectedIndex === -1) {
            return <label></label>;
        }

        // console.log(); 
        return <>
            <div className="mailHeader">
                {allMail[selectedIndex].subject}
            </div>
            <div className="mailBody">
                <b>
                    
                {allMail[selectedIndex].from[0].name}{"     "}
                {"<"}{allMail[selectedIndex].from[0].address}{">"}
                </b>
                <br />
                <br />
                <div dangerouslySetInnerHTML={{ 
                    __html: DOMPurify.sanitize(allMail[selectedIndex].html)}}>  
                </div>
            </div>
        </>
    }


    async function fetchAddresses(): Promise<{"addresses": Array<senderAddress>}> {
        
        let authtoken: string | null = localStorage.getItem("Authorization");
        let data;
        if(authtoken) {
            data = await fetchData.fetchAddresses(authtoken);
        } else {
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

        emails.forEach((email: Email, i: number) => {
            emailjsx.push(
            <div key={email._id} className={`inboxElement${selectedIndex===i ?" Selected":""}`} onClick={() => setSelectedIndex(i)}>
                {email.from[0].name} <br/>
                {email.subject.substring(0, 48)} <br/>
                <label className="inboxElementBodyPreview">{email.text.substring(0, 48)}</label>
            </div>)
        })
        
        return emailjsx;
    }
}


export default Mail;