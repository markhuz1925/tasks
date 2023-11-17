"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontalIcon, XIcon } from "lucide-react";
import { ElementRef, useRef } from "react";

export function BoardOptions({ id }: { id: string }) {
  const closeRef = useRef<ElementRef<"button">>(null);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="transparent" className="w-auto h-auto p-2">
          <MoreHorizontalIcon className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Board actions
        </div>
        <PopoverClose asChild>
          <Button
            variant="ghost"
            className="w-auto h-auto p-2 absolute top-2 right-2 text-neutral-600"
          >
            <XIcon className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={() => {}}
          variant="ghost"
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm hover:text-red-500"
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
}
