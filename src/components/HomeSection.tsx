import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Shield, Users, BookOpen, Tv, ArrowRight, Zap, Flame, Clock } from 'lucide-react';
import { Course, StudentGroup, NewsItem, ScheduleItem } from '../types';

interface HomeSectionProps {
  courses: Course[];
  groups: StudentGroup[];
  news: NewsItem[];
  schedule: ScheduleItem[];
  totalStudentsCount: number;
  onNavigate: (tab: string, id?: string) => void;
}

export default function HomeSection({
  courses,
  groups,
  news,
  schedule,
  totalStudentsCount,
  onNavigate
}: HomeSectionProps) {
  // Statistics computation
  const activeCourses = courses.filter(c => c.status === 'Aktiv');
  const activeMatchesCount = schedule.filter(s => s.status === 'Aktiv').length;
  
  // Featured courses (Aktiv olanlar)
  const featuredCourses = courses.slice(0, 3);
  
  // Upcoming classes
  const upcomingClasses = schedule.filter(s => s.status === 'Gözlənilən').slice(0, 3);
  
  // Top 3 groups by points
  const topGroups = [...groups].sort((a, b) => b.points - a.points).slice(0, 3);

  return (
    <div className="space-y-8">
      {/* 1. Hero Section with Large Tournament Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-neon-blue/30 bg-dark-card p-8 md:p-12 cyber-clip-header"
      >
        {/* Futuristic Background overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-10 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop')]" />
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-neon-purple/20 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-neon-blue/20 blur-3xl" />
        
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-neon-blue/40 bg-neon-blue/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-neon-blue">
            <Flame className="h-3 w-3 animate-pulse" /> SEMESTR LIQASI 2026 DAVAM EDİR
          </div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
            Akademik Zirvəni <br />
            <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent glow-text-blue">
              Fəth Et!
            </span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            EduNeon Tələbə Məlumat Sisteminə xoş gəlmisiniz. Akademik fəaliyyətləri izləyin, 
            komandalarla (qruplarla) yarışın, kvestləri (fənləri) tamamlayın və qlobal liderlər lövhəsində 
            birinci yerə yüksəlin!
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button 
              id="hero-join-btn"
              onClick={() => onNavigate('courses')}
              className="shimmer-btn cyber-clip rounded px-6 py-3 font-display font-bold text-white transition-all cursor-pointer"
            >
              FƏNLƏRƏ QOŞUL
            </button>
            <button 
              id="hero-leaderboard-btn"
              onClick={() => onNavigate('leaderboard')}
              className="glow-border-blue cyber-clip bg-transparent rounded border border-neon-blue/50 px-6 py-3 font-display font-bold text-neon-blue hover:bg-neon-blue/10 transition-all cursor-pointer"
            >
              LİDERLƏR CƏDVƏLİ
            </button>
          </div>
        </div>
      </motion.div>

      {/* 2. Statistics Cards Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { id: "stat-courses", label: "Ümumi Fənlər", value: courses.length, icon: BookOpen, color: "text-neon-blue", border: "border-neon-blue/20" },
          { id: "stat-groups", label: "Aktiv Qruplar", value: groups.length, icon: Shield, color: "text-neon-purple", border: "border-neon-purple/20" },
          { id: "stat-students", label: "Ümumi Tələbələr", value: totalStudentsCount, icon: Users, color: "text-neon-pink", border: "border-neon-pink/20" },
          { id: "stat-matches", label: "Aktiv Dərslər", value: activeMatchesCount, icon: Tv, color: "text-yellow-400", border: "border-yellow-500/20" }
        ].map((stat, idx) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-5 rounded-xl bg-dark-card border ${stat.border} flex items-center justify-between relative group hover:scale-[1.02] transition-transform`}
          >
            <div className="space-y-1">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.label}</span>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-lg bg-gray-900 border border-gray-800 ${stat.color} group-hover:shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: stat.color === 'text-neon-blue' ? '#00f0ff' : stat.color === 'text-neon-purple' ? '#bd00ff' : stat.color === 'text-neon-pink' ? '#ff007f' : '#facc15' }} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* 3. Upcoming Matches Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-neon-blue" /> Növbəti Dərslər (Cədvəl)
            </h2>
            <button 
              id="home-view-schedule-btn"
              onClick={() => onNavigate('schedule')}
              className="text-xs font-semibold text-neon-blue hover:underline flex items-center gap-1 cursor-pointer"
            >
              Hamısına bax <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-3">
            {upcomingClasses.length > 0 ? (
              upcomingClasses.map((item, idx) => (
                <div 
                  key={item.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-dark-card border border-dark-border hover:border-neon-blue/40 transition-colors gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center text-neon-blue font-bold text-xs">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{item.courseName}</h4>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-400 mt-1">
                        <span>Müəllim: {item.teacher}</span>
                        <span>•</span>
                        <span className="text-neon-purple font-medium">Qrup: {item.groupName}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-2 md:pt-0 border-gray-800">
                    <div className="text-right">
                      <span className="text-xs text-gray-500 block">{item.day}</span>
                      <span className="text-sm font-mono font-bold text-neon-blue">{item.time}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500 block">Auditoriya</span>
                      <span className="text-xs font-semibold text-gray-300">{item.room}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center rounded-xl bg-dark-card border border-dashed border-gray-800 text-gray-500 text-sm">
                Növbəti dərs planlaşdırılmayıb.
              </div>
            )}
          </div>

          {/* 4. Featured Tournaments Slider / Cards */}
          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-neon-pink" /> Seçilmiş Fənlər (Aktiv)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredCourses.map((course) => (
                <div 
                  key={course.id}
                  className="rounded-xl overflow-hidden bg-dark-card border border-dark-border hover:border-neon-pink/40 transition-all flex flex-col justify-between group"
                >
                  <div className="relative h-28 w-full overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent" />
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/40">
                      {course.status}
                    </span>
                    <span className="absolute bottom-2 right-3 font-mono text-xs font-bold text-neon-blue">
                      {course.code}
                    </span>
                  </div>
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-semibold text-white text-sm line-clamp-1">{course.name}</h4>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">{course.description}</p>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-800 text-gray-500">
                      <span>Kredit: <b className="text-white">{course.credits}</b></span>
                      <span>Tələbə: <b className="text-white">{course.studentsCount}</b></span>
                    </div>
                    <button 
                      id={`view-course-btn-${course.id}`}
                      onClick={() => onNavigate('courses', course.id)}
                      className="w-full text-center text-xs font-bold py-2 rounded bg-neon-blue/10 border border-neon-blue/30 text-neon-blue hover:bg-neon-blue hover:text-black transition-all cursor-pointer mt-2"
                    >
                      DETALLARA BAX
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Top groups + Latest News */}
        <div className="space-y-6">
          {/* Top Ranked Teams (Groups) */}
          <div className="space-y-4">
            <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" /> Ən Müvəffəqiyyətli Qruplar
            </h2>
            <div className="p-4 rounded-xl bg-dark-card border border-dark-border space-y-4">
              {topGroups.map((group, index) => (
                <div 
                  key={group.id} 
                  className="flex items-center justify-between p-2 rounded bg-gray-900/60 border border-gray-800 hover:border-neon-purple/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 text-center font-display font-bold ${index === 0 ? 'text-yellow-500 text-lg' : index === 1 ? 'text-gray-400' : 'text-amber-600'}`}>
                      #{index + 1}
                    </span>
                    <span className="text-2xl">{group.logo}</span>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{group.name}</h4>
                      <span className="text-[10px] text-gray-500 block max-w-[140px] truncate">{group.specialty}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-neon-purple">{group.points} XP</span>
                    <span className="text-[10px] text-green-400 block">Avg GPA: {group.gpaAverage}</span>
                  </div>
                </div>
              ))}
              <button 
                id="home-view-groups-btn"
                onClick={() => onNavigate('groups')}
                className="w-full text-center text-xs font-bold py-2 rounded border border-dashed border-neon-purple/40 text-neon-purple hover:bg-neon-purple/10 transition-all cursor-pointer"
              >
                Bütün Qruplara Bax
              </button>
            </div>
          </div>

          {/* Latest Tournament News Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <Tv className="h-5 w-5 text-neon-purple" /> Son Yeniliklər
            </h2>
            <div className="space-y-3">
              {news.map((item) => (
                <div 
                  key={item.id}
                  className="p-3 rounded-xl bg-dark-card border border-dark-border hover:border-neon-purple/30 transition-all flex gap-3 group"
                >
                  <div className="h-16 w-20 rounded-lg overflow-hidden shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-neon-purple uppercase bg-neon-purple/10 px-1.5 py-0.5 rounded border border-neon-purple/20">
                      {item.category}
                    </span>
                    <h4 className="text-xs font-semibold text-white line-clamp-1 leading-snug group-hover:text-neon-blue transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-gray-500 block">{item.date}</span>
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
