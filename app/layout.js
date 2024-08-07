import { Inter,Montserrat } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
const inter = Montserrat({ subsets: ["latin"] });
import Header from "@/components/Header";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (<ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        
      <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
        <Header/>
          {/* <UserButton /> */}
        </SignedIn>
        
        {children}</body>
      
    </html></ClerkProvider>
  );
}
