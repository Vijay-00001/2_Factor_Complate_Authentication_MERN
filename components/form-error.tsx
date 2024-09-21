import React from "react";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
  message?: string;
}

const FormError = ({ message }: FormErrorProps) => {
  return (
    message && (
      <div className="bg-destructive/15 p-3 flex items-center gap-x-2 text-sm text-destructive rounded-md shadow-sm">
        <ExclamationTriangleIcon className="w-4 h-4" />
        <p>{message}</p>
      </div>
    )
  );
};

export default React.memo(FormError);
