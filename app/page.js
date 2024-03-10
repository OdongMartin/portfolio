'use client'

//import Link from "next/link"
import { Link } from 'react-scroll';
import {useRef, useEffect, useState} from 'react'

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

  const handleScrollToFloor = (floor) => {
    setCurrentFloor(floor);
  };
 

  return (
    <>
      {/* <style>{`
          body {
            overflow: hidden;
          }
        `}
      </style> */}
      <div className='bg-black h-screen w-screen absolute inset-0'>
        {/* blob and blur */}
        <div className='flex'>
          {/* blur */}
          <div 
            className='h-screen w-screen'
            style={{
              position: 'absolute',
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
        </div>
        

        <div  className='flex' style={{zIndex: 3, position:'fixed'}}>          
          {/* word random */}
          <div 
            className=' text-white font-mono text-3xl tracking-widest m-4 h-5'
            onMouseEnter={handleHover} 
            style={{
              cursor:'pointer', 
              // zIndex: 3
            }}
            data-value='HOME'
           > 
          {/* <Link to='contacts' smooth={true} duration={500} onClick={() => handleScrollToFloor(3)}>HOME</Link> */}
          HOME
          </div>

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

          <div 
              className=' text-white font-mono text-3xl tracking-widest m-4 mt-8 h-5'
              onMouseEnter={handleHover} 
              style={{
                cursor:'pointer',
                // zIndex: 3
              }}
              data-value='CONTACTS'
            > 
            {/* <Link to='contacts' smooth={true} duration={500} onClick={() => handleScrollToFloor(3)}>CONTACTS</Link> */}
          CONTACTS
          </div>
        </div>

          {/* Elevator */}
        <div className="elevator h-screen" style={{zIndex: 3}}>
            {/* Home Floor */}
              <div id="home" className={`floor ${currentFloor === 0 ? 'active' : ''} h-full  text-white`} >
            0
          </div>
          {/* About Floor */}
          <div id="about" className={`floor ${currentFloor === 1 ? 'active' : ''} h-full text-white `} >
           
            1
          </div>

          {/* Projects Floor */}
          <div id="projects" className={`floor ${currentFloor === 2 ? 'active' : ''} h-full text-white`} >
            
            2
          </div>

          {/* Contact Floor */}
          <div id="contacts" className={`floor ${currentFloor === 3 ? 'active' : ''} h-full text-white`} >
            3
          </div>
        </div>
      </div>
    </>
  )
}

export default Home