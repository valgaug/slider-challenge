import React, { ReactElement, useState } from 'react';
import './slider.css';

interface Props {
  label: string;
  max: number;
  min: number;
  step: number;
  value: number;
  unit?: string;
  onChange(value: number): void;
}

export function Slider({ label, max, min, step, value, unit, onChange }: Props): ReactElement {
  // const [sliderValue, setSliderValue] = useState(value);
  // const sliderRef = React.createRef<HTMLDivElement>();
  // const [isDraggingRef, setIsDraggingRef] = useState(false);

  // const handleMouseDown = (e: React.MouseEvent) => {
  //   if (sliderRef.current) {
  //     const rect = sliderRef.current.getBoundingClientRect();
  //     const newPosition = ((e.clientX - rect.left) / rect.width) * (max - min) + min;
  //     setSliderValue(newPosition);
  //     setIsDraggingRef(true);
  //   }
  // };

  // const handleMouseMove = (e: React.MouseEvent) => {
  //   if (isDraggingRef && sliderRef.current) {
  //     const rect = sliderRef.current.getBoundingClientRect();
  //     const newPosition = ((e.clientX - rect.left) / rect.width) * (max - min) + min;
  //     setSliderValue(newPosition);
  //     onChange(newPosition);
  //   }
  // };

  // const handleMouseUp = () => {
  //   setIsDraggingRef(false);
  // };

  return (
    <div className='slider'>
      <label>{label}</label>
      <div
        className='slider-container'
        // ref={sliderRef}
        // onMouseDown={handleMouseDown}
        // onMouseMove={handleMouseMove}
        // onMouseUp={handleMouseUp}
      >
        <div className='slider-track'>
          <div
            className='slider-thumb'
            // style={{
            //   left: `${((sliderValue - min) / (max - min)) * 100}%`,
            // }}
          >
            <div className='slider-value'>
              <span>
                {value}
                {unit}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
