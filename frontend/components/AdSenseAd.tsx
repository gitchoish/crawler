'use client';

import React, { useEffect, useRef } from 'react';

interface AdSenseAdProps {
    slot: string;
    format?: string;
    responsive?: boolean;
    style?: React.CSSProperties;
}

export default function AdSenseAd({
    slot,
    format = 'auto',
    responsive = true,
    style = { display: 'block' }
}: AdSenseAdProps) {
    const adLoaded = useRef(false);

    useEffect(() => {
        // 이미 로드되었으면 스킵
        if (adLoaded.current) return;

        try {
            // @ts-ignore
            if (typeof window !== 'undefined' && window.adsbygoogle) {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                adLoaded.current = true;
            }
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, []);

    return (
        <div className="adsense-container my-6">
            <ins
                className="adsbygoogle"
                style={style}
                data-ad-client="ca-pub-7686325833774925"
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive.toString()}
            />
        </div>
    );
}

// 배너 광고 (상단)
export function TopBannerAd() {
    return (
        <AdSenseAd
            slot="1234567890" // TODO: 실제 슬롯 ID로 교체
            format="horizontal"
            style={{ display: 'block', minHeight: '90px' }}
        />
    );
}

// 사이드바 광고
export function SidebarAd() {
    return (
        <AdSenseAd
            slot="0987654321" // TODO: 실제 슬롯 ID로 교체
            format="vertical"
            style={{ display: 'block', minHeight: '600px' }}
        />
    );
}

// 인피드 광고 (결과 사이)
export function InFeedAd() {
    return (
        <AdSenseAd
            slot="1122334455" // TODO: 실제 슬롯 ID로 교체
            format="fluid"
            style={{ display: 'block', minHeight: '250px' }}
        />
    );
}
