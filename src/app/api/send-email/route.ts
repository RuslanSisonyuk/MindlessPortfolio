import { type NextRequest, NextResponse } from "next/server"
import { formSchema } from "@/components/Types/formSchema"
import { Resend } from 'resend';
import { z } from "zod";

export async function POST(request: NextRequest) {
    try {
        console.log("I'M HERE");
        const body = await request.json();

        const validatedData = formSchema.parse(body);

        const resend = new Resend(process.env.RESEND_API_KEY);

        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'randomrocketgalaxy@gmail.com',
            subject: 'Contact request from ' + validatedData.name + ' - ' + validatedData.email,
            html: `<p>${validatedData.mail_message.replace(/\n/g, '<br>')}</p>`,
        })

        if (error) {
            return NextResponse.json({ error: 'Failed to send email34232342' }, { status: 500 })
        }

        return NextResponse.json({
            success: true,
            message: "Email sent successfully!"+data?.id,
        })
    }
    catch (error) {
        if (error instanceof z.ZodError) {
          return NextResponse.json({ error: "Invalid request data", details: error.errors }, { status: 400 })
        }
    
        console.error("Email sending error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}