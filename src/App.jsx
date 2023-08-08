// @ts-nocheck
import React, {useState} from 'react';
import { CustomColorPicker } from './pick-her';

const presets = [
  "blue",
  "red",
  "green",
  "yellow",
  "orange",
  "purple",
  "pink",
  "brown",
  "black",
  "white",
  "gray",
  "grey",
  "cyan",
  "magenta",
  "lime",
  "maroon",
  "navy",
  "orange",
  "purple",
  "pink",
  "brown",
  "black",
  "white",
  "gray",
  "grey",
  "cyan",
  "magenta",
  "lime",
  "maroon",
  "navy",
]

function App() {
  const [color, setColor] = useState('#00000033');
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100vh", flexDirection: 'column'}}>
      <p>{color}</p>
      <CustomColorPicker
        color={color}
        label={"Pick a color"}
        setColor={setColor}
        presets={presets}
      />
    </div>
  )
}

export default App
