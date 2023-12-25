import React from "react";

const Input = ({
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
  ...rest
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900 font-serif"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        {...rest}
        onChange={onChange}
        className={`placeholder:text-gray-600 block w-full rounded-md text-gray-900 outline-none ${className}`}
      />
    </div>
  );
};

export default Input;
