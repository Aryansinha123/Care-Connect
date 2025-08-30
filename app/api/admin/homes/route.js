// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/mongodb";
// import Home from "@/models/Home";

// export async function POST(req) {
//   try {
//     await dbConnect();
//     const body = await req.json();
//     const { name, type, location, contact, description, imageUrl } = body;

//     if (!name || !type || !location || !contact) {
//       return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
//     }

//     const doc = await Home.create({ name, type, location, contact, description, imageUrl });
//     return NextResponse.json({ success: true, data: doc }, { status: 201 });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Home from "@/models/Home";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const home = await Home.create(body);
    return NextResponse.json({ success: true, data: home }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const homes = await Home.find({});
    return NextResponse.json({ success: true, data: homes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
