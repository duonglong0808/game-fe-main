import React, { forwardRef, HTMLAttributes } from 'react';

interface SvgColorProps extends HTMLAttributes<HTMLSpanElement> {
  src: string;
}

const SvgColor = forwardRef<HTMLSpanElement, SvgColorProps>(
  ({ src, className, ...otherProps }, ref) => (
    <span
      className={`inline-block w-24 h-24 bg-current ${className}`}
      ref={ref}
      style={{
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
      }}
      {...otherProps}
    />
  )
);

export default SvgColor;
