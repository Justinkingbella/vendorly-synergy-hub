
import * as React from "react"
import { Menu, X } from "lucide-react"
import { cva, VariantProps } from "class-variance-authority" 

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface SidebarContextValue {
  active: boolean
  setActive: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(
  undefined
)

function useSidebarContext() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider")
  }
  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
  defaultActive?: boolean
}

function SidebarProvider({
  children,
  defaultActive = false,
}: SidebarProviderProps) {
  const [active, setActive] = React.useState(defaultActive)
  return (
    <SidebarContext.Provider value={{ active, setActive }}>
      {children}
    </SidebarContext.Provider>
  )
}

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { active } = useSidebarContext()
  return (
    <div
      ref={ref}
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex max-h-screen w-3/4 flex-col border-r bg-sidebar dark:border-r-sidebar-border transition-transform sm:w-full sm:max-w-[280px]",
        active ? "translate-x-0" : "-translate-x-full sm:translate-x-0",
        className
      )}
      {...props}
    />
  )
})
Sidebar.displayName = "Sidebar"

const SidebarOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { active, setActive } = useSidebarContext()

  return (
    <div
      ref={ref}
      role="button"
      aria-controls="sidebar"
      aria-expanded={active}
      onClick={() => setActive(false)}
      className={cn(
        "fixed inset-0 z-40 bg-black/50 transition-opacity sm:hidden",
        active ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        className
      )}
      tabIndex={-1}
      {...props}
    />
  )
})
SidebarOverlay.displayName = "SidebarOverlay"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex h-14 items-center gap-2 border-b bg-sidebar px-4", className)}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-auto py-2", className)}
    {...props}
  />
))
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4", className)} {...props} />
))
SidebarFooter.displayName = "SidebarFooter"

const sidebarGroupVariants = cva("", {
  variants: {
    variant: {
      default: "pb-4 pt-2",
      bordered: "border-b pb-5 pt-3",
      heading: "border-b py-4",
      flat: "py-2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface SidebarGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarGroupVariants> {}

const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ children, className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(sidebarGroupVariants({ variant }), className)}
      {...props}
    >
      {children}
    </div>
  )
)
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-4 text-xs font-medium text-sidebar-foreground/60", className)}
    {...props}
  />
))
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mt-2", className)} {...props} />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-2", className)} {...props} />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean
    active?: boolean
  }
>(({ className, active, asChild = false, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : "button"
  return (
    <Comp
      ref={ref}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "h-9 w-full justify-start rounded-md px-3 text-sm font-medium text-sidebar-foreground transition-colors",
        active && "bg-sidebar-accent text-sidebar-accent-foreground font-semibold",
        "hover:bg-primary/10 hover:text-primary",
        "focus:bg-primary/10 focus:text-primary",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { triggerIcon?: React.ReactNode }
>(({ className, triggerIcon, ...props }, ref) => {
  const { active, setActive } = useSidebarContext()
  const Icon = active ? X : Menu
  return (
    <>
      <SidebarOverlay />
      <button
        ref={ref}
        onClick={() => setActive(!active)}
        className={cn(
          "fixed left-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-md border bg-background shadow-sm sm:hidden",
          className
        )}
        {...props}
      >
        {triggerIcon || <Icon className="h-4 w-4" />}
      </button>
    </>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarOverlay,
  SidebarProvider,
  SidebarTrigger,
  useSidebarContext,
}
