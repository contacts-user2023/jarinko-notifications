import {NextRequest, NextResponse} from "next/server";

import {getServerSession} from "next-auth/next"
import {authOptions} from "@src/app/options";

import {getAuth} from "firebase-admin/auth";
import {adminDb} from "@src/app/libs/firebaseAdminConfig";

// user削除はクライアントSDKの場合再認可が必要となる可能性があるため、APIrouteで処理
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if(!session?.user?.isAdmin) {
    return NextResponse.json("Unauthorized", {status: 401});
  }

  try {
    const {uid} = await req.json();
    const auth = getAuth();
    const result = await auth.deleteUser(uid);

    const docRef = adminDb.collection('users').doc(uid);
    const snap = await docRef.delete();

    return NextResponse.json({auth: result, store: snap}, {status: 200});
  } catch(e) {
    console.log(e);
    return NextResponse.json(e, {status: 500});
  }
}
