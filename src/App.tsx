import Header from './components/Header/Header';
import BinaryBackground from './components/BinaryBackground/BinaryBackground';
import Home from './views/Home/Home';
import Skills from './views/Skills/Skills';
import Projects from './views/Projects/Projects';
import Contact from './views/Contact/Contact';
import { LanguageProvider } from './contexts/LanguageContext';
import './App.scss';

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <BinaryBackground />
        <Header />
        <main className="App__main">
          <Home />
          <Projects />
          <Skills />
          <Contact />
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;
