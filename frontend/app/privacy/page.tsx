import { Shield, Lock, EyeOff } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <div className="max-w-3xl mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-600">
                    <Shield className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">개인정보처리방침</h1>
                <div className="text-gray-500">최종 수정일: 2024년 10월 27일</div>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600 space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <EyeOff className="w-5 h-5 text-naver-green" />
                        1. 개인정보의 수집 및 이용
                    </h2>
                    <p className="bg-gray-50 p-4 rounded-lg text-sm">
                        <strong>'네이버 리뷰 크롤러'</strong>(이하 "본 서비스")는
                        <strong>회원가입 기능을 제공하지 않으며</strong>, 사용자의 어떠한 개인정보(이름, 이메일, 전화번호 등)도 수집하거나 서버에 저장하지 않습니다.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-naver-green" />
                        2. 쿠키(Cookie) 및 데이터 저장
                    </h2>
                    <p>
                        본 서비스는 사용자 편의를 위해 다음과 같은 데이터를 브라우저의 로컬 스토리지(Local Storage)에만 일시적으로 저장할 수 있습니다.
                        이 데이터는 귀하의 브라우저 밖으로 전송되지 않습니다.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 mt-4 text-sm">
                        <li>최근 크롤링 작업 ID (결과 다운로드용)</li>
                        <li>화면 설정 유지 (다크모드 여부 등)</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">3. 외부 서비스 연동</h2>
                    <p>
                        본 사이트는 서비스 유지 비용 마련을 위해 <strong>Google AdSense</strong> 광고를 포함하고 있습니다.
                        Google은 광고 제공을 위해 쿠키를 사용할 수 있으며, 이에 대한 자세한 내용은 <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google 광고 정책</a>을 따릅니다.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">4. 책임의 한계</h2>
                    <p>
                        본 서비스는 공개된 웹 데이터를 수집하는 도구일 뿐이며, 수집된 데이터의 저작권은 원저작자에게 있습니다.
                        사용자는 수집한 데이터를 개인적인 분석 용도로만 사용해야 하며, 이를 무단 배포하거나 상업적으로 악용하여 발생하는 법적 문제에 대해 본 서비스는 책임지지 않습니다.
                    </p>
                </section>

                <section className="pt-8 border-t border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">5. 문의하기</h2>
                    <p>
                        본 개인정보처리방침에 대해 궁금한 점이 있으시면 아래 연락처로 문의해 주세요.
                    </p>
                    <p className="mt-2 font-medium text-gray-900">
                        이메일: <a href="mailto:csh9609@gmail.com" className="text-blue-600 hover:underline">csh9609@gmail.com</a>
                    </p>
                </section>
            </div>
        </div>
    );
}
