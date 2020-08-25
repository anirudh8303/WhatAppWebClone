import React from 'react'
import { Avatar } from '@material-ui/core'
import { useEffect, useState } from "react";
import "./SidebarChat.css"
import db from './firebase';
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom"

function SidebarChat({ addnewchat, id, name }) {
    const [messages, setMessages] = useState("");
    const [seed, setSeed] = useState();
    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map((doc) => doc.data()))
            ))
        }
    })
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);
    const createChat = () => {
        const roomName = prompt("Please enter the roomname for a chat")
        if (roomName) {
            db.collection('rooms').add({
                name: roomName,
            })
        }
    }
    return !addnewchat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarchat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarchat_info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>

    ) : (
            <div onClick={createChat} className="sidebarchat">
                <h2>Add new chat</h2>
            </div>
        )
}

export default SidebarChat
