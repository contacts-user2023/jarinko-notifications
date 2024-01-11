'use client';

import Script from "next/script";
import {useAuth} from "../ui/AuthContext";
import {useEffect, useState} from "react";

export default function PushCodeScripts() {
  const [uid, setUid] = useState<string | null>(null);
  const {currentUser} = useAuth();

  useEffect(() => {
    if (currentUser) {
      setUid(currentUser.uid);
    }
  }, [currentUser]);

  return (
    uid && <>
      <Script id="script_1" defer strategy="beforeInteractive" src="https://www.pushcode.jp/dist/js/pushcode.js"/>
      <Script id="script_2" strategy="beforeInteractive">
        {`window.PushCodeInit = function() {
      try {
      if (PushCode && PushCode.isSupport()) {
      PushCode.init({ domainToken: 'ca6357eb7a8bdddaabcd5eda33042dd4283cb2474503416893d4e2d4551bddd2', userid: '${uid}' });
      PushCode.components.openSubscribeDialog();
    }
    }
      catch (err) {
      console.error(err);
      if (PushCode) {
      PushCode.sendError(err);
    }
    }
    };`}
      </Script>
    </>
  )
}
