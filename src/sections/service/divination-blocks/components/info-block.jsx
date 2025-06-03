function InfoBlock({ title, label }) {
  return (
    <div className="flex flex-col items-start">
      <p className="text-primary-700 mobile-bold-h3 lg:desktop-bold-h4">{title}</p>
      <p className="text-dark-900 desktop-regular-h5 lg:desktop-regular-h4">{label}</p>
    </div>
  )
}

export default InfoBlock
