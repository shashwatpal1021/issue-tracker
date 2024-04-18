import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";
import MyIssue from "./MyIssue";


const IssueActions = () => {
  return (
    <Flex justify={"between"}>
      <Flex gap="2">
      <IssueStatusFilter />
      <MyIssue/>
      </Flex>
      <Button>
        <Link href={"/issues/new"}>New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
