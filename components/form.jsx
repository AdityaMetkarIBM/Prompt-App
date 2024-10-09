'use client';

import React from 'react';
import Link from 'next/link';

const Form = ({type, post, setPost, submitting, handleSubmit}) => {
  return (
    <section className="w-full max-w-full flex-start" style={{flexDirection: "column"}}>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'> {type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} AMAZING!! Prompts with the world
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex'
        style={{flexDirection: "column"}}
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>

          <textarea 
            value={post.prompt}
            onChange={(e) => setPost({...post, prompt: e.target.value})}
            placeholder='Write your Prompt here...'
            className='form_textarea w-full'
          />
        </label>
        <br/>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag / Topic
          </span>

          <input 
            value={post.tag}
            onChange={(e) => setPost({...post, tag: e.target.value})}
            placeholder='#Tag'
            className='form_input'
          />
        </label>

        <div type="button" className='flex-end mx-3 mb-5 gap-4'>
          <button className="outline_btn mt-5">
            <Link href="/" className='text-sm'> 
              Cancel
            </Link>
          </button>
          <button
            type="submit"
            disabled={submitting}
            className='mt-5 px-6 py-2 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting? `${type}ing...` : type}
          </button>
        </div>

      </form>
    </section>
  )
}

export default Form