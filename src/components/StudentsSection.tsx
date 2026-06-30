import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Trophy, Shield, Swords, Heart, HeartCrack, Award, Star } from 'lucide-react';
import { Student } from '../types';

interface StudentsSectionProps {
  students: Student[];
  onSelectStudent: (studentId: string) => void;
}

export default function StudentsSection({ students, onSelectStudent }: StudentsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [groupFilter, setGroupFilter] = useState<string>('All');

  // Groups list for filter dropdown
  const uniqueGroups = Array.from(new Set(students.map(s => s.group)));

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = groupFilter === 'All' || student.group === groupFilter;

    return matchesSearch && matchesGroup;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-border pb-5">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <Trophy className="h-8 w-8 text-neon-blue" /> Tələbə Heyəti (Akademik Oyunçular)
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Universitetin ən yaxşı akademik göstəricilərə sahib tələbələri, reytinq və səviyyə göstəriciləri (RPG-esports formatında).
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-dark-card border border-dark-border">
        {/* Search */}
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Tələbə adı, ixtisas və ya email axtar..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
          />
        </div>

        {/* Group Filter */}
        <div>
          <select 
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-neon-blue transition-colors"
          >
            <option value="All">Bütün Qruplar</option>
            {uniqueGroups.map(grp => (
              <option key={grp} value={grp}>{grp}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredStudents.map((student, idx) => {
          // Compute character stats based on academic results
          // HP is reduced by 25% for each backlog
          const hpPercent = Math.max(100 - (student.backlogs * 25), 10);
          
          // Rank color
          const getRankStyles = (rank: number) => {
            if (rank === 1) return { border: 'border-yellow-500/60 shadow-[0_0_15px_rgba(234,179,8,0.25)]', text: 'text-yellow-500', glow: 'shadow-[0_0_8px_rgba(234,179,8,0.5)] bg-yellow-500/10' };
            if (rank === 2) return { border: 'border-slate-300/60 shadow-[0_0_15px_rgba(203,213,225,0.2)]', text: 'text-slate-300', glow: 'shadow-[0_0_8px_rgba(203,213,225,0.4)] bg-slate-400/10' };
            if (rank === 3) return { border: 'border-amber-600/60 shadow-[0_0_15px_rgba(180,83,9,0.2)]', text: 'text-amber-600', glow: 'shadow-[0_0_8px_rgba(180,83,9,0.4)] bg-amber-600/10' };
            return { border: 'border-dark-border', text: 'text-gray-400', glow: 'bg-gray-800' };
          };

          const rankStyle = getRankStyles(student.rank);

          return (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`rounded-xl overflow-hidden bg-dark-card border ${rankStyle.border} hover:scale-[1.03] transition-all flex flex-col justify-between group relative`}
            >
              {/* Level indicator */}
              <div className="absolute top-3 left-3 bg-gray-950/80 border border-gray-800 rounded px-2 py-0.5 text-[10px] font-mono font-bold text-neon-blue">
                LVL {student.level}
              </div>

              {/* Rank Badge */}
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${rankStyle.glow} ${rankStyle.text} border border-current/20`}>
                  RANK #{student.rank}
                </span>
              </div>

              {/* Profile Card Body */}
              <div className="p-5 pt-8 text-center flex-1 flex flex-col items-center justify-between space-y-4">
                {/* Character Avatar */}
                <div className="relative mt-2">
                  <div className={`h-20 w-20 rounded-full overflow-hidden border-2 ${
                    student.rank <= 3 ? 'border-neon-blue' : 'border-gray-800'
                  } group-hover:scale-105 transition-transform`}>
                    <img 
                      src={student.avatar} 
                      alt={student.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {student.rank <= 3 && (
                    <div className="absolute -bottom-2 -right-1 bg-yellow-500 rounded-full p-1 border border-dark-card">
                      <Star className="h-3 w-3 text-black fill-black" />
                    </div>
                  )}
                </div>

                {/* Identity */}
                <div className="space-y-1">
                  <h3 className="font-display font-extrabold text-white text-base leading-snug group-hover:text-neon-blue transition-colors">
                    {student.name}
                  </h3>
                  <span className="text-xs text-neon-purple font-medium block">
                    {student.group}
                  </span>
                  <span className="text-[10px] text-gray-500 block truncate max-w-[170px]">
                    {student.specialty}
                  </span>
                </div>

                {/* Gaming/Character HP bar */}
                <div className="w-full space-y-1">
                  <div className="flex justify-between items-center text-[10px] text-gray-500">
                    <span className="flex items-center gap-1">
                      {hpPercent > 50 ? <Heart className="h-3 w-3 text-neon-pink fill-neon-pink" /> : <HeartCrack className="h-3 w-3 text-neon-pink animate-bounce" />} Akademik HP (Kəsrsiz)
                    </span>
                    <span className="font-bold text-white font-mono">{hpPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-950 rounded-full border border-gray-900 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        hpPercent > 70 ? 'bg-gradient-to-r from-neon-pink to-neon-purple' : hpPercent > 40 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${hpPercent}%` }}
                    />
                  </div>
                </div>

                {/* RPG character stats grid */}
                <div className="grid grid-cols-3 gap-1.5 w-full bg-gray-900/60 rounded-lg p-2 border border-gray-800/60 text-center font-mono">
                  <div>
                    <span className="text-[9px] text-gray-500 block">ÜOMG</span>
                    <span className="text-xs font-bold text-green-400">{student.gpa}</span>
                  </div>
                  <div className="border-x border-gray-800/80">
                    <span className="text-[9px] text-gray-500 block">KP (XP)</span>
                    <span className="text-xs font-bold text-neon-blue">{student.academicPoints}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-500 block">KREDİT</span>
                    <span className="text-xs font-bold text-neon-purple">{student.credits}</span>
                  </div>
                </div>
              </div>

              {/* Action button */}
              <div className="p-4 pt-0">
                <button 
                  id={`student-profile-${student.id}`}
                  onClick={() => onSelectStudent(student.id)}
                  className="w-full text-center text-xs font-bold py-2 rounded bg-neon-blue/10 hover:bg-neon-blue hover:text-black border border-neon-blue/40 text-neon-blue transition-all cursor-pointer"
                >
                  AKADEMİK PROFİL
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
