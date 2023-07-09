import { FC } from "react"
import { Control } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"

interface FormFieldProps {
  name: string
  label: string
  placeholder?: string
  type?: "text" | "password" | "textarea"
  control: Control<any>
}

const GenericFormField: FC<FormFieldProps> = ({
  name,
  label,
  placeholder,
  type = "text",
  control,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === "textarea" ? (
              <Textarea placeholder={placeholder} {...field} />
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
