import authOptions from "@/app/auth/authOption";
import { Session } from "@/app/utils/getServerSession";
import { patchIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// interface Props {
//   params: {
//     params:{ id: string}
//   }
// }

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await Session();
  // console.log("session", session)
  if (session) {
    const body = await request.json();
    const validation = patchIssueSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.format(), {
        status: 400,
      });
    }
    const { assignedToUserId, title, description, status } = body;
    if (assignedToUserId) {
      const user = await prisma.user.findUnique({
        where: {
          id: assignedToUserId,
        },
      });
      if (!user) {
        return NextResponse.json({ error: "Invalid user." }, { status: 400 });
      }
    }
    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!issue)
      return NextResponse.json(
        { error: "Invalid Issue" },
        {
          status: 400,
        }
      );
    const updatedIssue = await prisma.issue.update({
      where: { id: issue.id },
      data: {
        title,
        description,
        assignedToUserId,
        status,
      },
    });
    return NextResponse.json(updatedIssue, { status: 200 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await Session();
  // console.log("session", session)
  if (session) {
    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!issue) {
      return NextResponse.json({ error: "Invalid error" }, { status: 400 });
    }
    await prisma.issue.delete({
      where: { id: issue.id },
    });
    return NextResponse.json({ status: 200 });
  }
}
