import React from "react";
import CardWrapper from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Something went wrong!"
      backButtonLabel="Back to Login!"
      backButtonHref="/auth/login"
    >
      <div className="flex justify-center align-middle font-bold">
        <ExclamationTriangleIcon className="w-20 h-20 text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default React.memo(ErrorCard);
