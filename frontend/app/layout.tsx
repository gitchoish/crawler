import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "네이버 리뷰 크롤러 - 브랜드스토어 리뷰 수집 도구",
    description: "네이버 브랜드스토어의 리뷰를 쉽고 빠르게 수집하세요. 평점 필터링, Excel/CSV 다운로드 지원",
    keywords: "네이버, 리뷰, 크롤러, 브랜드스토어, 리뷰수집, 데이터분석",
    authors: [{ name: "Naver Review Crawler" }],
    openGraph: {
        title: "네이버 리뷰 크롤러",
        description: "네이버 브랜드스토어 리뷰를 쉽게 수집하는 무료 도구",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <head>
                {/* Google AdSense */}
                <Script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7686325833774925"
                    crossOrigin="anonymous"
                    strategy="afterInteractive"
                />

                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-8436Y2HGQM"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8436Y2HGQM');
          `}
                </Script>
            </head>
            <body className={`${inter.className} min-h-screen flex flex-col bg-[#F8F9FA]`}>
                <Header />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: '#333',
                            color: '#fff',
                        },
                        success: {
                            iconTheme: {
                                primary: '#22c55e',
                                secondary: '#fff',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: '#ef4444',
                                secondary: '#fff',
                            },
                        },
                    }}
                />
            </body>
        </html>
    );
}
