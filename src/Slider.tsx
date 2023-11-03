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

  function formatNumber(number: number, step: number): number {
    const roundedNumber = Math.round(number / step) * step;
    const decimalPlaces = step.toString().split('.')[1]?.length || 0;
    return Number(roundedNumber.toFixed(decimalPlaces));
  }

  const formattedValue = formatNumber(value, step);
  const [isDraggingRef, setIsDraggingRef] = useState(false);
  const [thumbWidth, setThumbWidth] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const sliderThumbRef = React.createRef<HTMLDivElement>();
  const sliderTrackRef = React.createRef<HTMLDivElement>();

  const handleMouseDown = (e: React.MouseEvent) => {
    if (sliderTrackRef.current) {
      const rect = sliderTrackRef.current.getBoundingClientRect();
      const newPosition = ((e.clientX - rect.left) / rect.width) * (max - min) + min;
      onChange(newPosition);
      setIsDraggingRef(true);
    }
  };

  useEffect(() => {
    if (sliderThumbRef.current && sliderTrackRef.current) {
      setThumbWidth(sliderThumbRef.current.getBoundingClientRect().width);
      setTrackWidth(sliderTrackRef.current.getBoundingClientRect().width);
    }
  }, []);

  return (
    <div className='slider'>
      <label>{label}</label>
      <div className='slider-container'>
        <div
          className='slider-track'
          ref={sliderTrackRef}
          onMouseDown={handleMouseDown}
          // onMouseMove={handleMouseMove}
          // onMouseUp={handleMouseUp}
        >
          <div
            className='slider-thumb'
            ref={sliderThumbRef}
            style={{
              left: `${(1 - thumbWidth / trackWidth) * (((formattedValue - min) / (max - min)) * 100)}%`,
            }}
          >
            <div className='slider-value'>
              <span>
                {formattedValue}
                {unit}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
