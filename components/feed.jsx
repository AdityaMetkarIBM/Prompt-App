'use client';

import React from 'react'
import { useState, useEffect } from 'react'
import PromptCard from '@components/PromptCard'
import { useSession } from 'next-auth/react';


const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key = {post._id}
          post = {post}
          handleTagClick = {handleTagClick}
        />
      ))}
    </div>
  )
}


const Feed = () => {

  const {data : session} = useSession();


  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])

  const handleSearchChange = (e) =>{

      const query = e.target.value;
      setSearchText(query)

      try{
        
        const getData = async () => {
          const response = await fetch('/api/prompt')
          const data = await response.json()

          if (query == ''){
            setPosts(data)
          }
          else{

            const filteredData = data.filter((p) =>
              p.creator?.username.toLowerCase().startsWith(query.toLowerCase()) ||
              p.tag.toLowerCase().startsWith(query.toLowerCase())
            ); 

            setPosts(filteredData)
          }
        }

        getData();
      
      }catch(error){}
  }

  useEffect(() => {

    const fetchPosts = async () => {
      const response = await fetch('/api/prompt/')
      const data = await response.json();
      
      console.log(data)
      setPosts(data);
    }

    fetchPosts();
    
    const intervalId = setInterval(() => {
      fetchPosts(); // Refetch posts every 5 seconds
    }, 5000);

    return () => clearInterval(intervalId); 

  },[])


  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder='Search...'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
          />
      </form>
      
      <PromptCardList
        data = {posts}
        handleTagClick = {() => {}}
      />
    </section>
  )
}

export default Feed