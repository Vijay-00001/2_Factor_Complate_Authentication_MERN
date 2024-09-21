"use client";

import React from "react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Social = () => {
  return (
    <div className="w-full flex items-center gap-x-2">
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => {
          window.location.href = "/api/auth/google";
        }}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => {
          window.location.href = "/api/auth/github";
        }}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default React.memo(Social);
