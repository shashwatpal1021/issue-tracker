import authOptions from "@/app/auth/authOption";
import { issueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// interface Props {
//   params: {
//     params:{ id: string}
//   }
// }

export async function PATCH(request: NextRequest, { params }: { params: { id: string; }; }) {
   const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({},{status:401})
  }
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: 400
    });
  }
  const issue = await prisma.issue.findUnique({
    where:{id:parseInt(params.id)}
  });

  if (!issue)
    return NextResponse.json({ error: "Inavlid Issue" }, {
      status: 400
    });
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: validation.data.title,
      description: validation.data.description
    }
  })
  return NextResponse.json(updatedIssue, { status: 200 })
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string; }; }) { 
 const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({},{status:401})
  }

  const issue = await prisma.issue.findUnique({
    where:{id:parseInt(params.id)}
  })
  if (!issue) {
    return NextResponse.json({ error: "Invalid error" }, { status: 400 })
  }
  await prisma.issue.delete({
    where: { id: issue.id }
  })
  return NextResponse.json({ status: 200 })
}