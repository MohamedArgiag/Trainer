import NavBar from "./Navbar"
import { db, auth} from "../firebase";
import firebase from 'firebase/app'

export default function Friend() {
    const users = db.collection("users");


    const addFriend = async () => {
        const email = document.getElementById("userEmail").value;
        const res = await users.where("email", "==", email).get();
        const usertoAdd = res.docs.map(doc => doc.data())[0]

        if (!usertoAdd){
            return alert("❌ USER DOES NOT EXIST!!!!")
        }

        if(auth.currentUser.uid === usertoAdd.uid){
            return alert("❌ CANNOT ADD YOURSELF!!!!")
        }

        await users.doc(auth.currentUser.uid).update({
            friends: firebase.firestore.FieldValue.arrayUnion(usertoAdd.uid)
        })

        alert("✅ ACCOUNT FOLLOWED SUCCESSFULLY.")

    }

    
    return (
        <>
        <NavBar/>
        <input id="userEmail" type="email" placeholder="Search.."/>
        <button onClick={addFriend}>Add Friend</button>



        </>


        

    )
}


