import React from 'react';

type LoaderProps = React.SVGAttributes<SVGElement> & {
  className?: string;
};

function Loader({ className = '', ...props }: LoaderProps) {
  return (
    <svg
      data-testid="loader"
      fill="#c90606"
      className={`loader ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      width="200px"
      height="200px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      {...props}
    >
      <path d="M9 50A41 41 0 0 0 91 50A41 42.7 0 0 1 9 50" stroke="none">
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="1s"
          repeatCount="indefinite"
          keyTimes="0;1"
          values="0 50 50.85;360 50 50.85"
        />
      </path>
    </svg>
  );
}

export default Loader;
