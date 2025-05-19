import React from 'react'
import axios from 'axios'
import { useState } from 'react';

export default function Test() {
const [message, setMessage] = useState("");

const fetchMessage = async () => {
    const res = await axios.get("http://localhost:9090/rest/pms/api/v1/welcome");
    const data = await res.data;
    setMessage(data)
}
  return (
    <div>
        <h1>Hello</h1>
        <button onClick={fetchMessage}>Click me</button>
        <p>{message}</p>
    </div>
  )
}
