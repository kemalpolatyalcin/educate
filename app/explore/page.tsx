import React from 'react';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import TiltCard from '@/components/TiltCard';

const prisma = new PrismaClient();

export default async function ExplorePage() {
    const publishedCourses = await prisma.course.findMany({
        where: { isPublished: true },
        include: {
            instructor: true,
            _count: { select: { lessons: true } }
        },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="min-h-screen bg-[#050B14] font-sans text-slate-200 flex flex-col overflow-hidden">
            <header className="h-20 bg-[#050B14]/70 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                        <span className="text-white font-bold text-2xl leading-none">E</span>
                    </div>
                    <span className="text-2xl font-extrabold text-white tracking-tight">Educate.</span>
                </div>

                <div className="flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                        Stüdyoya Dön
                    </Link>
                    <Link href="/auth" className="px-6 py-2.5 bg-white text-slate-900 text-sm font-bold rounded-full hover:bg-slate-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        Giriş Yap
                    </Link>
                </div>
            </header>

            <div className="relative py-32 px-8 text-center flex flex-col items-center justify-center border-b border-white/5">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>

                <ScrollReveal direction="up" delay={0.1} className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        Sistem Çevrimiçi
                    </div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.2} className="relative z-10">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500">
                        Geleceği <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Kodla.</span>
                    </h1>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.3} className="relative z-10">
                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Sektörün en yenilikçi eğitim platformuna hoş geldin. Yalnızca izleme, inşa etmeye başla.
                    </p>
                </ScrollReveal>
            </div>

            <main className="flex-1 max-w-7xl mx-auto w-full p-8 py-20 relative z-10">
                <ScrollReveal direction="up">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-white tracking-tight">Eğitim Modülleri</h2>
                            <p className="text-slate-500 mt-2">Sisteme yüklenen aktif veri paketleri.</p>
                        </div>
                    </div>
                </ScrollReveal>

                {publishedCourses.length === 0 ? (
                    <ScrollReveal direction="up">
                        <div className="p-12 rounded-3xl border border-white/10 bg-white/5 text-center backdrop-blur-sm">
                            <div className="text-6xl mb-4 opacity-50">📡</div>
                            <h3 className="text-xl font-bold text-white mb-2">Sinyal Bekleniyor...</h3>
                        </div>
                    </ScrollReveal>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {publishedCourses.map((course, index) => (
                            <ScrollReveal
                                key={course.id}
                                direction={index % 3 === 0 ? "right" : index % 3 === 1 ? "up" : "left"}
                                delay={0.1 * (index % 3)}
                                className="h-full perspective-1000"
                            >
                                <TiltCard>
                                    <div className="h-full bg-[#0B1221]/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl hover:border-emerald-500/50 transition-all duration-500 group flex flex-col">
                                        <div className="aspect-video relative overflow-hidden bg-slate-950 border-b border-white/5">
                                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:25px_25px] group-hover:scale-110 transition-transform duration-700"></div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221] via-transparent to-transparent"></div>

                                            <div className="absolute top-3 left-3 flex gap-2">
                                                <div className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-400 animate-pulse">
                                                    LIVE_STREAM
                                                </div>
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center backdrop-blur-sm">
                                                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-emerald-400 border-b-[6px] border-b-transparent ml-1"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 flex-1 flex flex-col relative">
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded uppercase tracking-widest">
                                                    Veri Paketi
                                                </span>
                                                <span className="text-[10px] text-slate-500 font-mono uppercase italic">{course._count.lessons} Lessons Found</span>
                                            </div>

                                            <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-emerald-400 transition-colors">
                                                {course.title}
                                            </h3>

                                            <p className="text-slate-400 text-sm line-clamp-2 mb-8 leading-relaxed">
                                                {course.description || "Şifrelenmiş veri açıklaması bulunamadı."}
                                            </p>

                                            <div className="flex items-center justify-between pt-5 border-t border-white/5 mt-auto">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-emerald-400 flex items-center justify-center text-[10px] font-black shadow-inner">
                                                        {course.instructor.name?.charAt(0)}
                                                    </div>
                                                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter">{course.instructor.name}</span>
                                                </div>

                                                <Link
                                                    href={`/watch/${course.id}`}
                                                    className="px-5 py-2 bg-emerald-500 text-[#050B14] text-[11px] font-black rounded-full hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all uppercase tracking-tighter"
                                                >
                                                    Erişim Sağla
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </TiltCard>
                            </ScrollReveal>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}