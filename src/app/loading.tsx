import React from 'react'

const Loading = () => {
    return (
        <div className='fixed inset-0 z-50 flex justify-center items-center pointer-events-none'>
            <div className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
        </div>
    )
}

export default Loading