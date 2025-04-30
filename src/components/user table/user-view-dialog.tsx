"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { IUser } from "@/interfaces/user.interface"

interface UserViewDialogProps {
  user: IUser
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UserViewDialog({ user, open, onOpenChange }: UserViewDialogProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const getRoleBadgeColor = (role: IUser["role"]) => {
    switch (role) {
      case "super_admin":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "admin":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>Detailed information about the user.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback className="text-lg">{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <div className="grid w-full grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
            <span className="font-medium text-muted-foreground">Email:</span>
            <span>{user.email}</span>

            <span className="font-medium text-muted-foreground">Provider:</span>
            <span className="capitalize">{user.provider}</span>

            <span className="font-medium text-muted-foreground">Role:</span>
            <div>
              <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                {user.role.replace("_", " ")}
              </Badge>
            </div>

            <span className="font-medium text-muted-foreground">ID:</span>
            <span className="truncate">{user._id}</span>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
