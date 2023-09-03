// @ts-nocheck
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { ListSubheader, MenuItem, TextField } from '@material-ui/core';

const CreateOption = ({ value, label }) => {
  const no = value?.split?.(' ').map((val) => parseInt(val, 10));
  const minNo = Math.min(...no);
  const total = no.reduce((acc, val) => acc + val, 0);
  const gridTemplateColumns = no
    .map((val) => `${Math.round(val / minNo)}fr`)
    .join(' ');
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns,
        gap: '15px',
        width: '100%',
        height: '28px'
      }}
    >
      {no.map((val, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1.5px dashed grey',
            color: 'grey',
            fontSize: '12px'
          }}
        >
          {label || Math.round((val / total) * 100)}
        </div>
      ))}
    </div>
  );
};

export const Dropdown = ({
  label,
  value,
  setValue,
  options,
}) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const renderedOptions = useMemo(() => {
    const menuOptions = [];
    const optionMap = options.reduce((acc, option) => {
      const totalCells = option.split(' ').length;
      acc[totalCells] = acc[totalCells] || [];
      acc[totalCells].push(option);
      return acc;
    }, {});
    Object.entries(optionMap).forEach(([totalCells, arr]) => {
      menuOptions.push(
        <ListSubheader key={totalCells}>
          {`${totalCells} Cell${totalCells > 1 ? 's' : ''}`}{' '}
        </ListSubheader>
      );
      arr.map((option) =>
        menuOptions.push(
          <MenuItem key={option} value={option}>
            <CreateOption value={option} />
          </MenuItem>
        )
      );
    });
    menuOptions.push((<ListSubheader key='others subheader'>Others</ListSubheader>));
    menuOptions.push(
      <MenuItem key={'custom'} value={'custom'}>
        <CreateOption value={"100%"} label="Custom value" />
      </MenuItem>
    )
    return menuOptions;
  }, [options]);

  return (
    <TextField
      placeholder="Select option"
      select
      label={label}
      variant="outlined"
      fullWidth
      value={value}
      onChange={handleChange}
      size="small"
    >
      {renderedOptions}
    </TextField>
  );
};
