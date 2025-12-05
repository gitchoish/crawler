import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

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

    // 작업 상태 조회
    getStatus: async (taskId: string): Promise<TaskStatus> => {
        const response = await axios.get(`${API_URL}/api/status/${taskId}`);
        return response.data;
    },

    // 파일 다운로드 URL 생성
    getDownloadUrl: (taskId: string, format: 'excel' | 'csv' = 'excel'): string => {
        return `${API_URL}/api/download/${taskId}?format=${format}`;
    },

    // 헬스 체크
    healthCheck: async (): Promise<any> => {
        const response = await axios.get(`${API_URL}/api/health`);
        return response.data;
    },
};
