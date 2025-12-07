'use client';

import { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import CrawlerForm from '@/components/CrawlerForm';
import ProgressTracker from '@/components/ProgressTracker';
import ResultDownload from '@/components/ResultDownload';
import { TopBannerAd, SidebarAd, InFeedAd } from '@/components/AdSenseAd';
import { api, TaskStatus } from '@/lib/api';
import toast from 'react-hot-toast';

export default function Home() {
    const [taskId, setTaskId] = useState<string | null>(null);
    const [taskStatus, setTaskStatus] = useState<TaskStatus | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const toastShownRef = useRef(false);

    // 작업 상태 폴링
    useEffect(() => {
        if (!taskId) {
            toastShownRef.current = false;
            return;
        }

        let intervalId: NodeJS.Timeout | null = null;

        const pollStatus = async () => {
            try {
                const status = await api.getStatus(taskId);
                setTaskStatus(status);

                // 완료 또는 실패 시 폴링 중지 및 토스트 한 번만 표시
                if (status.status === 'completed' && !toastShownRef.current) {
                    setIsLoading(false);
                    toastShownRef.current = true;
                    toast.success('크롤링이 완료되었습니다! 🎉');
                    if (intervalId) clearInterval(intervalId);
                } else if (status.status === 'failed' && !toastShownRef.current) {
                    setIsLoading(false);
                    toastShownRef.current = true;
                    toast.error('크롤링에 실패했습니다.');
                    if (intervalId) clearInterval(intervalId);
                }
            } catch (error) {
                console.error('Status polling error:', error);
            }
        };

        // 초기 조회
        pollStatus();

        // 2초마다 상태 조회
        intervalId = setInterval(pollStatus, 2000);

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [taskId]);

    const handleStartCrawl = async (data: {
        productUrl: string;
        ratingFilter: number[] | null;
        maxReviews: number;
    }) => {
        try {
            setIsLoading(true);

            const response = await api.startCrawl({
                product_url: data.productUrl,
                rating_filter: data.ratingFilter,
                max_reviews: data.maxReviews,
            });

            setTaskId(response.task_id);
            toast.success('크롤링이 시작되었습니다!');
        } catch (error: any) {
            setIsLoading(false);
            const errorMessage = error.response?.data?.detail || '크롤링 시작에 실패했습니다';
            toast.error(errorMessage);
            console.error('Crawl start error:', error);
        }
    };

    const handleReset = () => {
        setTaskId(null);
        setTaskStatus(null);
        setIsLoading(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* 헤더 섹션 (Hero) */}
            <div className="text-center mb-16 space-y-6">
                <div className="inline-flex items-center justify-center p-3 bg-green-50 rounded-2xl mb-2">
                    <Sparkles className="w-8 h-8 text-naver-green" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                    네이버 브랜드스토어 <span className="text-naver-green">리뷰 분석</span>
                </h1>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                    복잡한 리뷰 데이터를 한 번에 수집하고 분석하세요.<br className="hidden md:block" />
                    마케터와 셀러를 위한 가장 스마트한 도구입니다.
                </p>

                <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-500 mt-8">
                    <span className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 flex items-center gap-2">
                        🎯 정밀 필터링
                    </span>
                    <span className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 flex items-center gap-2">
                        💾 Excel/CSV 다운로드
                    </span>
                </div>
            </div>

            {/* 상단 배너 광고 */}
            <TopBannerAd />

            {/* 메인 컨텐츠 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                {/* 왼쪽: 입력 폼 및 진행상태 */}
                <div className="lg:col-span-2 space-y-8">
                    {!taskId ? (
                        <CrawlerForm onSubmit={handleStartCrawl} isLoading={isLoading} />
                    ) : (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {taskStatus && (
                                <ProgressTracker taskId={taskId} status={taskStatus} />
                            )}

                            {/* 인피드 광고 */}
                            {taskStatus?.status === 'processing' && <InFeedAd />}

                            {taskStatus?.status === 'completed' && (
                                <div className="space-y-4">
                                    <ResultDownload
                                        taskId={taskId}
                                        collectedCount={taskStatus.collected_count}
                                    />

                                    <button
                                        onClick={handleReset}
                                        className="w-full py-4 px-6 bg-white border-2 border-dashed border-gray-300 text-gray-500 rounded-xl hover:border-naver-green hover:text-naver-green hover:bg-green-50 transition-all duration-200 font-medium flex items-center justify-center gap-2 group"
                                    >
                                        <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                                        새로운 크롤링 시작하기
                                    </button>
                                </div>
                            )}

                            {taskStatus?.status === 'failed' && (
                                <button
                                    onClick={handleReset}
                                    className="w-full py-4 px-6 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all duration-200 font-medium border border-red-100"
                                >
                                    다시 시도하기
                                </button>
                            )}
                        </div>
                    )}

                    {/* 사용 가이드 (카드 디자인 개선) */}
                    <div className="card bg-gradient-to-br from-white to-gray-50">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-naver-green rounded-full"></span>
                            간편 사용 가이드
                        </h3>
                        <div className="grid gap-4">
                            {[
                                { step: 1, text: "네이버 브랜드스토어 제품 상세 URL을 복사하세요." },
                                { step: 2, text: "원하는 평점(1~5점)과 수집할 리뷰 개수를 설정하세요." },
                                { step: 3, text: "'크롤링 시작' 버튼을 누르고 잠시만 기다려주세요." },
                                { step: 4, text: "분석된 데이터를 Excel 또는 CSV로 다운로드하세요." }
                            ].map((item) => (
                                <div key={item.step} className="flex items-start gap-4 p-3 rounded-lg hover:bg-white transition-colors">
                                    <span className="flex-shrink-0 w-8 h-8 bg-naver-green/10 text-naver-green rounded-full flex items-center justify-center font-bold text-sm">
                                        {item.step}
                                    </span>
                                    <span className="text-gray-600 text-sm mt-1.5 font-medium">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 오른쪽: 사이드바 */}
                <div className="lg:col-span-1 space-y-8">
                    <SidebarAd />

                    {/* 기능 소개 카드 */}
                    <div className="card border-t-4 border-t-naver-green">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">✨ 프리미엄 기능 무료</h3>
                        <ul className="space-y-4">
                            {[
                                "평점별 정밀 필터링",
                                "대용량 데이터 수집 (최대 1000개)",
                                "자동 태그 추출 및 데이터 정제",
                                "사진/텍스트 리뷰 구분",
                                "Excel/CSV 호환 포맷"
                            ].map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-sm text-gray-600">
                                    <div className="w-1.5 h-1.5 rounded-full bg-naver-green"></div>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
