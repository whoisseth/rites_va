/** @format */

import { connectToDb, disconnectDb } from "@/lib/db";
import { User } from "@/models/User";
import { VA_Detail } from "@/models/VA_Details";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextApiRequest) {

export async function POST(request: NextRequest) {
  try {
    //

    await connectToDb()
    
    const reqBody = await request.json();
    const { name, description } = reqBody;

    const newUser = new User({
      name,
      description
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      sucess: true,
      savedUser
    });

    //
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  } finally{
    disconnectDb()
  }
}
