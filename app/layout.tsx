import "./globals.css";
import "./style/nprogress.css";

import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";

import TopProgress from "./(home)/_components/lib/nprogress";
import { CartDrawer } from "./(home)/_components/ui/cart/drawer-cart";
import LayoutWrapper from "./(home)/_components/wrap-layout";
import { AuthProvider } from "./contexts/AuthCont";

//titulos
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], // escolha os que você quer
  variable: "--font-poppins",
});

//textos
export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AgropetDev - agropecuária",
  description: "Agropecuária online",
  keywords: ["agropecuaria", "pets", "agro", "piscina"],
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
   icons: {
    icon: "/favicon.ico", // seu favicon na pasta public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${poppins.variable} ${inter.variable} not-last:antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          <LayoutWrapper>
            <main className="p-2 flex-1 max-w-7xl mx-auto w-full pb-30">
              <TopProgress />
              {children}

              <Toaster position="top-right" reverseOrder={false} />
              <CartDrawer />
            </main>
          </LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
