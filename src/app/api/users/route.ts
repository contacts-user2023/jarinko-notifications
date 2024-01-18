import {NextRequest, NextResponse} from "next/server";

import {getServerSession} from "next-auth/next"
import {authOptions} from "@src/app/options";

import {getAuth} from "firebase-admin/auth";
import {adminDb} from "@src/app/libs/firebaseAdminConfig";
import {generateRandomString} from "@src/app/libs/generateRandomString";

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

    return NextResponse.json({auth: result, store: snap}, {status: 200});
  } catch(e) {
    console.log(e);
    return NextResponse.json(e, {status: 500});
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if(!session?.user?.isAdmin) {
    return NextResponse.json("Unauthorized", {status: 401});
  }

  try {
    // authデータ作成
    const {name, email} = await req.json();
    const auth = getAuth();
    const data = {
      email: email,
      password: generateRandomString(16),
      displayName: name
    };
    const newUser = await auth.createUser(data);

    // firestoreデータを作成
    const docRef = adminDb.collection('users').doc(newUser.uid);
    const snap = await docRef.set({uid: newUser.uid, name: name});

    return NextResponse.json(newUser, {status: 200});
  } catch(e: any) {
    console.log(e);
    if (e?.code) {
      return NextResponse.json(e.code, { status: 500 });
    } else {
      return NextResponse.json('Internal Server Error', { status: 500 });
    }
  }
}
