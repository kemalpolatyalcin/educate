import React from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#050B14] flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full"></div>

            <ScrollReveal direction="up" className="w-full max-w-md relative z-10">
                <div className="bg-[#0B1221]/80 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

                    <div className="flex flex-col items-center mb-10">
                        <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] mb-4">
                            <span className="text-white font-black text-3xl italic">E</span>
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tighter">SİSTEME ERİŞİM</h2>
                        <p className="text-slate-500 text-xs font-mono mt-2 uppercase tracking-[0.2em]">Credential Verification Required</p>
                    </div>
                    <form className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2 ml-1">Terminal ID (Email)</label>
                            <input
                                type="email"
                                placeholder="user@educate.sys"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all font-mono text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2 ml-1">Access Key (Password)</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all font-mono text-sm"
                            />
                        </div>

                        <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#050B14] font-black py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] active:scale-[0.98] uppercase text-sm tracking-widest">
                            Protokolü Başlat
                        </button>
                    </form>
                    <div className="mt-8 pt-8 border-t border-white/5 text-center">
                        <p className="text-slate-500 text-xs mb-4">Henüz bir yetkin yok mu?</p>
                        <Link href="/explore" className="text-emerald-400 text-xs font-bold hover:text-emerald-300 transition-colors uppercase tracking-widest">
                            ← Merkeze Dön
                        </Link>
                    </div>
                </div>
                <p className="text-center mt-6 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                    Educate_OS v1.0.0 // Encrypted Connection
                </p>
            </ScrollReveal>
        </div>
    );
}