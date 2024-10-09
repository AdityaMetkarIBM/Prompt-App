'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders} from 'next-auth/react';



const Nav = () => {

const {data : session} = useSession();
const [toggleDropdown, setToggleDropdown] = useState(false);

const [providers, setProviders] = useState(null);

useEffect(() => {
    const fetchProviders = async () =>{
        const response = await getProviders();
        setProviders(response)
    }

    fetchProviders();
},[])
  
  return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href='/' className="flex gap-2 flex-center">
                <Image
                 src="/assets/images/logo.svg"
                 width={30}
                 height={30}
                 alt='Logo'
                 className='object-contain'
                />
            </Link>

            <div className="sm:flex hidden">
                {session?.user ?( 
                    <div className='flex gap-3 md:gap-5'>
                        <Link href="/create-prompt" className='black_btn'>
                            Create Prompt
                        </Link>
                        <button type='button' className="outline_btn" onClick={signOut}>
                            Sign Out
                        </button>
                        <Link href="/profile">
                            <Image 
                                src={session.user.image}
                                height={37}
                                width={37}
                                className='rounded-full'
                            />
                        </Link>
                    </div> ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((method) => (
                                <button 
                                 type = "button"
                                 key={method.name}
                                 className='black_btn'
                                 onClick={() => signIn(method.id)}
                                >
                                    Sign In
                                </button>
                            ))
                        }
                    </>
                )}
            </div>
            <div className="sm:hidden flex relative">
                {session?.user ?(
                    <div className="flex">
                        <Image 
                            src="/assets/images/logo.svg"
                            height={37}
                            width={37}
                            className='rounded-full'
                            onClick={() => setToggleDropdown(!toggleDropdown)}
                        />
                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href = "/create-prompt"
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type = "button"
                                    onClick={() => {setToggleDropdown(false); signOut();}}
                                    className='mt-5 w-full black_btn'
                                >
                                    Sign Out
                                </button>
                            </div>
                        )

                        }
                    </div>) : (
                        <>
                        {providers &&
                            Object.values(providers).map((method) => (
                                <button 
                                 type = "button"
                                 key={method.name}
                                 className='black_btn'
                                 onClick={() => signIn(method.id)}
                                >
                                    Sign In
                                </button>
                            ))
                        }
                        </>
                    )
                }

            </div>
        </nav>
  )
}

export default Nav