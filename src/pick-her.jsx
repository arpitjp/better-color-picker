/* eslint-disable react/prop-types */
// @ts-nocheck
import React from 'react';
import { CustomPicker } from 'react-color';
import { Saturation, Hue, Alpha } from 'react-color/lib/components/common';
import tinycolor from 'tinycolor2';

const styles = {
  slideLines: {
    position: 'relative',
    // borderRadius: '10px',
    // overflow: 'hidden',
    margin: '16px',
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

const Comp = CustomPicker((props) => {
  console.log(props)
  // event handlers
  return (
    <div style={{width: '330px', maxHeight: '600px', outline: '1px solid black', padding: "2px"}}>
      {/* saturation */}
      <div style={{position: 'relative', width: "100%", overflow: 'hidden', aspectRatio: '16 / 9'}}>
        <Saturation {...props} pointer={Pointer} />
      </div>
      {/* hue */}
      <div style={styles.slideLines}>
        <Hue {...props} pointer={SliderPointer} />
      </div>
      {/* alpha */}
      <div style={styles.slideLines}>
        <Alpha {...props} pointer={SliderPointer} />
      </div>
      {/* input for hex */}
    </div>
  )
})

export const CustomColorPicker = ({ color = "", setColor = () => {}, ...otherProps }) => {
  const rgbColor = tinycolor(color).toRgb();
  const onChange = color => {
    const hexColor = tinycolor(color.rgb).toHex8String();
    setColor(hexColor)
  };
  return <Comp color={rgbColor} onChange={onChange} {...otherProps} />
}
