import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface Props {
  children: React.ReactNode;
  desription: string;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
}

export default function Hint({
  children,
  desription,
  side = "bottom",
  sideOffset = 0,
}: Props) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          className="text-xs max-w-[220px] break-words"
        >
          {desription}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
