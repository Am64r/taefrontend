import React, { useState, useRef } from 'react';
import './App.css';
import LinkedInLogo from './components/LinkedInLogo.js';
import GitHubLogo from './components/GitHubLogo.js';
import Header from './components/Header';
import Typewriter from './components/TypeWriter.js';
import ChatBox from './components/ChatBox.js';
import Email from './components/Email.js';
import { PopupButton } from "react-calendly";
import Footer from './components/Footer.js';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

function App() {
  const ref = useRef();
  const [conversation, setConversation] = useState([]); // Store the entire conversation

  const handleSendMessage = async (inputText) => {
    try {
      const response = await fetch('https://taeflask-2hz6c3tcn-amr-elhadys-projects.vercel.app/generate-text', {
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
      console.log('Response data:', data); // Add this line for debugging

      setConversation([
        { role: 'user', content: inputText },
        { role: 'assistant', content: data.generatedText },
      ]);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      // Optionally, update the UI to show an error message
      setConversation(prev => [...prev, { role: 'system', content: 'An error occurred. Please try again.' }]);
    }
  };

  return (
    <div className="App">
      <Header parallaxRef={ref} />
      <Parallax pages={2} ref={ref}>
        {/* Initial Section */}
        <ParallaxLayer
          offset={0}
          speed={1}
          factor={1}
          style={{
            backgroundSize: 'cover',
          }}
        >
          <div className="pic-bio">
            <Typewriter text="amr elhady" speed={200} fontSize="240px" showCaret={true} />
          </div>
        </ParallaxLayer>

        {/* ChatBox Section */}
        <ParallaxLayer offset={0.4} speed={0.8}>
          <ChatBox onSendMessage={handleSendMessage} conversation={conversation} />
        </ParallaxLayer>

        {/* About Section */}
        <ParallaxLayer offset={1} speed={0.8}>
          <div className="about-section">
            <h2>About Me</h2>
            <p>
              Welcome! I'm Amr Elhady, a passionate developer with experience in building dynamic web applications. My interests include web development, AI, and open-source projects. Feel free to explore my work and connect with me!
            </p>
          </div>
        </ParallaxLayer>

        {/* Social Media Icons Section */}
        <ParallaxLayer offset={1.75} speed={0.8}>
          <div id="socials"></div>
          <div className="Socials">
            <LinkedInLogo />
            <GitHubLogo />
            <Email />
          </div>
          <div className="Socials">
            <PopupButton
              className="calendly"
              url="https://calendly.com/amrelhady/tech-internship-chat"
              rootElement={document.getElementById("root")}
              text="Calendly"
            />
          </div>
          <Footer />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}

export default App;
