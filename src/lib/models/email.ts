export interface Email {
    _id: string
    
    //body
    html: string,
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

