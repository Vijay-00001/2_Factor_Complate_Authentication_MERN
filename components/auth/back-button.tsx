import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}

const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <div className="w-full font-normal">
      <Button variant="link" size="sm" className="w-full" asChild>
        <Link href={href}>{label}</Link>
      </Button>
    </div>
  );
};

export default React.memo(BackButton);
