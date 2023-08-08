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

const COLOR_BOX_SIZE = '18px';
const ColorBox = ({color, title, onChange}) => {
  const colorObj = tinycolor(color);
  const backgroundColor = colorObj.toHex8String();
  const borderColor = colorObj.darken(10).toHexString();
  return <div
    title={title || color}
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
}

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
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}

      >
        <div style={styles.container}>
          {/* label */}
          {props?.label && <Typography variant="body1" style={{ margin: '18px' }}>{props.label}</Typography>}
          {/* presets */}
          {props?.presets?.length && <div style={{
            maxHeight: '75px',
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fill, ${COLOR_BOX_SIZE})`,
            gap: `${COLOR_BOX_SIZE} ${COLOR_BOX_SIZE}`,
            overflowY: 'scroll',
            margin: '18px'
          }}>
            {props.presets.map((preset, index) => <ColorBox color={preset} title={preset} key={index} onChange={props._onChange}/>)}
          </div>}
          {/* input: saturation */}
          <div style={{ position: 'relative', width: "100%", overflow: 'hidden', aspectRatio: '16 / 9' }}>
            <Saturation {...props} pointer={Pointer} />
          </div>
          {/* input: hue */}
          <div style={styles.slideLines}>
            <Hue {...props} pointer={SliderPointer} />
          </div>
          {/* input: alpha */}
          <div style={styles.slideLines}>
            <Alpha {...props} pointer={SliderPointer} />
          </div>

          <div style={{ display: 'flex', margin: '18px', alignItems: 'center', justifyContent: 'space-around' }}>
            {/* box showing the current color */}
            <CurrentColorBox {...props} />
            {/* input: hex */}
            <Typography>Hex</Typography>
            <input
              value={inputValue ?? tinycolor(props.rgb).toHex8String()}
              onChange={handleInputChange}
              onBlur={() => setInputValue(null)}
              onFocus={(event) => event.target.select()}
              style={{ padding: "0px 16px", width: '80px', height: '24px', fontFamily: 'monospace', border: 'none', outline: '1px solid lightgrey', fontSize: '14px' }}
            >
            </input>
            <Typography variant='subtitle2'>{Math.round(tinycolor(props.rgb).getAlpha()*100)}%</Typography>
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
