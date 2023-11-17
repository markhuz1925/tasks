"use client";

import { updateBoard } from "@/actions/update-board";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Board } from "@prisma/client";
import { AlertCircleIcon, CheckCircle2 } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

export function BoardTitleForm({ data }: { data: Board }) {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast(
        <div className="flex items-center gap-x-2">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          {`Board ${data.title} updated!`}
        </div>
      );
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast(
        <div className="flex items-center gap-x-2">
          <AlertCircleIcon className="w-4 h-4 text-red-500" /> {error}
        </div>
      );
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    if (!title) return;

    execute({ title, id: data.id });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2 w-full"
      >
        <FormInput
          id="title"
          ref={inputRef}
          defaultValue={title}
          onBlur={onBlur}
          className="text-lg font-bold px-[7px] py-1 h-7 w-full bg-transparent border-none"
        />
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditing}
      variant="transparent"
      className="font-bold text-lg w-auto h-auto p-1 px-2"
    >
      {title}
    </Button>
  );
}
