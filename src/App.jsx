// @ts-nocheck
import React, {useState} from 'react';
import { CustomColorPicker } from './pick-her';

function App() {
  const [color, setColor] = useState('#00000033');
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100vh", flexDirection: 'column'}}>
      <p>{color}</p>
      <CustomColorPicker color={color} setColor={setColor} />
    </div>
  )
}

export default App
