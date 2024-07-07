const Input = ({
  id,
  type = "text",
  name,
  label,
  labelClassName = "",
  value,
  onChange,
  placeholder,
  className = "",
  register = () => {},
  errorMessage,
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
        {...register(id, errorMessage)}
        {...rest}
      />
    </>
  );
};

export default Input;
