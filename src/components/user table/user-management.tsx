"use client";

import { useEffect, useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Search, Edit, Trash2, Eye } from "lucide-react";
import { UserEditDialog } from "./user-edit-dialog";
import { UserDeleteDialog } from "./user-delete-dialog";
import { UserViewDialog } from "./user-view-dialog";
import { IUser } from "@/interfaces/user.interface";
import { userService } from "@/services/user.service";

export default function UserManagement() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [viewingUser, setViewingUser] = useState<IUser | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null); // Har bir user uchun menu holati
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map()); // Trigger tugmalari uchun ref

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    (async () => {
      try {
        const data = await userService.findAll();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleEditUser = (user: IUser) => {
    setEditingUser(user);
    setMenuOpen(null); // Menuni yopish
  };

  const handleDeleteUser = (userId: string) => {
    setDeletingUserId(userId);
    setMenuOpen(null); // Menuni yopish
  };

  const handleViewUser = (user: IUser) => {
    setViewingUser(user);
    setMenuOpen(null); // Menuni yopish
  };

  const handleSaveUser = async (updatedUser: IUser) => {
    try {
      const data = await userService.update(updatedUser._id, {
        name: updatedUser.name,
        role: updatedUser.role,
      });
      setUsers((prev) =>
        prev.map((user) =>
          user._id === updatedUser._id ? { ...user, ...data } : user
        )
      );
    } catch (error) {
      console.error(error);
    }
    setEditingUser(null);
    // Fokusni qayta tiklash
    if (triggerRefs.current.get(updatedUser._id)) {
      triggerRefs.current.get(updatedUser._id)?.focus();
    }
  };

  const handleConfirmDelete = async () => {
    if (deletingUserId) {
      try {
        const resUser = await userService.delete(deletingUserId);
        setUsers((prev) => prev.filter((user) => user._id !== resUser._id));
      } catch (error) {
        console.error(error);
      }
      setDeletingUserId(null);
      // Fokusni qayta tiklash
      if (triggerRefs.current.get(deletingUserId)) {
        triggerRefs.current.get(deletingUserId)?.focus();
      }
    }
  };

  const getRoleBadgeColor = (role: IUser["role"]) => {
    switch (role) {
      case "super_admin":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "admin":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Users</h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                        />
                        <AvatarFallback>
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="capitalize">{user.provider}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getRoleBadgeColor(user.role)}
                    >
                      {user?.role?.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu
                      open={menuOpen === user._id}
                      onOpenChange={(open) =>
                        setMenuOpen(open ? user._id : null)
                      }
                    >
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 cursor-pointer"
                          ref={(el) => {
                            if (el) {
                              triggerRefs.current.set(user._id, el);
                            } else {
                              triggerRefs.current.delete(user._id);
                            }
                          }}
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewUser(user);
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditUser(user);
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit user
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteUser(user._id);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete user
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit User Dialog */}
      {editingUser && (
        <UserEditDialog
          user={editingUser}
          open={!!editingUser}
          onOpenChange={(open) => !open && setEditingUser(null)}
          onSave={handleSaveUser}
        />
      )}

      {/* Delete User Dialog */}
      {deletingUserId && (
        <UserDeleteDialog
          open={!!deletingUserId}
          onOpenChange={(open) => !open && setDeletingUserId(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* View User Dialog */}
      {viewingUser && (
        <UserViewDialog
          user={viewingUser}
          open={!!viewingUser}
          onOpenChange={(open) => !open && setViewingUser(null)}
        />
      )}
    </div>
  );
}
