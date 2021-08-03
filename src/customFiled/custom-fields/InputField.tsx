import React, { useState } from 'react'

const InputField = ({ field, form, type, className, className2, label, min, placeholder }: any) => {

    const { name, value, onChange, onBlur } = field;


    return (
        <div className={className}>
            {
                label ?
                    <label htmlFor={name}>{label}</label> :
                    ''
            }
            <input type={type} className="form-control" id={name} min={min} {...field} placeholder={placeholder} value={value}/>
        </div>
    )
}

export default InputField
