import React from 'react'
import Feed from '@components/feed'

const Home = () => {
  return (
    <section className="home">
        <h1 className='head_text text-center'>
            Discover & Share
            <br className="max-md:hidden" />
            <span className="orange_gradient text-center"> AI-Powered Prompts</span>
        </h1>
        <div className='desc text-center'>This is a online test for proompting ChatGPT with NextJS</div>
        <Feed/>
    </section>
  )
}

export default Home