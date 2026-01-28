import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Globe, ChevronRight, ExternalLink, Plus, X, Search } from 'lucide-react';

const BrowserApp = () => {
    const defaultTabs = [
        {
            id: '1',
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/srijan-chandra-26469b1a8/',
            type: 'link'
        }
    ];

    const [tabs, setTabs] = useState(defaultTabs);
    const [activeTabId, setActiveTabId] = useState('1');
    const [searchQuery, setSearchQuery] = useState('');

    const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

    const bookmarks = [
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/srijan-chandra-26469b1a8/',
            icon: 'blue'
        }
    ];

    const handleLoadBookmark = (targetUrl, name) => {
        // Update current tab or open new? We'll update current if it's a search tab, else open new
        if (activeTab.type === 'search') {
            updateTab(activeTabId, { name: name || 'Loading...', url: targetUrl, type: 'link' });
        }
        window.open(targetUrl, '_blank');
    };

    const addNewTab = () => {
        const newId = Date.now().toString();
        const newTab = {
            id: newId,
            name: 'New Tab',
            url: 'about:blank',
            type: 'search'
        };
        setTabs([...tabs, newTab]);
        setActiveTabId(newId);
    };

    const removeTab = (e, id) => {
        e.stopPropagation();
        if (tabs.length === 1) return;
        const newTabs = tabs.filter(t => t.id !== id);
        setTabs(newTabs);
        if (activeTabId === id) {
            setActiveTabId(newTabs[0].id);
        }
    };

    const updateTab = (id, updates) => {
        setTabs(tabs.map(t => t.id === id ? { ...t, ...updates } : t));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
        window.open(searchUrl, '_blank');
        updateTab(activeTabId, { name: searchQuery, url: searchUrl });
    };

    return (
        <div className="w-full h-full flex flex-col bg-[#1a1a1a] text-gray-300 font-sans overflow-hidden">
            {/* Tab Bar */}
            <div className="flex items-center px-2 bg-[#1a1a1a] gap-1 overflow-x-auto no-scrollbar shrink-0 pt-2">
                {tabs.map(tab => (
                    <div
                        key={tab.id}
                        onClick={() => setActiveTabId(tab.id)}
                        className={`
                            group relative min-w-[120px] max-w-[200px] h-9 px-3 flex items-center gap-2 cursor-pointer transition-all rounded-t-lg
                            ${activeTabId === tab.id ? 'bg-[#2d2d2d] text-white' : 'hover:bg-white/5 text-gray-500'}
                        `}
                    >
                        <Globe size={12} className={activeTabId === tab.id ? 'text-blue-400' : 'text-gray-600'} />
                        <span className="text-[11px] font-medium truncate flex-1">{tab.name}</span>
                        <button
                            onClick={(e) => removeTab(e, tab.id)}
                            className="p-1 hover:bg-white/10 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X size={10} />
                        </button>
                    </div>
                ))}
                <button
                    onClick={addNewTab}
                    className="p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-colors ml-1"
                >
                    <Plus size={16} />
                </button>
            </div>

            {/* Browser Toolbar */}
            <div className="h-12 bg-[#2d2d2d] border-b border-black/20 flex items-center px-4 gap-4 shrink-0">
                <div className="hidden md:flex items-center gap-2">
                    <button className="p-1.5 hover:bg-white/5 rounded-full transition-colors text-gray-500 hover:text-gray-300">
                        <ArrowLeft size={16} />
                    </button>
                    <button className="p-1.5 hover:bg-white/5 rounded-full transition-colors text-gray-500 hover:text-gray-300">
                        <ArrowRight size={16} />
                    </button>
                    <button className="p-1.5 hover:bg-white/5 rounded-full transition-colors text-gray-500 hover:text-gray-300">
                        <RotateCw size={14} />
                    </button>
                </div>

                {/* Address Bar */}
                <div className="flex-1 h-8 bg-[#1a1a1a] rounded-full border border-white/5 flex items-center px-4 gap-2 text-xs overflow-hidden">
                    <Globe size={12} className="text-gray-500 shrink-0" />
                    <span className="truncate opacity-70 w-full">{activeTab.url}</span>
                </div>
            </div>

            {/* Bookmarks Bar - Fixed Responsiveness */}
            <div className="h-9 bg-[#2d2d2d] border-b border-black/40 flex items-center px-4 gap-4 shrink-0 overflow-x-auto no-scrollbar scroll-smooth">
                {bookmarks.map((bookmark, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleLoadBookmark(bookmark.url, bookmark.name)}
                        className="flex items-center gap-2 px-3 py-1 hover:bg-white/5 rounded-md transition-all group shrink-0"
                    >
                        <div className={`w-2 h-2 rounded-sm ${bookmark.icon === 'blue' ? 'bg-blue-500' : 'bg-gray-500'}`} />
                        <span className="text-xs font-medium group-hover:text-white transition-colors whitespace-nowrap">
                            {bookmark.name}
                        </span>
                    </button>
                ))}
            </div>

            {/* Browser Content */}
            <div className="flex-1 flex flex-col bg-[#0f0f0f] relative overflow-hidden">
                {activeTab.type === 'search' ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-full max-w-lg mb-12">
                            <div className="flex items-center justify-center gap-4 mb-8">
                                <Globe size={48} className="text-blue-500 opacity-20" />
                                <h1 className="text-4xl font-bold tracking-tighter text-white/90">Browser</h1>
                            </div>

                            <form onSubmit={handleSearch} className="relative group">
                                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                                    <Search size={18} className="text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search with Google..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-14 bg-[#1a1a1a] border border-white/10 rounded-2xl pl-14 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-2xl"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-3 top-3 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg"
                                >
                                    Search
                                </button>
                            </form>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4 opacity-40">
                            {['Google', 'GitHub', 'LinkedIn'].map(site => (
                                <span key={site} className="text-[10px] uppercase tracking-widest px-3 py-1 border border-white/10 rounded-full">{site}</span>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#0f0f0f] relative overflow-hidden">
                        {/* Decorative Pattern */}
                        <div className="absolute inset-0 opacity-5 pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

                        <div className="relative z-10 max-w-sm">
                            <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center mb-6 mx-auto border border-blue-500/20 shadow-[0_0_30px_rgba(37,99,235,0.1)]">
                                <ExternalLink size={40} className="text-blue-500" />
                            </div>

                            <h2 className="text-xl md:text-2xl font-bold text-white mb-2 underline decoration-blue-500/50 underline-offset-4 tracking-tight">
                                {activeTab.name}
                            </h2>
                            <p className="text-xs md:text-sm text-gray-400 mb-8 leading-relaxed">
                                To ensure security and a full experience, the browser is opening this secure external site in a new environment.
                            </p>

                            <button
                                onClick={() => handleLoadBookmark(activeTab.url, activeTab.name)}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group"
                            >
                                <span className="text-sm md:text-base">Launch Session</span>
                                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Browser Footer */}
            <div className="h-6 bg-[#2d2d2d] border-t border-black/20 flex items-center px-4 text-[9px] text-gray-500 uppercase tracking-widest leading-none shrink-0 overflow-hidden">
                <span className="truncate">Secure Connection Established • SSL 256-bit • Active Tab: {activeTabId}</span>
            </div>
        </div>
    );
};

export default BrowserApp;
