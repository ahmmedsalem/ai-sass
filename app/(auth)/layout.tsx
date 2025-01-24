import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({children}: Props) => {
  return (
    <div className='flex items-center justify-center h-full'>{children}</div>
  )
}

export default layout