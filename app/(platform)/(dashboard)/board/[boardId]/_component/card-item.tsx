"use client";

import { Card } from "@prisma/client";

export function CardItem({ index, data }: { index: number; data: Card }) {
  return (
    <div
      role="button"
      className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
    >
      {data.title}
    </div>
  );
}
