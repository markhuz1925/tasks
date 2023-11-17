"use client";

import { Button } from "@/components/ui/button";
import { Board } from "@prisma/client";

export function BoardTitleForm({ data }: { data: Board }) {
  return (
    <Button className="font-bold text-lg w-auto h-auto p-1 px-2">
      {data?.title}
    </Button>
  );
}
