"use client";

import { List } from "@prisma/client";

export function ListHeader({ data }: { data: List }) {
  return (
    <div className="pt-2 px-2 text-sm font-semibold flex items-start justify-between gap-x-2">
      <div className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent">
        {data.title}
      </div>
    </div>
  );
}
