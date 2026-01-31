import React from 'react';
import { motion } from 'framer-motion';
import { Database, Code2, Cpu, Settings, Layout } from 'lucide-react';

const SkillCategory = ({ title, icon: Icon, skills, colorClass }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-6 bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] space-y-4 hover:border-white/10 transition-all group"
    >
        <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${colorClass}`}>
                <Icon size={24} className="opacity-80" />
            </div>
            <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">{title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
                <span
                    key={index}
                    className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-full text-[10px] text-zinc-400 font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all cursor-default"
                >
                    {skill}
                </span>
            ))}
        </div>
    </motion.div>
);

const AboutMeApp = () => {
    const skillSets = [
        {
            title: "Languages & Databases",
            icon: Database,
            colorClass: "bg-blue-500/10 border-blue-500/20 text-blue-400",
            skills: ["Java 8/17", "SQL", "PL/SQL", "JavaScript", "Oracle", "PostgreSQL"]
        },
        {
            title: "Frameworks & Libraries",
            icon: Code2,
            colorClass: "bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-400",
            skills: ["Spring Boot", "Spring Cloud", "Spring MVC", "JPA/Hibernate", "Apache Kafka", "JMS", "JUnit", "Mockito"]
        },
        {
            title: "Architecture & Concepts",
            icon: Cpu,
            colorClass: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
            skills: ["Microservices", "RESTful API", "Multithreading", "SOLID", "Design Patterns", "DSA (Java)"]
        },
        {
            title: "DevOps & Tools",
            icon: Settings,
            colorClass: "bg-orange-500/10 border-orange-500/20 text-orange-400",
            skills: ["GitLab", "Jenkins", "SonarQube", "Postman"]
        },
        {
            title: "Frontend",
            icon: Layout,
            colorClass: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
            skills: ["JavaScript", "ReactJS", "jQuery"]
        }
    ];

    return (
        <div className="w-full h-full bg-black overflow-y-auto custom-scrollbar font-sans p-6 md:p-12">
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Header Section */}
                <div className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full"
                    >
                        <span className="text-[10px] text-white font-black uppercase tracking-[0.4em]">Profile Overview</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-extralight text-white uppercase tracking-[0.2em] leading-tight"
                    >
                        Software <span className="font-black text-blue-500/80">Engineer</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-500 text-sm md:text-base font-medium max-w-2xl leading-relaxed tracking-wide"
                    >
                        Passionate backend developer with expertise in building scalable microservices and robust enterprise applications. Dedicated to writing clean, maintainable code following SOLID principles and modern architectural patterns.
                    </motion.p>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                    {skillSets.map((set, idx) => (
                        <SkillCategory key={idx} {...set} />
                    ))}
                </div>

                {/* Footer Quote */}
                <div className="pt-12 border-t border-white/5 text-center opacity-30">
                    <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.5em]">System Status: Optimization in Progress</p>
                </div>
            </div>
        </div>
    );
};

export default AboutMeApp;
