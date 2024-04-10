import prisma from "@/prisma/client";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";

export default async function Home() {
  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const inPorgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({
    where: { status: "CLOSED" },
  });
  return (
    <div className="text-3xl">
      Hello Shashwat
      {/* <LatestIssues /> */}
      <IssueSummary open={open} inPorgress={inPorgress} closed={closed} />
    </div>
  );
}
