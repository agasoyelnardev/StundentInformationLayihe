import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Shield, Users, Award, AlertTriangle, ArrowRight } from 'lucide-react';
import { StudentGroup } from '../types';

interface GroupsSectionProps {
  groups: StudentGroup[];
  onSelectGroup: (groupId: string) => void;
}

export default function GroupsSection({ groups, onSelectGroup }: GroupsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('All');

  const specialties = Array.from(new Set(groups.map(g => g.specialty)));

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          group.leader.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          group.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialtyFilter === 'All' || group.specialty === specialtyFilter;

    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-border pb-5">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <Shield className="h-8 w-8 text-neon-purple" /> Tələbə Qrupları (Komandalar)
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Universitet qruplarının reytinq xalları, nümayəndələri və ümumi akademik fəaliyyət göstəriciləri.
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
            placeholder="Qrup adı və ya nümayəndə axtar..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-neon-purple transition-colors"
          />
        </div>

        {/* Specialty Filter */}
        <div>
          <select 
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-neon-purple transition-colors"
          >
            <option value="All">Bütün İxtisaslar</option>
            {specialties.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group, idx) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="rounded-xl bg-dark-card border border-dark-border hover:border-neon-purple/40 hover:shadow-[0_0_15px_rgba(189,0,255,0.1)] transition-all overflow-hidden flex flex-col justify-between group"
          >
            {/* Group Header Badge Area */}
            <div className="p-5 border-b border-gray-800/50 flex items-center justify-between bg-gray-900/40">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center text-3xl">
                  {group.logo}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-neon-purple transition-colors">
                    {group.name}
                  </h3>
                  <span className="text-[11px] text-gray-500 block max-w-[150px] truncate">{group.specialty}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-wider">Reytinq</span>
                <span className="text-sm font-mono font-bold text-neon-purple">{group.points} XP</span>
              </div>
            </div>

            {/* Stats body */}
            <div className="p-5 space-y-4 flex-1">
              {/* Leader */}
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>Qrup Nümayəndəsi:</span>
                <span className="font-bold text-white">{group.leader}</span>
              </div>

              {/* Grid with metrics */}
              <div className="grid grid-cols-3 gap-2 py-3 bg-gray-900/60 rounded-lg border border-gray-800 text-center">
                <div>
                  <span className="text-[10px] text-gray-500 block">Tələbə</span>
                  <div className="flex items-center justify-center gap-1 text-sm font-bold text-white mt-0.5">
                    <Users className="h-3.5 w-3.5 text-neon-blue" /> {group.studentsCount}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block">Nailiyyət (A)</span>
                  <div className="flex items-center justify-center gap-1 text-sm font-bold text-green-400 mt-0.5">
                    <Award className="h-3.5 w-3.5" /> {group.achievements}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block">Kəsrlər (Losses)</span>
                  <div className="flex items-center justify-center gap-1 text-sm font-bold text-neon-pink mt-0.5">
                    <AlertTriangle className="h-3.5 w-3.5" /> {group.warnings}
                  </div>
                </div>
              </div>

              {/* Progress bar representing average GPA */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Qrup Orta GPA (ÜOMG):</span>
                  <span className="font-mono font-bold text-green-400">{group.gpaAverage} / 100</span>
                </div>
                <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                  <div 
                    className="h-full bg-gradient-to-r from-neon-purple to-neon-blue rounded-full"
                    style={{ width: `${group.gpaAverage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Footer action button */}
            <div className="p-5 pt-0">
              <button 
                id={`group-profile-btn-${group.id}`}
                onClick={() => onSelectGroup(group.id)}
                className="w-full text-center text-xs font-bold py-2.5 rounded bg-neon-purple/10 hover:bg-neon-purple hover:text-black border border-neon-purple/40 text-neon-purple transition-all cursor-pointer"
              >
                QRUP PROFİLİNƏ BAX
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
