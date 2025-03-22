import SessionProviderWrapper from "../hooks/providers";
import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Malaysian Simulator Life",
  description: "A simulator game for Malaysian life.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionProviderWrapper>
        <body>
          <Navbar />
          {children}
        </body>
      </SessionProviderWrapper>
    </html>
  );
}
