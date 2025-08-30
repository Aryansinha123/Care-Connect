// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/mongodb";
// import Home from "@/models/Home";

// export async function PUT(req, { params }) {
//   try {
//     await dbConnect();
//     const body = await req.json();
//     const updated = await Home.findByIdAndUpdate(params.id, body, { new: true });
//     if (!updated) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
//     return NextResponse.json({ success: true, data: updated });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
//   }
// }

// export async function DELETE(_req, { params }) {
//   try {
//     await dbConnect();
//     const deleted = await Home.findByIdAndDelete(params.id);
//     if (!deleted) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
//     return NextResponse.json({ success: true, message: "Deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Home from "@/models/Home";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();
    const home = await Home.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json({ success: true, data: home });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    await Home.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: "Home deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
