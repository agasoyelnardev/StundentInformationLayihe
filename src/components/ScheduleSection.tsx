import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Tv, Clock, CheckCircle, Search, Layers } from 'lucide-react';
import { ScheduleItem } from '../types';

interface ScheduleSectionProps {
  schedule: ScheduleItem[];
}

export default function ScheduleSection({ schedule }: ScheduleSectionProps) {
  const [activeTab, setActiveTab] = useState<'Aktiv' | 'Gözlənilən' | 'Bitmiş'>('Aktiv');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSchedule = schedule.filter(item => {
    const matchesTab = item.status === activeTab;
    const matchesSearch = item.courseName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.topic.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-border pb-5">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <Calendar className="h-8 w-8 text-neon-blue" /> Dərs Cədvəli (Academic Matches)
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Gündəlik dərslərin və akademik görüşlərin statusları, mövzuları və dərslərin gedişatı.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex gap-1 p-1 bg-gray-950 border border-gray-800 rounded-lg max-w-sm">
          {[
            { id: 'Aktiv', label: 'Canlı (Live)', color: 'bg-green-500 text-black' },
            { id: 'Gözlənilən', label: 'Növbəti (Upcoming)', color: 'bg-neon-blue text-black shadow-neon-blue-glow' },
            { id: 'Bitmiş', label: 'Bitmiş (Completed)', color: 'bg-gray-700 text-white' }
          ].map((tab) => (
            <button
              key={tab.id}
              id={`schedule-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-bold font-display rounded transition-all cursor-pointer ${
                activeTab === tab.id 
                  ? tab.color
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative p-4 rounded-xl bg-dark-card border border-dark-border">
        <Search className="absolute left-7 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <input 
          type="text" 
          placeholder="Kurs, mövzu, müəllim və ya qrup üzrə süzgəclə..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
        />
      </div>

      {/* Match Cards Grid */}
      {filteredSchedule.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSchedule.map((item, idx) => {
            // Random matching statistic / score for academic flare
            const attendanceScore = activeTab === 'Bitmiş' ? '92%' : activeTab === 'Aktiv' ? '96%' : '-';
            const quizAverage = activeTab === 'Bitmiş' ? '84.5' : activeTab === 'Aktiv' ? '88.1' : '-';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={`p-5 rounded-xl bg-dark-card border ${
                  activeTab === 'Aktiv' 
                    ? 'border-green-500 bg-green-500/5 shadow-[0_0_15px_rgba(34,197,94,0.1)]' 
                    : activeTab === 'Gözlənilən'
                    ? 'border-neon-blue/30 hover:border-neon-blue/60'
                    : 'border-dark-border'
                } flex flex-col justify-between space-y-4`}
              >
                {/* Card Header */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1 max-w-[75%]">
                    <span className="text-[10px] font-mono font-bold text-neon-purple uppercase tracking-wider block">
                      {item.groupName} qrupu üçün
                    </span>
                    <h3 className="font-display font-extrabold text-white text-base leading-snug line-clamp-1">
                      {item.courseName}
                    </h3>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    activeTab === 'Aktiv' 
                      ? 'bg-green-500 text-black animate-pulse font-mono' 
                      : activeTab === 'Gözlənilən'
                      ? 'bg-neon-blue/15 text-neon-blue border border-neon-blue/30'
                      : 'bg-gray-800 text-gray-400 border border-gray-700'
                  }`}>
                    {activeTab === 'Aktiv' ? '● LIVE' : item.status}
                  </span>
                </div>

                {/* Match Details (Topic / Lecturer) */}
                <div className="p-3 bg-gray-900 rounded border border-gray-800 text-xs space-y-1">
                  <span className="text-gray-500 font-bold uppercase tracking-wider text-[9px] block">Aktiv Mövzu</span>
                  <p className="text-gray-200 font-semibold leading-relaxed line-clamp-1">{item.topic}</p>
                  <p className="text-gray-400 text-[11px] mt-1">Müəllim: {item.teacher}</p>
                </div>

                {/* Match Stats / Scores (Attendance & Quizzes) */}
                <div className="grid grid-cols-2 gap-4 py-2 border-t border-b border-gray-800/60">
                  <div>
                    <span className="text-[10px] text-gray-500 block uppercase">Davamiyyət faizi</span>
                    <span className="text-sm font-mono font-bold text-white">{attendanceScore}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-500 block uppercase">Kollokvium Ortalaması</span>
                    <span className="text-sm font-mono font-bold text-neon-blue">{quizAverage}</span>
                  </div>
                </div>

                {/* Card Footer (Time & Location) */}
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1.5 text-gray-400 font-mono">
                    <Clock className="h-4 w-4 text-neon-purple" />
                    <span>{item.day}, {item.time}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-500 block text-[9px] uppercase">Otaq / Auditoriya</span>
                    <span className="text-white font-semibold">{item.room}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="p-16 text-center rounded-xl bg-dark-card border border-dashed border-gray-800 space-y-3">
          <Layers className="h-12 w-12 text-gray-600 mx-auto" />
          <h3 className="text-lg font-semibold text-white">Bu bölmədə dərslər yoxdur</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            Göstərilən kriteriyalara uyğun dərs tapılmadı.
          </p>
        </div>
      )}
    </div>
  );
}
