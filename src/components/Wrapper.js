import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function Wrapper({ children }) {
    return (
        <div className='mt-5 lg:mx-4 mx-1'>
            <Navbar />
            <div className='z-10 mt-10 mb-32 mx-20'>
                {children}
            </div>
            <div className='-mx-1 lg:-mx-4'>
                <Footer />
            </div>
        </div>
    )
}

export default Wrapper