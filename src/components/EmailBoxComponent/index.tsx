import React from 'react'
import { NavLink, Route } from 'react-router-dom'
import EmailPreviewComponent from '../EmailPreviewComponent'
import data from '../messages.json'

const EmailBoxComponent = ({ users }: any) => {

    const getFolder = (user: string) => {
        const folders = data
            .filter((item) => item.to === user)
            .map((item) => {
                return item.folder;
            });

        const setFolder = new Set(folders);
        return [...Array.from(setFolder)];
    }

    return (
        <div className="d-flex">
            <ul className="list-group">
                {getFolder(users).map((item, index) => {
                    return (<li key={index} className="list-group-item">
                        <NavLink activeClassName="active" to={`/messages/${item}`} >{item
                        }</NavLink>
                    </li>)
                })}
            </ul>
            <Route path="/messages/:folder" render={(props) => <EmailPreviewComponent user={users} {...props} />} />
        </div>
    )
}

export default EmailBoxComponent
