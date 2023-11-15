"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { CreateBoard } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();

  if (!userId) return { error: "Unauthorized" };

  const { title } = data;

  let board;

  try {
    board = await prisma.board.create({
      data: {
        title,
      },
    });
  } catch (error) {
    return { error: "Failed to create board" };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
