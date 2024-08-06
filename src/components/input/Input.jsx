const Input = ({
  id = "",
  type = "text",
  name = "",
  label = "",
  labelClassName = "",
  value = "",
  onChange = () => {},
  placeholder = "",
  className = "",
  ...rest
}) => {
  return (
    <>
      {label && (
        <label htmlFor={id} className={`${labelClassName}`}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className={className}
        placeholder={placeholder}
        {...rest}
      />
    </>
  );
};

export default Input;
