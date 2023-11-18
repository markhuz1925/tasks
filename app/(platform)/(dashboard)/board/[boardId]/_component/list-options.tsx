"use client";

import { List } from "@prisma/client";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  AlertCircleIcon,
  CheckCircle2,
  CopyIcon,
  MoreHorizontalIcon,
  PlusIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import { FormSubmit } from "@/components/form/form-submit";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { deleteList } from "@/actions/delete-list";
import { toast } from "sonner";
import { ElementRef, useRef } from "react";

export function ListOptions({
  data,
  onAddCard,
}: {
  data: List;
  onAddCard: () => void;
}) {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast(
        <div className="flex items-center gap-x-2">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          {`List ${data.title} deleted!`}
        </div>
      );
      closeRef.current?.click();
    },
    onError: (error) => {
      toast(
        <div className="flex items-center gap-x-2">
          <AlertCircleIcon className="w-4 h-4 text-red-500" /> {error}
        </div>
      );
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeDelete({ id, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="w-auto h-auto p-2">
          <MoreHorizontalIcon className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4 border-b">
          List actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            variant="ghost"
            className="w-auto h-auto p-2 absolute top-2 right-2 text-neutral-600"
          >
            <XIcon className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          //disabled={isLoading}
          variant="ghost"
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Card
        </Button>
        <form>
          <input hidden id="id" name="id" value={data.id} />
          <input hidden id="boardId" name="boardId" value={data.boardId} />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            <CopyIcon className="w-4 h-4 mr-2" />
            Copy List
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input hidden id="id" name="id" value={data.id} />
          <input hidden id="boardId" name="boardId" value={data.boardId} />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm hover:text-red-500"
          >
            <Trash2Icon className="w-4 h-4 mr-2" />
            Delete this board
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
}
