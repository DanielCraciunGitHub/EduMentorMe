"use client"

import { useState } from "react"
import { Logger } from "@/Logger"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { tutorFormSchema } from "@/lib/validations/form"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import InputField from "@/components/Forms/InputField"
import { SpinnerButton } from "@/components/SpinnerButton"
import { trpc } from "@/app/_trpc/client"

const TutorForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const { mutateAsync: insertBookingData } =
    trpc.bookingRouter.sendBookingDataToDatabase.useMutation()
  const { mutateAsync: sendBookingEmail } =
    trpc.bookingRouter.sendBookingEmail.useMutation()

  const form = useForm<z.infer<typeof tutorFormSchema>>({
    resolver: zodResolver(tutorFormSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      booking_date: undefined,
      booking_time: "00:00",
    },
  })

  async function onSubmit(data: z.infer<typeof tutorFormSchema>) {
    setIsSubmitting(true)
    try {
      await insertBookingData(data)
      await sendBookingEmail(data)

      toast({
        title: "Booking Complete!",
        description: "We will be in touch with you shortly.",
        variant: "constructive",
      })
    } catch (error: any) {
      toast({
        title: "Booking Failed!",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex space-x-4">
          <InputField
            name="name"
            label="Name"
            placeholder="John"
            control={form.control}
          />
          <InputField
            name="surname"
            label="Surname"
            placeholder="Doe"
            control={form.control}
          />
        </div>
        <InputField
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          control={form.control}
        />
        <InputField
          name="phone"
          type="tel"
          label="Phone Number"
          placeholder="07839203882, +447839203882"
          control={form.control}
        />
        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="booking_date"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto border border-muted-foreground/50 p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      disabled={(date) => {
                        return (
                          date < new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
                        )
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <InputField
            name="booking_time"
            type="time"
            label="Time"
            control={form.control}
            className="flex flex-col"
          />
        </div>
        <SpinnerButton type="submit" name="Submit" state={isSubmitting} />
      </form>
    </Form>
  )
}

export default TutorForm
