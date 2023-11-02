import * as React from 'react';
import './styles.css';
import { Info } from './Info';
import { Slider } from './Slider';
import { useState } from 'react';

export default function App() {
  const [valuePercent, setValuePercent] = useState(100);
  const [valueProportional, setValueProportional] = useState(1.0);

  return (
    <div className='App'>
      <h1>Custom Control Slider Challenge</h1>
      <Info />
      <hr />

      <p>INTERACTIVE SLIDERS TO GO HERE</p>
      <Slider label='Percentage Label' max={100} min={0} step={1} value={valuePercent} unit='%' onChange={setValuePercent} />
      <br />
      <Slider label='Proportional Label' max={1} min={0} step={0.1} value={valueProportional} onChange={setValueProportional} />
    </div>
  );
}
