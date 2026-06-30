import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Trophy, Shield, ArrowUpDown, Award, Star, Users, ArrowUpRight } from 'lucide-react';
import { Student, StudentGroup } from '../types';

interface LeaderboardSectionProps {
  students: Student[];
  groups: StudentGroup[];
  onSelectStudent?: (studentId: string) => void;
  onSelectGroup?: (groupId: string) => void;
}

type SortField = 'rank' | 'gpa' | 'academicPoints' | 'credits' | 'completedCourses';
type SortDirection = 'asc' | 'desc';

export default function LeaderboardSection({
  students,
  groups,
  onSelectStudent,
  onSelectGroup
}: LeaderboardSectionProps) {
  const [activeTab, setActiveTab] = useState<'students' | 'groups'>('students');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('rank');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Sort and filter students
  const sortedStudents = useMemo(() => {
    return [...students]
      .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.group.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        let valueA = a[sortField];
        let valueB = b[sortField];
        
        if (sortDirection === 'asc') {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });
  }, [students, searchTerm, sortField, sortDirection]);

  // Sort and filter groups
  const sortedGroups = useMemo(() => {
    return [...groups]
      .filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()) || g.specialty.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => b.points - a.points); // Default sort for groups is points descending
  }, [groups, searchTerm]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc'); // Default to descending when changing sort
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-border pb-5">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <Trophy className="h-8 w-8 text-yellow-500" /> Liderlər Lövhəsi (Hall of Fame)
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Universitetin ən yaxşı akademik heyəti və ən yüksək xal toplayan rəqabətli qrupları.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex gap-1 p-1 bg-gray-950 border border-gray-800 rounded-lg max-w-xs">
          <button
            id="leaderboard-tab-students"
            onClick={() => { setActiveTab('students'); setSearchTerm(''); }}
            className={`px-4 py-2 text-xs font-bold font-display rounded-md transition-all cursor-pointer ${
              activeTab === 'students' 
                ? 'bg-neon-blue text-black shadow-neon-blue-glow' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Tələbələr (Players)
          </button>
          <button
            id="leaderboard-tab-groups"
            onClick={() => { setActiveTab('groups'); setSearchTerm(''); }}
            className={`px-4 py-2 text-xs font-bold font-display rounded-md transition-all cursor-pointer ${
              activeTab === 'groups' 
                ? 'bg-neon-purple text-black shadow-neon-purple-glow' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Qruplar (Teams)
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative p-4 rounded-xl bg-dark-card border border-dark-border">
        <Search className="absolute left-7 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <input 
          type="text" 
          placeholder={activeTab === 'students' ? "Tələbə adı və ya qrup axtar..." : "Qrup adı və ya ixtisas axtar..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
        />
      </div>

      {/* Ranking lists */}
      {activeTab === 'students' ? (
        <div className="rounded-xl border border-dark-border bg-dark-card overflow-hidden">
          {/* Main leaderboard table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-900 border-b border-gray-800 text-xs font-bold uppercase text-gray-400 tracking-wider font-mono">
                  <th className="p-4 pl-6 cursor-pointer hover:text-neon-blue transition-colors" onClick={() => handleSort('rank')}>
                    Reytinq <ArrowUpDown className="h-3 w-3 inline-block ml-1" />
                  </th>
                  <th className="p-4">Oyunçu (Tələbə)</th>
                  <th className="p-4">Qrup / İxtisas</th>
                  <th className="p-4 text-center cursor-pointer hover:text-neon-blue transition-colors" onClick={() => handleSort('gpa')}>
                    ÜOMG (GPA) <ArrowUpDown className="h-3 w-3 inline-block ml-1" />
                  </th>
                  <th className="p-4 text-center cursor-pointer hover:text-neon-blue transition-colors" onClick={() => handleSort('academicPoints')}>
                    Akademik Xal (XP) <ArrowUpDown className="h-3 w-3 inline-block ml-1" />
                  </th>
                  <th className="p-4 text-center cursor-pointer hover:text-neon-blue transition-colors" onClick={() => handleSort('credits')}>
                    Qazanılan Kredit <ArrowUpDown className="h-3 w-3 inline-block ml-1" />
                  </th>
                  <th className="p-4 text-center cursor-pointer hover:text-neon-blue transition-colors" onClick={() => handleSort('completedCourses')}>
                    Aktiv Fənlər (Wins) <ArrowUpDown className="h-3 w-3 inline-block ml-1" />
                  </th>
                  <th className="p-4 text-right pr-6">Profil</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-sm">
                {sortedStudents.map((student) => {
                  // Rank styling
                  const isTopRank = student.rank <= 3;
                  const rankBadge = student.rank === 1 ? '🥇' : student.rank === 2 ? '🥈' : student.rank === 3 ? '🥉' : student.rank;

                  return (
                    <tr 
                      key={student.id}
                      className={`hover:bg-gray-900/40 transition-colors ${
                        student.rank === 1 ? 'bg-yellow-500/5' : ''
                      }`}
                    >
                      {/* Rank Column */}
                      <td className="p-4 pl-6 font-display font-extrabold">
                        <div className="flex items-center gap-2">
                          <span className={`${isTopRank ? 'text-lg' : 'text-gray-400'}`}>
                            {rankBadge}
                          </span>
                        </div>
                      </td>

                      {/* Name / Avatar */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={student.avatar} 
                            alt={student.name} 
                            className="h-10 w-10 rounded-full object-cover border border-gray-800"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h4 className="font-bold text-white leading-snug">{student.name}</h4>
                            <span className="text-[10px] text-gray-500 font-mono">ID: {student.id}</span>
                          </div>
                        </div>
                      </td>

                      {/* Group / Specialty */}
                      <td className="p-4">
                        <div>
                          <span className="font-bold text-neon-purple text-xs bg-neon-purple/5 border border-neon-purple/20 px-2 py-0.5 rounded">
                            {student.group}
                          </span>
                          <span className="text-xs text-gray-500 block mt-1 truncate max-w-[150px]">
                            {student.specialty}
                          </span>
                        </div>
                      </td>

                      {/* GPA */}
                      <td className="p-4 text-center">
                        <span className="font-mono font-bold text-green-400 text-sm">
                          {student.gpa}
                        </span>
                      </td>

                      {/* XP Points */}
                      <td className="p-4 text-center">
                        <span className="font-mono font-bold text-neon-blue">
                          {student.academicPoints} XP
                        </span>
                      </td>

                      {/* Credits */}
                      <td className="p-4 text-center">
                        <span className="font-mono font-bold text-gray-300">
                          {student.credits}
                        </span>
                      </td>

                      {/* Wins (Completed courses) */}
                      <td className="p-4 text-center">
                        <span className="text-xs font-semibold text-white bg-green-500/15 border border-green-500/30 px-2.5 py-0.5 rounded whitespace-nowrap">
                          {student.completedCourses} Fənn
                        </span>
                      </td>

                      {/* Action */}
                      <td className="p-4 text-right pr-6">
                        <button
                          id={`lead-profile-${student.id}`}
                          onClick={() => onSelectStudent && onSelectStudent(student.id)}
                          className="p-1.5 rounded bg-gray-900 border border-gray-800 hover:border-neon-blue hover:text-neon-blue text-gray-400 transition-all cursor-pointer"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dark-border bg-dark-card overflow-hidden">
          {/* Group leaderboard table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-900 border-b border-gray-800 text-xs font-bold uppercase text-gray-400 tracking-wider font-mono">
                  <th className="p-4 pl-6">Reytinq</th>
                  <th className="p-4">Komanda (Qrup)</th>
                  <th className="p-4">İxtisas</th>
                  <th className="p-4 text-center">Üzvlər</th>
                  <th className="p-4 text-center">Orta GPA</th>
                  <th className="p-4 text-center">Kəsrlər</th>
                  <th className="p-4 text-center">Reytinq Xalı (XP)</th>
                  <th className="p-4 text-right pr-6">Profil</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-sm">
                {sortedGroups.map((group, index) => {
                  const rankBadge = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1;

                  return (
                    <tr 
                      key={group.id}
                      className={`hover:bg-gray-900/40 transition-colors ${
                        index === 0 ? 'bg-neon-purple/5' : ''
                      }`}
                    >
                      {/* Rank */}
                      <td className="p-4 pl-6 font-display font-extrabold text-white">
                        {rankBadge}
                      </td>

                      {/* Logo / Name */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl p-1 bg-gray-900 rounded-lg border border-gray-800">{group.logo}</span>
                          <div>
                            <h4 className="font-extrabold text-white leading-snug">{group.name}</h4>
                            <span className="text-[10px] text-gray-500 font-mono">Nümayəndə: {group.leader}</span>
                          </div>
                        </div>
                      </td>

                      {/* Specialty */}
                      <td className="p-4 text-gray-400 text-xs">
                        {group.specialty}
                      </td>

                      {/* Students Count */}
                      <td className="p-4 text-center font-mono text-gray-300">
                        {group.studentsCount} tələbə
                      </td>

                      {/* Average GPA */}
                      <td className="p-4 text-center">
                        <span className="font-mono font-bold text-green-400">
                          {group.gpaAverage}%
                        </span>
                      </td>

                      {/* Warnings / Backlogs */}
                      <td className="p-4 text-center">
                        <span className="text-xs font-semibold text-neon-pink bg-neon-pink/10 border border-neon-pink/20 px-2 py-0.5 rounded">
                          {group.warnings} kəsr
                        </span>
                      </td>

                      {/* Points */}
                      <td className="p-4 text-center">
                        <span className="font-mono font-bold text-neon-purple text-base">
                          {group.points} XP
                        </span>
                      </td>

                      {/* Action */}
                      <td className="p-4 text-right pr-6">
                        <button
                          id={`lead-group-${group.id}`}
                          onClick={() => onSelectGroup && onSelectGroup(group.id)}
                          className="p-1.5 rounded bg-gray-900 border border-gray-800 hover:border-neon-purple hover:text-neon-purple text-gray-400 transition-all cursor-pointer"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
