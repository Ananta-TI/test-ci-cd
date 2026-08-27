import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  return (
    <main className="app">
      <h1>CI/CD React Project</h1>

      <p>
        Project ini digunakan untuk latihan GitLab CI/CD.
      </p>

      <div className="status">
        <span className="dot"></span>
        Pipeline Ready
      </div>
    </main>
  );
}

export default App;

