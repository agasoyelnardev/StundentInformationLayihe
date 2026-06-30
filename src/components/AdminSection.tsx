import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, BookOpen, Shield, Calendar, Plus, Edit, Trash2, 
  Search, ChevronLeft, ChevronRight, CheckCircle, AlertTriangle, X,
  Upload, Image as ImageIcon
} from 'lucide-react';
import { Student, Course, StudentGroup, ScheduleItem } from '../types';

const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
];

const PRESET_COURSES = [
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&auto=format&fit=crop"
];

interface AdminSectionProps {
  students: Student[];
  courses: Course[];
  groups: StudentGroup[];
  schedule: ScheduleItem[];
  onUpdateStudents: (updater: (prev: Student[]) => Student[]) => void;
  onUpdateCourses: (updater: (prev: Course[]) => Course[]) => void;
  onUpdateGroups: (updater: (prev: StudentGroup[]) => StudentGroup[]) => void;
  onUpdateSchedule: (updater: (prev: ScheduleItem[]) => ScheduleItem[]) => void;
}

export default function AdminSection({
  students,
  courses,
  groups,
  schedule,
  onUpdateStudents,
  onUpdateCourses,
  onUpdateGroups,
  onUpdateSchedule
}: AdminSectionProps) {
  const [activeSubTab, setActiveSubTab] = useState<'students' | 'courses' | 'groups' | 'schedule'>('students');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Drag and drop / upload State
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent, type: 'student' | 'course') => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      triggerImageReader(file, type);
    }
  };

  const triggerImageReader = (file: File, type: 'student' | 'course') => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const base64Str = event.target.result as string;
          if (type === 'student') {
            setStudentForm(prev => ({ ...prev, avatar: base64Str }));
          } else {
            setCourseForm(prev => ({ ...prev, image: base64Str }));
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'student' | 'course') => {
    const file = e.target.files?.[0];
    if (file) {
      triggerImageReader(file, type);
    }
  };
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal State
  const [modalType, setModalType] = useState<'create' | 'edit' | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [studentForm, setStudentForm] = useState<Partial<Student>>({
    name: '', email: '', group: '', specialty: '', gpa: 90, credits: 120, level: 10, academicPoints: 1500, completedCourses: 15, backlogs: 0
  });
  const [courseForm, setCourseForm] = useState<Partial<Course>>({
    name: '', code: '', credits: 6, teacher: '', startDate: '2026-02-15', endDate: '2026-06-15', status: 'Aktiv', description: '', syllabus: []
  });
  const [groupForm, setGroupForm] = useState<Partial<StudentGroup>>({
    name: '', specialty: '', studentsCount: 15, gpaAverage: 90, achievements: 5, warnings: 0, leader: '', logo: '🛡️', points: 1500
  });
  const [scheduleForm, setScheduleForm] = useState<Partial<ScheduleItem>>({
    courseName: '', teacher: '', day: 'Bazar ertəsi', time: '10:00 - 11:30', room: 'Lab 305', status: 'Aktiv', topic: '', groupName: ''
  });

  // Filters & Search
  const filteredItems = React.useMemo(() => {
    setCurrentPage(1); // Reset page on tab/search change
    if (activeSubTab === 'students') {
      return students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.group.toLowerCase().includes(searchTerm.toLowerCase()));
    } else if (activeSubTab === 'courses') {
      return courses.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.code.toLowerCase().includes(searchTerm.toLowerCase()));
    } else if (activeSubTab === 'groups') {
      return groups.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()) || g.specialty.toLowerCase().includes(searchTerm.toLowerCase()));
    } else {
      return schedule.filter(s => s.courseName.toLowerCase().includes(searchTerm.toLowerCase()) || s.groupName.toLowerCase().includes(searchTerm.toLowerCase()));
    }
  }, [activeSubTab, searchTerm, students, courses, groups, schedule]);

  // Paginated Items
  const paginatedItems = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;

  // Form Submission Handlers
  const handleOpenCreate = () => {
    setModalType('create');
    setEditingId(null);
    // Reset forms
    setStudentForm({ name: '', email: '', group: 'CYBER-401', specialty: 'Kiber-Təhlükəsizlik', gpa: 90, credits: 120, level: 12, academicPoints: 1500, completedCourses: 15, backlogs: 0, avatar: PRESET_AVATARS[0] });
    setCourseForm({ name: '', code: '', credits: 6, teacher: '', startDate: '2026-02-15', endDate: '2026-06-15', status: 'Aktiv', description: '', syllabus: ["Fənnə giriş", "Əsas dərslər"], image: PRESET_COURSES[0] });
    setGroupForm({ name: '', specialty: 'Kiber-Təhlükəsizlik', studentsCount: 15, gpaAverage: 90, achievements: 5, warnings: 0, leader: '', logo: '🛡️', points: 1500 });
    setScheduleForm({ courseName: '', teacher: '', day: 'Bazar ertəsi', time: '10:00 - 11:30', room: 'Lab 305', status: 'Aktiv', topic: '', groupName: 'CYBER-401' });
  };

  const handleOpenEdit = (id: string) => {
    setModalType('edit');
    setEditingId(id);
    if (activeSubTab === 'students') {
      const s = students.find(item => item.id === id);
      if (s) setStudentForm({ ...s });
    } else if (activeSubTab === 'courses') {
      const c = courses.find(item => item.id === id);
      if (c) setCourseForm({ ...c });
    } else if (activeSubTab === 'groups') {
      const g = groups.find(item => item.id === id);
      if (g) setGroupForm({ ...g });
    } else {
      const sch = schedule.find(item => item.id === id);
      if (sch) setScheduleForm({ ...sch });
    }
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Bu qeydi silmək istədiyinizdən əminsiniz?")) return;
    
    if (activeSubTab === 'students') {
      onUpdateStudents(prev => prev.filter(item => item.id !== id));
    } else if (activeSubTab === 'courses') {
      onUpdateCourses(prev => prev.filter(item => item.id !== id));
    } else if (activeSubTab === 'groups') {
      onUpdateGroups(prev => prev.filter(item => item.id !== id));
    } else {
      onUpdateSchedule(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeSubTab === 'students') {
      if (modalType === 'create') {
        const newId = `ST-${Date.now().toString().slice(-3)}`;
        const newStudent: Student = {
          id: newId,
          name: studentForm.name || 'Tələbə',
          email: studentForm.email || 'telebe@code.edu.az',
          avatar: studentForm.avatar || PRESET_AVATARS[0],
          group: studentForm.group || 'CYBER-401',
          specialty: studentForm.specialty || 'Kiber-Təhlükəsizlik',
          gpa: Number(studentForm.gpa) || 90,
          credits: Number(studentForm.credits) || 120,
          level: Number(studentForm.level) || 10,
          academicPoints: Number(studentForm.academicPoints) || 1500,
          completedCourses: Number(studentForm.completedCourses) || 15,
          backlogs: Number(studentForm.backlogs) || 0,
          rank: students.length + 1,
          phone: "+994 (50) 123-45-67",
          admissionYear: 2024
        };
        onUpdateStudents(prev => [...prev, newStudent]);
      } else {
        onUpdateStudents(prev => prev.map(item => item.id === editingId ? { ...item, ...studentForm } as Student : item));
      }
    } else if (activeSubTab === 'courses') {
      if (modalType === 'create') {
        const newId = `C-${Date.now().toString().slice(-3)}`;
        const newCourse: Course = {
          id: newId,
          name: courseForm.name || 'Yeni Fənn',
          code: courseForm.code || 'CODE-101',
          credits: Number(courseForm.credits) || 6,
          teacher: courseForm.teacher || 'Prof. Müəllim',
          startDate: courseForm.startDate || '2026-02-15',
          endDate: courseForm.endDate || '2026-06-15',
          studentsCount: 20,
          status: courseForm.status as any || 'Aktiv',
          image: courseForm.image || PRESET_COURSES[0],
          syllabus: courseForm.syllabus || ["Fənnə giriş"],
          gradingCriteria: { midterm: 30, final: 40, project: 20, attendance: 10 },
          description: courseForm.description || 'Bu fənn haqqında ətraflı məlumat əlavə olunacaq.'
        };
        onUpdateCourses(prev => [...prev, newCourse]);
      } else {
        onUpdateCourses(prev => prev.map(item => item.id === editingId ? { ...item, ...courseForm } as Course : item));
      }
    } else if (activeSubTab === 'groups') {
      if (modalType === 'create') {
        const newId = `G-${Date.now().toString().slice(-3)}`;
        const newGroup: StudentGroup = {
          id: newId,
          name: groupForm.name || 'NEW-101',
          specialty: groupForm.specialty || 'Kiber-Təhlükəsizlik',
          studentsCount: Number(groupForm.studentsCount) || 15,
          gpaAverage: Number(groupForm.gpaAverage) || 90,
          achievements: Number(groupForm.achievements) || 5,
          warnings: Number(groupForm.warnings) || 0,
          leader: groupForm.leader || 'Qrup nümayəndəsi',
          logo: groupForm.logo || '🛡️',
          points: Number(groupForm.points) || 1500
        };
        onUpdateGroups(prev => [...prev, newGroup]);
      } else {
        onUpdateGroups(prev => prev.map(item => item.id === editingId ? { ...item, ...groupForm } as StudentGroup : item));
      }
    } else {
      if (modalType === 'create') {
        const newId = `SCH-${Date.now().toString().slice(-3)}`;
        const newSchedule: ScheduleItem = {
          id: newId,
          courseId: 'C-101',
          courseName: scheduleForm.courseName || 'Fənn',
          teacher: scheduleForm.teacher || 'Müəllim',
          day: scheduleForm.day || 'Bazar ertəsi',
          time: scheduleForm.time || '10:00 - 11:30',
          room: scheduleForm.room || 'Zal 101',
          status: scheduleForm.status as any || 'Aktiv',
          topic: scheduleForm.topic || 'Mövzu adı',
          groupName: scheduleForm.groupName || 'CYBER-401'
        };
        onUpdateSchedule(prev => [...prev, newSchedule]);
      } else {
        onUpdateSchedule(prev => prev.map(item => item.id === editingId ? { ...item, ...scheduleForm } as ScheduleItem : item));
      }
    }

    setModalType(null);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-dark-border pb-5">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          🛡️ Admin İdarəetmə Paneli (Dashboard UI)
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Tələbə, fənn, qrup və dərs cədvəli verilənlərini yaradın, redaktə edin və yaxud silin (CRUD).
        </p>
      </div>

      {/* Internal Sidebar Tabs & Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Admin Navigation Sidebar */}
        <div className="space-y-2 p-3 bg-dark-card border border-dark-border rounded-xl">
          <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest pl-2">BÖLMƏLƏR</span>
          {[
            { id: 'students', label: 'Tələbə İdarəetməsi', icon: Users, count: students.length },
            { id: 'courses', label: 'Fənn İdarəetməsi', icon: BookOpen, count: courses.length },
            { id: 'groups', label: 'Qrup İdarəetməsi', icon: Shield, count: groups.length },
            { id: 'schedule', label: 'Cədvəl İdarəetməsi', icon: Calendar, count: schedule.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`admin-nav-${tab.id}`}
                onClick={() => { setActiveSubTab(tab.id as any); setSearchTerm(''); }}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/30' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-900/40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-gray-900 text-[10px] text-gray-500 border border-gray-800">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Data list and controls */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Axtarış..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-xs text-gray-300 placeholder-gray-500 focus:outline-none focus:border-neon-blue"
              />
            </div>

            {/* Create Button */}
            <button
              id="admin-create-btn"
              onClick={handleOpenCreate}
              className="flex items-center gap-1.5 px-4 py-2 rounded font-display font-bold text-xs bg-neon-blue text-black hover:shadow-neon-blue-glow transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" /> YENİ ƏLAVƏ ET
            </button>
          </div>

          {/* Paginated Data Table */}
          <div className="border border-dark-border bg-dark-card rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-900 border-b border-gray-800 font-bold uppercase text-gray-400 font-mono">
                    <th className="p-3 pl-5">ID</th>
                    {activeSubTab === 'students' && (
                      <>
                        <th className="p-3">Ad Soyad</th>
                        <th className="p-3">Qrup</th>
                        <th className="p-3 text-center">GPA</th>
                        <th className="p-3 text-center">Kredit (XP)</th>
                      </>
                    )}
                    {activeSubTab === 'courses' && (
                      <>
                        <th className="p-3">Fənnin Adı</th>
                        <th className="p-3">Kod</th>
                        <th className="p-3 text-center">Kredit</th>
                        <th className="p-3 text-center">Müəllim</th>
                      </>
                    )}
                    {activeSubTab === 'groups' && (
                      <>
                        <th className="p-3">Qrup Adı</th>
                        <th className="p-3">İxtisas</th>
                        <th className="p-3 text-center">Tələbə Sayı</th>
                        <th className="p-3 text-center">Orta GPA</th>
                      </>
                    )}
                    {activeSubTab === 'schedule' && (
                      <>
                        <th className="p-3">Fənn</th>
                        <th className="p-3">Qrup</th>
                        <th className="p-3">Zaman</th>
                        <th className="p-3">Otaq</th>
                      </>
                    )}
                    <th className="p-3 text-right pr-5">Əməliyyatlar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {paginatedItems.length > 0 ? (
                    paginatedItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-900/30 transition-colors">
                        <td className="p-3 pl-5 font-mono text-neon-blue font-bold">{item.id}</td>
                        {activeSubTab === 'students' && (
                          <>
                            <td className="p-3 font-semibold text-white">{(item as Student).name}</td>
                            <td className="p-3 text-neon-purple font-bold">{(item as Student).group}</td>
                            <td className="p-3 text-center text-green-400">{(item as Student).gpa}</td>
                            <td className="p-3 text-center font-mono">{(item as Student).credits} ({(item as Student).academicPoints})</td>
                          </>
                        )}
                        {activeSubTab === 'courses' && (
                          <>
                            <td className="p-3 font-semibold text-white">{(item as Course).name}</td>
                            <td className="p-3 font-mono">{(item as Course).code}</td>
                            <td className="p-3 text-center">{(item as Course).credits}</td>
                            <td className="p-3 text-center text-neon-purple">{(item as Course).teacher}</td>
                          </>
                        )}
                        {activeSubTab === 'groups' && (
                          <>
                            <td className="p-3 font-semibold text-white">{(item as StudentGroup).logo} {(item as StudentGroup).name}</td>
                            <td className="p-3">{(item as StudentGroup).specialty}</td>
                            <td className="p-3 text-center">{(item as StudentGroup).studentsCount}</td>
                            <td className="p-3 text-center text-green-400">{(item as StudentGroup).gpaAverage}%</td>
                          </>
                        )}
                        {activeSubTab === 'schedule' && (
                          <>
                            <td className="p-3 font-semibold text-white">{(item as ScheduleItem).courseName}</td>
                            <td className="p-3 text-neon-purple font-bold">{(item as ScheduleItem).groupName}</td>
                            <td className="p-3 font-mono">{(item as ScheduleItem).day}, {(item as ScheduleItem).time}</td>
                            <td className="p-3">{(item as ScheduleItem).room}</td>
                          </>
                        )}
                        <td className="p-3 text-right pr-5 space-x-2">
                          <button
                            id={`admin-edit-btn-${item.id}`}
                            onClick={() => handleOpenEdit(item.id)}
                            className="p-1 rounded bg-gray-900 border border-gray-800 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all cursor-pointer"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            id={`admin-delete-btn-${item.id}`}
                            onClick={() => handleDelete(item.id)}
                            className="p-1 rounded bg-gray-900 border border-gray-800 text-neon-pink hover:bg-neon-pink hover:text-white transition-all cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-gray-500">
                        Heç bir məlumat tapılmadı.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="p-3.5 border-t border-gray-800/80 bg-gray-900/40 flex items-center justify-between text-[11px] text-gray-500 font-mono">
              <span>Səhifə {currentPage} / {totalPages}</span>
              <div className="flex gap-1">
                <button
                  id="admin-prev-page"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="p-1 rounded bg-gray-950 border border-gray-800 text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  id="admin-next-page"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="p-1 rounded bg-gray-950 border border-gray-800 text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      <AnimatePresence>
        {modalType && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg bg-dark-card border border-neon-blue rounded-xl overflow-hidden shadow-neon-blue-glow"
            >
              {/* Modal Header */}
              <div className="p-4 bg-gray-900 border-b border-gray-800 flex justify-between items-center">
                <h3 className="font-display font-extrabold text-sm text-white uppercase tracking-wider">
                  {modalType === 'create' ? 'Yeni Qeyd Əlavə Et' : 'Məlumatı Redaktə Et'}
                </h3>
                <button onClick={() => setModalType(null)} className="text-gray-400 hover:text-white cursor-pointer">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs text-gray-300">
                {activeSubTab === 'students' && (
                  <div className="grid grid-cols-2 gap-4">
                    {/* Student Avatar Upload and Select Section */}
                    <div className="col-span-2 border border-dark-border bg-gray-900/50 p-3 rounded-lg space-y-3">
                      <span className="text-gray-400 font-bold block">Tələbənin Profil Şəkli / Avatarı</span>
                      
                      <div className="flex flex-col md:flex-row gap-4 items-center">
                        {/* Current Avatar Circle */}
                        <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-neon-blue flex-shrink-0 bg-gray-950">
                          <img 
                            src={studentForm.avatar || PRESET_AVATARS[0]} 
                            alt="Student avatar preview" 
                            className="h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Drag and Drop Zone */}
                        <div 
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDrop(e, 'student')}
                          className={`flex-1 w-full border-2 border-dashed rounded-lg p-3 text-center transition-all cursor-pointer ${
                            isDragging 
                              ? 'border-neon-blue bg-neon-blue/10 text-white' 
                              : 'border-gray-800 hover:border-gray-750 bg-gray-900/40 text-gray-400'
                          }`}
                          onClick={() => document.getElementById('student-file-input')?.click()}
                        >
                          <Upload className="h-5 w-5 mx-auto mb-1 text-neon-blue animate-pulse" />
                          <p className="text-[10px] font-semibold text-gray-300">Yükləmək üçün klikləyin və ya faylı bura sürükləyin</p>
                          <p className="text-[9px] text-gray-500 mt-0.5">Kompyuterdən şəkil seçin (PNG, JPG, GIF)</p>
                          <input 
                            id="student-file-input" 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleFileChange(e, 'student')}
                          />
                        </div>
                      </div>

                      {/* Presets Grid */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-gray-400 block font-bold">Hazır Avatarlardan Seçin:</label>
                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                          {PRESET_AVATARS.map((url, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setStudentForm(prev => ({ ...prev, avatar: url }))}
                              className={`h-10 w-10 rounded-full overflow-hidden border-2 transition-all flex-shrink-0 ${
                                studentForm.avatar === url 
                                  ? 'border-neon-blue scale-115 shadow-neon-blue-glow' 
                                  : 'border-transparent opacity-60 hover:opacity-100'
                              }`}
                            >
                              <img src={url} alt={`Preset ${idx+1}`} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Custom Image URL */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400 block font-bold">Və ya Şəkil linkini daxil edin:</label>
                        <input 
                          type="text"
                          placeholder="https://example.com/photo.jpg"
                          value={studentForm.avatar || ''}
                          onChange={(e) => setStudentForm(prev => ({ ...prev, avatar: e.target.value }))}
                          className="w-full bg-gray-950 border border-gray-800 rounded px-2.5 py-1.5 text-[11px] text-gray-300 focus:border-neon-blue focus:outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="col-span-2 space-y-1">
                      <label className="text-gray-400 font-bold">Tələbənin Adı Soyadı</label>
                      <input 
                        type="text" required
                        value={studentForm.name || ''} 
                        onChange={(e) => setStudentForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-gray-400 font-bold">E-mail</label>
                      <input 
                        type="email" required
                        value={studentForm.email || ''} 
                        onChange={(e) => setStudentForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-gray-400 font-bold">Qrup</label>
                      <input 
                        type="text" required
                        value={studentForm.group || ''} 
                        onChange={(e) => setStudentForm(prev => ({ ...prev, group: e.target.value }))}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <label className="text-gray-400 font-bold">İxtisas</label>
                      <input 
                        type="text" required
                        value={studentForm.specialty || ''} 
                        onChange={(e) => setStudentForm(prev => ({ ...prev, specialty: e.target.value }))}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-gray-400 font-bold">GPA (0-100)</label>
                      <input 
                        type="number" max="100" min="0" required
                        value={studentForm.gpa || ''} 
                        onChange={(e) => setStudentForm(prev => ({ ...prev, gpa: Number(e.target.value) }))}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-gray-400 font-bold">Kredit (EXP)</label>
                      <input 
                        type="number" required
                        value={studentForm.credits || ''} 
                        onChange={(e) => setStudentForm(prev => ({ ...prev, credits: Number(e.target.value) }))}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {activeSubTab === 'courses' && (
                  <div className="grid grid-cols-2 gap-4">
                    {/* Course Cover Image Section */}
                    <div className="col-span-2 border border-dark-border bg-gray-900/50 p-3 rounded-lg space-y-3">
                      <span className="text-gray-400 font-bold block">Fənnin Örtük Şəkli (Cover Image)</span>
                      
                      <div className="flex flex-col md:flex-row gap-4 items-center">
                        {/* Current Cover Image Preview */}
                        <div className="relative h-14 w-24 rounded-md overflow-hidden border border-neon-blue flex-shrink-0 bg-gray-950">
                          <img 
                            src={courseForm.image || PRESET_COURSES[0]} 
                            alt="Course cover preview" 
                            className="h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Drag and Drop Zone */}
                        <div 
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDrop(e, 'course')}
                          className={`flex-1 w-full border-2 border-dashed rounded-lg p-3 text-center transition-all cursor-pointer ${
                            isDragging 
                              ? 'border-neon-blue bg-neon-blue/10 text-white' 
                              : 'border-gray-800 hover:border-gray-750 bg-gray-900/40 text-gray-400'
                          }`}
                          onClick={() => document.getElementById('course-file-input')?.click()}
                        >
                          <Upload className="h-5 w-5 mx-auto mb-1 text-neon-blue animate-pulse" />
                          <p className="text-[10px] font-semibold text-gray-300">Örtük şəkli yükləmək üçün klikləyin və ya faylı bura sürükləyin</p>
                          <input 
                            id="course-file-input" 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleFileChange(e, 'course')}
                          />
                        </div>
                      </div>

                      {/* Presets Grid */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-gray-400 block font-bold">Hazır Mövzu Şəkillərindən Seçin:</label>
                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                          {PRESET_COURSES.map((url, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setCourseForm(prev => ({ ...prev, image: url }))}
                              className={`h-8 w-14 rounded overflow-hidden border-2 transition-all flex-shrink-0 ${
                                courseForm.image === url 
                                  ? 'border-neon-blue scale-105 shadow-neon-blue-glow' 
                                  : 'border-transparent opacity-60 hover:opacity-100'
                              }`}
                            >
                              <img src={url} alt={`Preset ${idx+1}`} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Custom Image URL */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400 block font-bold">Və ya Şəkil linkini daxil edin:</label>
                        <input 
                          type="text"
                          placeholder="https://example.com/course.jpg"
                          value={courseForm.image || ''}
                          onChange={(e) => setCourseForm(prev => ({ ...prev, image: e.target.value }))}
                          className="w-full bg-gray-950 border border-gray-800 rounded px-2.5 py-1.5 text-[11px] text-gray-300 focus:border-neon-blue focus:outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="col-span-2 space-y-1">
                      <label className="text-gray-400 font-bold">Fənnin Adı</label>
                      <input 
                        type="text" required
                        value={courseForm.name || ''} 
                        onChange={(e) => setCourseForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-gray-400 font-bold">Fənn Kodu</label>
                      <input 
                        type="text" required
                        value={courseForm.code || ''} 
                        onChange={(e) => setCourseForm(prev => ({ ...prev, code: e.target.value }))}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-gray-400 font-bold">Kredit Sayı</label>
                      <input 
                        type="number" required
                        value={courseForm.credits || ''} 
                        onChange={(e) => setCourseForm(prev => ({ ...prev, credits: Number(e.target.value) }))}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <label className="text-gray-400 font-bold">Müəllim</label>
                      <input 
                        type="text" required
                        value={courseForm.teacher || ''} 
                        onChange={(e) => setCourseForm(prev => ({ ...prev, teacher: e.target.value }))}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <label className="text-gray-400 font-bold">Fənnin Təsviri</label>
                      <textarea 
                        rows={3} required
                        value={courseForm.description || ''} 
                        onChange={(e) => setCourseForm(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {activeSubTab === 'groups' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-gray-400 font-bold">Qrup Adı</label>
                      <input 
                        type="text" required
                        value={groupForm.name || ''} 
                        onChange={(e) => setGroupForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-gray-400 font-bold">Logo Emoji</label>
                      <input 
                        type="text" required
                        value={groupForm.logo || ''} 
                        onChange={(e) => setGroupForm(prev => ({ ...prev, logo: e.target.value }))}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <label className="text-gray-400 font-bold">İxtisas</label>
                      <input 
                        type="text" required
                        value={groupForm.specialty || ''} 
                        onChange={(e) => setGroupForm(prev => ({ ...prev, specialty: e.target.value }))}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-gray-400 font-bold">Qrup Rəhbəri (Nümayəndə)</label>
                      <input 
                        type="text" required
                        value={groupForm.leader || ''} 
                        onChange={(e) => setGroupForm(prev => ({ ...prev, leader: e.target.value }))}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-gray-400 font-bold">Tələbə Sayı</label>
                      <input 
                        type="number" required
                        value={groupForm.studentsCount || ''} 
                        onChange={(e) => setGroupForm(prev => ({ ...prev, studentsCount: Number(e.target.value) }))}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {activeSubTab === 'schedule' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 space-y-1">
                      <label className="text-gray-400 font-bold">Fənnin Adı</label>
                      <input 
                        type="text" required
                        value={scheduleForm.courseName || ''} 
                        onChange={(e) => setScheduleForm(prev => ({ ...prev, courseName: e.target.value }))}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-gray-400 font-bold">Qrup</label>
                      <input 
                        type="text" required
                        value={scheduleForm.groupName || ''} 
                        onChange={(e) => setScheduleForm(prev => ({ ...prev, groupName: e.target.value }))}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-gray-400 font-bold">Auditoriya / Otaq</label>
                      <input 
                        type="text" required
                        value={scheduleForm.room || ''} 
                        onChange={(e) => setScheduleForm(prev => ({ ...prev, room: e.target.value }))}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-gray-400 font-bold">Gün</label>
                      <select 
                        value={scheduleForm.day || 'Bazar ertəsi'} 
                        onChange={(e) => setScheduleForm(prev => ({ ...prev, day: e.target.value }))}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 focus:border-neon-blue focus:outline-none"
                      >
                        <option value="Bazar ertəsi">Bazar ertəsi</option>
                        <option value="Çərşənbə axşamı">Çərşənbə axşamı</option>
                        <option value="Çərşənbə">Çərşənbə</option>
                        <option value="Cümə axşamı">Cümə axşamı</option>
                        <option value="Cümə">Cümə</option>
                        <option value="Şənbə">Şənbə</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-gray-400 font-bold">Saat Aralığı</label>
                      <input 
                        type="text" required placeholder="məs: 09:00 - 10:30"
                        value={scheduleForm.time || ''} 
                        onChange={(e) => setScheduleForm(prev => ({ ...prev, time: e.target.value }))}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <label className="text-gray-400 font-bold">Aktiv Mövzu</label>
                      <input 
                        type="text" required
                        value={scheduleForm.topic || ''} 
                        onChange={(e) => setScheduleForm(prev => ({ ...prev, topic: e.target.value }))}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Submit / Cancel Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-800">
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded font-display font-bold bg-neon-blue text-black hover:shadow-neon-blue-glow transition-all cursor-pointer"
                  >
                    YADDA SAXLA
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="flex-1 py-2 rounded font-display font-bold bg-gray-800 text-white hover:bg-gray-700 transition-all cursor-pointer"
                  >
                    LƏĞV ET
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
