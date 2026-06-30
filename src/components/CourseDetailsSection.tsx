import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, User, Calendar, Users, Award, Shield, FileText, CheckCircle } from 'lucide-react';
import { Course, Student } from '../types';

interface CourseDetailsSectionProps {
  course: Course;
  allStudents: Student[];
  onBack: () => void;
  onNavigateToStudent?: (studentId: string) => void;
}

export default function CourseDetailsSection({
  course,
  allStudents,
  onBack,
  onNavigateToStudent
}: CourseDetailsSectionProps) {
  // Filter students that are in this course. For simplicity, since students belong to groups,
  // we find students whose group matches courses where we can assume they participate.
  // E.g. CYBER-401 group for C-101 course, etc. Let's make a solid lookup.
  const getCourseGroup = () => {
    if (course.code === 'SEC-402') return 'CYBER-401';
    if (course.code === 'AI-311') return 'AI-301';
    if (course.code === 'DEV-304') return 'DEV-302';
    // Fallback based on ID modulo
    return 'CYBER-401';
  };

  const courseGroupName = getCourseGroup();
  const enrolledStudents = allStudents.filter(s => s.group === courseGroupName);

  // Curriculum nodes styled like a tournament bracket (Quarterfinal, Semifinal, Final)
  const bracketStages = [
    {
      phase: "Bölmə 1: İlkin Mərhələ",
      title: "Giriş və Fundamental Anlayışlar",
      desc: "Kursa giriş, ilkin qiymətləndirmə, əsas terminlər və alətlərlə tanışlıq.",
      points: "10% Ballar",
      status: "Keçilib"
    },
    {
      phase: "Bölmə 2: Dörddəbir Final (QF)",
      title: "Kollokvium & Praktiki Laboratoriyalar",
      desc: "Öyrənilmiş mövzular üzrə nəzəri imtahan və fərdi laboratoriya tapşırıqları.",
      points: "30% Ballar",
      status: "Aktiv"
    },
    {
      phase: "Bölmə 3: Yarımfinal (SF)",
      title: "Komanda Layihəsi (Cyber Hack)",
      desc: "Qrup yoldaşları ilə birlikdə real problemlərin həlli və layihə təqdimatı.",
      points: "20% Ballar",
      status: "Gözlənilir"
    },
    {
      phase: "Bölmə 4: Final (Grand Final)",
      title: "Yekun Dövlət İmtahanı",
      desc: "Bütün semestr materiallarını əhatə edən böyük yazılı və şifahi imtahan.",
      points: "40% Ballar",
      status: "Gözlənilir"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Back button */}
      <button 
        id="course-back-btn"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-neon-blue transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" /> Fənlər Siyahısına Qayıt
      </button>

      {/* 1. Course Banner Header */}
      <div className="relative rounded-2xl overflow-hidden border border-neon-blue/30 bg-dark-card min-h-[250px] flex flex-col justify-end p-6 md:p-8">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${course.image})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/70 to-transparent" />
        
        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-neon-blue/15 border border-neon-blue/30 text-neon-blue">
              {course.code}
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-neon-purple/15 border border-neon-purple/30 text-neon-purple">
              {course.credits} KREDİT (EXP)
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-green-500/10 border border-green-500/20 text-green-400">
              {course.status}
            </span>
          </div>
          <h1 className="font-display text-2xl md:text-4xl font-extrabold text-white">
            {course.name}
          </h1>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-3xl">
            {course.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Columns - Details + Bracket */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Tournament-Like Learning Bracket */}
          <div className="p-6 rounded-xl bg-dark-card border border-dark-border space-y-6">
            <div>
              <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <Award className="h-5 w-5 text-neon-blue" /> Semestr Qiymətləndirmə Breketi (Sillabus)
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Fənni uğurla tamamlamaq üçün keçməli olduğunuz mərhələlər (Tournament Bracket formatında).
              </p>
            </div>

            {/* Bracket Visualizer (Flex Tree Layout) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {bracketStages.map((stage, index) => (
                <div key={index} className="relative flex flex-col justify-between">
                  {/* Stage Card */}
                  <div className={`p-4 rounded-lg bg-gray-900 border ${
                    stage.status === 'Keçilib' 
                      ? 'border-green-500/40 bg-green-500/5' 
                      : stage.status === 'Aktiv'
                      ? 'border-neon-blue bg-neon-blue/5 shadow-[0_0_10px_rgba(0,240,255,0.1)]'
                      : 'border-gray-800'
                  } space-y-2 h-full flex flex-col justify-between`}>
                    <div>
                      <span className={`text-[10px] font-bold block ${
                        stage.status === 'Keçilib' ? 'text-green-400' : stage.status === 'Aktiv' ? 'text-neon-blue' : 'text-gray-500'
                      }`}>
                        {stage.phase}
                      </span>
                      <h4 className="text-xs font-bold text-white mt-1">{stage.title}</h4>
                      <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                        {stage.desc}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-800/50">
                      <span className="text-[10px] font-mono font-bold text-neon-purple">{stage.points}</span>
                      <span className={`text-[9px] font-bold uppercase ${
                        stage.status === 'Keçilib' ? 'text-green-400' : stage.status === 'Aktiv' ? 'text-neon-blue' : 'text-gray-500'
                      }`}>
                        {stage.status}
                      </span>
                    </div>
                  </div>

                  {/* Connector lines (only on large screens) */}
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-3 h-[2px] bg-dark-border z-10" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Syllabus detail steps */}
          <div className="p-6 rounded-xl bg-dark-card border border-dark-border space-y-4">
            <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-neon-purple" /> Əsas Dərs Mövzuları
            </h2>
            <div className="space-y-2">
              {course.syllabus.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded bg-gray-900/50 border border-gray-800">
                  <CheckCircle className="h-5 w-5 text-neon-blue shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono font-bold text-neon-purple block">MÖVZU #{idx + 1}</span>
                    <p className="text-sm text-gray-300 mt-0.5">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Info Sidebar, Roster, Rules */}
        <div className="space-y-8">
          
          {/* 1. Lecturer Info & Prize Pool */}
          <div className="p-6 rounded-xl bg-dark-card border border-dark-border space-y-6">
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">KURS RƏHBƏRİ</h3>
              <div className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-gray-800">
                <div className="h-10 w-10 rounded-full bg-neon-purple/20 border border-neon-purple flex items-center justify-center text-white">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{course.teacher}</h4>
                  <span className="text-xs text-gray-400">Kafedra rəhbəri / Professor</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">AKADEMİK MÜKAFAT FONDU</h3>
              <div className="p-4 bg-gradient-to-br from-neon-purple/10 to-neon-pink/10 rounded-lg border border-neon-purple/30 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">A+ Qiymət Alanlar:</span>
                  <span className="font-mono font-bold text-yellow-400">+500 XP & Fəxri Diplom</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">A / B+ Qiymət Alanlar:</span>
                  <span className="font-mono font-bold text-neon-blue">+300 XP</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Layihə Çempionları:</span>
                  <span className="font-mono font-bold text-neon-pink">+100 XP Bonus</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Registered Students (Participating Teams / Players) */}
          <div className="p-6 rounded-xl bg-dark-card border border-dark-border space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="h-4 w-4 text-neon-blue" /> Kursda İştirak Edən Tələbələr ({enrolledStudents.length})
            </h3>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {enrolledStudents.map((student) => (
                <div 
                  key={student.id} 
                  onClick={() => onNavigateToStudent && onNavigateToStudent(student.id)}
                  className="flex items-center justify-between p-2 rounded bg-gray-900 hover:border-neon-blue/40 border border-gray-800 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={student.avatar} 
                      alt={student.name} 
                      className="h-8 w-8 rounded-full object-cover border border-gray-800 group-hover:border-neon-blue"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-neon-blue transition-colors">{student.name}</h4>
                      <span className="text-[10px] text-gray-500">{student.group}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-neon-blue">{student.gpa} GPA</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Rules Section */}
          <div className="p-6 rounded-xl bg-dark-card border border-dark-border space-y-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-neon-pink" /> İntizam və İştirak Qaydaları
            </h3>
            <ul className="text-xs text-gray-400 space-y-2 leading-relaxed list-disc list-inside">
              <li>Dərslərdə qayıb limiti <b>25%</b> təşkil edir. Bu limiti aşan tələbə birbaşa kəsilmiş sayılır (HP = 0).</li>
              <li>İmtahana daxil olmaq üçün semestr daxili ən azı <b>17 bal</b> toplamaq zəruridir.</li>
              <li>Laboratoriya işlərinin təqdimatında gecikdirilən hər gün üçün <b>-10%</b> cərimə balı tətbiq olunur.</li>
              <li>Kopiyalama və akademik dürüstlük qaydalarının pozulması birbaşa turnirdən (kursdan) diskvalifikasiya ilə nəticələnir.</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
