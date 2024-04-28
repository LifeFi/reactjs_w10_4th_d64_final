import { ForwardedRef, TextareaHTMLAttributes, forwardRef } from "react";

interface InputProps {
  name: string;
  displayName?: string;
  errors?: string[];
}

function _TextInput(
  {
    name,
    displayName,
    errors = [],
    ...res
  }: InputProps & TextareaHTMLAttributes<HTMLTextAreaElement>,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  return (
    <div className="flex flex-col gap-2 relative">
      <textarea
        id={name}
        ref={ref}
        name={name}
        {...res}
        className={`${res.className} peer overflow-y-hidden ${
          displayName && "pt-8"
        } `}
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

export default forwardRef(_TextInput);
// export default _TextInput;
