import {NextRequest, NextResponse} from "next/server";

import {getServerSession} from "next-auth/next"
import {authOptions} from "@src/app/options";
import {getAuth} from "firebase-admin/auth";

import {adminMessaging} from "@src/app/libs/firebaseAdminConfig";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const auth = getAuth();
  const users = (await auth.listUsers()).users;
  const adminUids = users.map(user => {
    if(user?.photoURL === 'http://admin') {
      return user?.uid;
    }
  });

  if(!session?.user || !session?.user?.isAdmin && !adminUids.includes(params.id)) {
    return NextResponse.json("Unauthorized", {status: 401});
  }

  let {msg} = await req.json();
  const maxLength = 20;
  if(msg.length > maxLength) {
    msg = `${msg.substring(0, maxLength)}...`;
  }
  try {
    const message = {
      notification: {
        title: `${session?.user?.name}さんから新しいメッセージ`,
        body: msg,
        image: 'https://jarinko-notifications.vercel.app/icon-512x512.png',
      },
      webpush: {
        fcmOptions: {
          link: `https://jarinko-notifications.vercel.app/chat/${session?.user?.isAdmin ? params.id : ''}`
        }
      },
      topic: params.id
    };

    const result = await adminMessaging.send(message);

    return NextResponse.json(result, { status: 200});
  } catch (e: any) {
    return NextResponse.json(e, { status: 500});
  }
}
