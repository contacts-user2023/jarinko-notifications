import {headers} from 'next/headers';
import {NextRequest, NextResponse} from 'next/server';
import {getContactById} from "../../libs/microcms";
import {toJSTDateTimeISOString} from "../../libs/dateFormatter";

type PushCodeContentBody = {
  "domain_id": number,
  "name": string,
  "is_suspend"?: boolean,
  "is_who_api"?: boolean,
  "is_when_api"?: boolean,
  "is_message_api"?: boolean,
  "is_browser_target"?: boolean,
  "browser_target"?: {
    "is_pc"?: boolean,
    "is_sp"?: boolean,
    "is_chrome"?: boolean,
    "is_firefox"?: boolean,
    "is_edge"?: boolean,
    "is_safari"?: boolean
  },
  "is_segment"?: boolean,
  "segment_id"?: number,
  "userid_list"?: string[],
  "is_ab"?: boolean,
  "message_a": {
    "title": string,
    "body": string,
    "icon"?: string,
    "linkURL"?: string,
    "utm"?: boolean
  },
  "message_b"?: {
    "title": string,
    "body": string,
    "icon"?: string,
    "linkURL"?: string,
    "utm"?: boolean
  }
}

type PushCodeContentResponse = {
  "status_code": number,
  "result": string,
  "message": string,
  "content": {
    "id": number,
    "project_id": number,
    "domain_id": number,
    "name": string,
    "user_condition": number,
    "browser_target": {
      "is_pc"?: boolean,
      "is_sp"?: boolean,
      "is_chrome"?: boolean,
      "is_firefox"?: boolean,
      "is_edge"?: boolean,
      "is_safari"?: boolean
    },
    "userid_list": string,
    "schedule_definition": string,
    "api_flg": number,
    "api_token": string,
    "suspend_flg": number,
    "schedule_flg": number,
    "segment_flg": number,
    "segment_id": number,
    "delete_flg": number,
    "create_time": string,
    "update_time": string
  }
};

type PushCodeSendResponse = {
  "status_code": number,
  "result": string,
  "message": string
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-CONTACTS-APIKEY",
};

const resInit = {
  headers: corsHeaders
};

const PUSHCODE_API_URL = 'https://api.pushcode.jp/v1';
const PUSHCODE_API_HEADERS = {
  'Content-Type': 'application/json',
  'X-PUSHCODE-APIKEY': process.env.X_PUSHCODE_APIKEY || ''
};

export async function OPTIONS() {
  return NextResponse.json({}, resInit)
}

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
    const contact = await getContactById(id);
    const data: PushCodeContentBody = {
      "domain_id": 2009,
      "name": "新着通知",
      "is_who_api": false,
      "is_when_api": true,
      "is_message_api": false,
      "is_browser_target": true,
      "browser_target": {
        "is_pc": true,
        "is_sp": true,
        "is_chrome": true,
        "is_firefox": true,
        "is_edge": true,
        "is_safari": true
      },
      "is_segment": false,
      "is_ab": false,
      "message_a": {
        "title": "新しいお知らせがあります",
        "body": contact.title,
        "icon": "https://jarinko-notifications.vercel.app/icon-512x512.png",
        "linkURL": `https://jarinko-notifications.vercel.app/contacts/${contact.id}`,
        "utm": false
      },
    };

    const pushContent = await fetch(`${PUSHCODE_API_URL}/push/new`, {
      method: 'POST',
      headers: PUSHCODE_API_HEADERS,
      body: JSON.stringify(data),
    });
    const pushContentResult: PushCodeContentResponse = await pushContent.json();

    const now = new Date();
    // 記事公開から10分後にpush通知を送信する
    const sendAt = toJSTDateTimeISOString(now.setMinutes(now.getMinutes() + 10));
    const pushSend = await fetch(`${PUSHCODE_API_URL}/push/${pushContentResult.content.api_token}`, {
      method: 'POST',
      headers: PUSHCODE_API_HEADERS,
      body: JSON.stringify({
        "when": {
          "immediate": false,
          "datetime": sendAt
        }
      }),
    });
    const pushSendResult: PushCodeSendResponse = await pushSend.json();

    return NextResponse.json(pushSendResult, {...resInit, status: 200});
  } catch (e: any) {
    return NextResponse.json(e, {...resInit, status: 500});
  }
}
