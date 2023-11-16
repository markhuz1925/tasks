import Hint from "@/components/hint";
import { HelpCircleIcon, User2Icon } from "lucide-react";

export default function BoardList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2Icon className="w-6 h-6 mr-2" />
        Your boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          role="button"
          className="aspect-video relative w-full h-full bg-muted rounded-sm flex flex-col items-center justify-center gap-y-1 hover:opacity-75 transition"
        >
          <p className="text-sm">Create new board</p>
          <span className="text-xs">5 remaining</span>
          <Hint
            sideOffset={40}
            desription={`Free Workspaces can have upto 5 open boards. For unlimited board upgrade this workspace.`}
          >
            <HelpCircleIcon className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
          </Hint>
        </div>
      </div>
    </div>
  );
}
