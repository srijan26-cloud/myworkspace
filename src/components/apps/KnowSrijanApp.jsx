import React from 'react';
import { User, Heart, Sparkles, MessageCircle, Utensils } from 'lucide-react';

const Section = ({ title, icon: Icon, children, color }) => (
    <div className="mb-12 last:mb-0 group">
        <div className="flex items-center gap-4 mb-6">
            <div className={`p-2.5 rounded-xl ${color} bg-opacity-10 text-opacity-100 group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={22} className={color.replace('bg-', 'text-')} />
            </div>
            <h2 className="text-2xl font-bold text-white/90 tracking-tight group-hover:text-white transition-colors duration-300">{title}</h2>
        </div>
        <div className="pl-14 text-gray-400 leading-relaxed space-y-5 text-lg font-light">
            {children}
        </div>
    </div>
);

const KnowSrijanApp = () => {
    return (
        <div className="w-full h-full bg-[#050505] text-white overflow-y-auto custom-scrollbar selection:bg-indigo-500/30">
            {/* Hero Header */}
            <div className="relative h-72 flex flex-col justify-end p-12 overflow-hidden border-b border-white/5">
                {/* Abstract Background for Premium Feel */}
                <div className="absolute inset-0 bg-[#080808]">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-indigo-600/10 blur-[120px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-purple-600/10 blur-[120px] rounded-full" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto w-full">
                    <h1 className="text-6xl font-black text-white mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
                        Know Srijan better
                    </h1>
                    <div className="flex flex-col md:flex-row md:items-center gap-4 text-gray-400">
                        <span className="text-xl font-medium tracking-widest uppercase text-indigo-400">Software Engineer</span>
                        <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/20" />
                        <span className="text-xl italic font-serif text-gray-500">"Good gets better"</span>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="max-w-4xl mx-auto p-12 md:p-20">
                <Section title="The Architecture of Srijan: A Glimpse into My World" icon={User} color="bg-blue-500">
                    <p>
                        In Sanskrit, <span className="text-blue-400 font-semibold italic">Srijan (सृजन)</span> means the act of "Creation"—the manifestation of something new from the void. It’s a name that defines my identity and my work. I hail from Prayagraj, the Kumbh Nagari, a place rooted in centuries of spiritual wisdom and a storied history of intellectual revolution.
                    </p>
                </Section>

                <Section title="The Rhythm of my Days" icon={Heart} color="bg-rose-500">
                    <p>
                        By profession, I am a Software Engineer, navigating the logic of coding during the week. I find my discipline in the gym and through the art of cooking, which allows me to create even outside of an IDE.
                    </p>
                    <p>
                        While I am a dedicated problem solver for my friends and colleagues, my time away from the screen is vital. Whenever I get time, I head to the football turf or dive into a game of chess; along with reading, these activities are more than just hobbies—they are therapy for my mind.
                    </p>
                </Section>

                <Section title="My Creative 'Chaos'" icon={Sparkles} color="bg-amber-500">
                    <p>
                        People often ask about my creative process, but the truth is, it is rarely linear. It’s a subconscious dance. I’ll be deep into a technical sprint or a workout when a thought strikes—a spark I hadn’t consciously invited.
                    </p>
                    <p>
                        I let that thought simmer in my subconscious, giving it the time it needs to grow until I can truly make it my own. That sudden <span className="text-amber-400 font-bold">"Aha!"</span> moment is what excites me most about being a creator; it’s proof that the best solutions often arrive when you aren’t looking for them.
                    </p>
                </Section>

                <Section title="Connections & Conversations" icon={MessageCircle} color="bg-emerald-500">
                    <p>
                        As a natural giver, I find myself drawn to people who offer more than just surface-level traits. To me, someone doesn't need to be conventionally beautiful or remarkably intelligent; they simply need an interesting thought. It is that unique spark of perspective that leads to true intelligence, and that is what makes someone <span className="italic text-emerald-400">qabil-e-ethriam</span> in my eyes.
                    </p>
                </Section>

                <Section title="Authenticity Above All" icon={Utensils} color="bg-orange-500">
                    <p>
                        I value authenticity above all—I am amazed by those who can laugh as if no one is watching. And if we ever sit down for a meal, don't worry about the menu; when it comes to food, <span className="text-orange-400 font-medium">mala avdel, tula chalel</span>.
                    </p>
                </Section>

                {/* Philosophical Quote Section */}
                <div className="mt-24 mb-16 p-12 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative z-10">
                        <p className="text-2xl md:text-3xl font-light italic text-gray-300 leading-relaxed text-center">
                            "As I evolve, I’ve come to realize that the pinnacle of wisdom is acknowledging <span className="text-white font-medium">I know nothing</span>, the zenith of style is found in <span className="text-white font-medium">effortless simplicity</span>, and the height of maturity is the courage to <span className="text-white font-medium">remain a child at heart</span>."
                        </p>
                    </div>
                </div>

                {/* Footer Signature */}
                <div className="pt-8 border-t border-white/5 text-center text-gray-600 text-sm tracking-widest uppercase">
                    <p>© {new Date().getFullYear()} Srijan Chandra. Refined with Intent.</p>
                </div>
            </div>
        </div>
    );
};

export default KnowSrijanApp;
