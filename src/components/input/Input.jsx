import { Stack } from "@mui/material";

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
    <Stack direction={"row"} gap={1} alignItems={"center"}>
      {label && (
        <label htmlFor={id} className={`${labelClassName}`}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className={className}
        placeholder={placeholder}
        {...register(id, errorMessage)}
        {...rest}
      />
    </Stack>
  );
};

export default Input;
