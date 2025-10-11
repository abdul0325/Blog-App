import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F9F9F9] text-[#132237]">
        <AuthProvider>
          <Navbar />
          <div>{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
