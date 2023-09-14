"use client"

import { useState } from "react"
import Link from "next/link"
import { initialSubjectData } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { resourcesConfig } from "@/config/resources"
import { subjectArraySchema, subjectFormSchema } from "@/lib/validations/form"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { trpc } from "@/app/_trpc/client"

const SubjectSelection = ({ subjectData }: initialSubjectData) => {
  const [subjects, setSubjects] = useState(subjectData ? true : false)

  const { mutate } = trpc.timerRouter.insertSubjectsAndTimes.useMutation({
    onMutate: () => {
      setSubjects(true)
      refetch()
    },
  })
  const { data, refetch } = trpc.timerRouter.getSubjectsAndTimes.useQuery(
    undefined,
    {
      refetchOnReconnect: false,
      initialData: subjectData,
    }
  )

  const form = useForm<z.infer<typeof subjectFormSchema>>({
    resolver: zodResolver(subjectFormSchema),
    defaultValues: {
      resources: [],
    },
  })

  function onSubmit({ resources }: z.infer<typeof subjectFormSchema>) {
    toast({
      title: "Preferences set!",
      description: (
        <div>
          Visit the{" "}
          <Link
            href="/study_timer"
            className="text-blue-600 dark:text-blue-400"
          >
            Study Timer
          </Link>{" "}
          and study these subjects!
        </div>
      ),
      variant: "constructive",
    })
    mutate(resources.map((subject) => ({ subject, time: "0" })))
  }
  return !subjects ? (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="resources"
          render={() => (
            <FormItem>
              <FormLabel className="text-base">Subject Preferences</FormLabel>
              <FormDescription>
                Select the subjects you are studying
              </FormDescription>

              {resourcesConfig.subjects.map((subject) => (
                <FormField
                  key={subject}
                  control={form.control}
                  name="resources"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={subject}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(subject)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, subject])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== subject
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{subject}</FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  ) : (
    <div className="space-y-4">
      <h1 className="text-center text-2xl">Subject Stats 📈</h1>
      <ul>
        {data?.map(({ subject, time }) => (
          <li key={subject}>
            {subject}: {time} Minute(s)
          </li>
        ))}
      </ul>
      <Button type="submit" onClick={() => setSubjects(false)}>
        Change Subjects
      </Button>
    </div>
  )
}

export default SubjectSelection
