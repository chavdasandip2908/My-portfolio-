import React from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Terminal from './components/Terminal';
import Projects from './components/Projects';
import { Services, Contact } from './components/Sections';

function App() {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Navbar />
      <Hero />
      <About />
      <Terminal />
      <Projects />
      <Services />
      <Contact />

      <footer className="py-6 text-center text-gray-500 text-sm bg-gray-100 dark:bg-gray-900">
        © {new Date().getFullYear()} Sandip. Built with React & Node.js.
      </footer>
    </div>
  );
}

export default App;
