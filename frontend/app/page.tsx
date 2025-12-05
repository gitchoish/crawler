'use client';

import { useState, useEffect, useRef } from 'react';
import { Sparkles, Github, Heart } from 'lucide-react';
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
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* 헤더 */}
                <header className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <Sparkles className="w-10 h-10 text-naver-green" />
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-naver-green to-naver-dark bg-clip-text text-transparent">
                            네이버 리뷰 크롤러
                        </h1>
                    </div>
                    <p className="text-xl text-gray-600 mb-6">
                        브랜드스토어 리뷰를 쉽고 빠르게 수집하세요
                    </p>
                    <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            ⚡ 빠른 수집
                        </span>
                        <span className="flex items-center gap-1">
                            🎯 평점 필터링
                        </span>
                        <span className="flex items-center gap-1">
                            📊 Excel/CSV 지원
                        </span>
                    </div>
                </header>

                {/* 상단 배너 광고 */}
                <TopBannerAd />

                {/* 메인 컨텐츠 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 왼쪽: 입력 폼 */}
                    <div className="lg:col-span-2 space-y-6">
                        {!taskId ? (
                            <CrawlerForm onSubmit={handleStartCrawl} isLoading={isLoading} />
                        ) : (
                            <>
                                {taskStatus && (
                                    <ProgressTracker taskId={taskId} status={taskStatus} />
                                )}

                                {/* 인피드 광고 */}
                                {taskStatus?.status === 'processing' && <InFeedAd />}

                                {taskStatus?.status === 'completed' && (
                                    <>
                                        <ResultDownload
                                            taskId={taskId}
                                            collectedCount={taskStatus.collected_count}
                                        />

                                        <button
                                            onClick={handleReset}
                                            className="w-full py-3 px-6 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
                                        >
                                            🔄 새로운 크롤링 시작
                                        </button>
                                    </>
                                )}

                                {taskStatus?.status === 'failed' && (
                                    <button
                                        onClick={handleReset}
                                        className="w-full py-3 px-6 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-all duration-200 font-medium"
                                    >
                                        🔄 다시 시도
                                    </button>
                                )}
                            </>
                        )}

                        {/* 사용 가이드 */}
                        <div className="card">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">📖 사용 방법</h3>
                            <ol className="space-y-3 text-sm text-gray-600">
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 bg-naver-green text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                                    <span>네이버 브랜드스토어 제품 페이지 URL을 복사합니다</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 bg-naver-green text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                                    <span>원하는 평점과 리뷰 개수를 선택합니다</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 bg-naver-green text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                                    <span>크롤링 시작 버튼을 클릭하고 잠시 기다립니다</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 bg-naver-green text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                                    <span>완료되면 Excel 또는 CSV 파일을 다운로드합니다</span>
                                </li>
                            </ol>
                        </div>
                    </div>

                    {/* 오른쪽: 사이드바 광고 */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            <SidebarAd />

                            {/* 정보 카드 */}
                            <div className="card">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">💡 주요 기능</h3>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">✓</span>
                                        <span>평점별 필터링 (1~5점)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">✓</span>
                                        <span>최대 1000개 리뷰 수집</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">✓</span>
                                        <span>Excel/CSV 형식 지원</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">✓</span>
                                        <span>사진 리뷰 구분</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">✓</span>
                                        <span>태그 자동 추출</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 푸터 */}
                <footer className="mt-16 text-center text-gray-500 text-sm">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <span>Made with</span>
                        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                        <span>by Naver Review Crawler</span>
                    </div>
                    <p className="text-xs">
                        이 도구는 개인적인 용도로만 사용하세요. 과도한 크롤링은 서비스 이용이 제한될 수 있습니다.
                    </p>
                </footer>
            </div>
        </div>
    );
}
