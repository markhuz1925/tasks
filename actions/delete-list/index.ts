"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { DeleteList } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) return { error: "Unauthorized" };

  const { id, boardId } = data;

  let list;

  try {
    list = await prisma.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    });
  } catch (error) {
    return { error: "Failed to delete list" };
  }

  revalidatePath(`/organization/${boardId}`);

  return { data: list };
};

export const deleteList = createSafeAction(DeleteList, handler);
