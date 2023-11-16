"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "primary"
    | "ghost"
    | "link";
}

export function FormSubmit({ children, disabled, className, variant }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={disabled || pending}
      className={className}
      variant={variant}
    >
      {children}
    </Button>
  );
}
