import React from 'react';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function CourseEditor(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const courseId = params.id;

    const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: {
            lessons: { orderBy: { id: 'asc' } },
            instructor: true
        }
    });

    if (!course) return <div className="p-10 text-center text-xl font-bold">Kurs bulunamadı!</div>;

    async function addLesson(formData: FormData) {
        'use server'
        const title = formData.get('title') as string;
        const videoUrl = formData.get('videoUrl') as string;

        if (!title) return;

        await prisma.lesson.create({
            data: {
                title,
                videoUrl,
                courseId,
                isPublished: true,
            }
        });
        revalidatePath(`/courses/${courseId}`);
    }

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
            <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-slate-100">
                    <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-xl leading-none">E</span>
                    </div>
                    <span className="text-xl font-extrabold text-slate-900">Educate.</span>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <Link href="/courses" className="flex items-center px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium transition-colors">
                        ← Kurslara Dön
                    </Link>
                </nav>
            </aside>


            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-20 bg-white border-b border-slate-200 flex flex-col justify-center px-8 z-10">
                    <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">Eğitim Düzenleyici</p>
                    <h1 className="text-2xl font-bold text-slate-800">{course.title}</h1>
                </header>

                <div className="flex-1 overflow-auto p-8">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h2 className="text-lg font-bold text-slate-800 mb-4">+ Yeni Ders Videosu Ekle</h2>

                                <form action={addLesson} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Ders Başlığı</label>
                                        <input type="text" name="title" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Örn: Bölüm 1 - Giriş" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Video Linki (YouTube/Vimeo)</label>
                                        <input type="url" name="videoUrl" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="https://youtube.com/..." />
                                    </div>

                                    <button type="submit" className="w-full py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors mt-2">
                                        Dersi Kaydet
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                                    <h3 className="font-semibold text-slate-800">Kurs Müfredatı ({course.lessons.length} Ders)</h3>
                                </div>

                                <div className="divide-y divide-slate-100">
                                    {course.lessons.length === 0 ? (
                                        <div className="p-10 text-center text-slate-500">
                                            Öğrencilerin izleyeceği ilk dersi sol taraftan ekle.
                                        </div>
                                    ) : (
                                        course.lessons.map((lesson, index) => (
                                            <div key={lesson.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm">
                                                        {index + 1}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-900">{lesson.title}</h4>
                                                        <a href={lesson.videoUrl || '#'} target="_blank" className="text-sm text-emerald-600 hover:underline">
                                                            Videoyu Görüntüle
                                                        </a>
                                                    </div>
                                                </div>
                                                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-lg">
                                                    Yayında
                                                </span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}