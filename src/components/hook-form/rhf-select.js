import { FormHelperText, Select, Stack } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

export function RHFSelect({ name, children, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Stack>
            <Select
              {...field}
              fullWidth
              displayEmpty
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
                  background: '#fff',
                  padding: '12px 16px',
                },
              }}
              error={!!error}
              {...other}
            >
              {children}
            </Select>
            {error && (
              <FormHelperText sx={{ marginX: '14px' }} error>
                {error?.message}
              </FormHelperText>
            )}
          </Stack>
        )
      }}
    />
  )
}
