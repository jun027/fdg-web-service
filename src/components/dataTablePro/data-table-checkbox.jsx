import { memo, useEffect, useRef } from 'react'
import { Checkbox } from '@mui/material'

function DataTableCheckbox({ indeterminate = false, ...other }) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = !other.checked && indeterminate
    }
  }, [indeterminate, other.checked])

  return (
    <Checkbox inputRef={ref} checked={other.checked} indeterminate={indeterminate} {...other} />
  )
}

export default memo(DataTableCheckbox)
