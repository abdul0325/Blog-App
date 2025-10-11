import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F9F9F9] text-[#132237]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
