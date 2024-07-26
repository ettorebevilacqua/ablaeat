 import CredentialsProvider from 'next-auth/providers/credentials';
 import { compare } from 'bcryptjs';
// https://github.com/nextauthjs/next-auth/discussions/2282
// https://stackoverflow.com/questions/68188861/next-auth-how-the-registration-is-handled-with-a-email-password-credential-p

const  Credentials = [
  CredentialsProvider({
        id: "custom-login",
        type: "credentials",
        credentials: {},
        
    }),
    CredentialsProvider({
        id: "custom-signup",
        type: "credentials",
        credentials: {},
        name: 'credentials',
        async authorize(credentials: any, req) {
     try {
          const res = await fetch(`${process.env.API_BASE_URL}/v1/register/`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });

          const token: Token = await res.json();

          if (res.status !== 200) {
            throw new Error("User already exists");
          }

          return token as User;
        } catch (error) {
          return null;
        }
        }
    })

];

export default Credentials;
/*
export default Credentials = [
   CredentialsProvider({
      id: "credentials",
      name: "credentials",
        username: {
          label: "Email",
          type: "email",
          placeholder: "john@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            `${process.env.API_BASE_URL}/v1/login/`,
            {
              method: "POST",
              body: new URLSearchParams(credentials),
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
            }
          );

          const token: Token = await res.json();

          if (res.status !== 200) {
            throw new Error("Incorrect password");
          }

          const decodedJwt: DecodedJWT = jwtDecode(token.access);
          return decodedJwt as User;

        } catch (error) {
          return null;
        }
      },
    }),
    CredentialsProvider({
      id: "register",
      name: "register",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@gmail.com",
        },
        password: { label: "Password", type: "password" },
        name: {
          label: "Name",
          type: "text",
        }
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.API_BASE_URL}/v1/register/`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });

          const token: Token = await res.json();

          if (res.status !== 200) {
            throw new Error("User already exists");
          }

          return token as User;
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  */