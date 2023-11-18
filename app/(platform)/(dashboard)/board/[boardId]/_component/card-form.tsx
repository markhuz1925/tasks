"use client";

import { createCard } from "@/actions/create-card";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { AlertCircleIcon, CheckCircle2, PlusIcon, XIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface Props {
  listId: string;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
}

export const CardForm = forwardRef<HTMLTextAreaElement, Props>(
  ({ listId, isEditing, enableEditing, disableEditing }, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") disableEditing();
    };

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        toast(
          <div className="flex items-center gap-x-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            {`Card ${data.title} created!`}
          </div>
        );
        formRef.current?.reset();
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

    const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const boardId = params.boardId as string;

      execute({ title, listId, boardId });
    };

    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={onSubmit}
          className="m-1 py-0.5 px-1 space-y-4"
        >
          <FormTextarea
            ref={ref}
            id="title"
            onKeyDown={onTextareaKeyDown}
            placeholder="Enter a title for this card"
            errors={fieldErrors}
          />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add Card</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <XIcon className="w-5 h-5" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="pt-2 px-2">
        <Button
          onClick={enableEditing}
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
          size="sm"
          variant="ghost"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add a Card
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";
