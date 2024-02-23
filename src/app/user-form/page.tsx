/** @format */

"use client";

import Link from "next/link";
import DatePickerDemo from "@/date-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const userFormSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters."
  }),
  description: z.string()
});

type UserFormValues = z.infer<typeof userFormSchema>;

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
  const { mutate, isLoading } = useMutation(createUser, {
    onSuccess: (data) => {
      const message = "success";
      //   alert(message);
      console.log(message);
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    }
  });
  //   const onSubmit = (data: Employee) => {
  //     const employee = {
  //       ...data
  //     };
  //     mutate(employee);
  //   };

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
