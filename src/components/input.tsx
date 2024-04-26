import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";

interface InputProps {
  name: string;
  displayName?: string;
  errors?: string[];
}

function _Input(
  {
    name,
    displayName,
    errors = [],
    ...rest
  }: InputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className="flex flex-col gap-2 relative">
      <input
        id={name}
        ref={ref}
        name={name}
        {...rest}
        className={`${displayName && "pt-8"} peer *:text-lg`}
      />
      {displayName && (
        <label
          htmlFor={name}
          className="absolute top-2 left-2 text-sm text-neutral-500 peer-focus:text-blue-700"
        >
          {displayName}
        </label>
      )}
      {errors.map((error, index) => (
        <span key={index}>{error}</span>
      ))}
    </div>
  );
}

export default forwardRef(_Input);
