// @ts-nocheck
import React, { useState } from 'react';
// import { Typography } from '@material-ui/core';
// import { CustomColorPicker } from './pick-her';
// import { ViceCity } from './thing';
import { NumberOfColumns } from './component';

// const presets = [
//   "blue",
//   "red",
//   "green",
//   "yellow",
//   "orange",
//   "purple",
//   "pink",
//   "brown",
//   "black",
//   "white",
//   "gray",
//   "cyan",
//   "magenta",

// ]

function App() {
  // const [color, setColor] = useState('lavender');
  const [value, setValue] = useState('100.00%');
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      {/* <Typography style={{margin: '30px', fontSize: '20px', color: 'rgb(0, 0, 0, 0.8)'}}>Click on the magistic square</Typography>
      <CustomColorPicker
        color={color}
        label={"Pick a color"}
        setColor={setColor}
        presets={presets}
      /> */}
      {/* <ViceCity /> */}
      <p>Value: {value}</p>
      <NumberOfColumns
        value={value}
        setValue={setValue}
      />
    </div>
  )
}

export default App
