import type {NextAuthOptions, User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {getAuth} from "firebase-admin/auth";
import {initAdminApp} from "@src/app/libs/firebaseAdminConfig";

type TokenUser = {
  uid?: string;
  emailVerified?: boolean;
  is_admin?: boolean;
  name?: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {},
      authorize: async ({idToken}: any, _req) => {
        if (idToken) {
          try {
            initAdminApp();
            const auth = await getAuth();
            const decoded = await auth.verifyIdToken(idToken);
            if(!decoded) {
              return null;
            }
            const user = await auth.getUser(decoded.uid);

            return {
              id: user.uid,
              uid: user.uid,
              emailVerified: user?.emailVerified,
              is_admin: user?.photoURL === 'http://admin',
              name: user.displayName
            };
          } catch (err) {
            console.error(err);
          }
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        const customUser = user as User & TokenUser;
        token.uid = customUser?.uid || '';
        token.emailVerified = customUser?.emailVerified || false;
        token.name = customUser?.name || '';
        token.is_admin = customUser?.is_admin || false;
      }

      return token;
    },
    // sessionにJWTトークンからのユーザ情報を格納
    async session({session, token}) {
      session.user.emailVerified = token.emailVerified;
      session.user.uid = token.uid;
      session.user.isAdmin = token.is_admin;
      session.user.name = token.name;
      return session;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/"
  },
};
