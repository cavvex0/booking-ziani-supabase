import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Jockey_One } from "next/font/google";
import TanstackProviders from "@/providers/TanstackProvider";
import { Toaster } from "react-hot-toast";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Ziani Bookings",
  description: "This app was created by Adam @Cavvex",
};
const jockey = Jockey_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jockey",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.className} ${jockey.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground">
        <TanstackProviders>{children}</TanstackProviders>
        <Toaster
          toastOptions={{
            className: "text-sm",
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
            },
          }}
        />
      </body>
    </html>
  );
}
