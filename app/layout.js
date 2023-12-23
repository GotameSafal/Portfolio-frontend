import { Ubuntu } from "next/font/google";
import "@styles/globals.css";
import { Providers } from "@components/Providers";
import { cookies } from "next/headers";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer"
const ubuntu = Ubuntu({ subsets: ["latin"], weight:['500'] });

export const metadata = {
  title: "sdev-web",
  description: "Connect professionally",
  icons:{
    icon:'/sdev-high-resolutin-logo.webp'
  }
};

export default function RootLayout({ children }) {
  const cookieStore = cookies();
  const cookie = cookieStore.get("sdev");
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        <Providers>
          <Navbar cookie={cookie} />
          {children}
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
