import { Menu, School } from "lucide-react";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User log out.");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="h-16 fixed top-0 left-0 right-0 duration-300 bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-md z-10 ">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full px-4">
        <div className="flex items-center gap-2">
          <School size={"30"} />
          <Link to="/">
            <h1 className="hidden md:block font-extrabold text-2xl">
              E-Buddy
            </h1>
          </Link>
        </div>
        {/* User icons and dark mode icon  */}
        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-xl border border-gray-200 bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-xl text-black dark:text-white transition-all">
                <DropdownMenuLabel className="text-center font-semibold">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="hover:bg-white/90 dark:hover:bg-white/20 cursor-pointer transition-colors">
                    <Link to="/my-learning" className="w-full h-full">My Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-white/90 dark:hover:bg-white/20 cursor-pointer transition-colors">
                    <Link to="/profile" className="w-full h-full">Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler} className="hover:bg-white/90 dark:hover:bg-white/20 cursor-pointer transition-colors">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "creator" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="hover:bg-white/90 dark:hover:bg-white/20 cursor-pointer transition-colors">
                      <Link to="/admin/dashboard" className="w-full h-full">Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>



            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/login")}>Signup</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      {/* Mobile device  */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">E-Buddy</h1>
        <MobileNavbar user={user} />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = ({ user }) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-200"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle> <Link to="/">E-Learning</Link></SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4">
          <Link to="/my-learning">My Learning</Link>
          <Link to="/profile">Edit Profile</Link>
          <p>Log out</p>
        </nav>
        {user?.role === "creator" && (
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" onClick={() => navigate("/admin/dashboard")}>Dashboard</Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
