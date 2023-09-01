"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import { ResourcesConfig } from "@/config/resources"
import { capitalizeWords } from "@/lib/utils"
import { searchFormSchema } from "@/lib/validations/form"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SpinnerButton } from "@/components/SpinnerButton"

type Inputs = z.infer<typeof searchFormSchema>

export function SearchForm({ examBoards, levels, subjects }: ResourcesConfig) {
  const [isSearching, setIsSearching] = useState<boolean>(false)

  const router = useRouter()
  const form = useForm<Inputs>({
    resolver: zodResolver(searchFormSchema),
  })

  function onSubmit({ level, subject, examBoard }: Inputs) {
    setIsSearching(true)
    router.push(`${level}/${subject}/${examBoard}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex w-full justify-center">
          <SpinnerButton
            name="Search 🔍"
            state={isSearching}
            disabled={!form.formState.isValid}
            type="submit"
            className="w-1/2"
            variant="outline"
          />
        </div>
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
                  {levels.map((level) => (
                    <SelectItem value={level} key={level}>
                      {capitalizeWords(level)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                  <ScrollArea className="h-40">
                    {subjects.map((subject) => (
                      <SelectItem value={subject} key={subject}>
                        {capitalizeWords(subject)}
                      </SelectItem>
                    ))}
                  </ScrollArea>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="examBoard"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger title="Combobox Exam Board">
                    <SelectValue placeholder="Exam Board" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {examBoards.map((examBoard) => (
                    <SelectItem value={examBoard} key={examBoard}>
                      {examBoard.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
