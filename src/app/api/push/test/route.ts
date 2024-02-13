import {NextRequest, NextResponse} from "next/server";

import {getServerSession} from "next-auth/next"
import {authOptions} from "@src/app/options";
import {getAuth} from "firebase-admin/auth";

import {adminMessaging} from "@src/app/libs/firebaseAdminConfig";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if(!session?.user) {
    return NextResponse.json("Unauthorized", {status: 401});
  }

  let {token} = await req.json();

  try {
    const message = {
      notification: {
        title: 'テスト通知を受信しました。',
        body: 'お使いの端末でプッシュ通知が受信できます。',
        image: 'https://jarinko-notifications.vercel.app/icon-512x512.png',
      },
      token: token
    };

    const result = await adminMessaging.send(message);

    return NextResponse.json(result, { status: 200});
  } catch (e: any) {
    return NextResponse.json(e, { status: 500});
  }
}
