import React from "react";

interface FormattedTextProps {
  leftContent: string;
  rightContent: string;
  className?: string;
}

const FormattedText: React.FC<FormattedTextProps> = ({
  leftContent,
  rightContent,
  className = "",
}) => {
  return (
    <div className={`w-full text-base font-light ${className}`}>
      {/* Desktop: vertical centered layout */}
      <div className="hidden md:flex flex-col items-center text-center space-y-1">
        <div>{leftContent}</div>
        <div>{rightContent}</div>
      </div>
      
      {/* Mobile: split content into separate lines */}
      <div className="md:hidden flex flex-col items-center text-center space-y-1">
        {leftContent.includes(':') ? (
          <>
            <div>{leftContent.split(':')[0]}:</div>
            <div>{leftContent.split(':')[1].trim()}</div>
          </>
        ) : (
          <div>{leftContent}</div>
        )}
        {rightContent.includes(',') ? (
          rightContent.split(',').map((item, index) => (
            <div key={index}>{item.trim()}</div>
          ))
        ) : (
          <div>{rightContent}</div>
        )}
      </div>
    </div>
  );
};

export default FormattedText;
