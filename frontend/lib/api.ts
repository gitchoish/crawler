import axios from 'axios';

// 프로덕션에서는 상대 경로 사용, 개발에서는 localhost
const API_URL = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
    ? ''
    : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000');

export interface CrawlRequest {
    product_url: string;
    rating_filter: number[] | null;
    max_reviews: number;
}

export interface CrawlResponse {
    task_id: string;
    status: string;
    message: string;
}

export interface TaskStatus {
    task_id: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress: number;
    collected_count: number;
    total_target: number;
    message: string;
    error?: string;
    download_url?: string;
}

export const api = {
    // 크롤링 시작
    startCrawl: async (data: CrawlRequest): Promise<CrawlResponse> => {
        const response = await axios.post(`${API_URL}/api/crawl`, data);
        return response.data;
    },

    // 상태 조회
    getStatus: async (taskId: string): Promise<TaskStatus> => {
        const response = await axios.get(`${API_URL}/api/status/${taskId}`);
        return response.data;
    },

    // 파일 다운로드 URL
    getDownloadUrl: (taskId: string, format: 'excel' | 'csv' = 'excel'): string => {
        return `${API_URL}/api/download/${taskId}?format=${format}`;
    },

    // 헬스 체크
    healthCheck: async () => {
        const response = await axios.get(`${API_URL}/api/health`);
        return response.data;
    },
};
