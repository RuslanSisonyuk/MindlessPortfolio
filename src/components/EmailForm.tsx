import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { formSchema } from "./Types/formSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";

export default function EmailForm(){
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ isSuccess, setIsSuccess ] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
    }>({ type: null, message: "" });


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          email: "",
          mail_message: ""
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);

        try {
            console.log("Sending email...", values);

            const response = await fetch("/api/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
            });

            const result = await response.json();

            if (response.ok) {
            setSubmitStatus({
                type: "success",
                message: result.message || "Email sent successfully!",
            })
            form.reset()
            } else {
            setSubmitStatus({
                type: "error",
                message: result.error || "Failed to send email",
            })
            console.log(result.error);
            }

            console.log("Submit status: " + submitStatus.message);

            setIsSuccess(true);
            form.reset();

            setTimeout(() => setIsSuccess(false), 3000);
        } 
        catch(error){
            console.error("Failed to send email: ", error);
            setSubmitStatus({
            type: "error",
            message: "Network error. Please check your connection and try again.",
            })
        }
        finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='flex flex-col w-full'>
            <Form { ...form }>
              <form className="grid gap-4 py-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={ form.control }
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='font-title-light text-[#eee]'>Name</FormLabel>
                        <FormControl>
                          <Input { ...field } className='rounded-[2px] bg-[#241F1F] border-[#818181] hover:border-bg-primary'></Input>
                        </FormControl>
                        <FormMessage/>
                      </FormItem> 
                    )}
                  />
                <FormField
                    control={ form.control }
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='font-title-light text-[#eee]'>Email</FormLabel>
                        <FormControl>
                          <Input { ...field } className='rounded-[2px] bg-[#241F1F] border-[#818181] hover:border-bg-primary'></Input>
                        </FormControl>
                        <FormMessage/>
                      </FormItem> 
                    )}
                  />
                <FormField
                    control={ form.control }
                    name="mail_message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='font-title-light text-[#eee]'>Message</FormLabel>
                        <FormControl>
                          <Textarea { ...field } className='rounded-[2px] bg-[#241F1F] border-[#818181] hover:border-bg-primary outline-none focus:outline-none focus:outline-bg-primary min-h-[10rem]'></Textarea>
                        </FormControl>
                        <FormMessage/>
                      </FormItem> 
                    )}
                  />
                  <Button 
                    className="rounded-[2px] bg-bg-secondary w-min cursor-pointer hover:bg-bg-secondary-hover" 
                    disabled={ isSubmitting || isSuccess }
                    type='submit'>{isSuccess ? "EMAIL SENT!" : "SEND"}</Button>
              </form>
            </Form>
          </div>
    )
}