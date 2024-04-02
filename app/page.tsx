'use client'

import FeedbackForm from '@/components/feedbackForm';

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
  

  const floorNames = ['HOME', 'ABOUT', 'PROJECTS', 'CONTACTS']
  const scrollAndDoorSpeed: number = 1000;
  //react-scroll
  const [currentFloor, setCurrentFloor] = useState(0);
  const scrollSpeed: number = scrollAndDoorSpeed;

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

  // open and close doors
  const [doorOpen, setDoorOpen] = useState(false);

  // open the door at the beginning
  useEffect(() => {
    setDoorOpen(true); // open the door at start

  }, []);

  // change door state when currentFloor changes
  useEffect(() => {
    setDoorOpen(false); // close the door when changing floors

    setTimeout(() => {
      setDoorOpen(true); //open door when floor reached
    }, scrollAndDoorSpeed);
  }, [currentFloor]);
  
  // when you click the ping to view whats outside
  const [outSideElevator, setOutSideElevator] = useState<boolean>(false);

  const handleOutside = () => {

    setOutSideElevator(!outSideElevator)
  };
  
  // console.log("outu",outSideElevator)

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
            className=' hidden lg:block bg-gradient-to-r from-emerald-500 to-violet-800 animate-[spin_3s_linear_infinite]'
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
              className=' text-white text-2xl lg:text-3xl tracking-widest m-2 lg:m-4 h-5 flex justify-center'
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
                  className=' text-white text-2xl lg:text-3xl tracking-widest m-2 lg:m-4 mt-4 lg:mt-8 h-5 flex justify-center'
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
                  className=' text-white text-2xl lg:text-3xl tracking-widest m-2 lg:m-4 h-5 flex justify-center'
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
                  className=' text-white text-2xl lg:text-3xl tracking-widest m-2 lg:m-4 mt-4 lg:mt-8 h-5 flex justify-center'
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

            {/* content */}
          <div className="" style={{zIndex: 2}}>
            {/* Home Floor */}
            <div id="home" className={`h-screen w-screen text-white flex justify-center items-center`} >
              <div className='flex'>
                <Image alt='' 
                  className='max-h-[100vh] w-auto mb-0' 
                  width={1000} 
                  height={1000} 
                  src='/images/my-photo.png'></Image>
                  
                <div className='tracking-widest flex justify-center items-center'>
                  <div>
                    <h1 ref={wordRef} data-value='WELCOME TO MY WEBSITE' className=' text-4xl lg:text-6xl '>WELCOME TO MY WEBSITE</h1>
                    <p className='mt-8  text-xl lg:text-2xl text-wrap'>This is the homepage of my website. Feel free to explore!</p>
                  </div>
                </div>
              </div>
            </div>
            {/* About Floor */}
            <div id="about" className={`h-screen w-screen text-white flex justify-center items-center`} >
              <div className="">
                <div className="m-4 mt-8 w-[80vw] max-h-screen  text-wrap p-8 text-lg">
                  <Slider {...settings}>
                    <div className="p-4">
                        <h1 className="text-xl lg:text-3xl font-bold">About Me</h1>
                        <p className="text-sm lg:text-base">Hello there! 👋 I'm Odong Martin, a passionate full stack web developer with a knack for crafting digital experiences that leave a lasting impact. Here's a bit about my journey in the world of web development.</p>
                    </div>
                    
                    <div className="p-4">
                        <h1 className="text-xl lg:text-3xl font-bold">Background</h1>
                        <p className="text-sm lg:text-base">I'm a self-taught web developer who has navigated the ever-evolving landscape of the web through hands-on experience and continuous learning. My journey began with taking the CS50x course from Havard, and since then, I've been on a self-driven quest to expand my skills and expertise.</p>
                    </div>

                    <div className="p-4">
                        <h1 className="text-xl lg:text-3xl font-bold ">Skills</h1>
                        <p className="text-sm lg:text-base">I specialise in:</p>
                            <p className="text-sm lg:text-base">- Backend technologies such as Node.js and Express</p>
                            <p className="text-sm lg:text-base">- NextJS, React</p>
                            <p className="text-sm lg:text-base">- Database management with MongoDB</p>
                            <p className="text-sm lg:text-base">- Authentication</p>
                            <p className="text-sm lg:text-base">- Tailwind CSS</p>
                            <p className="text-sm lg:text-base">- HTML, CSS, Javascript, TypeScript</p>
                            <p className="text-sm lg:text-base">- Responsive and mobile-first design principles</p>
                    </div>

                    <div className="p-4">
                      <h1 className="text-xl lg:text-3xl font-bold">Projects</h1>
                      <ul>
                        <li className="text-base lg:text-lg mt-2">- Github Profile Viewer</li>
                        {/* <p>A web application that allows users to view GitHub profiles, repositories, and other information. It provides features such as user authentication, documentation, and more.</p> */}
                    
                        <li className="text-base lg:text-lg mt-2">- Task Manager</li>
                        {/* <p>A web application that allows users to create, manage, edit, delete and organize their tasks.</p> */}
                
                        <li className="text-base lg:text-lg mt-2">- Malaria Metrics</li>
                        {/* <p>A web application for realtime reporting and visualisation of malaria cases data.</p> */}

                        <li className="text-base lg:text-lg mt-2">- E-commerce application</li>
                        {/* <p>A web application that allows users to create and manage their online stores.</p> */}

                        <li className="text-base lg:text-lg mt-2">- AI prompts</li>
                        {/* <p>A web application that allows users to create and share AI prompts.</p> */}
                      </ul>
                    </div>

                    <div className="p-4">
                        <h1 className="text-xl lg:text-3xl font-bold ">Personal Touch</h1>
                        <p className='text-sm lg:text-base'>When I'm not coding, you can find me playing Rugby🏉 or being a Laboratory Technologist😁. I believe in maintaining a healthy work-life balance to keep the creative juices flowing.</p>
                    </div>

                    <div className="p-4">
                        <h1 className="text-xl lg:text-3xl font-bold ">Let's Connect!</h1>
                        <p className='text-sm lg:text-base'>I'm always open to new challenges and collaborations. If you have a project in mind or just want to chat about web development, feel free to </p>
                        <Link to='contacts' smooth={true} duration={scrollSpeed} onClick={() => handleScrollToFloor(3)}>          
                          <div 
                            className='text-green-700 font-bold text-sm lg:text-base'
                            //onMouseEnter={handleHover} 
                            style={{
                              cursor:'pointer',
                              // zIndex: 3
                            }}
                            //data-value='CONTACTS'
                          > contact me  </div>
                        </Link>
                            <span className='text-sm lg:text-base'>Looking forward to creating amazing digital experiences together!</span>

                    </div>
                  </Slider>
                </div>
              </div>
            </div>

            {/* Projects Floor */}
            <div id="projects" className={`h-screen w-screen text-white flex justify-center items-center`} >
              <div className=''>
                <div className="m-4 w-[80vw] max-h-screen text-wrap p-4 text-lg">
                  <Slider {...settings}>

                    <div className="">
                      <h1 className="font-bold text-xl lg:text-2xl mb-4">Personal Website</h1>
                      <p className=" text-sm lg:text-base">I developed my personal portfolio website to showcase my skills, projects, and experiences as a web developer. The website serves as a central hub for potential clients and collaborators to learn more about my work.</p>
                      <p className="font-bold mt-4 text-sm lg:text-base">Technologies Used</p>
                      <div className='flex'>                        
                          <Image alt='' 
                          className='rounded-full my-2 lg:my-8 mr-4 bg-white  w-8 lg:w-12 h-8 lg:h-12' 
                          width={50} 
                          height={50} 
                          src='/images/nextjs-icon.png'></Image>  
                          <Image alt='' 
                          className='rounded-lg lg:my-6 w-12 lg:w-16 h-12 lg:h-16' 
                          width={50} 
                          height={50} 
                          src='/images/typescript-logo.png'></Image>                
                          <Image alt='' 
                          className='rounded-lg my-2 lg:my-10 ml-4 w-8 lg:w-12 h-8 lg:h-10' 
                          width={50} 
                          height={50} 
                          src='/images/tailwind-icon.png'></Image>
                          {/* <Image alt='' 
                          className='rounded-lg' 
                          width={100} 
                          height={100} 
                          src='/images/mongoDB-icon.png'></Image> */}
                        </div>        
                      <a href="https://github.com/OdongMartin/OdongMartin.github.io" className="text-sm lg:text-base font-bold transition-colors ease-out duration-500 hover:text-green-300 text-green-700 block w-36">Github Repository</a>
                    </div>

                    <div className="">
                      <h1 className="font-bold text-xl lg:text-2xl">Github Profile Viewer</h1>
                      <div className='flex mt-4'>
                        <Image alt='' 
                        className='rounded-lg h-48 lg:h-auto w-72 lg:w-auto' 
                        width={600} 
                        height={500} 
                        src='/images/github-api.png'></Image>
                        <div className='ml-4'>
                          <p className="text-sm lg:text-base">I developed the Github Profile Viewer to allow users to easily search for and view GitHub profiles, repositories, and other information.</p>
                          <p className="font-bold mt-4 text-sm lg:text-base">Technologies Used</p>
                          <div className='flex'>                        
                            <Image alt='' 
                            className='rounded-lg lg:my-8 w-12 lg:w-16 h-12 lg:h-16' 
                            width={50} 
                            height={50} 
                            src='/images/nodejs.png'></Image>  
                            <Image alt='' 
                            className='rounded-lg ml-2 lg:ml-4 lg:my-6 w-12 lg:w-16 h-12 lg:h-16' 
                            width={50} 
                            height={50} 
                            src='/images/javascript-logo.png'></Image>                
                            <Image alt='' 
                            className='rounded-lg my-2 lg:my-10 ml-2 lg:ml-4 w-8 lg:w-12 h-8 lg:h-10' 
                            width={50} 
                            height={50} 
                            src='/images/tailwind-icon.png'></Image>
                            <Image alt='' 
                            className='rounded-lg  ml-2 lg:ml-4 -mt-8 lg:-my-4 mr-4 w-28 lg:w-36 h-28 lg:h-36' 
                            width={100} 
                            height={100} 
                            src='/images/mongoDB-icon.png'></Image>
                          </div>
                                              
                          <a href="https://github.com/OdongMartin/GitHub-Profile-Viewer" className="text-sm lg:text-base font-bold transition-colors ease-out duration-500 hover:text-green-300 text-green-700 block w-36">Github Repository</a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="">
                      <h1 className="font-bold text-xl lg:text-2xl  ">Malaria Metrics</h1>
                      <div className='flex mt-4'>
                        <Image alt='' 
                        className='rounded-lg h-48 lg:h-auto w-72 lg:w-auto' 
                        width={600} 
                        height={500} 
                        src='/images/MalariaMetrics.png'></Image>
                        <div className='ml-4'>
                          <p className=" text-sm lg:text-base">A web application for realtime reporting and visualisation of malaria cases data.</p>
                          <p className="font-bold mt-4 text-sm lg:text-base">Technologies Used</p>
                          <div className='flex'>                        
                            <Image alt='' 
                            className='rounded-full my-2 lg:my-8 bg-white  w-8 lg:w-12 h-8 lg:h-12' 
                            width={50} 
                            height={50} 
                            src='/images/nextjs-icon.png'></Image>  
                            <Image alt='' 
                            className='rounded-lg ml-2 lg:ml-4 lg:my-6 w-12 lg:w-16 h-12 lg:h-16' 
                            width={50} 
                            height={50} 
                            src='/images/javascript-logo.png'></Image>                
                            <Image alt='' 
                            className='rounded-lg my-2 lg:my-10 ml-2 lg:ml-4 w-8 lg:w-12 h-8 lg:h-10' 
                            width={50} 
                            height={50} 
                            src='/images/tailwind-icon.png'></Image>
                            <Image alt='' 
                            className='rounded-lg  ml-2 lg:ml-4 -mt-8 lg:-my-4 mr-4 w-28 lg:w-36 h-28 lg:h-36' 
                            width={100} 
                            height={100} 
                            src='/images/mongoDB-icon.png'></Image>
                          </div>
                          <a href="https://github.com/OdongMartin/GitHub-Profile-Viewer" className="text-sm lg:text-base mt-4 font-bold transition-colors ease-out duration-500 hover:text-green-300 text-green-700 block w-36">Github Repository</a>
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <h1 className="font-bold text-xl lg:text-2xl ">E-commerce application</h1>
                      <div className='flex mt-4'>
                        <Image alt='' 
                        className='rounded-lg h-48 lg:h-auto w-72 lg:w-auto' 
                        width={600} 
                        height={500} 
                        src='/images/store.png'></Image>
                        <div className='ml-4'>
                          <p className="text-sm lg:text-base">A web application that allows users to create and manage their online stores.</p>
                          <p className="font-bold mt-4 text-sm lg:text-base">Technologies Used</p>
                          <div className='flex'>                        
                          <Image alt='' 
                            className='rounded-lg lg:my-8 w-12 lg:w-16 h-12 lg:h-16' 
                            width={50} 
                            height={50} 
                            src='/images/nodejs.png'></Image>  
                            <Image alt='' 
                            className='rounded-lg ml-2 lg:ml-4 lg:my-6 w-12 lg:w-16 h-12 lg:h-16' 
                            width={50} 
                            height={50} 
                            src='/images/javascript-logo.png'></Image>                
                            <Image alt='' 
                            className='rounded-lg my-2 lg:my-10 ml-2 lg:ml-4 w-8 lg:w-12 h-8 lg:h-10' 
                            width={50} 
                            height={50} 
                            src='/images/tailwind-icon.png'></Image>
                            <Image alt='' 
                            className='rounded-lg  ml-2 lg:ml-4 -mt-8 lg:-my-4 mr-4 w-28 lg:w-36 h-28 lg:h-36' 
                            width={100} 
                            height={100} 
                            src='/images/mongoDB-icon.png'></Image>
                          </div>
                          
                          <a href="https://github.com/OdongMartin/GitHub-Profile-Viewer" className="text-sm lg:text-base mt-4 font-bold transition-colors ease-out duration-500 hover:text-green-300 text-green-700 block w-36">Github Repository</a>
                        </div>
                      </div>
                    </div>

                    <div className="">
                      {/* <a href="https://github.com/OdongMartin/GitHub-Profile-Viewer"><img src="img/profile-viewer.png" alt=" GitHub-Profile-Viewer" className="rounded-xl w-full h-20 sm:h-32 object-cover"></a> */}
                      <h1 className="font-bold text-xl lg:text-2xl ">AI prompts</h1>
                      <div className='flex mt-4'>
                        <Image alt='' 
                        className='rounded-lg h-48 lg:h-auto w-72 lg:w-auto' 
                        width={600} 
                        height={500} 
                        src='/images/AI-prompts.png'></Image>
                        <div className='ml-4'>
                        <p className="text-sm lg:text-base">A web application that allows users to create and share AI prompts.</p>
                        <p className="font-bold mt-4 text-sm lg:text-base">Technologies Used</p>
                        <div className='flex'>                        
                        <Image alt='' 
                          className='rounded-full my-2 lg:my-8 bg-white  w-8 lg:w-12 h-8 lg:h-12' 
                          width={50} 
                          height={50} 
                          src='/images/nextjs-icon.png'></Image>  
                          <Image alt='' 
                          className='rounded-lg ml-2 lg:ml-4 lg:my-6 w-12 lg:w-16 h-12 lg:h-16' 
                          width={50} 
                          height={50} 
                          src='/images/javascript-logo.png'></Image>                
                          <Image alt='' 
                          className='rounded-lg my-2 lg:my-10 ml-2 lg:ml-4 w-8 lg:w-12 h-8 lg:h-10' 
                          width={50} 
                          height={50} 
                          src='/images/tailwind-icon.png'></Image>
                          <Image alt='' 
                          className='rounded-lg  ml-2 lg:ml-4 -mt-8 lg:-my-4 mr-4 w-28 lg:w-36 h-28 lg:h-36' 
                          width={100} 
                          height={100} 
                          src='/images/mongoDB-icon.png'></Image>
                        </div>
                      <a href="https://github.com/OdongMartin/GitHub-Profile-Viewer" className="text-sm sm:text-base mt-4 font-bold transition-colors ease-out duration-500 hover:text-green-300 text-green-700 block w-36">Github Repository</a>
                    </div>
                  </div>
                </div>
                        
                  <div className="">            
                    <h1 className="font-bold text-xl lg:text-2xl">Task Manager</h1>
                      <div className='flex mt-4'>
                        <Image alt='' 
                        className='rounded-lg h-48 lg:h-auto w-72 lg:w-auto' 
                        width={600} 
                        height={500} 
                        src='/images/create-task.png'></Image>
                        <div className='ml-4'>
                          <p className="text-sm lg:text-base">I developed the Task Manager to provide users with a simple and intuitive way to keep track of tasks, set due dates, and monitor task status.</p>
                          <p className="font-bold mt-4 text-sm lg:text-base">Technologies Used</p>
                          <div className='flex'>                        
                          <Image alt='' 
                            className='rounded-lg lg:my-8 w-12 lg:w-16 h-12 lg:h-16' 
                            width={50} 
                            height={50} 
                            src='/images/nodejs.png'></Image>  
                            <Image alt='' 
                            className='rounded-lg ml-2 lg:ml-4 lg:my-6 w-12 lg:w-16 h-12 lg:h-16' 
                            width={50} 
                            height={50} 
                            src='/images/javascript-logo.png'></Image>                
                            <Image alt='' 
                            className='rounded-lg my-2 lg:my-10 ml-2 lg:ml-4 w-8 lg:w-12 h-8 lg:h-10' 
                            width={50} 
                            height={50} 
                            src='/images/tailwind-icon.png'></Image>
                            <Image alt='' 
                            className='rounded-lg  ml-2 lg:ml-4 -mt-8 lg:-my-4 mr-4 w-28 lg:w-36 h-28 lg:h-36' 
                            width={100} 
                            height={100} 
                            src='/images/mongoDB-icon.png'></Image>

                          </div>
                          <a href="https://github.com/OdongMartin/TaskManager" className="text-sm lg:text-base transition-colors ease-out duration-500 hover:text-green-300 text-green-700 block font-bold w-36">Github Repository</a>
                          <a href="https://odongtaskmanager.cyclic.app" className="block text-sm lg:text-base transition-colors ease-out duration-500 hover:text-green-300 text-green-700 font-bold w-24">Live Demo</a>
                        </div>
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>

            {/* Contact Floor */}
            <div id="contacts" className={`h-screen w-screen flex justify-center items-center text-white`} >            
              <div className=" w-[80vw] max-h-screen text-base lg:text-lg">
                <FeedbackForm></FeedbackForm>
                {/* <div className='mx-24'>
                  <div>
                    <h1 className="font-bold mb-4 ">You can reach me at</h1>
                    <p className="">Email: <span className="font-semibold ">odongmartin21@gmail.com</span></p>
                    <p className="">GitHub: <a href="https://github.com/OdongMartin" className=" font-semibold text-green-700 ">OdongMartin</a></p>
                  </div>
                  
                  <div className="mt-4">
                    <h1 className="font-bold ">Location</h1>
                    <p className="">I'm currently located in Kampala, Uganda. Open to remote work and collaboration opportunities.</p>
                  </div>

                  <div className="mt-8">
                    <p className="">Thank you for considering me for your project or collaboration. I look forward to hearing from you!</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile version */}
      <div className='md:hidden'>
        <style>{`
              body {
                overflow: hidden;
              }
            `}
          </style>
          <div className='flex justify-center mb-[10vh] w-[15vw] h-[15vw] ml-[42.5vw]' style={{position:'fixed', bottom:0, zIndex: 2}}>
            <span className= {` relative flex justify-center items-center h-16 w-16 ${outSideElevator ? '': '' }` } onClick={handleOutside} style={{zIndex: 4}}>
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${outSideElevator ? 'bg-red-400': 'bg-sky-400' }  opacity-30`}></span>
                <span className={`absolute inline-flex rounded-full h-16 w-16 ${outSideElevator ? 'bg-red-500': 'bg-sky-500' } opacity-30`}></span>               
                {/* <span className=' flex text-white font-bold items-center justify-center ml-2'> {outSideElevator ? 'Back': 'View Page'} </span>                   */}
            </span> 
          </div>

        <div className='flex justify-center '>
          {/* content  */}
          <div className='h-screen w-screen -mt-28'>
            <div className= {` ${outSideElevator ? 'scale-105': '' } transition-transform ease-in-out duration-1000`} style={{zIndex: 2}}>
              {/* Home Floor */}
              <div id="mhome" className={`text-white h-screen w-screen bg-black flex justify-center items-center`} >
                <div className='tracking-widest w-full'>
                  <div>
                    <h1 ref={wordRef} data-value='WELCOME TO MY WEBSITE' className='text-2xl font-bold text-wrap flex justify-center '>WELCOME TO MY WEBSITE</h1>
                    <p className='mt-8  text-2xl text-wrap flex justify-center px-8'>This is the homepage of my website. Feel free to explore!</p>
                  </div>
                  
                </div>
              </div>

              {/* About Floor */}
              <div id="mabout" className={`h-screen w-screen bg-black text-white flex justify-center items-center`} >

                <div className="p-4 w-[80vw] text-wrap text-lg">
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
                      <h1 className="text-xl font-bold">Projects</h1>
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
                      <h1 className="text-xl font-bold ">Personal Touch</h1>
                      <p>When I'm not coding, you can find me playing Rugby🏉 or being a Laboratory Technologist😁. I believe in maintaining a healthy work-life balance to keep the creative juices flowing.</p>
                    </div>

                    <div className="p-4">
                      <h1 className="text-xl font-bold ">Let's Connect!</h1>
                      <p className=''>I'm always open to new challenges and collaborations. If you have a project in mind or just want to chat about web development, feel free to contact me</p>
                      <p>Looking forward to creating amazing digital experiences together!</p>
                    </div>
                  </Slider>
                </div>
              </div>

              {/* Projects Floor */}
              <div id="mprojects" className={` h-screen w-screen bg-black text-white flex justify-center items-center`} >
                <div className="w-[80vw] text-wrap p-4 text-lg">
                  <Slider {...settings}>
                    <div className="p-2">
                      <h1 className="font-bold text-2xl mb-4">Personal Website</h1>
                      <p className="">I developed my personal portfolio website to showcase my skills, projects, and experiences as a web developer. The website serves as a central hub for potential clients and collaborators to learn more about my work.</p>
                      <p className="font-bold text-xl mt-4">Technologies Used</p>
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
                      <a href="https://github.com/OdongMartin/OdongMartin.github.io" className=" font-bold transition-colors ease-out duration-500 hover:text-green-300 text-green-700 block w-40">Github Repository</a>
                    </div>

                    <div className="p-2">
                      <h1 className="font-bold text-2xl">Github Profile Viewer</h1>                
                      <Image alt='' 
                      className='rounded-lg w-80 h-36 mt-4' 
                      width={1000} 
                      height={1000} 
                      src='/images/github-api.png'></Image>
                      <div className='mt-4'>
                        <p className="">I developed the Github Profile Viewer to allow users to easily search for and view GitHub profiles, repositories, and other information.</p>
                        <p className="font-bold text-xl mt-4">Technologies Used</p>
                        <div className='flex'>                        
                          <Image alt='' 
                          className='rounded-lg py-4' 
                          width={50} 
                          height={50} 
                          src='/images/nodejs.png'></Image>  
                          <Image alt='' 
                          className='rounded-lg py-6 ml-2' 
                          width={50} 
                          height={50} 
                          src='/images/javascript-logo.png'></Image>                
                          <Image alt='' 
                          className='rounded-lg py-10 ml-2' 
                          width={50} 
                          height={50} 
                          src='/images/tailwind-icon.png'></Image>
                          <Image alt='' 
                          className='rounded-lg ml-2' 
                          width={100} 
                          height={100} 
                          src='/images/mongoDB-icon.png'></Image>
                        </div>
                                            
                        <a href="https://github.com/OdongMartin/GitHub-Profile-Viewer" className=" font-bold transition-colors ease-out duration-500 hover:text-green-300 text-green-700 block w-40">Github Repository</a>
                      </div>

                    </div>
                    
                    <div className="p-2">
                      <h1 className="font-bold text-2xl  ">Malaria Metrics</h1>
                      <Image alt='' 
                      className='rounded-lg mt-4' 
                      width={600} 
                      height={500} 
                      src='/images/MalariaMetrics.png'></Image>
                      <div className='mt-4'>
                        <p className="">A web application for realtime reporting and visualisation of malaria cases data.</p>
                        <p className="font-bold text-xl mt-4">Technologies Used</p>
                        <div className='flex'>                        
                          <Image alt='' 
                          className='rounded-full my-8 mr-2 bg-white' 
                          width={50} 
                          height={50} 
                          src='/images/nextjs-icon.png'></Image>  
                          <Image alt='' 
                          className='rounded-lg py-6 ml-2' 
                          width={50} 
                          height={50} 
                          src='/images/javascript-logo.png'></Image>                
                          <Image alt='' 
                          className='rounded-lg py-10 ml-2' 
                          width={50} 
                          height={50} 
                          src='/images/tailwind-icon.png'></Image>
                          <Image alt='' 
                          className='rounded-lg ml-2' 
                          width={100} 
                          height={100} 
                          src='/images/mongoDB-icon.png'></Image>
                        </div>
                        <a href="https://github.com/OdongMartin/GitHub-Profile-Viewer" className="mt-4 font-bold transition-colors ease-out duration-500 hover:text-green-300 text-green-700 block w-40">Github Repository</a>
                      </div>
                    </div>

                    <div className="p-2">
                      <h1 className="font-bold text-2xl ">E-commerce application</h1>
                      <Image alt='' 
                      className='rounded-lg mt-4' 
                      width={600} 
                      height={500} 
                      src='/images/store.png'></Image>
                      <div className='mt-4'>
                        <p className="">A web application that allows users to create and manage their online stores.</p>
                        <p className="font-bold text-xl mt-4">Technologies Used</p>
                        <div className='flex'>                        
                        <Image alt='' 
                          className='rounded-lg py-4' 
                          width={50} 
                          height={50} 
                          src='/images/nodejs.png'></Image>  
                          <Image alt='' 
                          className='rounded-lg py-6 ml-2' 
                          width={50} 
                          height={50} 
                          src='/images/javascript-logo.png'></Image>                
                          <Image alt='' 
                          className='rounded-lg py-10 ml-2' 
                          width={50} 
                          height={50} 
                          src='/images/tailwind-icon.png'></Image>
                          <Image alt='' 
                          className='rounded-lg ml-2' 
                          width={100} 
                          height={100} 
                          src='/images/mongoDB-icon.png'></Image>
                        </div>
                        
                        <a href="https://github.com/OdongMartin/GitHub-Profile-Viewer" className="mt-4 font-bold transition-colors ease-out duration-500 hover:text-green-300 text-green-700 block w-40">Github Repository</a>
                      </div>
                    </div>

                    <div className="p-2">
                      {/* <a href="https://github.com/OdongMartin/GitHub-Profile-Viewer"><img src="img/profile-viewer.png" alt=" GitHub-Profile-Viewer" className="rounded-xl w-full h-20 sm:h-32 object-cover"></a> */}
                      <h1 className="font-bold text-2xl ">AI prompts</h1>
                      <Image alt='' 
                      className='rounded-lg mt-4' 
                      width={600} 
                      height={500} 
                      src='/images/AI-prompts.png'></Image>
                      <div className='mt-4'>
                      <p className="">A web application that allows users to create and share AI prompts.</p>
                      <p className="font-bold text-xl mt-4">Technologies Used</p>
                      <div className='flex'>                        
                      <Image alt='' 
                          className='rounded-full my-8 mr-2 bg-white' 
                          width={50} 
                          height={50} 
                          src='/images/nextjs-icon.png'></Image>  
                          <Image alt='' 
                          className='rounded-lg py-6 ml-2' 
                          width={50} 
                          height={50} 
                          src='/images/javascript-logo.png'></Image>                
                          <Image alt='' 
                          className='rounded-lg py-10 ml-2' 
                          width={50} 
                          height={50} 
                          src='/images/tailwind-icon.png'></Image>
                          <Image alt='' 
                          className='rounded-lg ml-2' 
                          width={100} 
                          height={100} 
                          src='/images/mongoDB-icon.png'></Image>
                      </div>
                    <a href="https://github.com/OdongMartin/GitHub-Profile-Viewer" className=" mt-4 font-bold transition-colors ease-out duration-500 hover:text-green-300 text-green-700 block w-40">Github Repository</a>
                  </div>
                    </div>
                              
                    <div className="p-2">            
                      <h1 className="font-bold text-2xl">Task Manager</h1>
                      <Image alt='' 
                      className='rounded-lg mt-4' 
                      width={600} 
                      height={500} 
                      src='/images/create-task.png'></Image>
                      <div className='mt-4'>
                        <p className="">I developed the Task Manager to provide users with a simple and intuitive way to keep track of tasks, set due dates, and monitor task status.</p>
                        <p className="font-bold text-xl mt-4">Technologies Used</p>
                        <div className='flex'>                        
                          <Image alt='' 
                            className='rounded-lg py-4' 
                            width={50} 
                            height={50} 
                            src='/images/nodejs.png'></Image>  
                            <Image alt='' 
                            className='rounded-lg py-6 ml-2' 
                            width={50} 
                            height={50} 
                            src='/images/javascript-logo.png'></Image>                
                            <Image alt='' 
                            className='rounded-lg py-10 ml-2' 
                            width={50} 
                            height={50} 
                            src='/images/tailwind-icon.png'></Image>
                            <Image alt='' 
                            className='rounded-lg ml-2' 
                            width={100} 
                            height={100} 
                            src='/images/mongoDB-icon.png'></Image>

                        </div>
                        <a href="https://github.com/OdongMartin/TaskManager" className="transition-colors ease-out duration-500 hover:text-green-300 text-green-700 block font-bold w-40">Github Repository</a>
                        <a href="https://odongtaskmanager.cyclic.app" className="transition-colors ease-out duration-500 hover:text-green-300 text-green-700 font-bold w-28">Live Demo</a>
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>

              {/* Contact Floor */}
              <div id="mcontacts" className={` h-screen w-screen bg-black text-white flex justify-center items-center`} >            
                <div className='text-lg w-[80vw] p-4 -mt-36'>
                  <FeedbackForm></FeedbackForm>
                  {/* <div>
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
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <div className='grid w-full h-full'>
            
            <div className='flex justify-center'>
              {/* top */}
              <div style={{zIndex:4, position:'fixed', top:0, left:0}} >
                <div className= {`border-b-2 border-black bg-gradient-to-t from-zinc-400 to-zinc-600 h-[10vh] w-[100vw] flex justify-center items-center ${outSideElevator ? '-translate-y-32': ''} transition-transform ease-in-out duration-1000`} style={{zIndex: 3}}>
                  <div className='bg-black text-white font-bold text-xl px-4 py-2 rounded-lg w-32 flex items-center justify-center shadow-xl shadow-cyan-500/50'>{floorNames[currentFloor]}</div>
                </div>
              </div>

              {/* bottom */}
              <div className='' style={{position:'fixed', bottom:0, left:0}}>
                <div className= {`bg-gradient-to-t from-rose-900 to-rose-950 h-[7vh] w-[100vw] ${outSideElevator ? 'translate-y-32': ''} transition-transform ease-in-out duration-1000`} style={{zIndex: 4, position:'fixed', bottom:0, left:0}}>
                </div> 
                {/* <span className= {`relative flex justify-center items-center h-16 w-16 mb-[10vh] ml-[42vw] ${outSideElevator ? '': '' }` } onClick={handleOutside} style={{zIndex: 1}}>
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${outSideElevator ? 'bg-red-400': 'bg-sky-400' }  opacity-30`}></span>
                    <span className={`absolute inline-flex rounded-full h-16 w-16 ${outSideElevator ? 'bg-red-500': 'bg-sky-500' } opacity-30`}></span>               
                    <span className=' flex text-white font-bold items-center justify-center ml-2'> {outSideElevator ? 'Back': 'View Page'} </span>                  
                </span>  */}
                
              </div>

              {/* walls and door */}
              <div className=''>             
                {/* left wall */}
                <div className='h-screen' style={{zIndex: 3, position:'fixed' , left:0}}>    
                  <div className= {`grid items-center justify-center border-r-2 border-black bg-gradient-to-r from-zinc-400 to-zinc-600 from h-[100vh] w-[20vw] ${outSideElevator ? '-translate-x-32': ''} transition-transform ease-in-out duration-1000`} style={{position:'fixed'}}>
                    <div  className='grid gap-2 justify-center items-center' style={{zIndex: 3, position:'relative'}}>          
                      {/* Nav buttons */}
                      <Link to='mhome'  smooth={true} duration={scrollSpeed} onClick={() => handleScrollToFloor(0)}>     
                        <div 
                          className={` ${currentFloor === 0 ? 'bg-indigo-300/50 shadow-lg shadow-indigo-300/50':'bg-white shadow-lg shadow-white/50'}  border-4 border-black/25 rounded-full flex items-center justify-center`}
                          // onMouseEnter={handleHover} 
                          style={{
                            cursor:'pointer',
                            width: '50px',
                            // zIndex: 3
                          }}
                          data-value='HOME'
                        > <Image alt='' 
                          className='p-2' 
                          width={1000} 
                          height={1000} 
                          src='/images/home-icon.png'></Image>
                         
                        </div>
                        <span className='text-black font-bold text-xs flex justify-center mr-2'>HOME </span>
                      </Link>

                      <Link to='mabout' smooth={true} duration={scrollSpeed} onClick={() => handleScrollToFloor(1)}>
                        <div 
                            className={` ${currentFloor === 1 ? 'bg-indigo-300/50 shadow-lg shadow-indigo-300/50':'bg-white shadow-lg shadow-white/50'}  border-4 border-black/25 rounded-full flex items-center justify-center`}
                            // onMouseEnter={handleHover} 
                            style={{
                              cursor:'pointer',
                              width: '50px',
                              // zIndex: 3
                            }}
                            data-value='ABOUT'
                          > <Image alt='' 
                          className='p-2' 
                          width={1000} 
                          height={1000} 
                          src='/images/about-icon.png'></Image>
                        </div>
                        <span className='text-black font-bold text-xs flex justify-center mr-2'>ABOUT</span>
                      </Link>
                      
                      <Link to='mprojects' smooth={true} duration={scrollSpeed} onClick={() => handleScrollToFloor(2)}>
                        <div 
                            className={` ${currentFloor === 2 ? 'bg-indigo-300/50 shadow-lg shadow-indigo-300/50':'bg-white shadow-lg shadow-white/50'}  border-4 border-black/25 rounded-full flex items-center justify-center`}
                            // onMouseEnter={handleHover} 
                            style={{
                              cursor:'pointer',
                              width: '50px',
                              // zIndex: 3
                            }}
                            data-value='PROJECTS'
                          > <Image alt='' 
                          className='p-2' 
                          width={1000} 
                          height={1000} 
                          src='/images/projects-icon.png'></Image>
                        </div>
                        <span className='text-black font-bold text-xs flex justify-center'>PROJECTS</span>
                      </Link>

                      <Link to='mcontacts' smooth={true} duration={scrollSpeed} onClick={() => handleScrollToFloor(3)}>          
                        <div 
                          className={` ${currentFloor === 3 ? 'bg-indigo-300/50 shadow-lg shadow-indigo-300/50':'bg-white shadow-lg shadow-white/50'}  border-4 border-black/25 rounded-full flex items-center justify-center`}
                          // onMouseEnter={handleHover} 
                          style={{
                            cursor:'pointer',
                            width: '50px',
                            // zIndex: 3
                          }}
                          data-value='CONTACTS'
                        > <Image alt='' 
                        className='p-2' 
                        width={1000} 
                        height={1000} 
                        src='/images/contact-icon.png'></Image> </div>
                      </Link>
                      <span className='text-black font-bold text-xs flex justify-center'>CONTACTS </span>
                    </div>
                  </div>
                </div>
                
                {/* door */}
                {/* left door */}
                <div className= {`bg-white/20 backdrop-blur-sm border-2 shadow-2xl border-black h-[88vh] w-[33vw] mt-[10vh] ${outSideElevator ? '-translate-x-64': ''} ${doorOpen ? '-translate-x-32' : ''} transition-transform ease-in-out duration-1000`} style={{zIndex: 2, position:'fixed', left:70}}></div>
                {/* right door */}
                <div className= {`bg-white/20 backdrop-blur-sm border-2 shadow-2xl border-black h-[88vh] w-[33vw] mt-[10vh] ${outSideElevator ? 'translate-x-64': ''} ${doorOpen ? 'translate-x-32' : ''} transition-transform ease-in-out duration-1000`} style={{zIndex: 2, position:'fixed', right:70}}></div>

                {/* right wall */}
                <div className= {`border-l-2 border-black bg-gradient-to-l from-zinc-400 to-zinc-600 h-[100vh] w-[20vw] ${outSideElevator ? 'translate-x-32': ''} transition-transform ease-in-out duration-1000`} style={{zIndex: 3, position:'fixed', right:0}}></div>

              </div>
            

            </div>            

           
           
          </div>      
        </div>
      </div>
    </>
  )
}

export default Home