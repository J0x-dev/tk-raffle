import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-[#b47e00] bg-white/50 px-2.5 py-0 text-base text-[rgb(138,42,43)] caret-[rgb(138,42,43)] ring-offset-background file:border-0 file:bg-transparent file:px-2.5 file:py-1.5 file:text-base file:font-normal file:text-[rgb(138,42,43)] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "shadow-[rgba(0,0,0,0.12)_0px_1px_1px_0px,rgba(180,126,0,0.25)_0px_2px_5px_0px]",
          "file:mr-4",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
