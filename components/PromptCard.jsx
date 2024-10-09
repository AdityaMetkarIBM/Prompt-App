"use client";

import React from 'react'
import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';



const PromptCard = ({post , handleTagClick, handleEdit, handleDelete}) => {

  const {data : session} = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(post.prompt)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 5000);
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-center items-center gap-1 cursor-pointer">
          <Image
            src = {session?.user.email === post.creator?.email ? session?.user.image : '/assets/images/logo.svg'}
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
        </div>
        <div className="flex flex-col">
          <h3 className="font-satoshi font-semibold">{post.creator?.username ? post.creator.username:"Anonymous"}</h3>
          <p className="font-inner text-sm text-gray-500">{post.creator?.email ? post.creator.email:"Random_email@gamil.com"}</p>
        </div>

        <div className="copy_btn" onClick={() => {handleCopy()}}>
          <Image
            src={copied ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => {handleTagClick && handleTagClick(post.tag)}}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator?._id &&
      pathName === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}

    </div>
  )
}

export default PromptCard