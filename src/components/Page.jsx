import React from 'react'
import NavBar from './NavBar'

export default function Page({children}) {
  return (
    <>  
        <>
            <NavBar/>
            {children}
            {/* {Mas componentes} */}
        </>
    </>
  )
}
