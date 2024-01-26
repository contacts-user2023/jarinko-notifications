import {NextRequest, NextResponse} from "next/server";

import {getServerSession} from "next-auth/next"
import {authOptions} from "@src/app/options";
import {adminDb, adminMessaging} from "@src/app/libs/firebaseAdminConfig";
import {FieldValue} from "firebase-admin/firestore";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const {uid, token} = await req.json();

  if (!session?.user || session?.user?.uid !== uid) {
    return NextResponse.json("Unauthorized", {status: 401});
  }
  if (!token) {
    return NextResponse.json(null, {status: 400});
  }

  try {
    // トピックにトークンを追加
    const result = await adminMessaging.subscribeToTopic([token], uid);
    if(result?.errors?.length > 0) {
      throw result.errors[0].error;
    }

    const ref = adminDb.collection('fcm_subscribed_tokens').doc(uid);
    // トピックの登録上限が2000件なのでオーバーフロー時に削除できるよう登録したトークンを保持しておく
    await ref.set({tokens: FieldValue.arrayUnion(token)}, {merge: true});

    return NextResponse.json(result, {status: 200});
  } catch (e: any) {
    console.log(e);
    if (e?.code) {
      return NextResponse.json(e.code, {status: 500});
    } else {
      return NextResponse.json('Internal Server Error', {status: 500});
    }
  }
}
