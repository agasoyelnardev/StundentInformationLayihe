import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Users, Shield, Award, AlertTriangle, BookOpen, TrendingUp, Calendar } from 'lucide-react';
import { StudentGroup, Student, Course } from '../types';

interface GroupDetailsSectionProps {
  group: StudentGroup;
  allStudents: Student[];
  allCourses: Course[];
  onBack: () => void;
  onNavigateToStudent?: (studentId: string) => void;
}

export default function GroupDetailsSection({
  group,
  allStudents,
  allCourses,
  onBack,
  onNavigateToStudent
}: GroupDetailsSectionProps) {
  // Find students belonging to this group
  const groupStudents = allStudents.filter(s => s.group === group.name);
  
  // Custom mock data for GPA success rate or "win rate" chart
  // This satisfies: "Win rate chart" requirement
  const totalCoursesCount = allCourses.length;
  const completedSuccessfully = group.achievements; // Count of students with top grade
  const gpaPercent = group.gpaAverage; // e.g., 92.1%
  const backlogPercent = Math.round((group.warnings / (groupStudents.length || 1)) * 100);
  const successRate = Math.round(100 - backlogPercent);

  // Match History / Academic activity timeline for this group
  const academicHistory = [
    { semestr: "2025 Payız", course: "Proqramlaşdırmanın Əsasları", result: "Orta Bal: 94.2", status: "A+" },
    { semestr: "2025 Payız", course: "İnformasiya Texnologiyaları", result: "Orta Bal: 90.5", status: "A" },
    { semestr: "2026 Yaz", course: "Kriptoqrafiya və Şəbəkə", result: "Orta Bal: 92.1", status: "A" },
  ];

  return (
    <div className="space-y-8">
      {/* Back button */}
      <button 
        id="group-back-btn"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-neon-purple transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" /> Qruplar Siyahısına Qayıt
      </button>

      {/* 1. Group Profile Header */}
      <div className="relative rounded-2xl overflow-hidden border border-neon-purple/30 bg-dark-card p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-neon-purple/10 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-neon-purple/15 border border-neon-purple/40 flex items-center justify-center text-4xl shadow-neon-purple-glow">
              {group.logo}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl md:text-3xl font-extrabold text-white">
                  {group.name}
                </h1>
                <span className="text-xs bg-neon-purple/15 border border-neon-purple/30 text-neon-purple font-mono px-2 py-0.5 rounded">
                  Qrup ID: {group.id}
                </span>
              </div>
              <p className="text-gray-400 text-sm mt-1">{group.specialty}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 text-right">
            <div>
              <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-wider">Komanda Reytinqi</span>
              <span className="text-xl font-mono font-bold text-neon-purple">{group.points} XP</span>
            </div>
            <div className="border-l border-gray-800 pl-6">
              <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-wider">Qrup Nümayəndəsi</span>
              <span className="text-sm font-semibold text-white">{group.leader}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Stats and Chart */}
        <div className="space-y-8">
          
          {/* Win Rate / Success Chart (Custom SVG radial chart) */}
          <div className="p-6 rounded-xl bg-dark-card border border-dark-border space-y-6 text-center">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest text-left">
              Akademik Müvəffəqiyyət Reytinqi
            </h3>
            
            {/* SVG Circle Gauge */}
            <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                {/* Background track circle */}
                <circle 
                  cx="80" 
                  cy="80" 
                  r="64" 
                  fill="transparent" 
                  stroke="#121823" 
                  strokeWidth="12" 
                />
                {/* Foreground circle showing success rate */}
                <circle 
                  cx="80" 
                  cy="80" 
                  r="64" 
                  fill="transparent" 
                  stroke="#bd00ff" 
                  strokeWidth="12" 
                  strokeDasharray={`${2 * Math.PI * 64}`}
                  strokeDashoffset={`${2 * Math.PI * 64 * (1 - successRate / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              {/* Inner content */}
              <div className="absolute space-y-0.5">
                <span className="text-3xl font-mono font-extrabold text-white">{successRate}%</span>
                <span className="text-[9px] text-gray-500 block uppercase font-bold">Müvəffəqiyyət</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-left border-t border-gray-800 pt-4 text-xs">
              <div>
                <span className="text-gray-500 block">Kəsr dərəcəsi:</span>
                <span className="font-mono font-bold text-neon-pink">{backlogPercent}% (Aşağı)</span>
              </div>
              <div className="text-right">
                <span className="text-gray-500 block">Orta ÜOMG:</span>
                <span className="font-mono font-bold text-green-400">{gpaPercent}%</span>
              </div>
            </div>
          </div>

          {/* Group Statistics summary */}
          <div className="p-6 rounded-xl bg-dark-card border border-dark-border space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-neon-purple" /> Qrup Statistikaları
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs p-2.5 rounded bg-gray-900 border border-gray-800">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-neon-blue" /> Qrup Üzvləri:
                </span>
                <span className="font-mono font-bold text-white">{groupStudents.length} tələbə</span>
              </div>
              <div className="flex justify-between items-center text-xs p-2.5 rounded bg-gray-900 border border-gray-800">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5 text-green-400" /> Əlaçı Sayı (GPA {'>'} 90):
                </span>
                <span className="font-mono font-bold text-green-400">{group.achievements} nəfər</span>
              </div>
              <div className="flex justify-between items-center text-xs p-2.5 rounded bg-gray-900 border border-gray-800">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-neon-pink" /> Ümumi Aktiv Kəsrlər:
                </span>
                <span className="font-mono font-bold text-neon-pink">{group.warnings} kəsr</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Player Roster and Match History */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Player Roster - Students of the Group */}
          <div className="p-6 rounded-xl bg-dark-card border border-dark-border space-y-4">
            <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-neon-blue" /> Tələbə Heyəti (Roster)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {groupStudents.length > 0 ? (
                groupStudents.map((student) => (
                  <div 
                    key={student.id} 
                    onClick={() => onNavigateToStudent && onNavigateToStudent(student.id)}
                    className="p-3 rounded-lg bg-gray-900 hover:border-neon-purple/40 border border-gray-800 transition-all flex items-center justify-between cursor-pointer group hover:translate-x-1"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={student.avatar} 
                        alt={student.name} 
                        className="h-10 w-10 rounded-full object-cover border border-gray-800 group-hover:border-neon-purple"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-neon-purple transition-colors">{student.name}</h4>
                        <span className="text-[10px] text-gray-500 font-mono">Rank #{student.rank} • Level {student.level}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-neon-blue block">{student.gpa} GPA</span>
                      <span className="text-[10px] text-gray-500 block">{student.credits} Credits</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center rounded-xl bg-dark-card text-gray-500 text-sm md:col-span-2">
                  Bu qrupda hələ tələbə qeydiyyatdan keçməyib.
                </div>
              )}
            </div>
          </div>

          {/* Academic History Timeline */}
          <div className="p-6 rounded-xl bg-dark-card border border-dark-border space-y-4">
            <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-neon-purple" /> Keçmiş Fənn Fəaliyyət Tarixi (Matches)
            </h2>
            <div className="space-y-3">
              {academicHistory.map((history, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-lg bg-gray-900/60 border border-gray-800 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-neon-purple" />
                    <div>
                      <h4 className="font-semibold text-white">{history.course}</h4>
                      <span className="text-[10px] text-gray-500">{history.semestr} Semestri</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 font-mono">{history.result}</span>
                    <span className="px-2 py-0.5 rounded bg-neon-purple/20 border border-neon-purple/40 text-neon-purple font-bold">
                      {history.status}
                    </span>
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
