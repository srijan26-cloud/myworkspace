import React from 'react';

const ResumeApp = () => {
    const resumeFile = '/resume.pdf';
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800">
            <div className="w-full h-full relative group">
                {/* Object tag often handles PDFs better than iframe across different browsers */}
                <object
                    data={resumeFile}
                    type="application/pdf"
                    className="w-full h-full"
                >
                    {/* Fallback content */}
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-8 text-center bg-gray-900 text-white">
                        <p className="text-xl font-semibold">Unable to display PDF directly.</p>
                        <p className="text-gray-400">Your browser might not support embedded PDFs.</p>
                        <a
                            href={resumeFile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors"
                        >
                            Download / Open PDF
                        </a>
                    </div>
                </object>
            </div>
        </div>
    );
};

export default ResumeApp;
