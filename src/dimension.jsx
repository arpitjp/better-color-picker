import MenuItem from '@material-ui/core/MenuItem';
import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

// custom height material ui select dropdown textfield ⭐️
const CustomSelect = ({ options = [], value, handleChange }) => {
  const height = "40px"
  const labelOffset = -8 // magic number, must be set manually based on given height
  const [focused, setFocused] = useState(false)
  return <TextField
    select
    label="Select"
    variant='outlined'
    fullWidth
    value={value}
    onFocus={() => setFocused(true)}
    onBlur={() => setFocused(false)}
    onChange={handleChange}
    /* styles the wrapper */
    style={{
      height
    }}
    /* styles the label component */
    InputLabelProps={{
      style: {
        height,
        ...(!focused && { top: `${labelOffset}px` }),
      },
    }}
    /* styles the input component */
    InputProps={{
      style: {
        height,
      },
    }}
  >
    {options.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>
}

const CustomInput = ({ value, handleChange }) => {
  return (
    <TextField
      size="small"
      type="number"
      margin="dense"
      variant="outlined"
      fullWidth
      value={value}
      onChange={handleChange}
      // inputProps={{
      //   style: {
      //     textAlign: 'center',
      //   },
      // }}
      InputProps={{
        startAdornment: (
          <span style={{ color: 'grey', marginRight: '8px' }}>px</span>
        )
      }}
    />
  )
}
export const Comp = ({ options = [], value, setValue }) => {
  const defaultCustomValue = "40px";
  const [dropdownValue, setDropdownValue] = useState(options.find((option) => option.value === value) ? value : 'custom');
  const handleDropdownChange = (e) => {
    const val = e.target.value
    setDropdownValue(val)
    if (val === 'custom') {
      setValue(defaultCustomValue)
    } else {
      setValue(val)
    }
  }
  const handleInputChange = (e) => {
    const val = e.target.value
    setValue(`${val}px`)
  }
  return <div style={{ width: '150px' }}>
    <p>{value || "Nothing"}</p>
    <CustomSelect options={options} value={dropdownValue} handleChange={handleDropdownChange} />
    {dropdownValue === 'custom' && <CustomInput value={parseInt(value, 10)} handleChange={handleInputChange} />}
  </div>
}

export const Dimension = () => {
  const options = [
    {
      value: "10px",
      label: `10px`
    },
    {
      value: "20px",
      label: `20px`
    },
    {
      value: 'custom',
      label: 'Custom',
    }
  ]
  const [value, setValue] = useState("30px");
  return <Comp options={options} value={value} setValue={setValue} />
}