import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music2, Volume2, VolumeX } from 'lucide-react';
import { useOS } from '../../context/OSContext';

const MusicPlayerApp = () => {
    const { isMusicPlaying, setIsMusicPlaying } = useOS();
    const audioRef = useRef(null);
    const containerRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [isDragging, setIsDragging] = useState(false);

    // Rotation Tracking for Seeking
    const lastAngle = useRef(0);

    // Synchronize audio volume with state
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // Synchronize audio playback with global state
    useEffect(() => {
        if (audioRef.current) {
            if (isMusicPlaying) {
                audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isMusicPlaying]);

    const togglePlay = () => {
        setIsMusicPlaying(!isMusicPlaying);
    };

    const skipForward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
        }
    };

    const skipBackward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
        }
    };

    const handleInteraction = (clientX, clientY) => {
        if (!containerRef.current || !audioRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        let currentAngle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
        if (currentAngle < 0) currentAngle += 360;

        let delta = currentAngle - lastAngle.current;
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;

        // One full rotation (360 deg) = 30 seconds of seeking (adjustable)
        const seekDelta = (delta / 360) * 30;
        audioRef.current.currentTime = Math.max(0, Math.min(audioRef.current.currentTime + seekDelta, duration));

        lastAngle.current = currentAngle;
    };

    const onPointerDown = (e) => {
        setIsDragging(true);
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        let startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
        if (startAngle < 0) startAngle += 360;
        lastAngle.current = startAngle;
    };

    const onPointerMove = (e) => {
        if (!isDragging) return;
        handleInteraction(e.clientX, e.clientY);
    };

    const onPointerUp = () => {
        setIsDragging(false);
    };

    const updateTime = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const onLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleProgressChange = (e) => {
        const time = Number(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const handleVolumeChange = (e) => {
        setVolume(Number(e.target.value));
    };

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    return (
        <div
            className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8 bg-black/40 backdrop-blur-xl relative overflow-hidden group select-none touch-none"
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
        >
            {/* Background Decorative Element */}
            <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-blue-500/10 animate-pulse pointer-events-none" />

            <audio
                ref={audioRef}
                src="/music2.mp3"
                onTimeUpdate={updateTime}
                onLoadedMetadata={onLoadedMetadata}
                onEnded={() => setIsMusicPlaying(false)}
                preload="auto"
            />

            {/* Vinyl Record Visual */}
            <div className="relative mb-8 z-10 scale-90 md:scale-100">
                <div
                    ref={containerRef}
                    onPointerDown={onPointerDown}
                    className={`
                        w-48 h-48 rounded-full border-4 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] 
                        flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black
                        cursor-grab active:cursor-grabbing
                        ${isMusicPlaying ? 'animate-spin-slow' : ''}
                        transition-all duration-700
                    `}
                >
                    {/* Inner Vinyl Rings */}
                    <div className="absolute inset-2 rounded-full border border-white/5 opacity-50" />
                    <div className="absolute inset-4 rounded-full border border-white/5 opacity-40" />
                    <div className="absolute inset-8 rounded-full border border-white/5 opacity-30" />

                    {/* Album Art Cover */}
                    <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center overflow-hidden shadow-inner">
                        <Music2 size={64} className="text-white/80" />
                    </div>

                    {/* Center Hole */}
                    <div className="absolute w-4 h-4 bg-gray-900 rounded-full border border-white/20 z-20 flex items-center justify-center">
                        <div className="w-1 h-1 bg-white/50 rounded-full" />
                    </div>
                </div>

                {/* Play Indicator Needle (simplified) */}
                <div className={`
                    absolute top-[-10px] right-2 w-2 h-20 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full origin-top transform 
                    ${isMusicPlaying ? 'rotate-[25deg]' : 'rotate-0'} 
                    transition-transform duration-500 shadow-lg
                `}>
                    <div className="absolute bottom-0 w-4 h-4 bg-gray-600 rounded-sm -left-1" />
                </div>
            </div>

            {/* Song Info */}
            <div className="text-center mb-6 z-10">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">Srijan's Track - 02</h3>
                <p className="text-blue-400 text-sm font-medium tracking-widest uppercase mt-1">Now Playing</p>
            </div>

            {/* Progress Bar Layer */}
            <div className="w-full max-w-sm mb-6 z-10 space-y-2">
                <div className="flex justify-between text-[10px] font-mono text-gray-400 tracking-widest">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>

                <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleProgressChange}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
                />
            </div>

            {/* Controls Layer */}
            <div className="flex items-center justify-center gap-10 z-10">
                <button
                    onClick={skipBackward}
                    className="text-white/40 hover:text-white hover:scale-110 transition-all duration-200"
                >
                    <SkipBack size={24} />
                </button>

                <button
                    onClick={togglePlay}
                    className="w-16 h-16 bg-white/5 border border-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl backdrop-blur-sm"
                >
                    {isMusicPlaying ? (
                        <Pause size={28} fill="currentColor" />
                    ) : (
                        <Play size={28} fill="currentColor" className="translate-x-1" />
                    )}
                </button>

                <button
                    onClick={skipForward}
                    className="text-white/40 hover:text-white hover:scale-110 transition-all duration-200"
                >
                    <SkipForward size={24} />
                </button>
            </div>

            {/* Volume Control - Functional */}
            <div className="mt-10 flex items-center gap-4 text-white/40 hover:text-white/80 transition-colors z-10 w-40">
                {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="flex-1 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white/50 hover:accent-white/80 transition-all"
                />
            </div>
        </div>
    );
};

export default MusicPlayerApp;
