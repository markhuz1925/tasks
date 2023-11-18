import { ListWithCards } from "@/types";
import { ListHeader } from "./list-header";

export function ListItem({
  index,
  data,
}: {
  index: number;
  data: ListWithCards;
}) {
  return (
    <li className="shrink-0 w-[272px] h-full select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader data={data} />
      </div>
    </li>
  );
}
