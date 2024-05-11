import React from "react";

const Input = ({
  id,
  name,
  label,
  labelClassName = "",
  type = "text",
  value = "",
  onChange = () => {},
  placeholder,
  className = "",
  ...rest
}) => {
  return (
    <>
      {label && (
        <label htmlFor={id} className={`capitalize ${labelClassName}`}>
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`outline-none ${className}`}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </>
  );
};

export default Input;
