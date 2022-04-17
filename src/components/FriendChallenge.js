import NavBar from "./navbar/Navbar"
import { db, auth} from "../firebase";
import firebase from 'firebase/app' 

export default function FriendChallenge() {
    const users = db.collection("users");


    const addFriendtoChallenge = async () => {
        const email = document.getElementById("userEmail").value;
        const res = await users.where("email", "==", email).get();
        const usertoAdd = res.docs.map(doc => doc.data())[0]

        if (!usertoAdd){
            return alert("❌ USER DOES NOT EXIST!!!!")
        }

        if(auth.currentUser.uid === usertoAdd.uid){
            return alert("❌ CANNOT ADD YOURSELF!!!!")
        }

        await users.doc(auth.currentUser.uid).collection("challenges").update({
            challengemembers: firebase.firestore.FieldValue.arrayUnion(usertoAdd.uid)
        })

        alert("✅ ACCOUNT FOLLOWED SUCCESSFULLY.")

    }

    
    return (
        <>
        <NavBar/>
        <h1 className="w-100 text-center mb-8">Add Friend </h1>
        <input id="userEmail" type="email" placeholder="Search.."/>
        <button className="btn btn-primary btn-lg w-50 text-center mt-3" onClick={addFriendtoChallenge}>Add Friend</button>

        </>


        

    )
}


