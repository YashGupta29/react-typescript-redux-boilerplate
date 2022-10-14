import React from "react";
import "./Button.css";

// interface
interface IconOptions {
  showStartIcon?: boolean;
  showEndIcon?: boolean;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}
interface ButtonProps {
  label: string | JSX.Element;
  type?: "button" | "submit" | "reset";
  variant?: "outlined" | "contained";
  fullWidth?: boolean;
  cssClasses?: Array<string>;
  onClick?: () => void;
  onSubmit?: () => void;
  disabled?: boolean;
  iconOptions?: IconOptions;
}

const Button: React.FC<ButtonProps> = ({
  label,
  type = "button",
  variant = "contained",
  fullWidth = false,
  cssClasses,
  onClick,
  onSubmit,
  disabled,
  iconOptions,
}) => {
  return (
    <div
      className={`btn text-center btn-${variant} ${
        fullWidth && "btn-full"
      } ${cssClasses?.join(" ")}`}
    >
      {iconOptions?.showStartIcon && iconOptions.startIcon && (
        <div className={`btn-icon btn-icon-start`}>{iconOptions.startIcon}</div>
      )}
      <button
        type={type}
        onClick={onClick}
        onSubmit={onSubmit}
        className={`${cssClasses?.join(" ")}${
          iconOptions?.showStartIcon &&
          iconOptions.startIcon &&
          "btn-with-icon-start"
        } ${
          iconOptions?.showEndIcon &&
          iconOptions.endIcon &&
          "btn-with-icon-end"
        }`}
        disabled={disabled}
      >
        {label}
      </button>
      {iconOptions?.showEndIcon && iconOptions.endIcon && (
        <div className={`btn-icon btn-icon-end`}>{iconOptions.endIcon}</div>
      )}
    </div>
  );
};

export default Button;
