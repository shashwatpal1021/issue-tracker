// import prisma from "@/prisma/client";
// import { Session } from "./getServerSession";

// export const MyIssues = async () => {
//   const session: any = await Session();
//   if (session) {
//     console.log("session", session);
//     const data = await prisma.user.findUnique({
//       where: {
//         email: session.user?.email,
//       },
//     });
//     const issues = await prisma.issue.findMany({
//       where: {
//         assignedToUserId: data?.id,
//       },
//     });
//     return issues;
//   }
// };
