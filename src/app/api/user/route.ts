/** @format */

import { connectToDb } from "@/lib/db";
import { User } from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  try {
    await connectToDb();

    const UserData = await User.find();

    return NextResponse.json(UserData);
  } catch (error) {
    console.log("error fetching user data ", error);
  }
}
