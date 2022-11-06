import './App.css';
import { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, onSnapshot, query, orderBy, limit, serverTimestamp } from "firebase/firestore";
// const axios = require('axios').default;


const firebaseConfig = {
  apiKey: "AIzaSyA5OIZ735eXuRWc7tRQ2bjsewtAjRQBYJk",
  authDomain: "store-18a05.firebaseapp.com",
  projectId: "store-18a05",
  storageBucket: "store-18a05.appspot.com",
  messagingSenderId: "382491662873",
  appId: "1:382491662873:web:c174e5ff7150d75fb2e888",
  measurementId: "G-S02CBRWNY3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

function App() {
  const [Posts, setPosts] = useState([]);
  const [PostText, setPostText] = useState("");
  const [isLoading, setisLoading] = useState(false);


  useEffect(() => {
    let unsubscribe = null
    const getData = async () => {
      const q = query(collection(db, "store"), orderBy("CreatedOn", "desc"));
      // const q = query(citiesRef, orderBy("name"), limit(3));

      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const Posts = [];
        querySnapshot.forEach((doc) => {
          Posts.push(doc.data());
        });
        setPosts(Posts)
        console.log("Posts: ", Posts);
      });
    }
    getData();

    return () => {
      console.log("Cleanup Function");
      unsubscribe();
    }
  }, []);


  const SavePost = async (e) => {
    e.preventDefault();
    console.log("Post: ", PostText)

    try {
      const docRef = await addDoc(collection(db, "store"), {
        text: PostText,
        // CreatedOn: new Date().getTime(),
        CreatedOn: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      // console.log("Date", CreatedOn)

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <>
      <div>
        <div className="nav">
          <img src={require('./images/kabootar.jpg')} className="logo" />
        </div>
        <div className="input">
          <form onSubmit={SavePost} className="input">
            <input type="text" placeholder='Write Anything' onChange={(e) => { setPostText(e.target.value) }} ></input><br />
            <button type='submit'>Post</button>
          </form>
        </div>

        <div>{
          (isLoading) ? "Loading..." : ""}
          {Posts.map(eachPost => (<div className='post' key={eachPost?.CreatedOn}>
            <h3>{eachPost.text}</h3>

            <span>{moment((eachPost?.CreatedOn?.seconds) ? eachPost?.CreatedOn?.seconds * 1000 : undefined)
              .format('Do MMMM YYYY, h:mm a')}</span>
          </div>))
          }</div>

          <div className='footer'>
            <p>Only for studying purpose.<br/>All rights reserved by <strong>Syed Hashir Ali</strong>.</p>
          </div>
      </div>

    </>
  );
}

export default App;
