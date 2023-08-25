import React from "react";

interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  options?: { value: string; label: string }[];
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  value,
  onChange,
  options,
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      {type === "select" ? (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default FormInput;
