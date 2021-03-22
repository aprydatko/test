import React from 'react'

const Input = ({ input, label, type, meta: { touched, error } }) => {
    return (
            <div>
            <label>{label}</label>
            <div>
                <input {...input} type={type} placeholder={label} />
                {touched && error && <span>{error}</span>}
            </div>
        </div>
      )
}
  

export default Input
