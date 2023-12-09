"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { CopyCard } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) return { error: "Unauthorized" };

  const { id, boardId } = data;

  let card;

  try {
    const cardToCopy = await prisma.card.findUnique({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });

    if (!cardToCopy) return { error: "Card not found" };

    const lastcard = await prisma.card.findFirst({
      where: { listId: cardToCopy.listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrdder = lastcard ? lastcard.order + 1 : 1;

    card = await prisma.card.create({
      data: {
        title: `${cardToCopy.title} (copy)`,
        description: cardToCopy.description,
        listId: cardToCopy.listId,
        order: newOrdder,
      },
    });
  } catch (error) {
    return { error: "Failed to copy card." };
  }

  revalidatePath(`/organization/${boardId}`);

  return { data: card };
};

export const copyCard = createSafeAction(CopyCard, handler);
