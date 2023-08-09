/* eslint-disable react/prop-types */
// @ts-nocheck
import React, { useState } from 'react';
import { Popover, Tooltip, Typography } from '@material-ui/core';
import { CustomPicker } from 'react-color';
import { Saturation, Hue, Alpha, Checkboard } from 'react-color/lib/components/common';
import tinycolor from 'tinycolor2';

const inlineStyles = {
  container: {
    width: '330px',
    maxHeight: '600px',
    "-webkit-user-select": "none", /* Safari */        
    "-moz-user-select": "none", /* Firefox */
    "-ms-user-select": "none", /* IE10+/Edge */
    "user-select": "none", /* Standard */
  },
  slideLines: {
    position: 'relative',
    margin: '18px',
    height: '13px'
  },
  saturationPointer: {
    width: '14px',
    cursor: 'pointer',
    height: '14px',
    borderRadius: '10px',
    boxShadow: 'inset 0 0 0 1.5px #fff',
    transform: 'translate(-6px, -6px)',
  },
  slidePointer: {
    width: '15px',
    height: '15px',
    cursor: 'pointer',
    borderRadius: '16px',
    transform: 'translate(-4px, -1px)',
    backgroundColor: 'rgb(248, 248, 248)',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)',
  },
  presets: {
    maxHeight: '75px',
    display: 'grid',
    overflowY: 'scroll',
    padding: '6px',
    margin: '14px',
  },
  saturation: {
    position: 'relative',
    width: "100%",
    overflow: 'hidden',
    aspectRatio: '16 / 9'
  },
  inputContainer: {
    display: 'flex',
    margin: '20px',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  inputBox: {
    padding: "0px 16px",
    width: '80px',
    height: '24px',
    fontFamily: 'monospace',
    border: 'none',
    outline: '1px solid lightgrey',
    fontSize: '14px'
  },
}

const Pointer = () => <div style={inlineStyles.saturationPointer} />;

const SliderPointer = () => <div style={inlineStyles.slidePointer} />

const COLOR_BOX_SIZE = '18px';
const ColorBox = ({ color, title, onChange }) => {
  const colorObj = tinycolor(color);
  const backgroundColor = colorObj.toHex8String();
  const borderColor = colorObj.darken(8).toHexString();
  return <Tooltip title={title || color}>
    <div
    cursor='pointer'
    onClick={() => onChange({ rgb: colorObj.toRgb() })}
    style={{
      cursor: 'pointer',
      width: COLOR_BOX_SIZE,
      height: COLOR_BOX_SIZE,
      outline: `1px solid ${borderColor}`,
      backgroundColor,
    }}
  />
  </Tooltip>
}

const CurrentColorBox = (props) => {
  const size = props.size || "22px";
  const s = {
    container: {
      width: size,
      height: size,
      position: 'relative',
      overflow: 'hidden',
    },
    color: {
      position: 'absolute',
      inset: '0px',
      boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.1)',
      background: tinycolor(props.rgb).toHex8String(),
      zIndex: '2',
    }
  }
  return <div style={s.container}>
    <div style={s.color}></div>
    <Checkboard {...props} />
  </div>
}

const Comp = CustomPicker((props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [inputValue, setInputValue] = useState(null);
  const open = Boolean(anchorEl);
  const popoverId = open ? 'simple-popover' : undefined;
  // event handlers
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleBoxClick = (event) => {
    anchorEl ? handleClose() : handleOpen(event);
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
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}

      >
        <div style={inlineStyles.container}>
          {/* label */}
          {props?.label && <Typography variant="body1" style={{ margin: '20px' }}>{props.label}</Typography>}
          {/* presets */}
          {props?.presets?.length && <div style={{
            ...inlineStyles.presets,
            gridTemplateColumns: `repeat(auto-fill, ${COLOR_BOX_SIZE})`,
            gap: `${COLOR_BOX_SIZE} ${COLOR_BOX_SIZE}`,
          }}>
            {props.presets.map((preset, index) => <ColorBox color={preset} title={preset} key={index} onChange={props._onChange} />)}
          </div>}
          {/* input: saturation */}
          <div style={inlineStyles.saturation}>
            <Saturation {...props} pointer={Pointer} />
          </div>
          {/* input: hue */}
          <div style={inlineStyles.slideLines}>
            <Hue {...props} pointer={SliderPointer} />
          </div>
          {/* input: alpha */}
          <div style={inlineStyles.slideLines}>
            <Alpha {...props} pointer={SliderPointer} />
          </div>

          <div style={inlineStyles.inputContainer}>
            {/* box showing the current color */}
            <CurrentColorBox {...props} />
            {/* input: hex */}
            <Typography>Hex</Typography>
            <input
              value={inputValue ?? tinycolor(props.rgb).toHex8String()}
              onChange={handleInputChange}
              onBlur={() => setInputValue(null)}
              onFocus={(event) => event.target.select()}
              style={inlineStyles.inputBox}
            >
            </input>
            <Typography variant='subtitle1' style={{
              width: '42px',
              fontSize: '14px',
              textAlign: 'center',
            }}>{Math.round(tinycolor(props.rgb).getAlpha() * 100)}%</Typography>
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
