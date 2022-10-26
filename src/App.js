import './App.css';
import { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
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

  
  useEffect(()=>{
 
  })


  const SavePost= async (e) => {
    e.preventDefault();
    console.log("Post: ", PostText)

    try {
      const docRef = await addDoc(collection(db, "store"), {
        text:  PostText,
        CreateOn: new Date().getTime(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <>
      <form onSubmit={SavePost}>
        <input type="text" placeholder='Search News' onChange={(e)=>{setPostText(e.target.value)}}></input>
        <button type='submit'>Post</button>
      </form>
      
      {/* <div>{
        (isLoading) ? "Loading..." : ""}
        {Posts.map(eachPost => (<div className='post' key={eachPost.name}>
          <h1>
            {eachPost?.name}  
          </h1>
          <span>{moment(eachPost?.datePublished).format('Do MMMM YYYY, h:mm:ss a')}</span>
          <h3>
            {eachPost?.description}
          </h3>
          <a href={eachPost?.url} target="_blank">See More</a>
          <img src={eachPost?.image?.thumbnail?.contentUrl.replace("&pid=News", "").replace("pid=News&", "").replace("pid=News", "")} alt="" />
        </div>))
      }</div> */}


    </>
  );
}

export default App;
