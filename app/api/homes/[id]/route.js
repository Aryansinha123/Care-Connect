
import dbConnect from "@/lib/mongodb";
import Home from "@/models/Home";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await dbConnect();

  try {
    const home = await Home.findById(await params.id);

    if (!home) {
      return NextResponse.json({ error: "Home not found" }, { status: 404 });
    }

    return NextResponse.json(home, { status: 200 });
  } catch (error) {
    console.error("Error fetching home:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
