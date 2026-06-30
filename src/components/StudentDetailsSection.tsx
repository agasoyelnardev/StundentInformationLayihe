import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, User, Award, Shield, AlertTriangle, BookOpen, Star, Sparkles, TrendingUp } from 'lucide-react';
import { Student, Course } from '../types';

interface StudentDetailsSectionProps {
  student: Student;
  allCourses: Course[];
  onBack: () => void;
}

export default function StudentDetailsSection({
  student,
  allCourses,
  onBack
}: StudentDetailsSectionProps) {
  
  // Custom mock course grades for this specific student
  const courseGrades = [
    { code: "SEC-402", name: "Kriptoqrafiya və Şəbəkə Təhlükəsizliyi", grade: "98 (A+)", status: "Keçdi" },
    { code: "AI-311", name: "Dərin Öyrənmə və Neyron Şəbəkələri", grade: "94 (A)", status: "Keçdi" },
    { code: "DEV-304", name: "Fullstack Veb Proqramlaşdırma", grade: "91 (A-)", status: "Keçdi" },
    { code: "DEV-311", name: "Mobil Tətbiq Mühəndisliyi", grade: "85 (B)", status: "Keçdi" },
  ];

  return (
    <div className="space-y-8">
      {/* Back button */}
      <button 
        id="student-back-btn"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-neon-blue transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" /> Tələbələr Siyahısına Qayıt
      </button>

      {/* 1. Student Profile Header (RPG style) */}
      <div className="relative rounded-2xl overflow-hidden border border-neon-blue/30 bg-dark-card p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-neon-blue/10 blur-3xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
            {/* Avatar frame */}
            <div className="relative">
              <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-neon-blue p-1 bg-gray-900 shadow-neon-blue-glow">
                <img 
                  src={student.avatar} 
                  alt={student.name} 
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-2 right-2 bg-neon-purple rounded px-1.5 py-0.5 text-[8px] font-mono font-bold text-white border border-dark-card">
                LVL {student.level}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h1 className="font-display text-2xl md:text-3xl font-extrabold text-white">
                  {student.name}
                </h1>
                <span className="text-[10px] bg-green-500/10 border border-green-500/30 text-green-400 font-mono px-2 py-0.5 rounded">
                  Qrup nümayəndəsi
                </span>
              </div>
              <p className="text-neon-purple text-xs font-semibold">{student.email}</p>
              <p className="text-gray-400 text-xs">{student.specialty} • Qəbul ili: {student.admissionYear}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 text-center justify-center md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-gray-800">
            <div>
              <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-wider">Liderlik Rütbəsi</span>
              <span className="text-xl font-mono font-extrabold text-yellow-500 flex items-center gap-1 justify-center">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" /> #{student.rank}
              </span>
            </div>
            <div className="border-l border-gray-800 pl-6">
              <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-wider">Cari Qrupu</span>
              <span className="text-sm font-semibold text-white bg-gray-900 px-3 py-1 rounded border border-gray-800 block mt-1">{student.group}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column - Stats and GPA progress */}
        <div className="space-y-8">
          
          {/* Character RPG Sheet Stats */}
          <div className="p-6 rounded-xl bg-dark-card border border-dark-border space-y-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-neon-blue" /> TƏLƏBƏ RPG STATS
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-900 rounded-lg border border-gray-800/60">
                <span className="text-[9px] text-gray-500 block uppercase font-bold">AKADEMİK XP</span>
                <span className="text-lg font-mono font-bold text-neon-blue">{student.academicPoints} xal</span>
              </div>
              <div className="p-3 bg-gray-900 rounded-lg border border-gray-800/60">
                <span className="text-[9px] text-gray-500 block uppercase font-bold">ÜOMG (GPA)</span>
                <span className="text-lg font-mono font-bold text-green-400">{student.gpa} / 100</span>
              </div>
              <div className="p-3 bg-gray-900 rounded-lg border border-gray-800/60">
                <span className="text-[9px] text-gray-500 block uppercase font-bold">UĞURLU DƏRSLƏR</span>
                <span className="text-lg font-mono font-bold text-white">{student.completedCourses} fənn</span>
              </div>
              <div className="p-3 bg-gray-900 rounded-lg border border-gray-800/60">
                <span className="text-[9px] text-gray-500 block uppercase font-bold">KƏSR SİYAHISI</span>
                <span className="text-lg font-mono font-bold text-neon-pink">{student.backlogs} kəsr</span>
              </div>
            </div>

            {/* EXP Bar showing progress to next level */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">Növbəti Səviyyəyə (EXP):</span>
                <span className="font-mono text-gray-300">{(student.academicPoints % 1000)} / 1000 XP</span>
              </div>
              <div className="w-full h-2 bg-gray-950 rounded-full border border-gray-900 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink rounded-full"
                  style={{ width: `${(student.academicPoints % 1000) / 10}%` }}
                />
              </div>
            </div>
          </div>

          {/* Academic Strengths */}
          <div className="p-6 rounded-xl bg-dark-card border border-dark-border space-y-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-neon-purple" /> SPESİFİK AKADEMİK BACARIQLAR
            </h3>
            <ul className="text-xs text-gray-400 space-y-2">
              <li className="flex justify-between"><span>Analitik Təfəkkür:</span> <span className="font-bold text-white">95% (Səviyyə S)</span></li>
              <li className="flex justify-between"><span>Komanda Əməkdaşlığı:</span> <span className="font-bold text-white">90% (Səviyyə A)</span></li>
              <li className="flex justify-between"><span>Praktiki Kodlaşdırma:</span> <span className="font-bold text-white">98% (Səviyyə S+)</span></li>
              <li className="flex justify-between"><span>Layihə Təqdimatı:</span> <span className="font-bold text-white">88% (Səviyyə B)</span></li>
            </ul>
          </div>

        </div>

        {/* Right column - Grades list */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-xl bg-dark-card border border-dark-border space-y-4">
            <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-neon-blue" /> Semestr Qiymət Kartı (Match History)
            </h2>
            <p className="text-xs text-gray-500">
              Tələbənin müxtəlif fənlərdən topladığı 100 ballıq sistem üzrə qiymətləri.
            </p>

            <div className="space-y-3">
              {courseGrades.map((gradeItem, idx) => (
                <div 
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-gray-900 border border-gray-800 hover:border-neon-blue/30 transition-all gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center font-mono font-bold text-xs text-neon-blue">
                      {gradeItem.code}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{gradeItem.name}</h4>
                      <span className="text-[10px] text-gray-500">Yaz 2026 Semestri</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-800">
                    <div className="text-right">
                      <span className="text-[10px] text-gray-500 block uppercase">Qiymət</span>
                      <span className="text-xs font-mono font-bold text-green-400">{gradeItem.grade}</span>
                    </div>
                    <div>
                      <span className="px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase">
                        {gradeItem.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
