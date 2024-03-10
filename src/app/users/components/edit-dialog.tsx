"use client";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dialog,
  DialogFooter
} from "@/components/ui/dialog";
//

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
import {
  QueryClient,
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { UserFormValues, userFormSchema } from "@/app/user-form/type";
import { Edit } from "lucide-react";
import { User } from "../type";
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
// import { UserFormValues, userFormSchema } from "./type";

//

interface EditDialogProps {
  // handleEdit: (id: string, data: UserFormValues) => Promise<void>;
  data: User;
}

async function updateData(newData: User) {
  const { data } = await axios.put(`/api/user/${newData._id}`, newData);
  return data;
}

export function EditDialog(props: EditDialogProps) {
  const router = useRouter();
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false);

  const { mutateAsync, mutate } = useMutation({
    mutationFn: async (newData: User) => updateData(newData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] })
  });
  // mutationFn: (id, newTodo) => updateData(id, newData)

  const defaultValues: Partial<UserFormValues> = {
    name: props.data.name,
    description: props.data.description
  };

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
    mode: "onChange"
  });

  function onSubmit(data: UserFormValues) {
    mutate({ _id: props.data._id, ...data });
    setOpen(false);
    // router.refresh();
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
    <Dialog>
      <DialogTrigger onClick={() => setOpen(true)} asChild>
        <Button variant="outline">
          {" "}
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> Edit profile </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
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

            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
