/** @format */

export const dynamic = 'force-dynamic'

import { connectToDb, disconnectDb } from "@/lib/db";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDb();

    const UserData = await User.find();
    console.log(UserData, "useradata");
    return NextResponse.json(UserData,{status:200});
  } catch (error) {
    console.log("error fetching user data ", error);
    return NextResponse.json(error);
  } finally {
    disconnectDb();
  }
}
