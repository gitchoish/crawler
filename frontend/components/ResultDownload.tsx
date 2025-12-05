'use client';

import React from 'react';
import { Download, FileSpreadsheet, FileText, Share2 } from 'lucide-react';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

interface ResultDownloadProps {
    taskId: string;
    collectedCount: number;
}

export default function ResultDownload({ taskId, collectedCount }: ResultDownloadProps) {
    const handleDownload = (format: 'excel' | 'csv') => {
        const url = api.getDownloadUrl(taskId, format);
        window.open(url, '_blank');
        toast.success(`${format === 'excel' ? 'Excel' : 'CSV'} 파일 다운로드 시작!`);
    };

    const handleShare = () => {
        const shareText = `네이버 리뷰 ${collectedCount}개를 수집했습니다! 🎉`;

        if (navigator.share) {
            navigator.share({
                title: '네이버 리뷰 크롤러',
                text: shareText,
            }).catch(() => { });
        } else {
            navigator.clipboard.writeText(shareText);
            toast.success('클립보드에 복사되었습니다!');
        }
    };

    return (
        <div className="card space-y-6">
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-4">
                    <Download className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    크롤링 완료! 🎉
                </h3>
                <p className="text-gray-600">
                    총 <span className="font-bold text-naver-green">{collectedCount}개</span>의 리뷰를 수집했습니다
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Excel 다운로드 */}
                <button
                    onClick={() => handleDownload('excel')}
                    className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                    <FileSpreadsheet className="w-6 h-6" />
                    <div className="text-left">
                        <p className="font-semibold">Excel 다운로드</p>
                        <p className="text-xs opacity-90">.xlsx 형식</p>
                    </div>
                </button>

                {/* CSV 다운로드 */}
                <button
                    onClick={() => handleDownload('csv')}
                    className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                    <FileText className="w-6 h-6" />
                    <div className="text-left">
                        <p className="font-semibold">CSV 다운로드</p>
                        <p className="text-xs opacity-90">.csv 형식</p>
                    </div>
                </button>
            </div>

            {/* 공유 버튼 */}
            <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200"
            >
                <Share2 className="w-5 h-5" />
                <span className="font-medium">결과 공유하기</span>
            </button>

            {/* 안내 메시지 */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                    💡 <strong>팁:</strong> Excel 파일은 서식이 적용되어 있어 바로 분석하기 좋습니다!
                </p>
            </div>
        </div>
    );
}
