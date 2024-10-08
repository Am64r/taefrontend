import React from 'react';
import SearchBar from './SearchBar';
import AboutSection from './AboutSection';
import SocialMediaButtons from './SocialMediaButtons';
import './MainLayout.css';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <header>
        {/* Your header content */}
      </header>
      
      <main>
        <SearchBar />
        <AboutSection />
        <SocialMediaButtons />
      </main>
      
      <footer>
        {/* Your footer content */}
      </footer>
    </div>
  );
};

export default MainLayout;