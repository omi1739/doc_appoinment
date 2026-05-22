"use client";

import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <div className="bg-foreground/5 dark:bg-slate-900 border-t border-foreground/10 dark:border-slate-800 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="DocAppoint Logo" width={40} height={40} className="rounded-full dark:invert" />
              <span className="font-bold text-xl tracking-tight text-blue-600 dark:text-cyan-400">DocAppoint</span>
            </Link>
            <p className="text-foreground/60 dark:text-slate-400 max-w-sm mb-6">
              Making healthcare accessible, seamless, and convenient. Book appointments with top-rated doctors in just a few clicks.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-sm font-medium text-foreground/60 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                Facebook
              </Link>
              <Link href="#" className="text-sm font-medium text-foreground/60 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                Twitter
              </Link>
              <Link href="#" className="text-sm font-medium text-foreground/60 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                Instagram
              </Link>
              <Link href="#" className="text-sm font-medium text-foreground/60 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                LinkedIn
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4 text-foreground dark:text-white">Quick Links</h4>
            <ul className="flex flex-col gap-2">
              <li><Link href="/" className="text-foreground/60 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><Link href="/appointments" className="text-foreground/60 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">All Appointments</Link></li>
             
              <li><Link href="/" className="text-foreground/60 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4 text-foreground dark:text-white">Legal</h4>
            <ul className="flex flex-col gap-2">
              <li><Link href="/" className="text-foreground/60 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/" className="text-foreground/60 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/" className="text-foreground/60 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-foreground/10 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/50 dark:text-slate-500">
          <p>© {new Date().getFullYear()} DocAppoint. All rights reserved.</p>
          <p>Designed with a modern touch.</p>
        </div>
      </div>
    </div>
  );
}
