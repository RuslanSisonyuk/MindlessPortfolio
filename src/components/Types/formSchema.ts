import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must have at least 2 characters"
    }),
    email: z.string().email({
        message: "Enter a valid email address"
    }),
    mail_message: z.string().min(15, {
        message: "The message must have at least 15 characters"
    })

})