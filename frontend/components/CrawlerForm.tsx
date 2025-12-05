'use client';

import React, { useState } from 'react';
import { Search, Star, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';

interface CrawlerFormProps {
    onSubmit: (data: {
        productUrl: string;
        ratingFilter: number[] | null;
        maxReviews: number;
    }) => void;
    isLoading: boolean;
}

export default function CrawlerForm({ onSubmit, isLoading }: CrawlerFormProps) {
    const [productUrl, setProductUrl] = useState('');
    const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
    const [maxReviews, setMaxReviews] = useState(100);

    const handleRatingToggle = (rating: number) => {
        setSelectedRatings(prev =>
            prev.includes(rating)
                ? prev.filter(r => r !== rating)
                : [...prev, rating].sort((a, b) => b - a)
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!productUrl.trim()) {
            toast.error('제품 URL을 입력해주세요');
            return;
        }

        if (!productUrl.startsWith('https://brand.naver.com/')) {
            toast.error('네이버 브랜드스토어 URL만 지원합니다');
            return;
        }

        onSubmit({
            productUrl: productUrl.trim(),
            ratingFilter: selectedRatings.length > 0 ? selectedRatings : null,
            maxReviews,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="card space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-naver-green to-naver-dark rounded-xl">
                    <Search className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">리뷰 크롤링 시작</h2>
                    <p className="text-sm text-gray-500">네이버 브랜드스토어 리뷰를 수집합니다</p>
                </div>
            </div>

            {/* URL 입력 */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    제품 URL <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={productUrl}
                    onChange={(e) => setProductUrl(e.target.value)}
                    placeholder="https://brand.naver.com/..."
                    className="input-field"
                    disabled={isLoading}
                />
                <p className="text-xs text-gray-500 mt-1">
                    네이버 브랜드스토어 제품 페이지 URL을 입력하세요
                </p>
            </div>

            {/* 평점 필터 */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Star className="inline w-4 h-4 mr-1" />
                    평점 필터 (선택사항)
                </label>
                <div className="flex gap-2 flex-wrap">
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <button
                            key={rating}
                            type="button"
                            onClick={() => handleRatingToggle(rating)}
                            disabled={isLoading}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${selectedRatings.includes(rating)
                                    ? 'bg-gradient-to-r from-naver-green to-naver-dark text-white shadow-lg scale-105'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                } disabled:opacity-50`}
                        >
                            ⭐ {rating}점
                        </button>
                    ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    {selectedRatings.length > 0
                        ? `${selectedRatings.join(', ')}점 리뷰만 수집합니다`
                        : '모든 평점의 리뷰를 수집합니다'}
                </p>
            </div>

            {/* 리뷰 개수 */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <TrendingUp className="inline w-4 h-4 mr-1" />
                    수집할 리뷰 개수: <span className="text-naver-green">{maxReviews}개</span>
                </label>
                <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={maxReviews}
                    onChange={(e) => setMaxReviews(parseInt(e.target.value))}
                    disabled={isLoading}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-naver-green"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10개</span>
                    <span>500개</span>
                    <span>1000개</span>
                </div>
            </div>

            {/* 제출 버튼 */}
            <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full"
            >
                {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        크롤링 중...
                    </span>
                ) : (
                    '🚀 크롤링 시작'
                )}
            </button>
        </form>
    );
}
