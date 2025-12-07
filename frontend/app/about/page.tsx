import { Sparkles, CheckCircle2, BarChart3, Clock, Zap } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 space-y-16">
            {/* Header Section */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-naver-green to-blue-600 bg-clip-text text-transparent">
                    네이버 브랜드스토어 리뷰 크롤러 소개
                </h1>
                <p className="text-xl text-gray-600">
                    스마트한 셀러와 마케터를 위한 최고의 리뷰 분석 도구
                </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid md:grid-cols-3 gap-8">
                <div className="card hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-4 text-naver-green">
                        <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">초고속 수집</h3>
                    <p className="text-gray-600 leading-relaxed">
                        수천 개의 리뷰를 단 몇 분 만에 수집합니다. 복잡한 설정 없이 URL만 입력하면 바로 시작됩니다.
                    </p>
                </div>
                <div className="card hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 text-blue-600">
                        <BarChart3 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">데이터 시각화</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Excel 및 CSV 다운로드를 지원하여 수집된 데이터를 즉시 분석하고 시각화할 수 있습니다.
                    </p>
                </div>
                <div className="card hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 text-purple-600">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">정밀 필터링</h3>
                    <p className="text-gray-600 leading-relaxed">
                        원하는 평점(1~5점)만 골라 수집하세요. 부정적인 리뷰 분석이나 긍정적 후기 모음이 쉬워집니다.
                    </p>
                </div>
            </div>

            {/* Detailed Description */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-naver-green pl-4">
                    왜 이 도구가 필요한가요?
                </h2>
                <div className="prose prose-lg text-gray-600">
                    <p>
                        이커머스 시장에서 <strong>고객의 목소리(VOC)</strong>를 듣는 것은 매우 중요합니다.
                        하지만 네이버 브랜드스토어의 수많은 리뷰를 일일이 확인하고 정리하는 것은 엄청난 시간과 노력이 필요한 일입니다.
                    </p>
                    <p>
                        저희 <strong>네이버 리뷰 크롤러</strong>는 이러한 문제를 해결하기 위해 개발되었습니다.
                        경쟁사 제품의 리뷰를 분석하여 시장의 니즈를 파악하거나, 우리 제품의 개선점을 찾는 데 활용해 보세요.
                    </p>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-600 pl-4">
                    자주 묻는 질문 (FAQ)
                </h2>
                <div className="space-y-4">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg mb-2 text-gray-800 flex items-center gap-2">
                            <span className="text-naver-green">Q.</span> 정말 무료인가요?
                        </h3>
                        <p className="text-gray-600 pl-6">
                            네, 현재 베타 서비스 기간 동안 모든 기능을 <strong>무료</strong>로 제공하고 있습니다. 개인적인 분석 용도로 마음껏 활용해 보세요.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg mb-2 text-gray-800 flex items-center gap-2">
                            <span className="text-naver-green">Q.</span> 수집된 데이터는 저장되나요?
                        </h3>
                        <p className="text-gray-600 pl-6">
                            아니요, 수집된 리뷰 데이터는 사용자가 다운로드하는 즉시 서버에서 삭제되거나, 일시적인 처리를 위해서만 메모리에 존재합니다. 저희는 귀하의 데이터를 영구 저장하지 않습니다.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg mb-2 text-gray-800 flex items-center gap-2">
                            <span className="text-naver-green">Q.</span> 브랜드스토어 외에도 되나요?
                        </h3>
                        <p className="text-gray-600 pl-6">
                            현재는 <strong>네이버 브랜드스토어</strong>에 최적화되어 있습니다. 일반 스마트스토어의 경우 구조가 다를 수 있어 정상 작동을 보장하지 않습니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
