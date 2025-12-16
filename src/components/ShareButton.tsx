'use client';

import { useState } from 'react';

interface ShareButtonProps {
    url: string;
    text: string;
    onShareComplete?: (platform: string) => void;
    className?: string;
}

export default function ShareButton({ url, text, onShareComplete, className = '' }: ShareButtonProps) {
    const [shareCount, setShareCount] = useState<string[]>([]);

    const handleShare = (platform: string) => {
        let shareUrl = '';

        switch (platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                break;
            case 'reddit':
                shareUrl = `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
                break;
        }

        // Open share dialog
        window.open(shareUrl, '_blank', 'width=600,height=400');

        // Track share
        if (!shareCount.includes(platform)) {
            const newShareCount = [...shareCount, platform];
            setShareCount(newShareCount);
            onShareComplete?.(platform);
        }
    };

    const isShared = (platform: string) => shareCount.includes(platform);

    return (
        <div className={`flex flex-col gap-3 ${className}`}>
            <p className="text-sm text-gray-400">
                Share on 3 platforms to unlock for free ({shareCount.length}/3)
            </p>
            <div className="flex gap-2 flex-wrap">
                {/* Twitter/X */}
                <button
                    onClick={() => handleShare('twitter')}
                    className={`
            inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
            ${isShared('twitter')
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-black/40 text-white hover:bg-black/60 border border-gray-700'
                        }
          `}
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    {isShared('twitter') ? 'Shared ✓' : 'X/Twitter'}
                </button>

                {/* LinkedIn */}
                <button
                    onClick={() => handleShare('linkedin')}
                    className={`
            inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
            ${isShared('linkedin')
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-[#0077B5]/20 text-[#0077B5] hover:bg-[#0077B5]/30 border border-[#0077B5]/30'
                        }
          `}
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    {isShared('linkedin') ? 'Shared ✓' : 'LinkedIn'}
                </button>

                {/* Reddit */}
                <button
                    onClick={() => handleShare('reddit')}
                    className={`
            inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
            ${isShared('reddit')
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-[#FF4500]/20 text-[#FF4500] hover:bg-[#FF4500]/30 border border-[#FF4500]/30'
                        }
          `}
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                    </svg>
                    {isShared('reddit') ? 'Shared ✓' : 'Reddit'}
                </button>
            </div>

            {shareCount.length >= 3 && (
                <div className="mt-2 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400">
                    🎉 Unlocked! You can now access this prompt.
                </div>
            )}
        </div>
    );
}
