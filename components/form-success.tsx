import React from "react";

import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
  message?: string;
}

const FormSuccess = ({ message }: FormSuccessProps) => {
  return (
    message && (
      <div className="bg-emerald-500/15 p-3 flex items-center gap-x-2 text-sm text-emerald-500 rounded-md shadow-sm">
        <CheckCircledIcon className="w-4 h-4" />
        <p>{message}</p>
      </div>
    )
  );
};

export default React.memo(FormSuccess);
