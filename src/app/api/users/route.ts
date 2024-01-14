import {NextRequest, NextResponse} from "next/server";

import {getServerSession} from "next-auth/next"
import {authOptions} from "@src/app/options";

import {getAuth} from "firebase-admin/auth";
import {adminDb} from "@src/app/libs/firebaseAdminConfig";
import {deleteAlreadyReadByMemberId} from "@src/app/libs/microcms";

// user削除はクライアントSDKの場合再認可が必要となる可能性があるため、APIrouteで処理
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if(!session?.user?.isAdmin) {
    return NextResponse.json("Unauthorized", {status: 401});
  }

  try {
    // authデータの削除
    const {uid} = await req.json();
    const auth = getAuth();
    const result = await auth.deleteUser(uid);

    // firestoreデータの削除
    const docRef = adminDb.collection('users').doc(uid);
    const snap = await docRef.delete();

    // 既読管理の削除
    await deleteAlreadyReadByMemberId(uid);

    return NextResponse.json({auth: result, store: snap}, {status: 200});
  } catch(e) {
    console.log(e);
    return NextResponse.json(e, {status: 500});
  }
}
