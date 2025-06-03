import { memo } from 'react'

function PaymentButton({ value, onClick }) {
  return (
    <button
      type="button"
      data-value={value}
      className="rounded-md bg-dark-200 px-6 py-2 flex justify-center items-center desktop-regular-p text-dark-900"
      onClick={onClick}
    >
      {`$${value}`}
    </button>
  )
}

export default memo(PaymentButton)
