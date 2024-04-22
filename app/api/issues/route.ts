import authOptions from "@/app/auth/authOption";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../validationSchema";
import { Session } from "@/app/getServerSession";

export async function POST(request: NextRequest) {
  const session = await Session();
  // console.log("session", session)
  if (session) {
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
}

export async function MyIssues() {
  const session = await Session();
  // console.log("session", session)
  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });
    const issues = await prisma.issue.findMany({
      where: {
        assignedToUserId: user?.id,
      },
    });
    console.log("issues in side api/issues", issues);
    return issues;
  }
}
