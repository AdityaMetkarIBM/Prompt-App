import React from 'react';
import '@styles/global.css';
import Nav from '@components/nav';
import Provider from '@components/provider';

export const metadata = {
    title: "Proompt",
    description: "Become a proomt Engineer"
}


const RootLayout = ({children}) => {
  return (
    <html>
        <body>
        <Provider>
            <div className='main'>
                <div className='gradient' />
            </div>
            <main className="app">
                <Nav />
                {children}
            </main>
        </Provider>
        </body>
    </html>
  )
}

export default RootLayout