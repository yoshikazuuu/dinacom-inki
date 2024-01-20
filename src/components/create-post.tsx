"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { api } from "@/trpc/react";

const formSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  image: z.string(),
  score: z.number(),
  commentCount: z.number(),
  createdAt: z.number(),
  link: z.string(),
  province: z.string().min(1),
});

export function CreatePost() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      score: 0,
      commentCount: 0,
      createdAt: new Date().getTime() / 1000,
    },
  });

  const submitData = api.post.createFeed.useMutation({
    onSuccess: () => {
      toast.success("Boat added ✅", {
        description: (
          <div>
            <p>Sukses ditambahkan</p>
            <p>
              {new Date().toLocaleString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </p>
          </div>
        ),
      });
    },
    onError: (error) => {
      toast.error("Boat failed to add ❌", {
        description: (
          <div>
            <p>{error.message}</p>
          </div>
        ),
      });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    form.reset();
    submitData.mutate(data);
    toast.message("Adding boat ⏳", {
      description: (
        <div>
          <p>
            {new Date().toLocaleString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            })}
          </p>
        </div>
      ),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex flex-col gap-2 text-left">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-bold">Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="ex: Lubang besar di Jalan Thamrin"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-bold">Content</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Content" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-bold">Image</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="ex: https://web.com/image.png"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-bold">Link</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Link" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-bold">Province</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Province" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
