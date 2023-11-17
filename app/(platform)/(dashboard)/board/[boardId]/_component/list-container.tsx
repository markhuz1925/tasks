"use client";

import { ListWithCards } from "@/types";
import { ListForm } from "./list-form";

export function ListContainer({
  boardId,
  data,
}: {
  boardId: string;
  data: ListWithCards[];
}) {
  return (
    <ol>
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
}
