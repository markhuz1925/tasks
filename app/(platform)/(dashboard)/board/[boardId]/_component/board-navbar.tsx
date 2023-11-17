import { Board } from "@prisma/client";
import { BoardOptions } from "./board-options";
import { BoardTitleForm } from "./board-title-form";

export async function BoardNavbar({ data }: { data: Board }) {
  return (
    <div className="w-full h-14 z-[40] top-14 bg-black/50 fixed flex items-center px-6 gap-x-4 text-white">
      <BoardTitleForm data={data} />
      <div className="ml-auto">
        <BoardOptions id={data.id} />
      </div>
    </div>
  );
}
