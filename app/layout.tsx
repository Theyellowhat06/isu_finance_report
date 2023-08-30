"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const exp = localStorage.getItem("exp");
    const now = new Date().getTime() / 1000;
    if (pathname === "/") {
      if (userId && parseInt(exp || "0") > now) router.replace("/report");
      else router.replace("/login");
    } else if (!userId || parseInt(exp || "0") <= now || !token)
      router.replace("/login");
  }, []);
  return (
    <ThemeProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="w-screen h-screen">{children}</div>
          <ToastContainer />
        </body>
      </html>
    </ThemeProvider>
  );
}
