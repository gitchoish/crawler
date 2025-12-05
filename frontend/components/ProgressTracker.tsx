'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';
import { TaskStatus } from '@/lib/api';

interface ProgressTrackerProps {
    taskId: string;
    status: TaskStatus;
}

export default function ProgressTracker({ taskId, status }: ProgressTrackerProps) {
    const [dots, setDots] = useState('');

    useEffect(() => {
        if (status.status === 'processing') {
            const interval = setInterval(() => {
                setDots(prev => prev.length >= 3 ? '' : prev + '.');
            }, 500);
            return () => clearInterval(interval);
        }
    }, [status.status]);

    const getStatusIcon = () => {
        switch (status.status) {
            case 'pending':
                return <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />;
            case 'processing':
                return <Loader2 className="w-8 h-8 text-naver-green animate-spin" />;
            case 'completed':
                return <CheckCircle2 className="w-8 h-8 text-green-500" />;
            case 'failed':
                return <XCircle className="w-8 h-8 text-red-500" />;
        }
    };

    const getStatusColor = () => {
        switch (status.status) {
            case 'pending':
                return 'from-blue-500 to-blue-600';
            case 'processing':
                return 'from-naver-green to-naver-dark';
            case 'completed':
                return 'from-green-500 to-emerald-600';
            case 'failed':
                return 'from-red-500 to-red-600';
        }
    };

    const getStatusText = () => {
        switch (status.status) {
            case 'pending':
                return '대기 중';
            case 'processing':
                return '크롤링 중';
            case 'completed':
                return '완료';
            case 'failed':
                return '실패';
        }
    };

    return (
        <div className="card space-y-6">
            {/* 상태 헤더 */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {getStatusIcon()}
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">
                            {getStatusText()}{status.status === 'processing' && dots}
                        </h3>
                        <p className="text-sm text-gray-500">작업 ID: {taskId.slice(0, 8)}...</p>
                    </div>
                </div>

                {status.status === 'processing' && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-naver-green" />
                        <span className="font-semibold text-naver-green">
                            {status.collected_count} / {status.total_target}
                        </span>
                    </div>
                )}
            </div>

            {/* 진행률 바 */}
            {(status.status === 'processing' || status.status === 'completed') && (
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">진행률</span>
                        <span className="font-semibold text-gray-800">{status.progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className={`h-full bg-gradient-to-r ${getStatusColor()} transition-all duration-500 ease-out`}
                            style={{ width: `${status.progress}%` }}
                        />
                    </div>
                </div>
            )}

            {/* 상태 메시지 */}
            <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">{status.message}</p>
                {status.error && (
                    <p className="text-sm text-red-600 mt-2">⚠️ {status.error}</p>
                )}
            </div>

            {/* 완료 시 통계 */}
            {status.status === 'completed' && (
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">수집된 리뷰</p>
                        <p className="text-2xl font-bold text-naver-green">{status.collected_count}개</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">목표 달성률</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {Math.round((status.collected_count / status.total_target) * 100)}%
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
