"use client";

import { updateCard } from "@/actions/update-card";
import { FormInput } from "@/components/form/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { AlertCircleIcon, CheckCircle2, LayoutIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

export function Header({ data }: { data: CardWithList }) {
  const [title, setTitle] = useState(data.title);
  const queryClient = useQueryClient();
  const params = useParams();
  const inputRef = useRef<ElementRef<"input">>(null);
  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["card", data.id] });
      toast(
        <div className="flex items-center gap-x-2">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          {`Renamed "${data.title}"`}
        </div>
      );
      setTitle(data.title);
    },
    onError: (error) => {
      toast(
        <div className="flex items-center gap-x-2">
          <AlertCircleIcon className="w-4 h-4 text-red-500" /> {error}
        </div>
      );
    },
  });

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;

    if (title === data.title) return;

    execute({
      title,
      boardId,
      id: data.id,
    });
  };

  return (
    <div className="flex items-center gap-x-3 mb-6 w-full">
      <LayoutIcon className="w-5 h-5 mt-1 text-neutral-700" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            id="title"
            defaultValue={title}
            ref={inputRef}
            onBlur={onBlur}
            className="fon-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
          />
        </form>
        <p className="text-sm text-muted-foreground">
          in list <span className="underline">{data.list.title}</span>
        </p>
      </div>
    </div>
  );
}

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton className="w-6 h-6 mt-1 bg-neutral-200" />
      <div>
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-12 h-4 bg-neutral-200" />
      </div>
    </div>
  );
};
