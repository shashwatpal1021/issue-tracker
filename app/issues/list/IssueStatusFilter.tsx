"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";

const statuses: {
  label: string;
  values?: Status;
}[] = [
  { label: "All" },
  { label: "Open", values: "OPEN" },
  { label: "In Progress", values: "IN_PROGRESS" },
  { label: "Closed", values: "CLOSED" },
];
const IssueStatusFilter = () => {
  return (
    <Select.Root>
      {/* <Select.Label>Filter by status</Select.Label> */}
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.values || ""}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
