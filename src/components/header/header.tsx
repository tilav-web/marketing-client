import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header({ children }: { children: ReactNode }) {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <header className="w-full mt-2 p-2 border-b">
      <nav className="flex items-center justify-between">
        <div>
          {children}
          <div></div>
        </div>
        <div className="flex items-center gap-2 cursor-pointer border-l pl-4 w-[210px]">
          <Avatar className="w-14 h-14">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="uppercase">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold line-clamp-1">{user?.name}</p>
            <p className="text-sm">{user?.role}</p>
          </div>
        </div>
      </nav>
    </header>
  );
}
