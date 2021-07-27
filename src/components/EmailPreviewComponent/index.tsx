import React, { useState } from 'react'
import data from '../messages.json'
import { useHistory, useParams } from 'react-router-dom'

interface ParamTypes {
    folder: string
}

const EmailPreviewComponent = ({ user }: any) => {
    const history = useHistory()

    const { folder } = useParams<ParamTypes>();

    const [activeID, setActiveID] = useState('')

    const getMessageByFolder = (folder: string, user: string) => {
        return data.filter((item) => item.folder === folder && item.to === user);
    }

    const handleTableClick = (id: string, folder: string) => {
        history.push(`/messages/${folder}/${id}`);
        setActiveID(id);
    }

    const formatDate = (date: string) => {
        return new Date(date);
    }

    const messages = getMessageByFolder(folder, user);

    return (

        <div className="email-preview">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Sender</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.map(item => {
                        return (
                            <tr className={activeID === item._id ? "bg-info text-white" : ""} onClick={() => handleTableClick(item._id, folder)} key={item._id}>
                                <td>{item.from}</td>
                                <td>{item.subject}</td>
                                <td>{formatDate(item.date).toLocaleDateString('vi-Vi')}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div >
    )
}

export default EmailPreviewComponent
