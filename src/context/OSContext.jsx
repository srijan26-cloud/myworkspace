import React, { createContext, useContext, useState, useEffect } from 'react';

const OSContext = createContext();

export const useOS = () => useContext(OSContext);

export const OSProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [windows, setWindows] = useState([]); // { id, appId, title, isMinimized, zIndex }
    const [activeWindowId, setActiveWindowId] = useState(null);
    const [recentApps, setRecentApps] = useState([]); // List of unique appIds
    const [zIndexCounter, setZIndexCounter] = useState(10);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);

    const playSound = () => {
        const audio = new Audio('/music1.wav');
        audio.play().catch(e => console.error("Sound play failed:", e));
    };

    // Login/Logout
    const login = () => {
        playSound();
        setIsLoggedIn(true);
    };

    const logout = () => {
        playSound();
        setIsMusicPlaying(false);
        setIsLoggedIn(false);
        setWindows([]);
        setActiveWindowId(null);
    };

    // Window Management
    const openApp = (appId, title) => {
        // Check if window already exists
        const existingWindow = windows.find(w => w.appId === appId);
        if (existingWindow) {
            if (existingWindow.isMinimized) {
                restoreWindow(existingWindow.id);
            } else {
                focusWindow(existingWindow.id);
            }
            return;
        }

        const newWindow = {
            id: Date.now().toString(),
            appId,
            title,
            isMinimized: false,
            zIndex: zIndexCounter,
        };

        setWindows([...windows, newWindow]);
        setZIndexCounter(prev => prev + 1);
        setActiveWindowId(newWindow.id);
        addToRecentApps(appId);
    };

    const closeWindow = (id) => {
        setWindows(windows.filter(w => w.id !== id));
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    };

    const minimizeWindow = (id) => {
        setWindows(windows.map(w => w.id === id ? { ...w, isMinimized: true } : w));
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    };

    const restoreWindow = (id) => {
        setWindows(windows.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: zIndexCounter } : w));
        setZIndexCounter(prev => prev + 1);
        setActiveWindowId(id);
    };

    const focusWindow = (id) => {
        setWindows(windows.map(w => w.id === id ? { ...w, zIndex: zIndexCounter } : w));
        setZIndexCounter(prev => prev + 1);
        setActiveWindowId(id);
    };

    const addToRecentApps = (appId) => {
        setRecentApps(prev => {
            const filtered = prev.filter(id => id !== appId);
            return [appId, ...filtered].slice(0, 5); // Keep last 5
        });
    };

    return (
        <OSContext.Provider value={{
            isLoggedIn,
            login,
            logout,
            windows,
            activeWindowId,
            recentApps,
            isMusicPlaying,
            setIsMusicPlaying,
            openApp,
            closeWindow,
            minimizeWindow,
            restoreWindow,
            focusWindow
        }}>
            {children}
        </OSContext.Provider>
    );
};
