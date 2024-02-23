/** @format */

import { connectToDb } from "@/lib/db";
import { User } from "@/models/User";
import { HttpStatusCode } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextApiRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDb();
    const user = await User.findById(params.id);
    if (user) {
      await User.findByIdAndDelete(user._id);
      return NextResponse.json({
        message: `User ${params.id} has been deleted`
      });
    }
    return NextResponse.json(
      { message: `Product ${params.id} not found` },
      { status: HttpStatusCode.NotFound }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
