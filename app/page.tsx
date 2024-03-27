'use client'

//import Link from "next/link"
import { Link } from 'react-scroll';
import {useRef, useEffect, useState} from 'react'
import Image from 'next/image';

// react slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  // scif-random words
  const handleHover = (e: any) => {  
    //console.log("yooo:", e.target.innerText)
    //e.target.innerText.split('').map((letter) => {console.log(letter)})
    //e.target.innerText = letters[Math.floor(Math.random() * 26)];

    let iterations = 0;
    const interval = setInterval(() =>{
      e.target.innerText = e.target.innerText.split('').map((letter: string, index: number) =>{
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
      wordRef.current.innerText = wordRef.current.innerText.split('').map((letter: string, index: number) =>{
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
      const handleMouseMove = (event: any) => {
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

  const scrollSpeed: number = 1000;
  const handleScrollToFloor = (floor: number) => {
    setCurrentFloor(floor);
  };
 
  // react slick settings
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    autoplaySpeed: 5000,
  }



  return (
    <>
      <div className='hidden md:block'>
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
            className=' hidden md:block bg-gradient-to-r from-emerald-500 to-violet-800 animate-[spin_3s_linear_infinite]'
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
              className=' text-white text-3xl tracking-widest m-4 h-5 flex justify-center'
              onMouseEnter={handleHover} 
              style={{
                cursor:'pointer',
                width: '100px',
                // zIndex: 3
              }}
              data-value='HOME'
            > HOME  </div>
            </Link>

            <Link to='about' smooth={true} duration={scrollSpeed} onClick={() => handleScrollToFloor(1)}>
              <div 
                  className=' text-white text-3xl tracking-widest m-4 mt-8 h-5 flex justify-center'
                  onMouseEnter={handleHover} 
                  style={{
                    cursor:'pointer',
                    width: '100px',
                    // zIndex: 3
                  }}
                  data-value='ABOUT'
                > ABOUT
              </div>
            </Link>
            
            <Link to='projects' smooth={true} duration={scrollSpeed} onClick={() => handleScrollToFloor(2)}>
              <div 
                  className=' text-white text-3xl tracking-widest m-4 h-5 flex justify-center'
                  onMouseEnter={handleHover} 
                  style={{
                    cursor:'pointer',
                    width: '180px',
                    // zIndex: 3
                  }}
                  data-value='PROJECTS'
                > PROJECTS
              </div>
            </Link>

              <Link to='contacts' smooth={true} duration={scrollSpeed} onClick={() => handleScrollToFloor(3)}>          
                <div 
                  className=' text-white text-3xl tracking-widest m-4 mt-8 h-5 flex justify-center'
                  onMouseEnter={handleHover} 
                  style={{
                    cursor:'pointer',
                    width: '180px',
                    // zIndex: 3
                  }}
                  data-value='CONTACTS'
                > CONTACTS  </div>
              </Link>

          </div>

            {/* Elevator */}
          <div className="h-screen w-screen" style={{zIndex: 2}}>
            {/* Home Floor */}
            <div id="home" className={`floor ${currentFloor === 0 ? 'active' : ''} h-full  text-white `} >
              <div className='flex'>
                <Image alt='' 
                  className='h-[100vh] w-[30vw] mb-0' 
                  width={500} 
                  height={1000} 
                  src='/images/my-photo.png'></Image>
                  
                <div className='mt-[30vh] tracking-widest'>
                  <h1 ref={wordRef} data-value='WELCOME TO MY WEBSITE' className='text-6xl '>WELCOME TO MY WEBSITE</h1>
                  <p className='mt-8  text-2xl text-wrap'>This is the homepage of my website. Feel free to explore!</p>
                </div>
              </div>
            </div>
            {/* About Floor */}
            <div id="about" className={`floor ${currentFloor === 1 ? 'active' : ''} h-full text-white `} >
              <div className="flex items-center justify-center mt-40">
                <div className="m-4 w-[80vw] text-wrap mt-36 p-4 text-lg">
                  <Slider {...settings}>
                    <div className="p-4">
                        <h1 className="text-xl sm:text-3xl font-bold">About Me</h1>
                        <p>Hello there! 👋 I'm Odong Martin, a passionate full stack web developer with a knack for crafting digital experiences that leave a lasting impact. Here's a bit about my journey in the world of web development.</p>
                    </div>
                    
                    <div className="p-4">
                        <h1 className="text-xl sm:text-3xl font-bold">Background</h1>
                        <p>I'm a self-taught web developer who has navigated the ever-evolving landscape of the web through hands-on experience and continuous learning. My journey began with taking the CS50x course from Havard, and since then, I've been on a self-driven quest to expand my skills and expertise.</p>
                    </div>

                    <div className="p-4">
                        <h1 className="text-xl sm:text-3xl font-bold ">Skills</h1>
                        <p>I specialise in:</p>
                            <p>- Backend technologies such as Node.js and Express</p>
                            <p>- NextJS, React</p>
                            <p>- Database management with MongoDB</p>
                            <p>- Authentication</p>
                            <p>- Tailwind CSS</p>
                            <p>- HTML, CSS, Javascript, TypeScript</p>
                            <p>- Responsive and mobile-first design principles</p>
                    </div>

                    <div className="p-4">
                      <h1 className="text-xl sm:text-3xl font-bold">Projects</h1>
                      <ul>
                        <li className="text-lg mt-2">- Github Profile Viewer</li>
                        {/* <p>A web application that allows users to view GitHub profiles, repositories, and other information. It provides features such as user authentication, documentation, and more.</p> */}
                    
                        <li className="text-lg mt-2">- Task Manager</li>
                        {/* <p>A web application that allows users to create, manage, edit, delete and organize their tasks.</p> */}
                
                        <li className="text-lg mt-2">- Malaria Metrics</li>
                        {/* <p>A web application for realtime reporting and visualisation of malaria cases data.</p> */}

                        <li className="text-lg mt-2">- E-commerce application</li>
                        {/* <p>A web application that allows users to create and manage their online stores.</p> */}

                        <li className="text-lg mt-2">- AI prompts</li>
                        {/* <p>A web application that allows users to create and share AI prompts.</p> */}
                      </ul>
                    </div>

                    <div className="p-4">
                        <h1 className="text-xl sm:text-3xl font-bold ">Personal Touch</h1>
                        <p>When I'm not coding, you can find me playing Rugby🏉 or being a Laboratory Technologist😁. I believe in maintaining a healthy work-life balance to keep the creative juices flowing.</p>
                    </div>

                    <div className="p-4">
                        <h1 className="text-xl sm:text-3xl font-bold ">Let's Connect!</h1>
                        <p className=''>I'm always open to new challenges and collaborations. If you have a project in mind or just want to chat about web development, feel free to </p>
                        <Link to='contacts' smooth={true} duration={scrollSpeed} onClick={() => handleScrollToFloor(3)}>          
                          <div 
                            className='text-green-700 font-bold text-lg'
                            //onMouseEnter={handleHover} 
                            style={{
                              cursor:'pointer',
                              // zIndex: 3
                            }}
                            //data-value='CONTACTS'
                          > contact me  </div>
                        </Link>
                            Looking forward to creating amazing digital experiences together!

                    </div>
                  </Slider>
                </div>
              </div>
            </div>

            {/* Projects Floor */}
            <div id="projects" className={`floor ${currentFloor === 2 ? 'active' : ''} h-full text-white`} >
              <div className='flex justify-center'>
                <div className="m-4 w-[80vw] text-wrap mt-20 p-4 text-lg">
                  <Slider {...settings}>

                    <div className="">
                      <h1 className="font-bold text-2xl mb-4">Personal Website</h1>
                      <p className="">I developed my personal portfolio website to showcase my skills, projects, and experiences as a web developer. The website serves as a central hub for potential clients and collaborators to learn more about my work.</p>
                      <p className="font-bold mt-4">Technologies Used</p>
                      <div className='flex'>                        
                          <Image alt='' 
                          className='rounded-full my-8 mr-4 bg-white' 
                          width={50} 
                          height={50} 
                          src='/images/nextjs-icon.png'></Image>  
                          <Image alt='' 
                          className='rounded-lg my-6' 
                          width={50} 
                          height={50} 
                          src='/images/typescript-logo.png'></Image>                
                          <Image alt='' 
                          className='rounded-lg my-10 ml-4' 
                          width={50} 
                          height={50} 
                          src='/images/tailwind-icon.png'></Image>
                          {/* <Image alt='' 
                          className='rounded-lg' 
                          width={100} 
                          height={100} 
                          src='/images/mongoDB-icon.png'></Image> */}
                        </div>        
                      <a href="https://github.com/OdongMartin/OdongMartin.github.io" className="text-sm sm:text-base font-bold transition-colors ease-out duration-500 hover:text-green-300 text-green-700 block w-36">Github Repository</a>
                    </div>

                    <div className="">
                      <h1 className="font-bold text-2xl">Github Profile Viewer</h1>
                      <div className='flex mt-4'>
                        <Image alt='' 
                        className='rounded-lg' 
                        width={600} 
                        height={500} 
                        src='/images/github-api.png'></Image>
                        <div className='ml-4'>
                          <p className="">I developed the Github Profile Viewer to allow users to easily search for and view GitHub profiles, repositories, and other information.</p>
                          <p className="font-bold mt-4">Technologies Used</p>
                          <div className='flex'>                        
                            <Image alt='' 
                            className='rounded-lg m-4 p-2' 
                            width={50} 
                            height={50} 
                            src='/images/nodejs.png'></Image>  
                            <Image alt='' 
                            className='rounded-lg my-6' 
                            width={50} 
                            height={50} 
                            src='/images/javascript-logo.png'></Image>                
                            <Image alt='' 
                            className='rounded-lg m-6 p-2' 
                            width={50} 
                            height={50} 
                            src='/images/tailwind-icon.png'></Image>
                            <Image alt='' 
                            className='rounded-lg' 
                            width={100} 
                            height={100} 
                            src='/images/mongoDB-icon.png'></Image>
                          </div>
                                              
                          <a href="https://github.com/OdongMartin/GitHub-Profile-Viewer" className="text-sm sm:text-base font-bold transition-colors ease-out duration-500 hover:text-green-300 text-green-700 block w-36">Github Repository</a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="">
                      <h1 className="font-bold text-2xl  ">Malaria Metrics</h1>
                      <div className='flex mt-4'>
                        <Image alt='' 
                        className='rounded-lg' 
                        width={600} 
                        height={500} 
                        src='/images/MalariaMetrics.png'></Image>
                        <div className='ml-4'>
                          <p className="">A web application for realtime reporting and visualisation of malaria cases data.</p>
                          <p className="font-bold mt-4">Technologies Used</p>
                          <div className='flex'>                        
                            <Image alt='' 
                            className='rounded-full my-8 mr-4 bg-white' 
                            width={50} 
                            height={50} 
                            src='/images/nextjs-icon.png'></Image>  
                            <Image alt='' 
                            className='rounded-lg my-6' 
                            width={50} 
                            height={50} 
                            src='/images/javascript-logo.png'></Image>                
                            <Image alt='' 
                            className='rounded-lg m-6 py-4' 
                            width={50} 
                            height={50} 
                            src='/images/tailwind-icon.png'></Image>
                            <Image alt='' 
                            className='rounded-lg' 
                            width={100} 
                            height={100} 
                            src='/images/mongoDB-icon.png'></Image>
                          </div>
                          <a href="https://github.com/OdongMartin/GitHub-Profile-Viewer" className="text-sm sm:text-base mt-4 font-bold transition-colors ease-out duration-500 hover:text-green-300 text-green-700 block w-36">Github Repository</a>
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <h1 className="font-bold text-2xl ">E-commerce application</h1>
                      <div className='flex mt-4'>
                        <Image alt='' 
                        className='rounded-lg' 
                        width={600} 
                        height={500} 
                        src='/images/store.png'></Image>
                        <div className='ml-4'>
                          <p className="">A web application that allows users to create and manage their online stores.</p>
                          <p className="font-bold mt-4">Technologies Used</p>
                          <div className='flex'>                        
                            <Image alt='' 
                            className='rounded-lg m-4 p-2' 
                            width={50} 
                            height={50} 
                            src='/images/nodejs.png'></Image>  
                            <Image alt='' 
                            className='rounded-lg my-6' 
                            width={50} 
                            height={50} 
                            src='/images/javascript-logo.png'></Image>                
                            <Image alt='' 
                            className='rounded-lg m-6 p-2' 
                            width={50} 
                            height={50} 
                            src='/images/tailwind-icon.png'></Image>
                            <Image alt='' 
                            className='rounded-lg' 
                            width={100} 
                            height={100} 
                            src='/images/mongoDB-icon.png'></Image>
                          </div>
                          
                          <a href="https://github.com/OdongMartin/GitHub-Profile-Viewer" className="text-sm sm:text-base mt-4 font-bold transition-colors ease-out duration-500 hover:text-green-300 text-green-700 block w-36">Github Repository</a>
                        </div>
                      </div>
                    </div>

                    <div className="">
                      {/* <a href="https://github.com/OdongMartin/GitHub-Profile-Viewer"><img src="img/profile-viewer.png" alt=" GitHub-Profile-Viewer" className="rounded-xl w-full h-20 sm:h-32 object-cover"></a> */}
                      <h1 className="font-bold text-2xl ">AI prompts</h1>
                      <div className='flex mt-4'>
                        <Image alt='' 
                        className='rounded-lg' 
                        width={600} 
                        height={500} 
                        src='/images/AI-prompts.png'></Image>
                        <div className='ml-4'>
                        <p className="text-sm sm:text-base">A web application that allows users to create and share AI prompts.</p>
                        <p className="font-bold mt-4">Technologies Used</p>
                        <div className='flex'>                        
                          <Image alt='' 
                          className='rounded-full my-8 mr-4 bg-white' 
                          width={50} 
                          height={50} 
                          src='/images/nextjs-icon.png'></Image>  
                          <Image alt='' 
                          className='rounded-lg my-6' 
                          width={50} 
                          height={50} 
                          src='/images/javascript-logo.png'></Image>                
                          <Image alt='' 
                          className='rounded-lg m-6 p-2' 
                          width={50} 
                          height={50} 
                          src='/images/tailwind-icon.png'></Image>
                          <Image alt='' 
                          className='rounded-lg' 
                          width={100} 
                          height={100} 
                          src='/images/mongoDB-icon.png'></Image>
                        </div>
                      <a href="https://github.com/OdongMartin/GitHub-Profile-Viewer" className="text-sm sm:text-base mt-4 font-bold transition-colors ease-out duration-500 hover:text-green-300 text-green-700 block w-36">Github Repository</a>
                    </div>
                  </div>
                </div>
                        
                  <div className="">            
                    <h1 className="font-bold text-2xl">Task Manager</h1>
                      <div className='flex mt-4'>
                        <Image alt='' 
                        className='rounded-lg' 
                        width={600} 
                        height={500} 
                        src='/images/create-task.png'></Image>
                        <div className='ml-4'>
                          <p className="">I developed the Task Manager to provide users with a simple and intuitive way to keep track of tasks, set due dates, and monitor task status.</p>
                          <p className="font-bold mt-4">Technologies Used</p>
                          <div className='flex'>                        
                            <Image alt='' 
                            className='rounded-lg m-4 p-2' 
                            width={50} 
                            height={50} 
                            src='/images/nodejs.png'></Image>  
                            <Image alt='' 
                            className='rounded-lg my-6' 
                            width={50} 
                            height={50} 
                            src='/images/javascript-logo.png'></Image>                
                            <Image alt='' 
                            className='rounded-lg m-6 p-2' 
                            width={50} 
                            height={50} 
                            src='/images/tailwind-icon.png'></Image>
                            <Image alt='' 
                            className='rounded-lg' 
                            width={100} 
                            height={100} 
                            src='/images/mongoDB-icon.png'></Image>

                          </div>
                          <a href="https://github.com/OdongMartin/TaskManager" className="text-sm sm:text-base transition-colors ease-out duration-500 hover:text-green-300 text-green-700 block font-bold w-36">Github Repository</a>
                          <a href="https://odongtaskmanager.cyclic.app" className="block text-sm sm:text-base transition-colors ease-out duration-500 hover:text-green-300 text-green-700 font-bold w-24">Live Demo</a>
                        </div>
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>

            {/* Contact Floor */}
            <div id="contacts" className={`floor ${currentFloor === 3 ? 'active' : ''} h-full text-white`} >            
              <div className="flex items-center w-[80vw] justify-center text-lg">
                <div className='mt-32 mx-24'>
                  <div>
                    <h1 className="font-bold mb-4">You can reach me at</h1>
                    <p className="">Email: <span className="font-semibold">odongmartin21@gmail.com</span></p>
                    <p className="">GitHub: <a href="https://github.com/OdongMartin" className=" font-semibold text-green-700">OdongMartin</a></p>
                  </div>
                  
                  <div className="mt-4">
                    <h1 className="font-bold">Location</h1>
                    <p className="">I'm currently located in Kampala, Uganda. Open to remote work and collaboration opportunities.</p>
                  </div>

                  <div className="mt-8">
                    <p className="">Thank you for considering me for your project or collaboration. I look forward to hearing from you!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile version */}
      <div className='md:hidden'>
        {/* <style>{`
              body {
                overflow: hidden;
              }
            `}
          </style> */}
        <div className='flex justify-center'>
          {/* left wall */}
          <div className=' bg-gray-700 border-2 border-black h-[93vh] w-[20vw]' style={{zIndex: 3, position:'fixed', right:0}}></div>

          {/* middle */}
          <div className='h-[90vh] w-[60vw]'>
            <div className=' bg-gray-700 border-2 border-red-600 h-[10vh] w-[60vw]' style={{zIndex: 3, position:'fixed'}} >
                          <h1 className='text-yellow-300'>Still Working on Mobile version - Elevator lift</h1>
            </div>
            <div className=' bg-gray-700 border-2 border-blue-600 h-[90vh] w-[60vw]'>
                {/* content  */}
                {/* Home Floor */}
              <div className="h-screen w-screen" style={{zIndex: 2}}>
                <div id="mhome" className={`floor ${currentFloor === 0 ? 'active' : ''} h-full  text-white `} >
                  <div className='flex'>
                    {/* <Image alt='' 
                      className='h-[100vh] w-[30vw] mb-0' 
                      width={500} 
                      height={1000} 
                      src='/images/my-photo.png'></Image> */}
                      
                    <div className='mt-[30vh] tracking-widest'>
                      <h1 ref={wordRef} data-value='WELCOME TO MY WEBSITE' className='text-6xl '>WELCOME TO MY WEBSITE</h1>
                      <p className='mt-8  text-2xl text-wrap'>This is the homepage of my website. Feel free to explore!</p>
                    </div>
                  </div>
                </div>
                {/* About Floor */}
                <div id="mabout" className={`floor ${currentFloor === 1 ? 'active' : ''} h-full text-white `} >
                  <div className="flex items-center justify-center mt-40">
                    <div className="m-4 w-[80vw] text-wrap mt-36 p-4 text-lg">
                      <Slider {...settings}>
                        <div className="p-4">
                            <h1 className="text-xl sm:text-3xl font-bold">About Me</h1>
                            <p>Hello there! 👋 I'm Odong Martin, a passionate full stack web developer with a knack for crafting digital experiences that leave a lasting impact. Here's a bit about my journey in the world of web development.</p>
                        </div>
                        
                        <div className="p-4">
                            <h1 className="text-xl sm:text-3xl font-bold">Background</h1>
                            <p>I'm a self-taught web developer who has navigated the ever-evolving landscape of the web through hands-on experience and continuous learning. My journey began with taking the CS50x course from Havard, and since then, I've been on a self-driven quest to expand my skills and expertise.</p>
                        </div>

                        <div className="p-4">
                            <h1 className="text-xl sm:text-3xl font-bold ">Skills</h1>
                            <p>I specialise in:</p>
                                <p>- Backend technologies such as Node.js and Express</p>
                                <p>- NextJS, React</p>
                                <p>- Database management with MongoDB</p>
                                <p>- Authentication</p>
                                <p>- Tailwind CSS</p>
                                <p>- HTML, CSS, Javascript, TypeScript</p>
                                <p>- Responsive and mobile-first design principles</p>
                        </div>

                        <div className="p-4">
                          <h1 className="text-xl sm:text-3xl font-bold">Projects</h1>
                          <ul>
                            <li className="text-lg mt-2">- Github Profile Viewer</li>
                            {/* <p>A web application that allows users to view GitHub profiles, repositories, and other information. It provides features such as user authentication, documentation, and more.</p> */}
                        
                            <li className="text-lg mt-2">- Task Manager</li>
                            {/* <p>A web application that allows users to create, manage, edit, delete and organize their tasks.</p> */}
                    
                            <li className="text-lg mt-2">- Malaria Metrics</li>
                            {/* <p>A web application for realtime reporting and visualisation of malaria cases data.</p> */}

                            <li className="text-lg mt-2">- E-commerce application</li>
                            {/* <p>A web application that allows users to create and manage their online stores.</p> */}

                            <li className="text-lg mt-2">- AI prompts</li>
                            {/* <p>A web application that allows users to create and share AI prompts.</p> */}
                          </ul>
                        </div>

                        <div className="p-4">
                            <h1 className="text-xl sm:text-3xl font-bold ">Personal Touch</h1>
                            <p>When I'm not coding, you can find me playing Rugby🏉 or being a Laboratory Technologist😁. I believe in maintaining a healthy work-life balance to keep the creative juices flowing.</p>
                        </div>

                        <div className="p-4">
                            <h1 className="text-xl sm:text-3xl font-bold ">Let's Connect!</h1>
                            <p className=''>I'm always open to new challenges and collaborations. If you have a project in mind or just want to chat about web development, feel free to </p>
                            <Link to='contacts' smooth={true} duration={scrollSpeed} onClick={() => handleScrollToFloor(3)}>          
                              <div 
                                className='text-green-700 font-bold text-lg'
                                //onMouseEnter={handleHover} 
                                style={{
                                  cursor:'pointer',
                                  // zIndex: 3
                                }}
                                //data-value='CONTACTS'
                              > contact me  </div>
                            </Link>
                                Looking forward to creating amazing digital experiences together!

                        </div>
                      </Slider>
                    </div>
                  </div>
                </div>

                {/* Projects Floor */}
                <div id="mprojects" className={`floor ${currentFloor === 2 ? 'active' : ''} h-full text-white`} >
                  <div className='flex justify-center'>
                    <div className="m-4 w-[80vw] text-wrap mt-20 p-4 text-lg">
                      <Slider {...settings}>

                        <div className="">
                          <h1 className="font-bold text-2xl mb-4">Personal Website</h1>
                          <p className="">I developed my personal portfolio website to showcase my skills, projects, and experiences as a web developer. The website serves as a central hub for potential clients and collaborators to learn more about my work.</p>
                          <p className="font-bold mt-4">Technologies Used</p>
                          <div className='flex'>                        
                              <Image alt='' 
                              className='rounded-full my-8 mr-4 bg-white' 
                              width={50} 
                              height={50} 
                              src='/images/nextjs-icon.png'></Image>  
                              <Image alt='' 
                              className='rounded-lg my-6' 
                              width={50} 
                              height={50} 
                              src='/images/typescript-logo.png'></Image>                
                              <Image alt='' 
                              className='rounded-lg my-10 ml-4' 
                              width={50} 
                              height={50} 
                              src='/images/tailwind-icon.png'></Image>
                              {/* <Image alt='' 
                              className='rounded-lg' 
                              width={100} 
                              height={100} 
                              src='/images/mongoDB-icon.png'></Image> */}
                            </div>        
                          <a href="https://github.com/OdongMartin/OdongMartin.github.io" className="text-sm sm:text-base font-bold transition-colors ease-out duration-500 hover:text-green-300 text-green-700 block w-36">Github Repository</a>
                        </div>

                        <div className="">
                          <h1 className="font-bold text-2xl">Github Profile Viewer</h1>
                          <div className='flex mt-4'>
                            <Image alt='' 
                            className='rounded-lg' 
                            width={600} 
                            height={500} 
                            src='/images/github-api.png'></Image>
                            <div className='ml-4'>
                              <p className="">I developed the Github Profile Viewer to allow users to easily search for and view GitHub profiles, repositories, and other information.</p>
                              <p className="font-bold mt-4">Technologies Used</p>
                              <div className='flex'>                        
                                <Image alt='' 
                                className='rounded-lg m-4 p-2' 
                                width={50} 
                                height={50} 
                                src='/images/nodejs.png'></Image>  
                                <Image alt='' 
                                className='rounded-lg my-6' 
                                width={50} 
                                height={50} 
                                src='/images/javascript-logo.png'></Image>                
                                <Image alt='' 
                                className='rounded-lg m-6 p-2' 
                                width={50} 
                                height={50} 
                                src='/images/tailwind-icon.png'></Image>
                                <Image alt='' 
                                className='rounded-lg' 
                                width={100} 
                                height={100} 
                                src='/images/mongoDB-icon.png'></Image>
                              </div>
                                                  
                              <a href="https://github.com/OdongMartin/GitHub-Profile-Viewer" className="text-sm sm:text-base font-bold transition-colors ease-out duration-500 hover:text-green-300 text-green-700 block w-36">Github Repository</a>
                            </div>
                          </div>
                        </div>
                        
                        <div className="">
                          <h1 className="font-bold text-2xl  ">Malaria Metrics</h1>
                          <div className='flex mt-4'>
                            <Image alt='' 
                            className='rounded-lg' 
                            width={600} 
                            height={500} 
                            src='/images/MalariaMetrics.png'></Image>
                            <div className='ml-4'>
                              <p className="">A web application for realtime reporting and visualisation of malaria cases data.</p>
                              <p className="font-bold mt-4">Technologies Used</p>
                              <div className='flex'>                        
                                <Image alt='' 
                                className='rounded-full my-8 mr-4 bg-white' 
                                width={50} 
                                height={50} 
                                src='/images/nextjs-icon.png'></Image>  
                                <Image alt='' 
                                className='rounded-lg my-6' 
                                width={50} 
                                height={50} 
                                src='/images/javascript-logo.png'></Image>                
                                <Image alt='' 
                                className='rounded-lg m-6 py-4' 
                                width={50} 
                                height={50} 
                                src='/images/tailwind-icon.png'></Image>
                                <Image alt='' 
                                className='rounded-lg' 
                                width={100} 
                                height={100} 
                                src='/images/mongoDB-icon.png'></Image>
                              </div>
                              <a href="https://github.com/OdongMartin/GitHub-Profile-Viewer" className="text-sm sm:text-base mt-4 font-bold transition-colors ease-out duration-500 hover:text-green-300 text-green-700 block w-36">Github Repository</a>
                            </div>
                          </div>
                        </div>

                        <div className="">
                          <h1 className="font-bold text-2xl ">E-commerce application</h1>
                          <div className='flex mt-4'>
                            <Image alt='' 
                            className='rounded-lg' 
                            width={600} 
                            height={500} 
                            src='/images/store.png'></Image>
                            <div className='ml-4'>
                              <p className="">A web application that allows users to create and manage their online stores.</p>
                              <p className="font-bold mt-4">Technologies Used</p>
                              <div className='flex'>                        
                                <Image alt='' 
                                className='rounded-lg m-4 p-2' 
                                width={50} 
                                height={50} 
                                src='/images/nodejs.png'></Image>  
                                <Image alt='' 
                                className='rounded-lg my-6' 
                                width={50} 
                                height={50} 
                                src='/images/javascript-logo.png'></Image>                
                                <Image alt='' 
                                className='rounded-lg m-6 p-2' 
                                width={50} 
                                height={50} 
                                src='/images/tailwind-icon.png'></Image>
                                <Image alt='' 
                                className='rounded-lg' 
                                width={100} 
                                height={100} 
                                src='/images/mongoDB-icon.png'></Image>
                              </div>
                              
                              <a href="https://github.com/OdongMartin/GitHub-Profile-Viewer" className="text-sm sm:text-base mt-4 font-bold transition-colors ease-out duration-500 hover:text-green-300 text-green-700 block w-36">Github Repository</a>
                            </div>
                          </div>
                        </div>

                        <div className="">
                          {/* <a href="https://github.com/OdongMartin/GitHub-Profile-Viewer"><img src="img/profile-viewer.png" alt=" GitHub-Profile-Viewer" className="rounded-xl w-full h-20 sm:h-32 object-cover"></a> */}
                          <h1 className="font-bold text-2xl ">AI prompts</h1>
                          <div className='flex mt-4'>
                            <Image alt='' 
                            className='rounded-lg' 
                            width={600} 
                            height={500} 
                            src='/images/AI-prompts.png'></Image>
                            <div className='ml-4'>
                            <p className="text-sm sm:text-base">A web application that allows users to create and share AI prompts.</p>
                            <p className="font-bold mt-4">Technologies Used</p>
                            <div className='flex'>                        
                              <Image alt='' 
                              className='rounded-full my-8 mr-4 bg-white' 
                              width={50} 
                              height={50} 
                              src='/images/nextjs-icon.png'></Image>  
                              <Image alt='' 
                              className='rounded-lg my-6' 
                              width={50} 
                              height={50} 
                              src='/images/javascript-logo.png'></Image>                
                              <Image alt='' 
                              className='rounded-lg m-6 p-2' 
                              width={50} 
                              height={50} 
                              src='/images/tailwind-icon.png'></Image>
                              <Image alt='' 
                              className='rounded-lg' 
                              width={100} 
                              height={100} 
                              src='/images/mongoDB-icon.png'></Image>
                            </div>
                          <a href="https://github.com/OdongMartin/GitHub-Profile-Viewer" className="text-sm sm:text-base mt-4 font-bold transition-colors ease-out duration-500 hover:text-green-300 text-green-700 block w-36">Github Repository</a>
                        </div>
                      </div>
                    </div>
                            
                      <div className="">            
                        <h1 className="font-bold text-2xl">Task Manager</h1>
                          <div className='flex mt-4'>
                            <Image alt='' 
                            className='rounded-lg' 
                            width={600} 
                            height={500} 
                            src='/images/create-task.png'></Image>
                            <div className='ml-4'>
                              <p className="">I developed the Task Manager to provide users with a simple and intuitive way to keep track of tasks, set due dates, and monitor task status.</p>
                              <p className="font-bold mt-4">Technologies Used</p>
                              <div className='flex'>                        
                                <Image alt='' 
                                className='rounded-lg m-4 p-2' 
                                width={50} 
                                height={50} 
                                src='/images/nodejs.png'></Image>  
                                <Image alt='' 
                                className='rounded-lg my-6' 
                                width={50} 
                                height={50} 
                                src='/images/javascript-logo.png'></Image>                
                                <Image alt='' 
                                className='rounded-lg m-6 p-2' 
                                width={50} 
                                height={50} 
                                src='/images/tailwind-icon.png'></Image>
                                <Image alt='' 
                                className='rounded-lg' 
                                width={100} 
                                height={100} 
                                src='/images/mongoDB-icon.png'></Image>

                              </div>
                              <a href="https://github.com/OdongMartin/TaskManager" className="text-sm sm:text-base transition-colors ease-out duration-500 hover:text-green-300 text-green-700 block font-bold w-36">Github Repository</a>
                              <a href="https://odongtaskmanager.cyclic.app" className="block text-sm sm:text-base transition-colors ease-out duration-500 hover:text-green-300 text-green-700 font-bold w-24">Live Demo</a>
                            </div>
                          </div>
                        </div>
                      </Slider>
                    </div>
                  </div>
                </div>

                {/* Contact Floor */}
                <div id="mcontacts" className={`floor ${currentFloor === 3 ? 'active' : ''} h-full text-white`} >            
                  <div className="flex items-center w-[80vw] justify-center text-lg">
                    <div className='mt-32 mx-24'>
                      <div>
                        <h1 className="font-bold mb-4">You can reach me at</h1>
                        <p className="">Email: <span className="font-semibold">odongmartin21@gmail.com</span></p>
                        <p className="">GitHub: <a href="https://github.com/OdongMartin" className=" font-semibold text-green-700">OdongMartin</a></p>
                      </div>
                      
                      <div className="mt-4">
                        <h1 className="font-bold">Location</h1>
                        <p className="">I'm currently located in Kampala, Uganda. Open to remote work and collaboration opportunities.</p>
                      </div>

                      <div className="mt-8">
                        <p className="">Thank you for considering me for your project or collaboration. I look forward to hearing from you!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            
          </div>

          {/* right wall */}
          <div className='' style={{position:'fixed' , left:0}}>    
            <div className=' bg-gray-700 border-2 border-green-600 h-[93vh] w-[20vw] ' style={{position:'fixed'}}>
              <div  className='grid' style={{zIndex: 3, position:'fixed'}}>          
                {/* Nav buttons */}
                <Link to='mhome' smooth={true} duration={scrollSpeed} onClick={() => handleScrollToFloor(0)}>     
                <div 
                  className=' text-white'
                  onMouseEnter={handleHover} 
                  style={{
                    cursor:'pointer',
                    width: '100px',
                    // zIndex: 3
                  }}
                  data-value='HOME'
                > HOME  </div>
                </Link>

                <Link to='mabout' smooth={true} duration={scrollSpeed} onClick={() => handleScrollToFloor(1)}>
                  <div 
                      className=' text-white'
                      onMouseEnter={handleHover} 
                      style={{
                        cursor:'pointer',
                        width: '100px',
                        // zIndex: 3
                      }}
                      data-value='ABOUT'
                    > ABOUT
                  </div>
                </Link>
                
                <Link to='mprojects' smooth={true} duration={scrollSpeed} onClick={() => handleScrollToFloor(2)}>
                  <div 
                      className=' text-white '
                      onMouseEnter={handleHover} 
                      style={{
                        cursor:'pointer',
                        width: '100px',
                        // zIndex: 3
                      }}
                      data-value='PROJECTS'
                    > PROJECTS
                  </div>
                </Link>

                  <Link to='mcontacts' smooth={true} duration={scrollSpeed} onClick={() => handleScrollToFloor(3)}>          
                    <div 
                      className=' text-white'
                      onMouseEnter={handleHover} 
                      style={{
                        cursor:'pointer',
                        width: '100px',
                        // zIndex: 3
                      }}
                      data-value='CONTACTS'
                    > CONTACTS  </div>
                  </Link>
  
              </div>
            </div>
          </div>

          <div className=' bg-gray-700 border-2 border-red-600 h-[7vh] w-[100vw]' style={{zIndex: 3, position:'fixed', bottom:0}} >
                          {/* bottom of elevator sjpould have floor */}
          </div>
        </div>
        
      </div>
    </>
  )
}

export default Home