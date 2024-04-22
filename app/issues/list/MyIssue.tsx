"use client";
import { MyIssues } from "@/app/api/issues/route";
import { Issue } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import React, { useState } from "react";

interface Props {
  onChange: () => void;
}
const data = MyIssues();
const MyIssue = ({ onChange }: Props) => {
  return <Button onClick={onChange}>My Issue</Button>;
};

export default MyIssue;
