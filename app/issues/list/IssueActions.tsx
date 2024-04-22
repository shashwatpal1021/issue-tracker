"use client";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";
import MyIssue from "./MyIssue";
import { useSession } from "next-auth/react";
// import { useState } from "react";

interface Props {
  onChange: () => void;
}
const IssueActions = ({ onChange }: Props) => {
  const { data: session } = useSession();

  return (
    <Flex justify={"between"}>
      <Flex gap="2">
        <IssueStatusFilter />
        {session && <MyIssue onChange={onChange} />}
      </Flex>
      {session && (
        <Button>
          <Link href={"/issues/new"}>New Issue</Link>
        </Button>
      )}
    </Flex>
  );
};

export default IssueActions;
