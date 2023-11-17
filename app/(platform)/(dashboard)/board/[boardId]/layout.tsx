import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { startCase } from "lodash";
import { notFound, redirect } from "next/navigation";
import { BoardNavbar } from "./_component/board-navbar";

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const { orgId } = auth();
  if (!orgId)
    return {
      title: "Board",
    };

  const board = await prisma.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  return {
    title: startCase(board?.title || "Board"),
  };
}

export default async function BoardIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) {
  const { orgId } = auth();
  if (!orgId) return redirect("/select-org");

  const board = await prisma.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  if (!board) notFound();

  return (
    <div
      className="relative h-full bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <div className="absolute inset-0 bg-black/10" />
      <BoardNavbar data={board} />
      <main className="relative pt-28 h-full">{children}</main>
    </div>
  );
}
