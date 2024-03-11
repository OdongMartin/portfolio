'use client'

//import Link from "next/link"
import { Link } from 'react-scroll';
import {useRef, useEffect, useState} from 'react'
import Image from 'next/image';

const Home = () => {
  // scif-random words
  const handleHover = (e) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    //console.log("yooo:", e.target.innerText)
    //e.target.innerText.split('').map((letter) => {console.log(letter)})
    //e.target.innerText = letters[Math.floor(Math.random() * 26)];

    let iterations = 0;
    const interval = setInterval(() =>{
      e.target.innerText = e.target.innerText.split('').map((letter, index) =>{
        if(index < iterations) {
          return e.target.dataset.value[index]
        }
        return letters[Math.floor(Math.random() * 26)];
      }).join("")

      if(iterations >= e.target.dataset.value.length) clearInterval(interval);

      iterations += 1/3;
    }, 30)
  }

  // handle blob logic
  const myBlobRef = useRef(null);
  useEffect(() => {
    const blob = myBlobRef.current;
    if (blob) {
      const handleMouseMove = (event) => {
        const { clientX, clientY } = event;

        // adjust the positioning based on the scroll position
        const offsetX = window.scrollX || document.documentElement.scrollLeft;
        const offsetY = window.scrollY || document.documentElement.scrollTop;

        blob.style.position = 'absolute';
        // blob.style.left = `${clientX}px`;
        // blob.style.top = `${clientY}px`;
        blob.animate({
          left:`${clientX + offsetX}px`,
          top:`${clientY + offsetY}px`
        }, { duration: 2000, fill: "forwards"}) 

      };

      // add event listener to the window
      window.addEventListener('pointermove', handleMouseMove);

      return () => {
        window.removeEventListener('pointermove', handleMouseMove);
      };
    }
  }, []);
  
  //react-scroll
  const [currentFloor, setCurrentFloor] = useState(0);

  const scrollSpeed = 1000;
  const handleScrollToFloor = (floor) => {
    setCurrentFloor(floor);
  };
 

  return (
    <>
      <style>{`
          body {
            overflow: hidden;
          }
        `}
      </style>

      {/* blob and blur */}
      <div className='flex'>
        <div className='bg-black h-screen w-screen fixed inset-0'>
        </div>
        {/* blur */}
        <div 
          className='h-screen w-screen'
          style={{
            position: 'fixed',
            zIndex: 2,
            backdropFilter: 'blur(200px)'
          }}
          //ref={blurRef} 
          id='blur'>

        </div>
        {/* background blob thingi */}
        <div 
          ref={myBlobRef}
          id = 'blob'
          className='bg-gradient-to-r from-emerald-500 to-violet-800 animate-[spin_3s_linear_infinite]'
          style={{ 
            height: '300px',
            width: '300px',
            left: '50%',
            top: '50%',
            translate: '-50% -50%',
            borderRadius: '50%',
            pointerEvents: 'none'
          }}
        >
        </div>
        

        <div  className='flex' style={{zIndex: 3, position:'fixed'}}>          
          {/* Nav buttons */}
          <Link to='home' smooth={true} duration={scrollSpeed} onClick={() => handleScrollToFloor(0)}>     
          <div 
            className=' text-white font-mono text-3xl tracking-widest m-4 h-5'
            onMouseEnter={handleHover} 
            style={{
              cursor:'pointer', 
              // zIndex: 3
            }}
            data-value='HOME'
           > HOME  </div>
          </Link>

          <Link to='about' smooth={true} duration={scrollSpeed} onClick={() => handleScrollToFloor(1)}>
            <div 
                className=' text-white font-mono text-3xl tracking-widest m-4 mt-8 h-5'
                onMouseEnter={handleHover} 
                style={{
                  cursor:'pointer',
                  // zIndex: 3
                }}
                data-value='ABOUT'
              > ABOUT
            </div>
          </Link>
          
          <Link to='projects' smooth={true} duration={scrollSpeed} onClick={() => handleScrollToFloor(2)}>
            <div 
                className=' text-white font-mono text-3xl tracking-widest m-4 h-5'
                onMouseEnter={handleHover} 
                style={{
                  cursor:'pointer',
                  // zIndex: 3
                }}
                data-value='PROJECTS'
              > PROJECTS
            </div>
          </Link>

            <Link to='contacts' smooth={true} duration={scrollSpeed} onClick={() => handleScrollToFloor(3)}>          
              <div 
                className=' text-white font-mono text-3xl tracking-widest m-4 mt-8 h-5'
                onMouseEnter={handleHover} 
                style={{
                  cursor:'pointer',
                  // zIndex: 3
                }}
                data-value='CONTACTS'
              > CONTACTS  </div>
            </Link>

        </div>

          {/* Elevator */}
        <div className="elevator h-screen" style={{zIndex: 2}}>
          {/* Home Floor */}
          <div id="home" className={`floor ${currentFloor === 0 ? 'active' : ''} h-full  text-white `} >
            <div className='flex'>
              <Image alt='' 
                className='h-[100vh] w-[30vw] mb-0' 
                width={500} 
                height={1000} 
                src='/images/Polish_20240311_204350166.png'></Image>
                
              <div className='mt-[30vh] tracking-widest'>
                <h1 className='text-6xl font-mono '>Welcome to My Website</h1>
                <p className='mt-8 font-mono text-2xl text-wrap'>This is the homepage of my website. Feel free to explore!</p>
              </div>
            </div>
          </div>
          {/* About Floor */}
          <div id="about" className={`floor ${currentFloor === 1 ? 'active' : ''} h-full text-white `} >
           
            about
          </div>

          {/* Projects Floor */}
          <div id="projects" className={`floor ${currentFloor === 2 ? 'active' : ''} h-full text-white`} >
            
            projects
          </div>

          {/* Contact Floor */}
          <div id="contacts" className={`floor ${currentFloor === 3 ? 'active' : ''} h-full text-white`} >
            contacts
          </div>
        </div>
      </div>
    </>
  )
}

export default Home