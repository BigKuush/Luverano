import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap lg:text-lg text-sm leading-normal font-medium rounded-lg transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none lg:[&_svg]:size-auto [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white shadow border-transparent border hover:bg-transparent hover:border-primary hover:text-secondary-foreground",
        destructive:
          "bg-destructive text-gray-3-foreground border-destructive border hover:bg-transparent hover:text-gray-3-foreground",
        outline:
          "border border-primary bg-transparent text-secondary-foreground hover:bg-primary hover:text-white ",
        secondary:
          "bg-primary text-white hover:bg-transparent hover:text-secondary-foreground border-primary border",
        ghost: "hover:bg-accent hover:text-gray-2-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "lg:px-8 md:px-6 px-5 lg:py-4 py-2.5",
        medium: "lg:px-6 md:px-5 px-4 lg:py-2.5 py-2",
        sm: "px-4 py-2",
        xm: "px-4 py-1.5 leading-6 lg:text-base rounded-sm",
        lg: "px-6 py-2.5",
        icon: "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
