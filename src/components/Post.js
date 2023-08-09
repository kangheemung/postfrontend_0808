import React from 'react'
import {useState, useEffect} from "react"
import axios from "axios"

const Post = () => { 
    const [postData, setPostData] = useState({ value: '' });
    
    const handleChange =(e)=>{
      setPostData({ ...postData, [e.target.name]: e.garget.value })
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
    
    axios.post('http://52.195.43.116:8080/post/create',
               postData,
               {
                  headers:{
                    'Content-Type':'application/json'         
                  }
        }
      )
      .then((res) => {
            console.log(res.data)
            setPostData(res.data.postData)
      })
        // handle response data here if needed
      .catch ((err)=>{
        console.error(err)
      });
  };
  console.log(postData)

      useEffect(() => {
        // Code to execute when component mounts or updates
        // ...
      }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="post">
      <p><label htmlFor="title">title: </label></p>
      <p><input type="text" id="title" name="title" value={postData.title} onChange={handleChange} /></p>
      <p><label htmlFor="content">content: </label></p>
      <p><input type="text" id="content" name="content" value={postData.content} onChange={handleChange}/></p>
      <input type="submit" value="投稿！！！" />
      </div>
    </form>
  );
};


export default Post;