import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Calendar, Users, Award, BookOpen, Layers } from 'lucide-react';
import { Course } from '../types';

interface CoursesSectionProps {
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
}

export default function CoursesSection({ courses, onSelectCourse }: CoursesSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [creditsFilter, setCreditsFilter] = useState<string>('All');

  // Filter courses based on search term and filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || course.status === statusFilter;
    const matchesCredits = creditsFilter === 'All' || course.credits.toString() === creditsFilter;

    return matchesSearch && matchesStatus && matchesCredits;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-border pb-5">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-neon-blue" /> Fənlər / Kurslar
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Akademik liqada təqdim olunan bütün dərslər, fənn sillabusları və qiymətləndirmə meyarları.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl bg-dark-card border border-dark-border">
        {/* Search */}
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Fənn adı, kodu və ya müəllim axtar..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
          />
        </div>

        {/* Status Filter */}
        <div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-neon-blue transition-colors"
          >
            <option value="All">Bütün Statuslar</option>
            <option value="Aktiv">Aktiv Dərslər</option>
            <option value="Gözlənilən">Gözlənilənlər</option>
            <option value="Bitmiş">Bitmişlər</option>
          </select>
        </div>

        {/* Credits Filter */}
        <div>
          <select 
            value={creditsFilter}
            onChange={(e) => setCreditsFilter(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-neon-blue transition-colors"
          >
            <option value="All">Bütün Kreditlər</option>
            <option value="8">8 Kredit</option>
            <option value="7">7 Kredit</option>
            <option value="6">6 Kredit</option>
            <option value="5">5 Kredit</option>
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-xl overflow-hidden bg-dark-card border border-dark-border hover:border-neon-blue/40 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all flex flex-col justify-between group"
            >
              {/* Image Banner */}
              <div className="relative h-44 w-full overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent" />
                
                {/* Status badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-2.5 py-1 rounded text-xs font-bold border ${
                    course.status === 'Aktiv' 
                      ? 'bg-green-500/10 text-green-400 border-green-500/30' 
                      : course.status === 'Gözlənilən'
                      ? 'bg-neon-blue/10 text-neon-blue border-neon-blue/30'
                      : 'bg-gray-500/10 text-gray-400 border-gray-500/30'
                  }`}>
                    {course.status}
                  </span>
                </div>

                {/* Credits badge */}
                <div className="absolute top-4 right-4 bg-gray-900/80 border border-gray-800 rounded px-2 py-1 flex items-center gap-1">
                  <Award className="h-3 w-3 text-yellow-500" />
                  <span className="text-xs font-mono font-bold text-white">{course.credits} Kredit</span>
                </div>

                {/* Code badge */}
                <div className="absolute bottom-3 right-4 bg-black/60 rounded px-2 py-0.5 text-xs font-mono font-bold text-neon-blue border border-neon-blue/20">
                  {course.code}
                </div>
              </div>

              {/* Course Info */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-neon-blue transition-colors line-clamp-1">
                    {course.name}
                  </h3>
                  <span className="text-xs text-neon-purple font-medium block">
                    Müəllim: {course.teacher}
                  </span>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                    {course.description}
                  </p>
                </div>

                {/* Meta details */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-800 text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-gray-500" />
                    <span>{course.startDate.split('-')[0]} / {course.endDate.split('-')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-end">
                    <Users className="h-3.5 w-3.5 text-gray-500" />
                    <span>{course.studentsCount} Tələbə</span>
                  </div>
                </div>

                {/* Action button */}
                <button 
                  id={`course-select-${course.id}`}
                  onClick={() => onSelectCourse(course.id)}
                  className="w-full text-center text-sm font-bold py-2.5 rounded bg-neon-blue/10 hover:bg-neon-blue hover:text-black border border-neon-blue/40 text-neon-blue transition-all cursor-pointer mt-2"
                >
                  KURS HAQQINDA ƏTRAFLI
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="p-16 text-center rounded-xl bg-dark-card border border-dashed border-gray-800 space-y-3">
          <Layers className="h-12 w-12 text-gray-600 mx-auto" />
          <h3 className="text-lg font-semibold text-white">Axtarışa uyğun fənn tapılmadı</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            Axtarış terminini dəyişdirərək və ya filtrləri təmizləyərək yenidən yoxlayın.
          </p>
        </div>
      )}
    </div>
  );
}
