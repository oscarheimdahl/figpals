import { useEffect, useState } from 'react';
import pals from './assets/figpals.svg';

const palsWidth = 96.2;
const palsHeight = 110;
function App() {
  const [palIndex, setPalIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouseX(event.clientX);
      setMouseY(event.clientY);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handlePalsClick = (direction: 'left' | 'right') => {
    let newPalIndex = palIndex;
    if (direction === 'left') newPalIndex = palIndex - 1;
    if (direction === 'right') newPalIndex = palIndex + 1;

    if (newPalIndex < 0) newPalIndex = 9;
    if (newPalIndex > 9) newPalIndex = 0;

    setPalIndex(newPalIndex);
  };

  const handleColorClick = (index: number) => {
    setColorIndex(index % 9);
  };

  const xOffset = palsWidth * colorIndex;
  const yOffset = palsHeight * palIndex;

  return (
    <div className='app'>
      <div className='controls'>
        <button onClick={() => handlePalsClick('left')}>◀︎</button>
        <div
          style={{
            // @ts-expect-error css var
            // '--background-position': `${xOffset}px ${yOffset}px`,
            '--xOffset': `-${xOffset}px`,
            '--yOffset': `-${yOffset}px`,
          }}
          className='pals'
        ></div>
        <button onClick={() => handlePalsClick('right')}>▶︎</button>
      </div>
      <div className='color-controls '>
        <button onClick={() => handleColorClick(0)}>🟥</button>
        <button onClick={() => handleColorClick(1)}>🟧</button>
        <button onClick={() => handleColorClick(2)}>🟨</button>
        <button onClick={() => handleColorClick(3)}>🟩</button>
        <button onClick={() => handleColorClick(4)}>🟦</button>
        <button onClick={() => handleColorClick(5)}>🟪</button>
        <button onClick={() => handleColorClick(6)}>🟫</button>
        <button onClick={() => handleColorClick(7)}>⬛</button>
      </div>
      <div className='mouse-pals' style={{ transform: `translateX(${mouseX}px) translateY(${mouseY}px)` }}>
        <div
          style={{
            // @ts-expect-error css var
            // '--background-position': `${xOffset}px ${yOffset}px`,
            '--xOffset': `-${xOffset}px`,
            '--yOffset': `-${yOffset}px`,
          }}
          className='pals  spin'
        ></div>
      </div>
    </div>
  );
}

export default App;
