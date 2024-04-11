import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Metadata } from "next";
// import delay from 'delay';

interface Props {
  // searchParams: { status: Status; orderBy: keyof Issue; page: string };
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });
  // await delay(2000);
  return (
    <>
      <Flex direction="column" gap="3">
        <IssueActions />
        <IssueTable searchParams={searchParams} issues={issues} />
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={issueCount}
        />
      </Flex>
    </>
  );
};

export const dynamic = "force-dynamic"; // working
// export const revalidate = 60;
export const metadata: Metadata = {
  title: "Issue tracker - Issue List",
  description: "View all Project Issues",
};
export default IssuesPage;
