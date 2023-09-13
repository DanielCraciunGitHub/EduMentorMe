import { HTMLAttributes } from "react"
import { Control } from "react-hook-form"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface FormFieldProps extends HTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  description?: string
  placeholder?: string
  type?: "text" | "password" | "textarea" | "tel" | "time"
  control: Control<any>
}

const GenericFormField = ({
  name,
  label,
  description,
  placeholder,
  type = "text",
  control,
  className,
}: FormFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormDescription className={description ? "visible" : "hidden"}>
            {description}
          </FormDescription>
          <FormControl>
            {type === "textarea" ? (
              <Textarea placeholder={placeholder} rows={10} {...field} />
            ) : (
              <Input placeholder={placeholder} type={type} {...field} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default GenericFormField
