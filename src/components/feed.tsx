"use client";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import Image from "next/image";
import { FaArrowDown, FaArrowUp, FaComment, FaEllipsisH } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PiCaretUpDownFill } from "react-icons/pi";
import { Command, CommandItem, CommandList } from "./ui/command";
import { type FeedType } from "./inki";
import Link from "next/link";
import { api } from "@/trpc/react";
import { unstable_noStore } from "next/cache";

export const Feed = ({ data }: { data: FeedType[] }) => {
  unstable_noStore();
  const upvote = api.post.setUpvote.useMutation({});
  const downvote = api.post.setDownvote.useMutation({});

  const handleUpvote = (id: number) => {
    upvote.mutate({ id });
  };

  const handleDownvote = (id: number) => {
    downvote.mutate({ id });
  };

  return (
    <main className="flex-1 overflow-y-scroll p-4">
      <div className="mx-auto max-w-2xl space-y-2">
        <Popover>
          <PopoverTrigger className="flex items-center rounded-md border px-3 py-2 text-sm">
            Sort
            <PiCaretUpDownFill className="ml-3 text-muted-foreground" />
          </PopoverTrigger>
          <PopoverContent className="w-40 p-1">
            <Command>
              <CommandList>
                <CommandItem>
                  <Link className="w-full" href="/sort/newest">
                    Newest
                  </Link>
                </CommandItem>
                <CommandItem>
                  <Link className="w-full" href="/sort/oldest">
                    Oldest
                  </Link>
                </CommandItem>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {data.map((post, index) => {
          const date = new Date(post.createdAt * 1000).toLocaleString();

          return (
            <Card key={index} className="">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm">
                    <Badge variant="secondary">Menunggu</Badge>
                    <span className="text-gray-400">
                      {post.province} · {date.toLocaleString()}
                    </span>
                  </div>
                  <FaEllipsisH className="h-6 w-6" />
                </div>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {post.image !== "" ? (
                  <>
                    <Image
                      alt="Post content"
                      className="w-full rounded-md"
                      height="400"
                      src={post.image}
                      style={{
                        aspectRatio: "600/400",
                        objectFit: "cover",
                      }}
                      width="600"
                    />
                    <p className="my-2 text-muted-foreground">{post.content}</p>
                  </>
                ) : (
                  <p className="text-muted-foreground">{post.content}</p>
                )}
              </CardContent>
              <CardFooter className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center rounded-full bg-gray-100/10">
                    <Button
                      className="flex items-center space-x-1 rounded-full hover:rounded-full hover:text-red-500"
                      variant="ghost"
                      onClick={() => handleUpvote(post.id)}
                    >
                      <FaArrowUp className="h-6 w-6" />
                    </Button>
                    <span className="font-bold">{post.score}</span>
                    <Button
                      className="flex items-center space-x-1 rounded-full hover:rounded-full hover:text-red-500"
                      variant="ghost"
                      onClick={() => handleDownvote(post.id)}
                    >
                      <FaArrowDown className="h-6 w-6" />
                    </Button>
                  </div>
                  <Button
                    className="flex items-center space-x-1"
                    variant="ghost"
                  >
                    <FaComment className="h-6 w-6" />
                    <span>{post.commentCount}</span>
                  </Button>
                </div>
                <Button variant="ghost">
                  <span>Share</span>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
};
