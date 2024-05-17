import Navbar from "@components/Navbar";
import "@styles/globals.css";
import { Poppins } from "next/font/google";

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
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
