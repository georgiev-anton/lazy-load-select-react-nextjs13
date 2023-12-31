import "../styles/global.scss";
import type { Metadata } from 'next'
import {Providers} from "@/app/components/Providers";

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="">
       <Providers>
        {children}
       </Providers>
      </body>
    </html>
  )
}
