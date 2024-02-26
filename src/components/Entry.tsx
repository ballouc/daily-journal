import React, { useState } from 'react'
import Input from './Input';

interface Props{
    title: string;
}

interface Input{
    title: string;
    type: string;
    value: string;
}

const Entry: React.FC<Props> = ({ title }) => {

    const [entryInputs, setEntryInputs] = useState<Input[]>([{title: 'Daily Gratitude', type: 'text-sm', value: 'Lorem'}, {title: 'Notes', type: 'text-lg', value: 'Ipsum'}]);

  return (
    <>
        <div className="bold">{title}</div>
        {entryInputs.map((input, index) => {
            return(
                <div className={input.type}>{input.value}</div>
            )
        })}
    </>
  )
}

export default Entry