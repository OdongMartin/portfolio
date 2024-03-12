'use client'

//import Link from "next/link"
import { Link } from 'react-scroll';
import {useRef, useEffect, useState} from 'react'
import Image from 'next/image';

const Home = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  // scif-random words
  const handleHover = (e) => {  
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

  const wordRef = useRef(null);

  // handle blob logic
  const myBlobRef = useRef(null);
  useEffect(() => {
    // random word on load 
    //console.log('wordRef:', wordRef.current);
    let iterations = 0;
    const interval = setInterval(() =>{
      wordRef.current.innerText = wordRef.current.innerText.split('').map((letter, index) =>{
        if(index < iterations) {
          return wordRef.current.dataset.value[index]
        }
        return letters[Math.floor(Math.random() * 26)];
      }).join("")

      if(iterations >= wordRef.current.dataset.value.length) clearInterval(interval);

      iterations += 1/3;
    }, 30)

    const blob = myBlobRef.current;
    if (blob) {
      const handleMouseMove = (event) => {
        const { clientX, clientY } = event;

        // adjust the positioning based on the scroll position
        const offsetX = window.scrollX || document.documentElement.scrollLeft;
        const offsetY = window.scrollY || document.documentElement.scrollTop;

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

      <div className='flex'>
        {/* background */}
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
          id='blur'>

        </div>
        {/* blob */}
        <div 
          ref={myBlobRef}
          id = 'blob'
          className='bg-gradient-to-r from-emerald-500 to-violet-800 animate-[spin_3s_linear_infinite]'
          style={{ 
            position:'absolute',
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
                <h1 ref={wordRef} data-value='WELCOME TO MY WEBSITE' className='text-6xl font-mono '>WELCOME TO MY WEBSITE</h1>
                <p className='mt-8 font-mono text-2xl text-wrap'>This is the homepage of my website. Feel free to explore!</p>
              </div>
            </div>
          </div>
          {/* About Floor */}
          <div id="about" className={`floor ${currentFloor === 1 ? 'active' : ''} h-full text-white `} >
            <div class="flex flex-col items-center m-4 mt-8 sm:mt-16">
            <div class="m-4  font-mono">
                <div>
                    <h class="text-xl sm:text-3xl font-bold">About Me</h>
                    <p>Hello there! 👋 I'm Odong Martin, a passionate full stack web developer with a knack for crafting digital experiences that leave a lasting impact. Here's a bit about my journey in the world of web development.</p>
                </div>
                
                <div class="mt-4">
                    <h class="text-xl sm:text-3xl font-bold">Background</h>
                    <p>I'm a self-taught web developer who has navigated the ever-evolving landscape of the web through hands-on experience and continuous learning. My journey began with taking the CS50x course from Havard, and since then, I've been on a self-driven quest to expand my skills and expertise.</p>
                </div>

                <div class="mt-4">
                    <h class="text-xl sm:text-3xl font-bold ">Skills</h>
                    <p>I specialise in:</p>
                        <p>- Backend technologies such as Node.js and Express</p>
                        <p>- Database management with MongoDB</p>
                        <p>- Authentication with Passport JS</p>
                        <p>- Tailwind CSS</p>
                        <p>- HTML, CSS, Javascript</p>
                        <p>- Responsive and mobile-first design principles</p>
                </div>

                <div class="mt-4">
                    <h class="text-xl sm:text-3xl font-bold">Projects</h>
                    <p>Here are a few projects I have worked on:</p>
                        <p class="text-lg font-semibold mt-2">Github Profile Viewer</p>
                            <p>A web application that allows users to view GitHub profiles, repositories, and other information. It provides features such as user authentication, documentation, and more.</p>
                    
                        <p class="text-lg font-semibold mt-2">Task Manager</p>
                        <p>A web application that allows users to sign up, log in, create, manage, edit, delete and organize their tasks. This application provides a simple and intuitive way to keep track of tasks, set due dates, and monitor task status.</p>
                </div>

                <div class="mt-4">
                    <h class="text-xl sm:text-3xl font-bold ">Personal Touch</h>
                    <p>When I'm not coding, you can find me playing Rugby🏉 or being a Laboratory Technologist😁. I believe in maintaining a healthy work-life balance to keep the creative juices flowing.</p>
                </div>

                <div class="mt-4">
                    <h class="text-xl sm:text-3xl font-bold ">Let's Connect!</h>
                    <p>I'm always open to new challenges and collaborations. If you have a project in mind or just want to chat about web development, feel free to <a href="contact.html" class="text-blue-300">contact me</a>.

                        Looking forward to creating amazing digital experiences together!
                        </p>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Floor */}
          <div id="projects" className={`floor ${currentFloor === 2 ? 'active' : ''} h-full text-white`} >
            
            <div class="flex flex-col items-center text-blue-950">
            <span class="font-bold text-xl sm:text-3xl m-4 text-gray-300">Here are some of my projects</span>
            <div class="w-72 h-auto sm:h-72 m-5 sm:m-10 sm:mr-96 border rounded-2xl border-blue-950 overflow-hidden bg-gray-300 p-2 sm:hover:w-96 sm:hover:h-96 transition-all ease-out duration-700">
                {/* </div><a href="https://github.com/OdongMartin/OdongMartin.github.io"><img src="img/portfolio.png" alt="website image" class=" rounded-xl w-full h-20 sm:h-32 object-cover"></a> */}
                <h class="font-bold text-base sm:text-xl">Personal Website</h>
                <p class="text-sm sm:text-base">I developed my personal portfolio website to showcase my skills, projects, and experiences as a web developer. The website serves as a central hub for potential clients and collaborators to learn more about my work.</p>
                <p class="font-bold text-sm sm:text-lg mt-2">Technologies Used</p>
                {/* <span class="text-sm sm:text-lg">- Tailwind CSS</span> <img src="img/tailwindcss.png" alt="tailwind css" class="w-6 sm:w-8 inline-flex">  */}

                <a href="https://github.com/OdongMartin/OdongMartin.github.io" class="text-sm sm:text-base text-green-700 block">Github Repository</a>
            </div>

            <div class="w-72 h-auto sm:h-72 m-5 sm:m-10 sm:ml-96 border rounded-2xl border-blue-950 overflow-hidden bg-gray-300 p-2 sm:hover:w-96 sm:hover:h-96 transition-all ease-out duration-700">
                {/* <a href="https://github.com/OdongMartin/GitHub-Profile-Viewer"><img src="img/profile-viewer.png" alt=" GitHub-Profile-Viewer" class="rounded-xl w-full h-20 sm:h-32 object-cover"></a> */}
                <h class="font-bold text-base sm:text-xl">Github Profile Viewer</h>
                <p class="text-sm sm:text-base">I developed the Github Profile Viewer to allow users to easily search for and view GitHub profiles, repositories, and other information.</p>
                <p class="font-bold text-sm sm:text-lg mt-2">Technologies Used</p>
                {/* <span class="text-sm sm:text-base">NodeJS</span> <img src="img/node.png" alt="node" class="w-8 sm:w-10 inline-flex">
                <span class="text-sm sm:text-base">, Javascript</span> <img src="img/js.png" alt="js" class="w-6 sm:w-8 inline-flex"> 
                <span class="text-sm sm:text-base">, MongoDB</span> <img src="img/mongodb.png" alt="mongoDB" class="w-12 sm:w-14 inline-flex">
                <span class="text-sm sm:text-base">, Tailwind CSS</span> <img src="img/tailwindcss.png" alt="tailwind css" class="w-6 sm:w-8 inline-flex"> */}
                <a href="https://github.com/OdongMartin/GitHub-Profile-Viewer" class="text-sm sm:text-base text-green-700 block">Github Repository</a>
            </div>
            <div class="w-72 h-auto sm:h-72 m-5 sm:m-10 sm:mr-96 border rounded-2xl border-blue-950 overflow-hidden bg-gray-300 p-2 sm:hover:w-96 sm:hover:h-96 transition-all ease-out duration-700">
                {/* <a href="https://github.com/OdongMartin/TaskManager"><img src="img/create-task.png" alt="task manager" class="rounded-xl w-full h-20 sm:h-32 object-cover"></a> */}
                <div class="p-2">
                    <h class="font-bold text-base sm:text-xl">Task Manager</h>
                    <p class="text-sm sm:text-base">I developed the Task Manager to provide users with a simple and intuitive way to keep track of tasks, set due dates, and monitor task status.</p>
                    <p class="font-bold text-sm sm:text-lg mt-2">Technologies Used</p>
                    {/* <img src="img/node.png" alt="node" class="w-8 sm:w-10 inline-flex">
                    <img src="img/js.png" alt="js" class="w-6 sm:w-8 inline-flex"> 
                    <img src="img/mongodb.png" alt="mongoDB" class="w-12 sm:w-14 inline-flex">
                    <img src="img/tailwindcss.png" alt="tailwind css" class="w-6 sm:w-8 inline-flex">  */}
                    <a href="https://github.com/OdongMartin/TaskManager" class="text-sm sm:text-base text-green-700 block">Github Repository</a>
                    <a href="https://odongtaskmanager.cyclic.app" class="block text-sm sm:text-base text-green-700">Live Demo</a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Floor */}
          <div id="contacts" className={`floor ${currentFloor === 3 ? 'active' : ''} h-full text-white`} >
            <div class="ml-1 sm:ml-4 flex items-start sm:items-center">
                <a href="https://github.com/OdongMartin"></a>
            </div>
            
            <div class="flex flex-col m-4 ml-8 mt-8 sm:mt-16">
                <div>
                    <h class="text-xl sm:text-3xl font-bold">You can reach me at</h>
                    <p class="text-base sm:text-2xl">Email: <span class="text-base sm:text-2xl font-semibold">odongmartin21@gmail.com</span></p>
                    <p class="text-base sm:text-2xl">GitHub: <a href="https://github.com/OdongMartin" class="text-base sm:text-2xl font-semibold">OdongMartin</a></p>
                </div>
                
                <div class="mt-4">
                    <h class="text-xl sm:text-3xl font-bold">Location</h>
                    <p class="text-base sm:text-2xl">I'm currently located in Kampala, Uganda. Open to remote work and collaboration opportunities.</p>
                </div>

                <div class="mt-8">
                    <p class="text-base sm:text-2xl">Thank you for considering me for your project or collaboration. I look forward to hearing from you!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Home