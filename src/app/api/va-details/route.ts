/** @format */

import { connectToDb, disconnectDb } from "@/lib/db";
import { User } from "@/models/User";
import { VA_Detail } from "@/models/VA_Details";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextApiRequest) {
//   try {
//     await connectToDb();

//     const VA_DetailData = await VA_Detail.find();

//     return NextResponse.json(VA_DetailData);
//   } catch (error) {
//     console.log("error fetching attendance ", error);
//   }
// }
export async function GET(req: NextRequest) {
  try {
    await connectToDb();

    const VA_DetailData = await User.find();
    console.table(VA_Detail);
    return NextResponse.json(VA_DetailData);
  } catch (error) {
    console.log("error fetching attendance ", error);
  }
  finally{
    disconnectDb()
  }
}

export async function POST(request: NextRequest) {
  try {
    //
    const reqBody = await request.json();
    const { name, description } = reqBody;

    const newUser = new User({
      name,
      description,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      sucess: true,
      savedUser,
    });

    //
  } catch (err) {
    console.log(err);
  } finally{
    disconnectDb()
  }
}
