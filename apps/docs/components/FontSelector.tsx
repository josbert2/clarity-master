'use client'
import { useState } from 'react';
import useFontStore from '../store/fontStore';
import { avenir, pangram } from '../lib/selector-fonts';

const fonts = [
  { name: 'Avenir', className: avenir.className },
  { name: 'Pangram', className: pangram.className }
];

const FontSelector = () => {
    const { selectedFont, setSelectedFont } = useFontStore();

  return (
    <div>
      <label htmlFor="font-select">Select Font:</label>
      <select
        id="font-select"
        onChange={(e) => setSelectedFont(e.target.value)}
        className="font-selector"
      >
        {fonts.map((font) => (
          <option key={font.name} value={font.className}>
            {font.name}
          </option>
        ))}
      </select>
      <div className={`preview-text ${selectedFont}`}>
        This is a preview text with the selected font.
      </div>
      <style jsx>{`
        .preview-text {
          font-size: 20px;
          margin-top: 20px;
        }
        .font-selector {
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
};

export default FontSelector;