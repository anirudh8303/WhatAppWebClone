import React from 'react';
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import db from './firebase';
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
function Chat() {
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    useEffect(() => {
        db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
            setRoomName(snapshot.data().name)
        ))
        db.collection('rooms').doc(roomId).collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => (setMessages(snapshot.docs.map((doc) => doc.data()))))
    }, [roomId]);
    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),

        })
        setInput("");
    }
    return (
        <div className="chat">
            <div class="chat_header">
                <Avatar />
                <div class="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>last seen {" "}
                        {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="chat_hederRight">
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        < MoreVertOutlinedIcon />
                    </IconButton>
                </div>
            </div>
            <div class="chat_body">
                {messages.map(message => (
                    <p className={`chat_message ${message.name === user.displayName && "chat_reciever"}`}>
                        <span className="chat_name" >{message.name}</span>
                        {message.message}
                        <span className="time_stamp">{new Date(message.timestamp?.toDate()
                        ).toUTCString()}</span>
                    </p>
                ))}
            </div>
            <div className="chat_footer">
                <InsertEmoticonIcon></InsertEmoticonIcon>
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)}
                        type="text" />
                    <button type="submit" onClick={sendMessage}>Send Message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
