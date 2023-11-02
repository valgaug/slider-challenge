import React, { ReactElement, useEffect, useRef, useState } from 'react';
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
  const [thumbWidth, setThumbWidth] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const sliderThumbRef = React.createRef<HTMLDivElement>();
  const sliderTrackRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    if (sliderThumbRef.current && sliderTrackRef.current) {
      setThumbWidth(sliderThumbRef.current.getBoundingClientRect().width);
      setTrackWidth(sliderTrackRef.current.getBoundingClientRect().width);
    }
  }, []);

  return (
    <div className='slider'>
      <label>{label}</label>
      <div
        className='slider-container'
        ref={sliderTrackRef}
        // onMouseDown={handleMouseDown}
        // onMouseMove={handleMouseMove}
        // onMouseUp={handleMouseUp}
      >
        <div className='slider-track'>
          <div
            className='slider-thumb'
            ref={sliderThumbRef}
            style={{
              left: `${((value - min) / (max - min + value * (thumbWidth / (trackWidth - thumbWidth)))) * 100}%`,
            }}
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
