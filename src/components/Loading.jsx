import React from 'react'

export default function LoadingAnimation() {
  return (
    <div className="flex justify-center my-[15%] " >
       <div className="loading">
        <div className="dot">C</div>
        <div className="dot">A</div>
        <div className="dot">R</div>
        <div className="dot">G</div>
        <div className="dot">A</div>
        <div className="dot">N</div>
        <div className="dot">D</div>
        <div className="dot">O</div>
        
        <span className=" text text-white">Please wait...</span>
      </div>
     </div>
  )
}
