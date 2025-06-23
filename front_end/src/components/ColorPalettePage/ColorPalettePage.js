import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ColorPalettePage.css';

const colorPalettes = [
  ['#FF5733', '#FFC300', '#DAF7A6', '#900C3F'],
  ['#6A0572', '#AB83A1', '#ECD9D9', '#D9138A'],
  ['#00A8CC', '#00D4FF', '#90F3FF', '#B7E5DD'],
  ['#F72585', '#B5179E', '#7209B7', '#560BAD'],
  ['#0A9396', '#94D2BD', '#E9D8A6', '#EE9B00'],
  ['#14213D', '#FCA311', '#E5E5E5', '#000000'],
  ['#2EC4B6', '#FF9F1C', '#E71D36', '#FFBF69'],
  ['#EF476F', '#FFD166', '#06D6A0', '#118AB2'],
  ['#354f52', '#52796f', '#52796f', '#cad2c5'],
  ['#335c67', '#fff3b0', '#e09f3e', '#9e2a2b'],
  ['#450920', '#a53860', '#da627d', '#ffa5ab'],
  ['#0b132b', '#1c2541', '#3a506b', '#5bc0be'],
];

const ColorPalettePage = ({ setSelectedColorPalette }) => {
  const navigate = useNavigate();

  const handlePaletteSelect = (palette) => {
    if (setSelectedColorPalette) {
      setSelectedColorPalette(palette); // Update selected palette in state
      sessionStorage.setItem('selectedPalette', JSON.stringify(palette)); // Store in session storage
    }
    navigate('/design'); // Navigate back to DesignPage
  };

  return (
    <div className="color-palette-page">
      <h2>Select a Color Palette</h2>
      <div className="palette-container">
        {colorPalettes.map((palette, index) => (
          <div key={index} className="palette" onClick={() => handlePaletteSelect(palette)}>
            {palette.map((color, i) => (
              <div key={i} className="color-box" style={{ backgroundColor: color }}></div>
            ))}
          </div>
        ))}
      </div>
      <button className="back-button" onClick={() => navigate('/design')}>Back</button>
    </div>
  );
};

export default ColorPalettePage;
