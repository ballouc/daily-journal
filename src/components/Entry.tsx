import React from 'react'

interface Props{
    title: string;
}

const Entry: React.FC<Props> = ({ title }) => {
  return (
    <div>{title}</div>
  )
}

export default Entry