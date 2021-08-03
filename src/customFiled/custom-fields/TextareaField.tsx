import React from 'react'

const TextareaField = ({ field, className2, form, label, placeholder }: any) => {

    const { name, value, onChange, onBlur } = field;

    return (
        <div className="form-group">
            <label htmlFor={name}>Description:</label>
            <textarea
                className={className2}
                id={name}
                name={name}
                {...field}
            ></textarea>
        </div>
    )
}

export default TextareaField
