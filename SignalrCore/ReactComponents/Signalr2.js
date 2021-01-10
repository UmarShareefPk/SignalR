import React, { useState, useEffect} from 'react'
import {  JsonHubProtocol,
    HubConnectionState,
    HubConnectionBuilder,
    LogLevel} from '@microsoft/signalr';

export default function Signalr2() {
    const [ connection, setConnection ] = useState(null);
    const [msg, setMsg] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const [fakeid, setFakeid] = useState(0);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:44380/hubs/chat')
            .withAutomaticReconnect()
            .withHubProtocol(new JsonHubProtocol())
            .configureLogging(LogLevel.Information)
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
    
                    connection.on('ReceiveMessage', (message) => {
                        setAllMessages(pre => {
                            return [...pre , message];
                        });
                        
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const sendMessage = async (message) => {
      // console.log("inside send");
        if (connection.connectionStarted) {
            try {
                await connection.send('Send', message);
            }
            catch(e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }    }

    const send = () => { 
        
        sendMessage(msg);
    }
   

    return (
        <div className="container">
            <input type="text" onChange={(e) => setMsg(e.target.value)}  />
            <button onClick={send} >Send</button>

            <div>
            <ul>
                {allMessages.map(m => {
                    
                    return (
                        <li key={Math.random()}> {m} </li>
                    )
                })}
                </ul>
            </div>
        </div>
    )
}
