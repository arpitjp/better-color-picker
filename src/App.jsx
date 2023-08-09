// @ts-nocheck
import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
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
  "cyan",
  "magenta",

]

function App() {
  const [color, setColor] = useState('#00000033');
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      <Typography style={{margin: '24px'}}>Click on the magistic square</Typography>
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
