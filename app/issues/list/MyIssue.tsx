"use client";
import { Button } from "@radix-ui/themes";

interface Props {
  handleClick: () => void;
}
const MyIssue = ({ handleClick }: Props) => {
  return <Button onClick={handleClick}>My Issue</Button>;
};

export default MyIssue;
