import {NextRequest, NextResponse} from "next/server";

import {getServerSession} from "next-auth/next"
import {authOptions} from "@src/app/options";

import {adminDb} from "@src/app/libs/firebaseAdminConfig";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if(!session?.user || !session?.user?.isAdmin && params.id !== session?.user?.uid) {
    return NextResponse.json("Unauthorized", {status: 401});
  }

  try {
    const chatRef = adminDb.collection('chat').doc(params.id);
    const snapshot = await chatRef.get();

    if (!snapshot.exists) {
      const messages  = snapshot?.data()?.messages;
      const updatedMessages = messages.map((msg: {uid: string}) => msg.uid !== session?.user?.uid ? { ...msg, received: true } : msg);

      // 更新されたmessages配列でドキュメントを更新
      await chatRef.update({ messages: updatedMessages });
    }

    return NextResponse.json(null, {status: 200});
  } catch(e) {
    console.log(e);
    return NextResponse.json(e, {status: 500});
  }
}
