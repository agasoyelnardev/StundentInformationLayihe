import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, Shield, Users, BookOpen, Calendar, HelpCircle, 
  Settings, Menu, X, Bell, User, Clock, Flame, ShieldAlert, Laptop, LogOut
} from 'lucide-react';

// Sample Data & Types
import { 
  SAMPLE_STUDENTS, 
  SAMPLE_COURSES, 
  SAMPLE_GROUPS, 
  SAMPLE_SCHEDULE, 
  SAMPLE_NEWS 
} from './data/sampleData';
import { Student, Course, StudentGroup, ScheduleItem, NewsItem } from './types';

// Component Sections
import HomeSection from './components/HomeSection';
import CoursesSection from './components/CoursesSection';
import CourseDetailsSection from './components/CourseDetailsSection';
import GroupsSection from './components/GroupsSection';
import GroupDetailsSection from './components/GroupDetailsSection';
import StudentsSection from './components/StudentsSection';
import StudentDetailsSection from './components/StudentDetailsSection';
import LeaderboardSection from './components/LeaderboardSection';
import ScheduleSection from './components/ScheduleSection';
import AdminSection from './components/AdminSection';
import ContactSection from './components/ContactSection';
import LoginSection from './components/LoginSection';

export default function App() {
  // Global State Managers for CRUD persistence
  const [students, setStudents] = useState<Student[]>(SAMPLE_STUDENTS);
  const [courses, setCourses] = useState<Course[]>(SAMPLE_COURSES);
  const [groups, setGroups] = useState<StudentGroup[]>(SAMPLE_GROUPS);
  const [schedule, setSchedule] = useState<ScheduleItem[]>(SAMPLE_SCHEDULE);
  const [news] = useState<NewsItem[]>(SAMPLE_NEWS);

  // User Session State (Pre-authenticated with Student Elnar Ağasoy for beautiful entry, but Admin panel is hidden from them unless logged in as admin)
  const [currentUser, setCurrentUser] = useState<{
    role: 'admin' | 'student';
    studentId?: string;
    name: string;
    email: string;
    avatar?: string;
  } | null>({
    role: 'student',
    studentId: 'ST-101',
    name: 'Elnar Ağasoy',
    email: 'elnar@code.edu.az',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop'
  });

  const handleRegister = (newStudent: Partial<Student>) => {
    setStudents(prev => [newStudent as Student, ...prev]);
  };

  // Layout / Navigation States
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  
  // Mobile navigation drawer toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Live clock display
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    // Set initially
    const updateTime = () => {
      const date = new Date();
      setCurrentTime(date.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Helper to handle deep navigation and reset sub-views
  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
    setSelectedCourseId(null);
    setSelectedGroupId(null);
    setSelectedStudentId(null);
    setMobileMenuOpen(false);
  };

  const handleDeepNavigate = (tabId: string, itemId?: string) => {
    setCurrentTab(tabId);
    if (tabId === 'courses' && itemId) {
      setSelectedCourseId(itemId);
      setSelectedGroupId(null);
      setSelectedStudentId(null);
    } else if (tabId === 'groups' && itemId) {
      setSelectedGroupId(itemId);
      setSelectedCourseId(null);
      setSelectedStudentId(null);
    } else if (tabId === 'students' && itemId) {
      setSelectedStudentId(itemId);
      setSelectedCourseId(null);
      setSelectedGroupId(null);
    } else {
      setSelectedCourseId(null);
      setSelectedGroupId(null);
      setSelectedStudentId(null);
    }
    setMobileMenuOpen(false);
  };

  // Find selected detail elements
  const activeCourse = courses.find(c => c.id === selectedCourseId);
  const activeGroup = groups.find(g => g.id === selectedGroupId);
  const activeStudent = students.find(s => s.id === selectedStudentId);

  // Sidebar Menu Config
  const menuItems = [
    { id: 'home', label: 'Ana Səhifə', icon: Laptop },
    { id: 'courses', label: 'Fənlər / Kurslar', icon: BookOpen },
    { id: 'groups', label: 'Qruplar / Komandalar', icon: Shield },
    { id: 'students', label: 'Tələbə Heyəti', icon: Users },
    { id: 'leaderboard', label: 'Liderlər Lövhəsi', icon: Trophy },
    { id: 'schedule', label: 'Dərs Cədvəli', icon: Calendar },
    { id: 'admin', label: 'Admin Panel', icon: Settings },
    { id: 'contact', label: 'Əlaqə & FAQ', icon: HelpCircle },
  ];

  const filteredMenuItems = menuItems.filter(item => {
    if (item.id === 'admin') {
      return currentUser?.role === 'admin';
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-dark-bg text-gray-300 cyber-grid flex flex-col font-sans scanlines">
      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 z-40 bg-dark-bg/80 backdrop-blur-md border-b border-dark-border px-4 py-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo with Cyber glow */}
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple p-[1px] shadow-neon-blue-glow">
            <div className="h-full w-full rounded-xl bg-dark-bg flex items-center justify-center font-display font-black text-neon-blue text-sm">
              ED
            </div>
          </div>
          <div>
            <span className="font-display font-black text-lg tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple italic block uppercase">
              EDUNEON <span className="font-light">TMS</span>
            </span>
            <span className="text-[9px] text-gray-500 block uppercase font-mono tracking-wider font-bold">Tələbə Məlumat Sistemi</span>
          </div>
        </div>

        {/* Global info indicators and User info */}
        {currentUser && (
          <div className="flex items-center gap-3 md:gap-4">
            {/* Time display */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-gray-900 border border-gray-800 rounded font-mono text-xs text-neon-blue">
              <Clock className="h-3.5 w-3.5 text-neon-blue" />
              <span>{currentTime || "00:00:00"} UTC</span>
            </div>

            {/* Dynamic User profile widget */}
            <div 
              onClick={() => {
                if (currentUser.role === 'student' && currentUser.studentId) {
                  handleDeepNavigate('students', currentUser.studentId);
                } else if (currentUser.role === 'admin') {
                  handleTabChange('admin');
                }
              }}
              className="flex items-center gap-3 p-1.5 pr-3 bg-gray-900 border border-gray-800 hover:border-neon-blue rounded-lg transition-colors cursor-pointer group"
            >
              <div className="h-7 w-7 rounded-full overflow-hidden border border-neon-blue p-[1px]">
                <img 
                  src={currentUser.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"} 
                  alt={currentUser.name} 
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left hidden sm:block">
                <span className="text-xs font-bold text-white block group-hover:text-neon-blue transition-colors leading-tight">{currentUser.name}</span>
                <span className="text-[8px] text-neon-purple font-bold block uppercase font-mono tracking-tight leading-none mt-0.5">
                  {currentUser.role === 'admin' ? 'ADMİNİSTRATOR' : (students.find(s => s.id === currentUser.studentId)?.group || 'TƏLƏBƏ')}
                </span>
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={() => {
                setCurrentUser(null);
                handleTabChange('home');
              }}
              title="Çıxış et"
              className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all cursor-pointer flex items-center justify-center"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Mobile menu toggle when logged in */}
        {currentUser && (
          <button 
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded bg-gray-900 border border-gray-800 text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        )}
      </header>

      {/* 2. Main Dashboard Layout Area */}
      {!currentUser ? (
        <div className="flex-1 flex items-center justify-center p-4 md:p-8">
          <LoginSection 
            students={students}
            onLogin={setCurrentUser}
            onRegister={handleRegister}
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 md:p-8 gap-8">
          
          {/* Desktop Left Sidebar Panel */}
          <aside className="hidden md:block w-64 shrink-0 space-y-4">
            <div className="p-4 bg-dark-card border border-dark-border rounded-xl space-y-2">
              <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest pl-2">KONSOL NAVİQASİYASI</span>
              
              <nav className="space-y-1">
                {filteredMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`sidebar-link-${item.id}`}
                      onClick={() => handleTabChange(item.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-xs font-bold font-display tracking-wide transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-gradient-to-r from-neon-blue/10 to-neon-purple/5 text-neon-blue border border-neon-blue/30 shadow-[0_0_15px_rgba(0,240,255,0.05)]' 
                          : 'text-gray-400 hover:text-white hover:bg-gray-900/40 border border-transparent'
                      }`}
                    >
                      <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-neon-blue' : 'text-gray-400'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Mini active match alert block */}
            <div className="p-4 bg-gradient-to-br from-neon-pink/5 to-neon-purple/5 border border-neon-pink/20 rounded-xl space-y-3">
              <div className="flex items-center gap-1.5 text-neon-pink font-bold text-xs animate-pulse">
                <ShieldAlert className="h-4 w-4" /> CANLI KONTROL SİSTEMİ
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Dərs qiymətləndirmələri və kəsrlərin ləğvi üzrə bütün əməliyyatlar real vaxtda dərəcənizə təsir göstərir.
              </p>
            </div>
          </aside>

          {/* Mobile Navigation Drawer Overlay */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                className="fixed inset-0 z-50 bg-dark-bg p-6 flex flex-col gap-6 border-r border-dark-border md:hidden w-72"
              >
                <div className="flex justify-between items-center">
                  <span className="font-display font-extrabold text-base text-white">MENYU</span>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded bg-gray-900 border border-gray-800 text-white cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="space-y-2">
                  {filteredMenuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentTab === item.id;
                    return (
                      <button
                        key={item.id}
                        id={`mobile-link-${item.id}`}
                        onClick={() => handleTabChange(item.id)}
                        className={`w-full flex items-center gap-3 p-3.5 rounded-lg text-sm font-bold font-display ${
                          isActive 
                            ? 'bg-neon-blue/15 text-neon-blue border border-neon-blue/30' 
                            : 'text-gray-400 hover:text-white hover:bg-gray-900/40'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* Mobile Time / User card */}
                <div className="mt-auto space-y-4">
                  <div className="p-3 bg-gray-900 border border-gray-800 rounded text-center text-xs font-mono text-neon-blue">
                    {currentTime || "00:00:00"} UTC
                  </div>
                  
                  <div 
                    onClick={() => {
                      if (currentUser.role === 'student' && currentUser.studentId) {
                        handleDeepNavigate('students', currentUser.studentId);
                      } else if (currentUser.role === 'admin') {
                        handleTabChange('admin');
                      }
                    }}
                    className="flex items-center gap-3 p-3 bg-gray-900 border border-gray-800 rounded-lg cursor-pointer"
                  >
                    <img 
                      src={currentUser.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"} 
                      alt={currentUser.name} 
                      className="h-9 w-9 rounded-full object-cover border border-neon-blue"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="text-sm font-bold text-white block">{currentUser.name}</span>
                      <span className="text-[10px] text-neon-purple font-mono font-bold block">
                        {currentUser.role === 'admin' ? 'ADMİNİSTRATOR' : (students.find(s => s.id === currentUser.studentId)?.group || 'TƏLƏBƏ')}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3. Central Application Stage Component Controller */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab + (selectedCourseId || '') + (selectedGroupId || '') + (selectedStudentId || '')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              
              {/* ANA SƏHİFƏ TAB */}
              {currentTab === 'home' && (
                <HomeSection 
                  courses={courses}
                  groups={groups}
                  news={news}
                  schedule={schedule}
                  totalStudentsCount={students.length}
                  onNavigate={handleDeepNavigate}
                />
              )}

              {/* FƏNLƏR / KURSLAR TAB */}
              {currentTab === 'courses' && (
                activeCourse ? (
                  <CourseDetailsSection 
                    course={activeCourse}
                    allStudents={students}
                    onBack={() => setSelectedCourseId(null)}
                    onNavigateToStudent={(sid) => handleDeepNavigate('students', sid)}
                  />
                ) : (
                  <CoursesSection 
                    courses={courses}
                    onSelectCourse={(id) => setSelectedCourseId(id)}
                  />
                )
              )}

              {/* QRUPLAR / KOMANDALAR TAB */}
              {currentTab === 'groups' && (
                activeGroup ? (
                  <GroupDetailsSection 
                    group={activeGroup}
                    allStudents={students}
                    allCourses={courses}
                    onBack={() => setSelectedGroupId(null)}
                    onNavigateToStudent={(sid) => handleDeepNavigate('students', sid)}
                  />
                ) : (
                  <GroupsSection 
                    groups={groups}
                    onSelectGroup={(id) => setSelectedGroupId(id)}
                  />
                )
              )}

              {/* TƏLƏBƏ HEYƏTİ TAB */}
              {currentTab === 'students' && (
                activeStudent ? (
                  <StudentDetailsSection 
                    student={activeStudent}
                    allCourses={courses}
                    onBack={() => setSelectedStudentId(null)}
                  />
                ) : (
                  <StudentsSection 
                    students={students}
                    onSelectStudent={(id) => setSelectedStudentId(id)}
                  />
                )
              )}

              {/* LİDERLƏR LÖVHƏSİ TAB */}
              {currentTab === 'leaderboard' && (
                <LeaderboardSection 
                  students={students}
                  groups={groups}
                  onSelectStudent={(sid) => handleDeepNavigate('students', sid)}
                  onSelectGroup={(gid) => handleDeepNavigate('groups', gid)}
                />
              )}

              {/* DƏRS CƏDVƏLİ TAB */}
              {currentTab === 'schedule' && (
                <ScheduleSection 
                  schedule={schedule}
                />
              )}

              {/* ADMIN PANEL TAB */}
              {currentTab === 'admin' && (
                <AdminSection 
                  students={students}
                  courses={courses}
                  groups={groups}
                  schedule={schedule}
                  onUpdateStudents={setStudents}
                  onUpdateCourses={setCourses}
                  onUpdateGroups={setGroups}
                  onUpdateSchedule={setSchedule}
                />
              )}

              {/* ƏLAQƏ TAB */}
              {currentTab === 'contact' && (
                <ContactSection />
              )}

            </motion.div>
          </AnimatePresence>
        </main>

      </div>
      )}

      {/* 4. Footer */}
      <footer className="border-t border-dark-border bg-gray-950 px-4 py-6 md:px-8 text-center text-xs text-gray-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span>&copy; 2026 EDUNEON Tələbə Məlumat Sistemi. Bütün Hüquqlar Qorunur.</span>
          <span className="text-neon-blue">Sistem Statusu: <b className="text-green-400">ON-LINE [NORMAL]</b></span>
        </div>
      </footer>
    </div>
  );
}
