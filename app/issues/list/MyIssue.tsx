"use client";
import { MyIssues } from "@/app/api/issues/route";
import { Button } from "@radix-ui/themes";

interface Props {
  handleClick: () => void;
}
const data = MyIssues();
const MyIssue = ({ handleClick }: Props) => {
  return <Button onClick={handleClick}>My Issue</Button>;
};

export default MyIssue;
