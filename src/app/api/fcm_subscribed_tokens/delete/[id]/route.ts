import {NextRequest, NextResponse} from "next/server";

import {getServerSession} from "next-auth/next"
import {authOptions} from "@src/app/options";

import {adminDb, adminMessaging} from "@src/app/libs/firebaseAdminConfig";
import {FieldValue} from "firebase-admin/firestore";

export async function POST(req: NextRequest, {params}: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const {token} = await req.json();
  const uid = params.id;

  if (!session?.user || session?.user?.uid !== uid) {
    return NextResponse.json("Unauthorized", {status: 401});
  }
  if (!token) {
    return NextResponse.json(null, {status: 400});
  }

  try {
    // トピックからトークンを削除
    const result = await adminMessaging.unsubscribeFromTopic([token], uid);
    if(result?.errors?.length > 0) {
      throw result.errors[0].error;
    }

    const ref = adminDb.collection('fcm_subscribed_tokens').doc(uid);
    // firestoreからも削除
    await ref.update({tokens: FieldValue.arrayRemove(token)});

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
