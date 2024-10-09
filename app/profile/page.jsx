"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Profile from '@components/profile'



const myProfile = () => {
    
    const router = useRouter();

    const { data:session } = useSession();
    const [posts, setPosts] = useState([])

    useEffect(() => {

        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`)
          const data = await response.json();
    
          setPosts(data);
        }
        
        if(session?.user.id){
            fetchPosts();
        }
      },[session?.user.id])



    const handleEdit = (post) =>{
      router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async(post) =>{
      const c = confirm("Confirm Prompt Deletion")

      if(c){
        try {
          await fetch(`/api/prompt/${post._id.toString()}`,{
            method: 'DELETE'
          })

          const filteredPosts = posts.filter((p) => p._id !== post._id)
        
          setPosts(filteredPosts);

        } catch (error) {}
      }
    }


  return (

    <Profile
        name = "My"
        desc = "Welcome to your Profile"
        data = {posts}
        handleEdit = {handleEdit}
        handleDelete = {handleDelete}
    />
  )
}

export default myProfile