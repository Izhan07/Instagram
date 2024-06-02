import React, { useId } from 'react'
import { forwardRef } from 'react'

 function Input({
    type,
   label,
   className,
   ...props
 },ref) {
    const Id = useId()
  return (
    <>
        {label && <label htmlFor='Id'>
           {label} <br></br>
            </label>}
            <input
            type={type}
            className={`${className}`}
            id={Id}
            ref={ref}
            {...props}
            >
            </input>
            </>
  )
}
export default forwardRef(Input)