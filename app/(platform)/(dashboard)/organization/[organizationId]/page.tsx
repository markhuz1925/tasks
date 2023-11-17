import { Separator } from "@/components/ui/separator";
import Info from "./_component/info";
import BoardList from "./_component/board-list";
import { Suspense } from "react";

export default function OrganizationIdPage() {
  return (
    <div className="w-full mb-20">
      <Info />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  );
}
