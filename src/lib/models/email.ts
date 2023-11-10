export interface Email {
    _id: string
    
    //body
    html: string,
    text: string,

    //subject
    subject: string,

    from: Address[],
    to: Address[]
}

export interface Address {
    address: string,
    name: string
}

