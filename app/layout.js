import Providers from "@components/Providers";
import Navbar from "@components/Navbar";
import "@styles/globals.css";
import { Poppins } from "next/font/google";
import { cookies } from "next/headers";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata = {
  title: "Sdev-web",
  description: "Connect professionally",
};

export default function RootLayout({ children }) {
  const cookieStore = cookies();
  const session = cookieStore.get("portfolio");
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <Providers>
          <Navbar session={session} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
