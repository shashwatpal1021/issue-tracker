import { NextResponse } from "next/server";
import authOptions from "./auth/authOption";
import { getServerSession } from "next-auth";

export const Session = async () => {
  const data = await getServerSession(authOptions);
  if (!data) {
    return NextResponse.json({}, { status: 401 });
  }
  return data;
};
