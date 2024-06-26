import React, { useState, useRef } from 'react';
import './App.css';
import LinkedInLogo from './components/LinkedInLogo.js';
import GitHubLogo from './components/GitHubLogo.js';
import Header from './components/Header';
import headshot from './images/micsuit.jpeg';
import sampleimage from './images/sampleheadshot.jpeg';
import Typewriter from './components/TypeWriter.js'
import ChatBox from './components/ChatBox.js'
import Email from './components/Email.js';
import { InlineWidget } from "react-calendly";
import { PopupWidget } from "react-calendly";
import { PopupButton } from "react-calendly";
import Footer from './components/Footer.js'
// import ScrollArrow from './components/ScrollArrow.js';
import TextBox from './components/TextBox.js';



import {Parallax, ParallaxLayer} from '@react-spring/parallax';

// import { ChatOpenAI } from "langchain/chat_models/openai";

// In App.js or another component



function App() {
  const ref = useRef();
  const [conversation, setConversation] = useState([]); // Store the entire conversation

  const handleSendMessage = async (inputText) => {
    // https://taeflask-jgx3sub2o-amr-elhadys-projects.vercel.app/generate-text
    try {
      const response = await fetch('http://127.0.0.1:8000', { // Updated URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // Clear the conversation first
      setConversation([]);

      // Add a delay before setting the new response
      setTimeout(() => {
        setConversation([
          { role: 'assistant', content: data.generatedText },
        ]);
      }, 1000); // Adjust the delay time (in milliseconds) as needed
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };
  
  return (
    <div className="App">

      <Header parallaxRef={ref} />    

      {/* <header className="App-header"> */}
        <Parallax pages={2} ref={ref}>

          <ParallaxLayer 
          offset={0.2} 
          speed={1}
          factor={2}
          style={{
            backgroundSize: 'cover',
          }}
          //sticky={{start: 0.9, end: 2.5}}
          // onClick={() => ref.current.scrollTo(3)}
          >
          <div className="pic-bio">
            <Typewriter text="amr elhady" speed={200} fontSize="240px" showCaret={true} />
            
            {/* <img src={sampleimage} className="headshot"/> */}
          </div>

          <ParallaxLayer offset={0.4} speed={0.8}>
          <ChatBox onSendMessage={handleSendMessage} conversation={conversation} />
          
          {/* <div className="arrow-container">
            <ScrollArrow parallaxRef={ref} />
          </div> */}

          <ParallaxLayer offset={0.3} speed={0.5}>
            <div className='text-container'>
            <div className='textbox1'></div>
            {/* <div className='textbox1'>and</div>
            <div className='textbox1'>Only</div> */}

            </div>
            
          </ParallaxLayer>
          
          </ParallaxLayer>

          
          </ParallaxLayer>
          
          
          <ParallaxLayer offset={1.75} speed={.8}>
          <div id="socials"></div>
            
            {/* <div className="Socials" ref={socialRef}> */}
            <div className="Socials" >
              <LinkedInLogo />
              <GitHubLogo />
              <Email />
            </div>
            
            <div className="Socials">
              <PopupButton
                className = "calendly"
                url="https://calendly.com/amrelhady/tech-internship-chat"
                /*
                * react-calendly uses React's Portal feature (https://reactjs.org/docs/portals.html) to render the popup modal. As a result, you'll need to
                * specify the rootElement property to ensure that the modal is inserted into the correct domNode.
                */
                rootElement={document.getElementById("root")}
                text="Calendly"
              />
            </div>
           
            <Footer />
            </ParallaxLayer>
      
            
        </Parallax>
      {/* </header> */}

      


      
    </div>
  );
}

export default App;
