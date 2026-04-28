import React from 'react';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

const prisma = new PrismaClient();

export default async function Home() {
  const userCount = await prisma.user.count();
  const courseCount = await prisma.course.count();
  const enrollmentCount = await prisma.enrollment.count();

  const latestUsers = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3,
  });

  async function addDummyInstructor() {
    'use server'
    const randomNum = Math.floor(Math.random() * 1000);
    await prisma.user.create({
      data: {
        email: `egitmen${randomNum}@educate.com`,
        name: `Eğitmen ${randomNum}`,
        role: 'INSTRUCTOR',
      }
    });
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
          <Link href="/" className="flex items-center px-4 py-3 bg-emerald-50 text-emerald-700 rounded-xl font-medium transition-colors">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            Genel Bakış
          </Link>
          <Link href="/courses" className="flex items-center px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-colors">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            Kurs Yönetimi
          </Link>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <h1 className="text-xl font-semibold text-slate-800">Eğitmen Paneli</h1>
          <form action={addDummyInstructor}>
            <button type="submit" className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-sm cursor-pointer">
              + Yeni Eğitmen Ekle
            </button>
          </form>
        </header>

        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-5xl mx-auto space-y-8">

            <ScrollReveal direction="down">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
                <h2 className="text-3xl font-bold mb-2 relative z-10 text-white">Educate'e hoş geldin, Kemal.</h2>
                <p className="text-emerald-50 max-w-xl text-lg relative z-10">
                  Sistemde {courseCount} aktif kurs ve {enrollmentCount} öğrenci kaydı var. Geleceği inşa etmeye devam edelim.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Kullanıcı', val: userCount, color: 'blue', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
                { label: 'Yayındaki Kurslar', val: courseCount, color: 'purple', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
                { label: 'Toplam Kayıt', val: enrollmentCount, color: 'amber', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z' }
              ].map((stat, i) => (
                <ScrollReveal key={stat.label} direction="up" delay={0.1 * i}>
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center hover:shadow-md transition-shadow">
                    <div className={`p-4 bg-${stat.color}-50 text-${stat.color}-600 rounded-xl mr-5`}>
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon}></path></svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                      <h3 className="text-2xl font-bold text-slate-900">{stat.val}</h3>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScrollReveal direction="left" delay={0.3}>
                <Link href="/courses" className="group p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden block">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" /></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Eğitmen Stüdyosu</h3>
                  <p className="text-slate-500 mb-6 max-w-xs">Kurslarını yönet, ders içeriklerini yükle ve öğrencilerini takip et.</p>
                  <span className="inline-flex items-center text-emerald-600 font-bold group-hover:gap-2 transition-all">
                    Stüdyoya Git <span>→</span>
                  </span>
                </Link>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.4}>
                <Link href="/explore" className="group p-8 rounded-3xl bg-slate-900 text-white shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden block">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-emerald-400">
                    <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-emerald-400">Kurs Marketi</h3>
                  <p className="text-slate-400 mb-6 max-w-xs">Yayındaki kursları keşfet ve öğrenci deneyimini test et.</p>
                  <span className="inline-flex items-center text-white font-bold group-hover:gap-2 transition-all">
                    Markete Git <span>→</span>
                  </span>
                </Link>
              </ScrollReveal>
            </div>
            <ScrollReveal direction="up" delay={0.5}>
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <h3 className="font-semibold text-slate-800">Sistemdeki Aktif Kullanıcılar</h3>
                  <span className="text-xs font-mono text-slate-400">DB_STATUS: CONNECTED</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {userCount === 0 ? (
                    <div className="p-12 text-center text-slate-400">Henüz kullanıcı bulunmuyor.</div>
                  ) : (
                    latestUsers.map((user) => (
                      <div key={user.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center mr-4 shadow-inner">
                            {user.name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-slate-900">{user.name}</p>
                              <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-bold tracking-widest border border-slate-200">
                                {user.role}
                              </span>
                            </div>
                            <p className="text-sm text-slate-500">{user.email}</p>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-slate-400">
                          {user.createdAt.toLocaleDateString('tr-TR')}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </main>
    </div>
  );
}