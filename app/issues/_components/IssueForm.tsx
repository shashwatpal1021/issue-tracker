"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { issueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, Select, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

// const SimpleMDE = dynamic(
//   () => import('react-simplemde-editor'),
//   { ssr: false }
// );

type IssueFormData = z.infer<typeof issueSchema>;

// interface Props {
//   issue?: Issue;
// }

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  // console.log(register('title'))

  const [error, setError] = useState("");
  const [isSubmiting, setSubmiting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    console.log("data------------", data);
    try {
      let result;
      setSubmiting(true);
      if (issue) {
        result = await axios.patch("/api/issues/" + issue.id, data);
        console.log("patch ------->", result);
      } else {
        result = await axios.post("/api/issues/", data);
        console.log("new issue ------->", result);
      }
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      // console.log(error);
      setSubmiting(false);
      setError("An unexpected error occurred.");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <div className="flex justify-between">
          {issue ? (
            <div className="rounded-full border-black">
              <Select.Root defaultValue={`${issue.status}` || "OPEN"}>
                <Select.Trigger />
                <Select.Content>
                  <Select.Group
                    className="font-bold rounded-2"
                    {...register("status", { required: true })}
                  >
                    <Select.Label>Status...</Select.Label>
                    <Select.Item className="font-bold" value="OPEN">
                      Open
                    </Select.Item>
                    <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
                    <Select.Item value="CLOSED">Closed</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </div>
          ) : (
            <div></div>
          )}
          <Button disabled={isSubmiting}>
            {issue ? "Update Issue" : "Submit New Issue"}{" "}
            {isSubmiting && <Spinner />}
          </Button>
        </div>

        <Toaster />
      </form>
    </div>
  );
};

export default IssueForm;
