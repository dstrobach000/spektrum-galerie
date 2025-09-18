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
      {/* Centered two-line layout for all screen sizes */}
      <div className="flex flex-col items-center text-center space-y-1">
        <div>{leftContent}</div>
        <div>{rightContent}</div>
      </div>
    </div>
  );
};

export default FormattedText;
