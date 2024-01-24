import type {NextAuthOptions, User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {getAuth} from "firebase-admin/auth";

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
            const auth = await getAuth();
            const decoded = await auth.verifyIdToken(idToken);
            if(!decoded) {
              return null;
            }

            return {
              id: decoded.uid,
              uid: decoded.uid,
              emailVerified: decoded?.emailVerified,
              is_admin: decoded?.photoURL === 'http://admin',
              name: decoded.displayName
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
