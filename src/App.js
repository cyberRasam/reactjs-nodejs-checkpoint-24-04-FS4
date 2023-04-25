import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState('');


  useEffect(() => {
    getPosts()
  }, [])
  
  async function getPosts() {
    const response = await fetch("http://localhost:3001/api/posts/", {
        method: "GET",
        mode: "cors",
        headers: {
        "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    setPosts([...data])
    console.log(response)
  }


  async function addPost() {
    // a POST request:
    const response = await fetch("http://localhost:3001/api/posts/", {
      method: "POST",
      mode: "cors",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({ msg: input}),
  });
     response.json(); // will give you the json response from this request
    setInput('');
    getPosts()
  }


  async function deletePost(id) {
    const response = await fetch(`http://localhost:3001/api/posts/${id}`,{
      method: "DELETE",
      mode: "cors",
    }) 
    const data = await response.json()
    setPosts([data])
    getPosts()
  } 

  async function updatePost(id) {
    const response = await fetch(`http://localhost:3001/api/posts/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ msg: input}),
    });
    const data = await response.json()
    setPosts([data])
    getPosts()
  }

  return (
    <div className="main-content">
      <h1>Add a new post</h1>
      <input onChange={(e)=> setInput(e.target.value)} value={input}></input>
      <button onClick={addPost}>Add</button>

      <div>
        <h1>
          Here's our posts: 
        </h1>

        <ul>
          {posts.map((el, i) => {
            return <li key={i}>{el.msg}
            <button onClick={() => updatePost(el.id)}>update</button>
            <button onClick={()=> deletePost(el.id)}>Delete</button>
            {el.timestamp} 
            </li>
          })}
        </ul>
      </div>

      {/* <div>
        <h1>here is the sorted version</h1>
        {posts.sort((a,b)=> a.timestamp-b.timestamp)}
      </div> */}
    </div>

  );
}

export default App;
