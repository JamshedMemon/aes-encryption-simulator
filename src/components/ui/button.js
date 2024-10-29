import React from 'react';

const Button = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      className={`button ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export default Button;