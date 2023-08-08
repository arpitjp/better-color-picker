/* eslint-disable react/prop-types */
// @ts-nocheck
import React, { useState } from 'react';
import { Popover, Typography } from '@material-ui/core';
import { CustomPicker } from 'react-color';
import { Saturation, Hue, Alpha, Checkboard } from 'react-color/lib/components/common';
import tinycolor from 'tinycolor2';

const styles = {
  container: {
    width: '330px',
    maxHeight: '600px',
    outline: '1px solid black',
    padding: "2px",
  },
  slideLines: {
    position: 'relative',
    margin: '18px',
    height: '13px'
  }
}

const Pointer = () => (
  <div style={{
    width: '13px',
    cursor: 'pointer',
    height: '13px',
    borderRadius: '6px',
    boxShadow: 'inset 0 0 0 1px #fff',
    transform: 'translate(-6px, -6px)',
  }} />
);

const SliderPointer = () => (
  <div style={{
    width: '15px',
    height: '15px',
    cursor: 'pointer',
    borderRadius: '16px',
    transform: 'translate(-4px, -1px)',
    backgroundColor: 'rgb(248, 248, 248)',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)',
  }} />
)

const CurrentColorBox = (props) => {
  const size = props.size || "20px";
  return <div style={{ position: 'relative', width: size, height: size, backgroundColor: tinycolor(props.rgb) }}>
    <Checkboard {...props} />
  </div>
}

const Comp = CustomPicker((props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [inputValue, setInputValue] = useState(null);
  const open = Boolean(anchorEl);
  const popoverId = open ? 'simple-popover' : undefined;
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleBoxClick = (event) => {
    if (anchorEl) {
      handleClose();
    }
    else {
      handleOpen(event);
    }
  }
  const handleInputChange = (event) => {
    const hexColor = event.target.value?.trim();
    const colorObj = tinycolor(hexColor);
    if (colorObj.isValid()) {
      props._onChange({ rgb: colorObj.toRgb() });
    }
    setInputValue(hexColor);
  }
  return (
    <>
      <div aria-describedby={popoverId} onClick={handleBoxClick} style={{ cursor: 'pointer' }}>
        <CurrentColorBox {...props} />
      </div>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        // anchorOrigin={{
        //   vertical: 'bottom',
        //   horizontal: 'center',
        // }}
        // transformOrigin={{
        //   vertical: 'top',
        //   horizontal: 'center',
        // }}

      >
        <div style={styles.container}>

          <div style={{ position: 'relative', width: "100%", overflow: 'hidden', aspectRatio: '16 / 9' }}>
            <Saturation {...props} pointer={Pointer} />
          </div>

          <div style={styles.slideLines}>
            <Hue {...props} pointer={SliderPointer} />
          </div>

          <div style={styles.slideLines}>
            <Alpha {...props} pointer={SliderPointer} />
          </div>

          <div style={{ display: 'flex', margin: '18px' }}>
            {/* box showing the current color */}
            <CurrentColorBox {...props} />
            {/* hex input and opacity info */}
            <Typography>Hex</Typography>
            <input value={inputValue ?? tinycolor(props.rgb).toHex8String()} onChange={handleInputChange} onBlur={() => setInputValue(null)}></input>
          </div>
        </div>
      </Popover>
    </>
  )
})

export const CustomColorPicker = ({ color = "", setColor = () => { }, ...otherProps }) => {
  const rgbColor = tinycolor(color).toRgb();
  const onChange = color => {
    const hexColor = tinycolor(color.rgb).toHex8String();
    setColor(hexColor)
  };
  return <Comp color={rgbColor} onChange={onChange} _onChange={onChange} {...otherProps} />
}
