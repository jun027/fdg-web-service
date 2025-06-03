import { MenuItem, Select } from '@mui/material'
import { memo } from 'react'

function SelectProView({ value = '', onChange = () => {}, options = [], ...other }) {
  return (
    <Select
      fullWidth
      displayEmpty
      value={value}
      onChange={onChange}
      sx={{
        '&.Mui-focused': {
          '.MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
            borderColor: '#ADB5BD',
          },
        },
      }}
      inputProps={{
        sx: {
          padding: '12px 16px',
        },
      }}
      {...other}
    >
      {options.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.title}
        </MenuItem>
      ))}
    </Select>
  )
}

export default memo(SelectProView)
