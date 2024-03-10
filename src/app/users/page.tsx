"use client";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { Delete, Edit } from "lucide-react";
import { useState } from "react";
import {
  QueryClient,
  useQuery,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
// import { UserFormValues } from "../user-form/page";
import { UserFormValues } from "../user-form/type";
import { Loading } from "./components/loading";
import { EditDialog } from "./components/edit-dialog";
import { User } from "./type";

async function deleteUser(id: string) {
  const response = await axios.delete(`/api/user/${id}`);
  return response.data;
}

// write the update user function for api like delete u

export default function TableDemo() {
  const queryClient = useQueryClient();

  const [currentId, setCurrentId] = useState("");
  const { isLoading, error, data, refetch } = useQuery<User[]>({
    queryKey: ["users"],
    // refetchOnWindowFocus: true,

    queryFn: () => fetch(`/api/user`).then((res) => res.json()),
    refetchOnWindowFocus: true
  });
  // use useMutation for update data

  //  write a fuction handleEdite

  const {
    mutate,
    data: deleteData,
    isPending: isDeleteLoading
  } = useMutation({
    mutationFn: deleteUser,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  });

  // const { mutate: editMutate } = useEditUser();

  async function handleDelete(id: string) {
    toast({
      description: (
        <div className="flex gap-1 items-center">
          <Loading /> <p>deleting...</p>
        </div>
      )
    });

    await mutate(id);

    toast({
      description: `${deleteData}  User is Deleted .`
    });
    // refetch();
  }

  // write a function to handle edit user
  //     await editMutateAsync();

  // async function handleEdit(id: string, data: UserFormValues) {
  // wriete the logic for edite
  //  }
  // }

  return (
    <div>
      {isLoading ? (
        <div className="h-full w-full flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <Table>
          <TableCaption>A list of Users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Discription</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead className="">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data
              ? data.map((d) => (
                  <TableRow key={d._id}>
                    <TableCell className="font-medium">{d.name}</TableCell>
                    <TableCell>{d.description}</TableCell>
                    <TableCell>
                      {/* <Edit /> */}
                      <EditDialog data={d} />
                    </TableCell>
                    <TableCell className="">
                      {isDeleteLoading && d._id == currentId ? (
                        <Loading />
                      ) : (
                        <Button
                          onClick={() => {
                            handleDelete(d._id);
                            setCurrentId(d._id);
                          }}
                          variant="outline"
                        >
                          <Delete className="text-red-400 cursor-pointer" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
