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
  const formatNumber = (number: number, step: number) => {
    const roundedNumber = Math.round(number / step) * step;
    const decimalPlaces = (step.toString().split('.')[1] || '').length;
    return Number(roundedNumber.toFixed(decimalPlaces));
  };

  const formattedValue = formatNumber(value, step);
  const clampedValue = Math.min(Math.max(formattedValue, min), max);
  const [trackWidth, setTrackWidth] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(0);
  const isDraggingRef = useRef(false);
  const sliderTrackRef = useRef<HTMLDivElement | null>(null);
  const sliderThumbRef = useRef<HTMLDivElement | null>(null);

  const calculateNewPosition = (e: React.MouseEvent) => {
    if (sliderTrackRef.current) {
      const rect = sliderTrackRef.current.getBoundingClientRect();
      return ((e.clientX - rect.left - thumbWidth / 2) / (rect.width - thumbWidth)) * (max - min) + min;
    }
    return 0;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const newPosition = calculateNewPosition(e);
    onChange(newPosition);
    isDraggingRef.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      const newPosition = calculateNewPosition(e);
      onChange(newPosition);
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
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
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className='slider-thumb'
            ref={sliderThumbRef}
            style={{
              left: `${(1 - thumbWidth / trackWidth) * (((clampedValue - min) / (max - min)) * 100)}%`,
            }}
          >
            <div className='slider-value'>
              {clampedValue}
              {unit}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
