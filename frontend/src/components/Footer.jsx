import React from 'react'

function Footer() {
  return (
    <footer className="bg-white text-black p-5">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Job<span className="text-[#F83002]">Portal</span></h1>
          <p className="text-sm">All Rights Reserved &copy; {new Date().getFullYear()}</p>
        </div>
        <div className="flex items-center gap-4">
          <a href="mailto:noorainsyeda464@gmail.com" className="text-black hover:text-[#F83002]">noorainsyeda464@gmail.com</a>
          <a href="tel:+91-9972521333" className="text-black hover:text-[#F83002]">+91-9972521333</a>
          <a href="https://github.com/Noorain464" className="text-black hover:text-[#F83002]">GitHub</a>
        </div>
      </div>
    </footer>

  )
}

export default Footer