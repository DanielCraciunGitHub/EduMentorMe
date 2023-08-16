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

interface FormFieldProps {
  name: string
  label: string
  description?: string
  placeholder?: string
  type?: "text" | "password" | "textarea"
  control: Control<any>
}

const GenericFormField = ({
  name,
  label,
  description,
  placeholder,
  type = "text",
  control,
}: FormFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormDescription>{description}</FormDescription>
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
