import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import { query as q } from "faunadb";
import { faunadb } from "../../../services/fauna";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user',
        },
      },
    })
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile }){
      const email = user.email;

      try {
        const x = await faunadb.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(email)
                )
              )
            ),
            q.Create(
              q.Collection('users'), 
              { data: { email } }
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(email)
              )
            )
          )
        );
                
        console.log(x)
        return true;
      } catch {
      return false
      }
    }
  }
});