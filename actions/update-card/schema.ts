import { z } from "zod";

export const UpdateCard = z.object({
  boardId: z.string(),
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, "Title must be at least 3 characters"),
  description: z.optional(
    z
      .string({
        required_error: "Description is required",
        invalid_type_error: "Description is required",
      })
      .min(3, "Description must be at least 3 characters")
  ),
  id: z.string(),
});
