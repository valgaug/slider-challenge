import * as React from 'react';
import './styles.css';
import { Info } from './Info';
import { Slider } from './Slider';
import { useState } from 'react';

export default function App() {
  const [valuePercent, setValuePercent] = useState(50);
  const [valueProportional, setValueProportional] = useState(0.7);

  return (
    <div className='App'>
      <h1>Custom Control Slider Challenge</h1>
      <Info />
      <hr />

      <p>INTERACTIVE SLIDERS TO GO HERE</p>
      <Slider label='Percentage Label' max={60} min={10} step={1} value={valuePercent} unit='%' onChange={setValuePercent} />
      <br />
      <Slider label='Proportional Label' max={0.7} min={0.3} step={0.1} value={valueProportional} onChange={setValueProportional} />
    </div>
  );
}
