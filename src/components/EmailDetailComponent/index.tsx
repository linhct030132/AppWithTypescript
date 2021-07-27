import React from 'react'
import data from '../messages.json'
import { useParams } from 'react-router'

interface ParamTypes {
    id: string
}

const EmailDetailComponent = () => {

    const { id } = useParams<ParamTypes>();

    const getMessageById = (id: string) => {
        return data.find((item) => item._id === id);
    }

    const message = getMessageById(id)

    console.log(message?.subject);

    return (
        <div className="mt-4">
            <header className="d-flex px-2 bg-secondary justify-content-between">
                <div>
                    <p className="text-uppercase">{message?.subject} </p>
                    <p>{message?.from}-&gt{message?.to}</p>
                </div>
                <p className="text-right">{message?.date}</p>
            </header>
            <main>
                {message?.body}
            </main>
        </div>
    )
}

export default EmailDetailComponent
