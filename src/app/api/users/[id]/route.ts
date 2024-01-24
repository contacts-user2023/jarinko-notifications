import {NextRequest, NextResponse} from "next/server";

import {getServerSession} from "next-auth/next"
import {authOptions} from "@src/app/options";

import {getAuth} from "firebase-admin/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if(!session?.user?.isAdmin) {
    return NextResponse.json("Unauthorized", {status: 401});
  }

  try {
    const auth = getAuth();
    const result = await auth.getUser(params.id);

    return NextResponse.json(result, {status: 200});
  } catch(e) {
    console.log(e);
    return NextResponse.json(e, {status: 500});
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if(!session?.user?.isAdmin) {
    return NextResponse.json("Unauthorized", {status: 401});
  }

  try {
    // authデータ作成
    const auth = getAuth();
    const data = await req.json();
    const newUser = await auth.updateUser(params.id, data);

    return NextResponse.json(newUser?.uid, {status: 200});
  } catch(e: any) {
    console.log(e);
    if (e?.code) {
      return NextResponse.json(e.code, { status: 500 });
    } else {
      return NextResponse.json('Internal Server Error', { status: 500 });
    }
  }
}
