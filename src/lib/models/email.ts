export interface Email {
    _id: string
    
    //body
    html: JSX.Element,
    text: string,

    //subject
    subject: string,

    sender: Address[],
    recipient: Address[]
}

export interface Address {
    address: string,
    name: string
}

