"use client";

import { FaPlus, FaRedditAlien } from "react-icons/fa";
import { Input } from "./ui/input";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { CreatePost } from "./create-post";

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-10 py-3">
      <div className="flex items-center space-x-2">
        <FaRedditAlien className="h-8 w-8 text-white" />
        <span className="text-3xl font-extrabold tracking-tight">inki</span>
      </div>
      <div className="flex items-center space-x-4">
        <Input placeholder="Search" type="search" />
        <Dialog>
          <DialogTrigger className="flex w-72 items-center justify-center space-x-2 rounded bg-red-900 px-4 py-2 text-white">
            <FaPlus className="h-6 w-6" />
            <span>Create Post</span>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Create Post</DialogTitle>
            <DialogDescription>
              Isi data-data berikut untuk membuat post baru
            </DialogDescription>
            <CreatePost />
          </DialogContent>
        </Dialog>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
