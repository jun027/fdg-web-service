import clsx from 'clsx'
import { Controller, useFormContext } from 'react-hook-form'

const inputStyledOptions = {
  small: 'w-[14px] before:w-[5px]',
  normal: 'w-[18px] before:w-[6px]',
}

const labelStyledOptions = {
  small: 'desktop-regular-p',
  normal: 'desktop-regular-h6',
}

export function RHFRadioButton({ size = 'normal', id, name, label, value, disabled }) {
  const { control } = useFormContext()

  const inputStyle = inputStyledOptions[size]
  const labelStyle = labelStyledOptions[size]

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <div className="flex flex-row items-center space-x-1">
            <input
              id={id}
              {...field}
              type="radio"
              value={value}
              onChange={(e) => field.onChange(e.target.value)}
              className={clsx(
                'appearance-none relative aspect-square border-2 rounded-full duration-100 before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:aspect-square before:rounded-full before:bg-primary-700 before:duration-200',
                inputStyle,
                field.value === value
                  ? 'border-primary-700 before:opacity-100'
                  : 'border-dark-500 before:opacity-0',
                disabled ? 'cursor-not-allowed' : 'cursor-pointer'
              )}
              disabled={disabled}
            />
            <label
              htmlFor={id}
              className={clsx(
                labelStyle,
                disabled ? 'cursor-not-allowed text-dark-500' : 'cursor-pointer text-dark-900'
              )}
            >
              {label}
            </label>
          </div>
        )
      }}
    />
  )
}
