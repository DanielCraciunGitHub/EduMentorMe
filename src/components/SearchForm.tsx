"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { resources } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import { capitalizeWords } from "@/lib/utils"
import { searchFormSchema } from "@/lib/validations/form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { SpinnerButton } from "./SpinnerButton"

type Inputs = z.infer<typeof searchFormSchema>

interface SearchFormProps {
  resources: resources
}

export function SearchForm({ resources }: SearchFormProps) {
  const [isSearching, setIsSearching] = useState<boolean>(false)

  const router = useRouter()
  const form = useForm<Inputs>({
    resolver: zodResolver(searchFormSchema),
  })

  function onSubmit(data: Inputs) {
    setIsSearching(true)
    router.push(`${data.level}/${data.subject}/${data.examboard}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger title="Combobox Level">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {resources.levels.map((level) => (
                    <SelectItem value={level} key={level}>
                      {capitalizeWords(level)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger title="Combobox Subject">
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <ScrollArea className="h-60">
                    {resources.subjects.map((subject) => (
                      <SelectItem value={subject} key={subject}>
                        {capitalizeWords(subject)}
                      </SelectItem>
                    ))}
                  </ScrollArea>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="examboard"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger title="Combobox Exam Board">
                    <SelectValue placeholder="Exam Board" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {resources.examBoards.map((examboard) => (
                    <SelectItem value={examboard} key={examboard}>
                      {examboard.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <SpinnerButton
          name="Search 🔍"
          state={isSearching}
          type="submit"
          className="w-full"
          variant="outline"
        />
      </form>
    </Form>
  )
}
