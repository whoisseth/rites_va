"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toast } from "@/components/ui/use-toast";

import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserFormValues, userFormSchema } from "./type";

// This can come from your database or API.
const defaultValues: Partial<UserFormValues> = {
  name: "",
  description: ""
};

const createUser = async (data: UserFormValues) => {
  const { data: response } = await axios.post(
    `${process.env.NEXT_PUBLIC_HOST_URL}/api/user/create`,
    data
  );
  return response.data;
};

export default function ProfileForm() {
  const queryClient = useQueryClient();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
    mode: "onChange"
  });

  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return axios.post("/todos", newTodo);
    }
  });
  const { mutate } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  });

  function onSubmit(data: UserFormValues) {
    mutate(data);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    });
  }

  return (
    <div className="max-w-96">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter User Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>description</FormLabel>
                <FormControl>
                  <Input placeholder="description..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Update profile</Button>
        </form>
      </Form>
    </div>
  );
}
