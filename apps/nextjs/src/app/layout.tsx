import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@acme/ui";
import { ThemeProvider, ThemeToggle } from "@acme/ui/theme";
import { Toaster } from "@acme/ui/toast";

import { TRPCReactProvider } from "~/trpc/react";
import { Providers } from "~/hooks/providers";

import "~/app/globals.css";

import Navbar from "./_components/navbar";
import { getUser } from "@acme/auth";

import { env } from "~/env";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://www.ablaeat.com"
      : "http://localhost:3000",
  ),
  title: "Abla Eat",
  description: "Social friends food",
  openGraph: {
    title: "Abla Eat",
    description: "Social friends food",
    url: "https://create-t3-turbo.vercel.app",
    siteName: "Abla Eat",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jullerino",
    creator: "@jullerino",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout(props: { children: React.ReactNode }) {
	const { user, session, error } = await getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
  	      <Providers user={user} session={session} >
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			  <TRPCReactProvider>
		
				<main
				  id="skip"
				  className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]"
				>
				<Navbar />
				  {props.children}
				</main>
				   
			  </TRPCReactProvider>
			  <div className="absolute bottom-4 right-4">
				<ThemeToggle />
			  </div>
			  <Toaster />
			</ThemeProvider>
     </Providers>
      </body>
    </html>
  );
}
