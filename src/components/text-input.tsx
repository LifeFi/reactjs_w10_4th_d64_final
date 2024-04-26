import { ForwardedRef, TextareaHTMLAttributes, forwardRef } from "react";

interface InputProps {
  name: string;
  errors?: string[];
}

function _TextInput(
  {
    name,
    errors = [],
    ...rest
  }: InputProps & TextareaHTMLAttributes<HTMLTextAreaElement>,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  return (
    <div className="flex flex-col gap-2">
      <textarea
        ref={ref}
        name={name}
        {...rest}
        className={`${rest.className} overflow-y-hidden`}
      />
      {errors.map((error, index) => (
        <span key={index}>{error}</span>
      ))}
    </div>
  );
}

export default forwardRef(_TextInput);
// export default _TextInput;
