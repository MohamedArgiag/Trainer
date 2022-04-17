import React, { useRef, useState } from "react"
import NavBar from "./navbar/Navbar"
import { db, auth} from "../firebase";
import firebase from 'firebase/app'



export default function Friend(){
    
    const dummy = useRef();
    const messageRef = db.collection("messages");
    //const query = messageRef.orderBy("createdAt").limit(25)
    
    const [formValue, setFormValue] = useState('');


    const sendMessage = async (e) => {
        e.preventDefault();
    
        const { uid } = auth.currentUser;

        await messageRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
          })

          setFormValue('');
          dummy.current.scrollIntoView({ behavior: 'smooth' });
        }





    return (
        <>
        <NavBar/>


        <main>

        

        <span ref={dummy}></span>

        </main>

        <form onSubmit={sendMessage}>

        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

        <button type="submit" disabled={!formValue}>🕊️</button>

        </form>


        </>
    )
}

function ChatMessage(props) {
    const { text, uid, } = props.message;
  
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
    return (<>
      <div className={`message ${messageClass}`}>
        <p>{text}</p>
      </div>
    </>)
  }