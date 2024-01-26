import {NextRequest, NextResponse} from "next/server";

import {getServerSession} from "next-auth/next"
import {authOptions} from "@src/app/options";

import {adminDb, getAccessToken} from "@src/app/libs/firebaseAdminConfig";

export async function GET(req: NextRequest, {params}: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json("Unauthorized", {status: 401});
  }

  try {
    const chatRef = adminDb.collection('fcm_notification_keys').doc(params.id);
    const snapshot = await chatRef.get();

    if (snapshot.exists) {
      const notificationKey = snapshot?.data()?.notification_key;

      return NextResponse.json({notificationKey: notificationKey}, {status: 200});
    } else {
      return NextResponse.json({}, {status: 200});
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, {status: 500});
  }
}
