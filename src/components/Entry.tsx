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

    {/* ADAM SHOULD I HAVE AN INPUT COMPONENT WITH TYPE, VALUE, TITLE PROPERTIES? WHAT IS THE BEST WAY TO STORE THE VARIATIONS ON MY INPUT TYPES? */}
    {/* IE: CHECKBOX WONT HAVE VALUE, TEXTAREA HAS VALUE TITLE AND TYPE!! */}
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