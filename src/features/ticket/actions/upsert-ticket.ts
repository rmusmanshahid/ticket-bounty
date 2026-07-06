"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  type ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";

const upsertTicketSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "Title is required" })
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(191, { message: "Title cannot exceed 191 characters" }),
  content: z
    .string()
    .nonempty({ message: "Content is required" })
    .min(10, { message: "Content must be at least 10 characters long" })
    .max(1024, { message: "Content cannot exceed 1024 characters" }),
});

export const upsertTicket = async (
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData,
) => {
  try {
    const data = upsertTicketSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
    });

    await prisma.ticket.upsert({
      where: { id: id || "" },
      update: data,
      create: data,
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(ticketsPath());

  if (id) {
    redirect(ticketPath(id));
  }

  return toActionState("SUCCESS", "Ticket created");
};
