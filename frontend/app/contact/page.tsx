import { Mail, MessageSquare, Send } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="max-w-2xl mx-auto py-16 px-4">
            <div className="text-center space-y-4 mb-12">
                <h1 className="text-3xl font-bold text-gray-900">문의하기</h1>
                <p className="text-gray-600">
                    서비스 이용 중 불편한 점이나 개선 아이디어가 있다면 언제든 말씀해 주세요.
                </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                    <Mail className="w-10 h-10" />
                </div>

                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">이메일 문의</h2>
                    <p className="text-gray-500 mb-6">
                        아래 주소로 메일을 보내주시면 확인 후 빠르게 답변 드리겠습니다.
                    </p>

                    <a
                        href="mailto:csh9609@gmail.com"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-bold text-lg"
                    >
                        <Send className="w-5 h-5" />
                        csh9609@gmail.com
                    </a>
                </div>

                <div className="w-full pt-8 border-t border-gray-100 mt-8">
                    <h3 className="font-medium text-gray-800 mb-4 flex items-center justify-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        자주 묻는 내용
                    </h3>
                    <ul className="text-sm text-gray-500 space-y-2 text-center">
                        <li>• "크롤링이 중간에 멈춰요" → 인터넷 상태를 확인해 주세요.</li>
                        <li>• "엑셀 파일이 안 열려요" → 파일명이 너무 길지 않은지 확인하세요.</li>
                        <li>• "새 기능 추가해 주세요" → 언제든 환영입니다!</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
