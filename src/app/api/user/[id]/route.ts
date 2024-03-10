/** @format */

import { connectToDb, disconnectDb } from "@/lib/db";
import { User } from "@/models/User";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
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
  } finally{
    disconnectDb()
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await connectToDb();

    const user = await User.findById(params.id);
    const body = await req.json();
    if (user) {
      await User.findByIdAndUpdate(id, body);
      console.log("body-", body);
      return NextResponse.json({ body });
    }
    return NextResponse.json(
      { message: `User ${params.id} not found` },
      { status: HttpStatusCode.NotFound }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  } finally{
    disconnectDb()
  }
}
