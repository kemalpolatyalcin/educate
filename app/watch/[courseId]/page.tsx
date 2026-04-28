import React from 'react';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function WatchPage(props: { params: Promise<{ courseId: string }> }) {
    const params = await props.params;
    const course = await prisma.course.findUnique({
        where: { id: params.courseId },
        include: { lessons: { orderBy: { id: 'asc' } } }
    });

    if (!course || course.lessons.length === 0) {
        return <div className="p-10 text-center">Bu kursta henüz izlenecek ders yok.</div>;
    }

    const firstLesson = course.lessons[0];

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans flex flex-col">
            <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-[#0f172a] sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    </Link>
                    <h1 className="font-bold text-lg truncate max-w-md">{course.title}</h1>
                </div>
                <div className="px-4 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-full uppercase tracking-widest">
                    Öğrenci Modu
                </div>
            </header>

            <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
                <div className="flex-1 bg-black flex flex-col justify-center">
                    <div className="aspect-video w-full max-h-[80vh]">
                        <iframe
                            className="w-full h-full"
                            src={firstLesson.videoUrl?.replace("watch?v=", "embed/")}
                            title={firstLesson.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="p-8">
                        <h2 className="text-2xl font-bold mb-2">{firstLesson.title}</h2>
                        <p className="text-slate-400">Şu an 1. dersi izliyorsun. Eğitimin tamamını bitirdiğinde sertifikan hazır olacak.</p>
                    </div>
                </div>
                <aside className="w-full lg:w-96 border-l border-slate-800 overflow-auto bg-[#1e293b]">
                    <div className="p-6 border-b border-slate-800">
                        <h3 className="font-bold text-slate-100 italic">Eğitim İçeriği</h3>
                    </div>
                    <div className="divide-y divide-slate-800">
                        {course.lessons.map((lesson, index) => (
                            <div key={lesson.id} className={`p-4 flex items-start gap-4 hover:bg-slate-800 transition-colors cursor-pointer ${index === 0 ? 'bg-slate-800/50 border-l-4 border-emerald-500' : ''}`}>
                                <div className="w-8 h-8 rounded bg-slate-700 flex-shrink-0 flex items-center justify-center text-xs font-bold">
                                    {index + 1}
                                </div>
                                <div>
                                    <p className="text-sm font-medium leading-snug">{lesson.title}</p>
                                    <span className="text-[10px] text-slate-500 uppercase mt-1 block">Video • 10:00</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
}