import { Board } from "@prisma/client";

export default async function BoardNavbar({ data }: { data: Board }) {
  return (
    <div className="w-full h-14 z-[40] top-14 bg-black/50 fixed flex items-center px-6 gap-x-4 text-white">
      board navbar
    </div>
  );
}
