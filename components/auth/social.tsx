"use client";

import React, { useCallback } from "react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAUTLT_LOGIN_REDIRECT } from "@/routes";

const Social = () => {
  const onClick = useCallback((providers: "google" | "github") => {
    signIn(providers, {
      callbackUrl: DEFAUTLT_LOGIN_REDIRECT,
    });
  }, []);

  return (
    <div className="w-full flex items-center gap-x-2">
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => onClick("github")}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default React.memo(Social);
