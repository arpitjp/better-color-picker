/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { presetItems } from './presets';
import { Dropdown } from './dropdown';
import { Custom } from './custom';

const DEFAULT_CUSTOM_VALUE = "25.00% 25.00% 25.00% 25.00%";

export const NumberOfColumns = ({
  label,
  value,
  setValue,
  options = presetItems,
}) => {
  const [sumError, setSumError] = useState(false);
  const [customValue, setCustomValue] = useState(value);
  const [dropdownValue, setDropdownValue] = useState(options.includes(value) ? value : 'custom');

  const handleCustomValueChange = (val) => {
    setCustomValue(val);
    const sum = val?.split(" ")?.reduce((acc, no) => acc + parseInt(no, 10), 0);
    if (sum !== 100) setSumError(true)
    else {
      setSumError(false)
      setValue(val);
    }
  }
  const handleDropdownChange = (val) => {
    setDropdownValue(val);
    if (val === 'custom') {
      setValue(DEFAULT_CUSTOM_VALUE);
      setCustomValue(DEFAULT_CUSTOM_VALUE)
    } else setValue(val);
  }

  return <div style={{ width: '350px' }}>
    {/* dropdown */}
    <Dropdown
      label={label}
      value={dropdownValue}
      setValue={handleDropdownChange}
      options={options}
    />
    {/* custom thing */}
    {dropdownValue === 'custom' && <Custom value={customValue} setValue={handleCustomValueChange} sumError={sumError} />}
  </div>
}