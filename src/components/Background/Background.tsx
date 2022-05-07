import React from 'react';

import './background.css';

export function Background() {
  function circle(
    className: string,
    diameter: number,
    fill: string,
    strokeWidth?: number,
    stroke?: string
  ) {
    let diam = diameter;
    if (strokeWidth) {
      diam += strokeWidth * 2;
    }
    return (
      <svg className={className} height={diam} width={diam}>
        <circle
          cx={diam / 2}
          cy={diam / 2}
          r={diameter / 2}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={fill}
        />
      </svg>
    );
  }

  return (
    <div className={'background'}>
      {circle('circle-1', 800, 'crimson')}
      {circle('circle-2', 500, 'blueviolet')}
      {circle('circle-3', 100, 'lightcoral')}
      <div className={'writing-board-img'}></div>
    </div>
  );
}
