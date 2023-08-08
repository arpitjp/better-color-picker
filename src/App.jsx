// @ts-nocheck
import React, {useState} from 'react';
import { CustomColorPicker } from './pick-her';

function App() {
  const [color, setColor] = useState('#00000033');
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100vh", flexDirection: 'column'}}>
      <CustomColorPicker color={color} setColor={setColor}  />
      <p>{color}</p>
    </div>
  )
}

export default App
