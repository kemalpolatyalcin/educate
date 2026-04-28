import React from 'react';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function CoursesPage() {

    const courses = await prisma.course.findMany({
        include: { instructor: true },
        orderBy: { createdAt: 'desc' }
    });

    const instructors = await prisma.user.findMany({
        where: { role: 'INSTRUCTOR' },
        orderBy: { createdAt: 'desc' }
    });
    async function createCourse(formData: FormData) {
        'use server'
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const instructorId = formData.get('instructorId') as string;

        if (!title || !instructorId) return;

        await prisma.course.create({
            data: {
                title,
                description,
                instructorId,
                isPublished: false,
            }
        });

        revalidatePath('/courses');
        revalidatePath('/');
    }

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
            <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-slate-100">
                    <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                        <span className="text-white font-bold text-xl leading-none tracking-tighter">E</span>
                    </div>
                    <span className="text-xl font-extrabold tracking-tight text-slate-900">Educate.</span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    <Link href="/" className="flex items-center px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-colors">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                        Genel Bakış
                    </Link>
                    <Link href="/courses" className="flex items-center px-4 py-3 bg-emerald-50 text-emerald-700 rounded-xl font-medium transition-colors">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                        Kurs Yönetimi
                    </Link>
                </nav>
            </aside>

            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 z-10">
                    <h1 className="text-xl font-semibold text-slate-800">Kurs Stüdyosu</h1>
                </header>

                <div className="flex-1 overflow-auto p-8">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h2 className="text-lg font-bold text-slate-800 mb-4">Yeni Eğitim Başlat</h2>

                                {instructors.length === 0 ? (
                                    <div className="p-4 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-sm">
                                        Sistemde henüz bir eğitmen yok. Önce "Genel Bakış" sayfasından bir Eğitmen eklemelisin.
                                    </div>
                                ) : (
                                    <form action={createCourse} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Kurs Adı</label>
                                            <input type="text" name="title" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="Örn: Sıfırdan İleri Seviye Next.js" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Kısa Açıklama</label>
                                            <textarea name="description" rows={3} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="Öğrenciler bu kursta ne öğrenecek?"></textarea>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Eğitmen Ataması</label>
                                            <select name="instructorId" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white">
                                                {instructors.map(inst => (
                                                    <option key={inst.id} value={inst.id}>{inst.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <button type="submit" className="w-full py-2.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors cursor-pointer mt-2">
                                            Kurs Taslağını Oluştur
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                                    <h3 className="font-semibold text-slate-800">Sistemdeki Kurslar ({courses.length})</h3>
                                </div>

                                <div className="divide-y divide-slate-100">
                                    {courses.length === 0 ? (
                                        <div className="p-12 text-center flex flex-col items-center">
                                            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                                                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                                            </div>
                                            <p className="text-slate-500">Henüz hiç kurs oluşturulmadı.</p>
                                        </div>
                                    ) : (
                                        courses.map((course) => (
                                            <div key={course.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row gap-4 justify-between items-start">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h4 className="text-lg font-bold text-slate-900">{course.title}</h4>
                                                        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${course.isPublished ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                            {course.isPublished ? 'Yayında' : 'Taslak'}
                                                        </span>
                                                    </div>
                                                    <p className="text-slate-500 text-sm leading-relaxed max-w-xl mb-3">
                                                        {course.description || 'Açıklama girilmedi.'}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                                        Eğitmen: {course.instructor.name}
                                                    </div>
                                                </div>

                                                <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
                                                    <Link href={`/watch/${course.id}`} target="_blank" className="px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium rounded-lg hover:bg-emerald-100 transition-colors shadow-sm whitespace-nowrap text-center">
                                                        ▶ Öğrenci Gözüyle İzle
                                                    </Link>
                                                    <Link href={`/courses/${course.id}`} className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap text-center">
                                                        İçeriği Düzenle
                                                    </Link>
                                                </div>
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