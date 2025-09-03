// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/mongodb";
// import Request from "@/models/Request";

// export async function GET(req, { params }) {
//   try {
//     await dbConnect();
//     const { homeId } = params;

//     const requests = await Request.find({ home: homeId }).populate("homeAdmin");

//     return NextResponse.json({ success: true, requests });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req, { params }) {
//   try {
//     await dbConnect();
//     const { homeId } = params;
//     const data = await req.json();

//     const newRequest = await Request.create({
//       ...data,
//       home: homeId,
//     });

//     return NextResponse.json({ success: true, request: newRequest });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Request from "@/models/Request";
import { verifyHomeAdmin } from "@/lib/authMiddleware";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const auth = verifyHomeAdmin(req);
    if (!auth.success) {
      return NextResponse.json(auth, { status: 401 });
    }

    const requests = await Request.find({ home: params.id });
    return NextResponse.json({ success: true, requests });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  try {
    await dbConnect();

    const auth = verifyHomeAdmin(req);
    if (!auth.success) {
      return NextResponse.json(auth, { status: 401 });
    }

    const { title, description } = await req.json();
    const request = await Request.create({
      title,
      description,
      home: params.id,
      homeAdmin: auth.adminId,
      status: "active",
    });

    return NextResponse.json({ success: true, request });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
