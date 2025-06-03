import React, { memo } from 'react'

function BreadcrumbsView({ separator = '/', children }) {
  return (
    <ul className="flex justify-start items-center">
      {children.map((item, index) => {
        return (
          <React.Fragment key={item.props.children.props.children}>
            {item}
            {index !== children.length - 1 && <li className="px-2 text-dark-600">{separator}</li>}
          </React.Fragment>
        )
      })}
    </ul>
  )
}

export default memo(BreadcrumbsView)
