import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Carousel from './components/Carousel/Carousel';
import FormPage from './components/FormPage/FormPage';
import DesignPage from './components/DesignPage/DesignPage';
import ColorPalettePage from './components/ColorPalettePage/ColorPalettePage';
import GeneratedWebsite from './components/GeneratedWebsite/GeneratedWebsite'; // Fixed import

const App = () => {
  const [selectedColorPalette, setSelectedColorPalette] = useState([]); // Store selected palette

  return (
    <Router>
      <div className="App">
        
        <main>
          <Routes>
            <Route path="/" element={<Carousel />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/design" element={<DesignPage selectedColorPalette={selectedColorPalette} />} />
            <Route path="/color-palette" element={<ColorPalettePage setSelectedColorPalette={setSelectedColorPalette} />} />
            <Route path="/generated-website" element={<GeneratedWebsite />} /> {/* Added this route */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;