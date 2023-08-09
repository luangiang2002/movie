import { signOut } from 'firebase/auth'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/fibefire'

const Singout = () => {
    const history=useNavigate()
    const handleSignout=()=>{
        signOut(auth).then(val=>{
            console.log(val);
            history('/login')
        })
    }
  return (
    <div>
        <button onClick={handleSignout}>singout</button>
    </div>

  )
}

export default Singout