import {headers} from 'next/headers';
import {NextRequest, NextResponse} from 'next/server';
import {getContactById} from "../../libs/microcms";
import {adminMessaging} from "@src/app/libs/firebaseAdminConfig";
import {getAuth} from "firebase-admin/auth";
import {Message} from "firebase-admin/messaging";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-CONTACTS-APIKEY",
};

const resInit = {
  headers: corsHeaders
};

export async function POST(req: NextRequest) {
  const headerList = headers();
  const apiKey = headerList.get('x-contacts-apikey');

  // apikeyの照合
  if (process.env.X_CONTACTS_APIKEY !== apiKey) {
    return NextResponse.json(null, {...resInit, status: 500});
  }

  const {api, id, type, contents} = await req.json();
  if (!(api && id && type && contents)) {
    return NextResponse.json(null, {...resInit, status: 400});
  }
  const {
    new: {
      status,
      publishValue: {
        title,
      }
    },
    old
  } = contents;

  // bodyの内容を精査
  if (!(
    api === 'contacts'
    && (type === 'new' || type === 'edit' && !old?.publishValue)
    && status[0] === 'PUBLISH'
    && title
    && id
  )) {
    return NextResponse.json(null, {...resInit, status: 400});
  }

  try {
    const auth = getAuth();
    const users = (await auth.listUsers()).users;
    // TODO sendAllの上限は500、分割送信を検討
    const uids = users.map(user => user?.uid);
    const contact = await getContactById(id);
    const payload = {
      notification: {
        title: '新しいお知らせがあります',
        body: contact.title,
        image: 'https://jarinko-notifications.vercel.app/icon-512x512.png',
      },
      webpush: {
        fcmOptions: {
          link: `https://jarinko-notifications.vercel.app/contacts/${contact.id}`
        }
      }
    };
    const messages: Message[] = uids.map(uid => {
      return {...payload, topic: uid}
    });
    const result = await adminMessaging.sendAll(messages);

    return NextResponse.json(result, {...resInit, status: 200});
  } catch (e: any) {
    return NextResponse.json(e, {...resInit, status: 500});
  }
}
