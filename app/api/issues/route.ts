import authOptions from "@/app/auth/authOption";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../validationSchema";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });
  }
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
}

// export async function GET(request: NextRequest) {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return NextResponse.json({}, { status: 401 });
//   }
//   const user = await prisma.user.findUnique({
//     where: {
//       email: session?.user?.email,
//     },
//   });
//   const issues = await prisma.issue.findMany({
//     where: {
//       assignedToUserId: user?.id,
//     },
//   });
//   console.log("issues in side api/issues", issues);
//   return NextResponse.json(issues, { status: 200 });
// }
