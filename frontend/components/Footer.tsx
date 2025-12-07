import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-100 mt-20">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="font-bold text-lg text-gray-900 mb-4">네이버 리뷰 크롤러</h3>
                        <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                            네이버 브랜드스토어 리뷰 데이터를 손쉽게 수집하고 분석하세요.<br />
                            마케터, 셀러, 데이터 분석가를 위한 최고의 무료 도구입니다.
                        </p>
                        <p className="text-xs text-gray-400">
                            © {new Date().getFullYear()} Naver Review Crawler. All rights reserved.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-gray-800 mb-4">서비스</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link href="/" className="hover:text-naver-green transition-colors">홈으로</Link></li>
                            <li><Link href="/about" className="hover:text-naver-green transition-colors">소개</Link></li>
                            <li><Link href="/contact" className="hover:text-naver-green transition-colors">문의하기</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-bold text-gray-800 mb-4">정책</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link href="/privacy" className="hover:text-naver-green transition-colors">개인정보처리방침</Link></li>
                            <li><Link href="/contact" className="hover:text-naver-green transition-colors">이용약관</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
