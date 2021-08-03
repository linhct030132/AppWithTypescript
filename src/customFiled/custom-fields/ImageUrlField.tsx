import React, { useState } from 'react'

const ImageUrlField = ({ field, form, className2, type = 'text', label, placeholder }: any) => {

    const [image, setImage] = useState('')

    const { name, value, onChange, onBlur } = field;

    const onImageChange = (event: any) => {
        setImage(event.target.value)
    }

    return (
        <div className="form-group">
            <label htmlFor={name}>ImageUrl:</label>
            <input className={className2} id={name} name={name} placeholder={placeholder} {...field} onInput={onImageChange} />
            <img className='w-50' src={image} />
        </div>
    )
}
export default ImageUrlField
