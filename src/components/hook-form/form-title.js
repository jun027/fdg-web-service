import { memo } from 'react'

function FormTitle({ title, musted, htmlFor }) {
  return (
    <label className="space-x-1 flex items-center" htmlFor={htmlFor}>
      {musted && <span className="desktop-regular-h5 text-[#BE1D2C]">*</span>}
      <span className="field-label">{title}</span>
    </label>
  )
}

export default memo(FormTitle)
