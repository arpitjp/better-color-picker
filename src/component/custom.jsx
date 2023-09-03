/* eslint-disable react/prop-types */
import { TextField, Button, Typography } from '@material-ui/core';
import React from 'react';

const ColumnBox = ({
  size,
  error,
  disableRemove,
  handleColumnSizeChange = () => { },
  handleColumnDeletion = () => { },
}) => {
  // const [value, setValue] = useState(size);
  return <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }}>
    <TextField
      error={error}
      size="small"
      type="number"
      inputProps={{ style: { textAlign: 'center' } }}
      margin="dense"
      variant="outlined"
      value={size}
      style={{
        marginTop: '4px',
        width: '100px'
      }}
      onFocus={(e) => e.target.select()}
      onChange={handleColumnSizeChange}
    />
    {!disableRemove && <Typography
      style={{ cursor: 'pointer', marginTop: '4px', fontSize: '12px', color: '#f50057', textDecoration: 'underline' }}
      onClick={handleColumnDeletion}
    >Delete
    </Typography>}
  </div>
}

const MAX_COLUMNS = 5;
const MIN_COLUMNS = 1;
const MIN_COLUMN_SIZE = 1;
const MAX_COLUMN_SIZE = 100;

export const Custom = ({
  sumError,
  value,
  setValue,
}) => {
  const columns = value.split(' ').map(v => parseInt(v, 10));
  const disableRemove = columns.length <= MIN_COLUMNS

  // event handlers
  const setValueFromArr = (arr) => setValue(arr.map(v => `${v}.00%`).join(' '));
  const handleColumnAddition = () => {
    const arr = [...columns];
    const sz = arr.length - 1;
    const newColSize = Math.round(arr[sz] / 2);
    arr[sz] = arr[sz] - newColSize;
    arr.push(newColSize);
    setValueFromArr(arr);
  }
  const handleColumnSizeChange = (e, i) => {
    const val = e.target.value;
    if (val < MIN_COLUMN_SIZE || val > MAX_COLUMN_SIZE) return;
    const arr = [...columns];
    arr[i] = val;
    setValueFromArr(arr);
  }
  const handleColumnDeletion = (i) => {
    const arr = [...columns];
    const columnSize = arr[i];
    if (i === 0) {
      arr[i + 1] += columnSize;
    } else {
      arr[i - 1] += columnSize;
    }
    arr.splice(i, 1);
    setValueFromArr(arr);
  } 

  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: '16px',
  }}>
    {sumError && <Typography style={{ color: 'red', textAlign: 'center', fontSize: '12px' }}>Error: All columns should add up to 100</Typography>}
    {columns.map((c, i) => <ColumnBox
      key={i}
      size={c}
      error={sumError}
      disableRemove={disableRemove}
      handleColumnSizeChange={(e) => handleColumnSizeChange(e, i)}
      handleColumnDeletion={() => handleColumnDeletion(i)}
    />)}
    {columns.length < MAX_COLUMNS && <Button
      onClick={handleColumnAddition}
      variant="text"
      style={{
        textTransform: 'none',
        textDecoration: 'underline',
        color: '#002b79',
      }}
    >
      Add column
    </Button>}
  </div>
}