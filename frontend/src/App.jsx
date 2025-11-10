import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

import { io } from "socket.io-client"
const App = () => {

  const socket = useRef(null)

  const [receivedMessages, setReceivedMessages] = useState([{

  }])

  const [socketId, setSocketId] = useState(null)

  const [message, setMessage] = useState("")




  const sendMessage = () => {


    socket.current.emit("message", { message })

    setMessage("")

  }

  useEffect(() => {

    socket.current = io("http://localhost:3000")

    socket.current.on("connect", () => {

      setSocketId(socket.current.id)

    })



    return () => {
      socket.current.disconnect();
    }
  }, [])

  useEffect(()=>{
    console.log(receivedMessages);
    
  },[receivedMessages])

  const updateMessage = () => {
    

    socket.current.on("receive-message", (message) => {
      setReceivedMessages((prev) => {
        return [...prev, message]
      })
    })
  }

  useEffect(() => {
    
    updateMessage()
  }, [])

  return (
    <div className='text-4xl flex flex-col items-center py-3'>
      <h1>Socket IO Tutotrial </h1>

      <h1 className='py-4'>My Id : {socketId}</h1>

      <div className='flex items-center justify-evenly px-5 w-[40vw] py-3'>
        <input type="text" name="" id="" placeholder='Message ...' className='bg-gray-300  text-xl w-full mr-3 px-3 py-3 rounded-2xl' value={message} onChange={(e) => setMessage(e.target.value)} />

        <button className='bg-green-300 text-xl py-2 px-3 rounded-full shadow-lg active:bg-amber-50 duration-200 cursor-pointer' onClick={sendMessage}>Send</button>
      </div>

      <div className='bg-gray-600 w-[60vw] min-h-[68vh] flex flex-col'>
        {
          !receivedMessages.length > 0 ? (<>
            <h1 className='text-white text-xl text-center font-serif px-9 py-4  shadow-lg'>No messages Yet</h1>
          </>) : (<>
            {
              receivedMessages.map((msg) =>


                <h1 key={msg.id} className='text-white text-xl font-serif px-9 py-4  shadow-lg'>
                  {msg.message}
                </h1>

              )
            }
          </>)
        }
      </div>
    </div>
  );
}

export default App;
