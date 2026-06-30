import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, User, Lock, Mail, ChevronRight, UserPlus, LogIn, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { Student } from '../types';

interface LoginSectionProps {
  students: Student[];
  onLogin: (session: { role: 'admin' | 'student'; studentId?: string; name: string; email: string; avatar?: string }) => void;
  onRegister: (newStudent: Partial<Student>) => void;
}

export default function LoginSection({ students, onLogin, onRegister }: LoginSectionProps) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  
  // Login State
  const [loginRole, setLoginRole] = useState<'student' | 'admin'>('student');
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  
  // Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regGroup, setRegGroup] = useState('CYBER-401');
  const [regSpecialty, setRegSpecialty] = useState('Kiber-Təhlükəsizlik');
  
  // Feedback
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (loginRole === 'admin') {
      if (adminUsername === 'admin' && adminPassword === 'admin') {
        setSuccess('Uğurla giriş edildi! Admin paneli aktivləşdirildi.');
        setTimeout(() => {
          onLogin({
            role: 'admin',
            name: 'Sistem Admini',
            email: 'admin@codeneon.edu.az',
            avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop'
          });
        }, 800);
      } else {
        setError('Səhv istifadəçi adı və ya şifrə! (İpucu: admin / admin)');
      }
    } else {
      const foundStudent = students.find(s => s.id === selectedStudentId);
      if (foundStudent) {
        setSuccess(`Xoş gəldiniz, ${foundStudent.name}! Portal yüklənir...`);
        setTimeout(() => {
          onLogin({
            role: 'student',
            studentId: foundStudent.id,
            name: foundStudent.name,
            email: foundStudent.email,
            avatar: foundStudent.avatar
          });
        }, 800);
      } else {
        setError('Zəhmət olmasa tələbə seçin!');
      }
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!regName.trim() || !regEmail.trim()) {
      setError('Zəhmət olmasa bütün xanaları doldurun!');
      return;
    }

    if (!regEmail.includes('@')) {
      setError('Zəhmət olmasa düzgün email daxil edin!');
      return;
    }

    // Determine specialty based on group
    let specialty = regSpecialty;
    if (regGroup === 'CYBER-401') specialty = 'Kiber-Təhlükəsizlik';
    else if (regGroup === 'AI-301') specialty = 'Süni İntellekt Mühəndisliyi';
    else if (regGroup === 'DEV-302') specialty = 'Proqram Təminatı Mühəndisliyi';

    const newStudentId = `ST-${100 + students.length + 1}`;
    const newStudent: Partial<Student> = {
      id: newStudentId,
      name: regName,
      email: regEmail,
      group: regGroup,
      specialty: specialty,
      gpa: 100, // New student starts with fresh 100 GPA / level 1
      credits: 0,
      level: 1,
      academicPoints: 100,
      completedCourses: 0,
      backlogs: 0,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop`
    };

    onRegister(newStudent);
    setSuccess('Qeydiyyat uğurla tamamlandı! Hesabınıza giriş edilir...');
    
    setTimeout(() => {
      onLogin({
        role: 'student',
        studentId: newStudentId,
        name: regName,
        email: regEmail,
        avatar: newStudent.avatar
      });
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-dark-card border border-dark-border rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(229,184,66,0.04)] relative overflow-hidden">
        
        {/* Decorative ambient background accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-neon-blue/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-neon-purple/5 blur-3xl pointer-events-none" />

        {/* Header Icon */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-neon-blue to-neon-purple p-[1px] shadow-neon-blue-glow mb-4">
            <div className="h-full w-full rounded-2xl bg-dark-bg flex items-center justify-center">
              <Shield className="h-6 w-6 text-neon-blue" />
            </div>
          </div>
          <h2 className="font-display font-black text-xl tracking-wider text-white uppercase italic">
            EDUNEON <span className="text-neon-blue font-light">PORTAL</span>
          </h2>
          <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mt-1">
            Məlumat Sisteminə Təhlükəsiz Giriş
          </p>
        </div>

        {/* Tab Selection */}
        {!isRegisterMode && (
          <div className="grid grid-cols-2 gap-2 bg-gray-950 p-1 rounded-lg border border-gray-900 mb-6">
            <button
              type="button"
              onClick={() => { setLoginRole('student'); setError(null); }}
              className={`py-2 rounded-md text-xs font-bold font-display transition-all ${
                loginRole === 'student'
                  ? 'bg-neon-blue/15 text-neon-blue border border-neon-blue/20 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <User className="h-3.5 w-3.5 inline-block mr-1.5 -mt-0.5" />
              Tələbə Girişi
            </button>
            <button
              type="button"
              onClick={() => { setLoginRole('admin'); setError(null); }}
              className={`py-2 rounded-md text-xs font-bold font-display transition-all ${
                loginRole === 'admin'
                  ? 'bg-neon-blue/15 text-neon-blue border border-neon-blue/20 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Shield className="h-3.5 w-3.5 inline-block mr-1.5 -mt-0.5" />
              Admin Girişi
            </button>
          </div>
        )}

        {/* Alert Messages */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2.5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs mb-5"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
          {success && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2.5 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs mb-5"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{success}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Forms Panel */}
        {!isRegisterMode ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {loginRole === 'student' ? (
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Siyahıdan Tələbəni Seçin</label>
                <div className="relative">
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2.5 text-xs text-white focus:border-neon-blue focus:outline-none appearance-none"
                  >
                    {students.map((student) => (
                      <option key={student.id} value={student.id} className="bg-dark-bg text-white">
                        {student.name} ({student.group} - GPA: {student.gpa})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                    <ChevronRight className="h-4 w-4 rotate-90" />
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 italic mt-1 font-mono">
                  Siyahıdakı hər hansı tələbənin şəxsi profilinə daxil olmaq üçün seçin.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">İstifadəçi Adı</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <User className="h-3.5 w-3.5" />
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="admin"
                      value={adminUsername}
                      onChange={(e) => setAdminUsername(e.target.value)}
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white focus:border-neon-blue focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Şifrə</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <Lock className="h-3.5 w-3.5" />
                    </span>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white focus:border-neon-blue focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="p-2.5 bg-neon-blue/5 border border-neon-blue/10 rounded-lg text-[10px] text-gray-400 space-y-0.5 leading-normal">
                  <span className="text-neon-blue font-bold">💡 Sürətli Giriş Məlumatı:</span>
                  <p>İstifadəçi adı: <b className="text-white font-mono">admin</b></p>
                  <p>Şifrə: <b className="text-white font-mono">admin</b></p>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg shimmer-btn text-white text-xs font-bold font-display uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-neon-blue-glow cursor-pointer mt-2"
            >
              <LogIn className="h-4 w-4" />
              Giriş Et
            </button>

            {loginRole === 'student' && (
              <div className="text-center pt-3 border-t border-gray-900">
                <button
                  type="button"
                  onClick={() => { setIsRegisterMode(true); setError(null); }}
                  className="text-[10px] text-neon-blue hover:underline font-mono"
                >
                  <UserPlus className="h-3.5 w-3.5 inline-block mr-1 -mt-0.5" /> Yeni tələbə qeydiyyatı yarat
                </button>
              </div>
            )}
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider border-b border-gray-900 pb-2">Yeni Tələbə Qeydiyyatı</h3>

            <div className="space-y-1.5">
              <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Ad Soyad</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <User className="h-3.5 w-3.5" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Məs. Nicat Həsənov"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white focus:border-neon-blue focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Elektron Poçt (Email)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <Mail className="h-3.5 w-3.5" />
                </span>
                <input
                  type="email"
                  required
                  placeholder="Məs. nicat@code.edu.az"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white focus:border-neon-blue focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Qrup Seçimi</label>
                <select
                  value={regGroup}
                  onChange={(e) => {
                    const group = e.target.value;
                    setRegGroup(group);
                    if (group === 'CYBER-401') setRegSpecialty('Kiber-Təhlükəsizlik');
                    else if (group === 'AI-301') setRegSpecialty('Süni İntellekt Mühəndisliyi');
                    else if (group === 'DEV-302') setRegSpecialty('Proqram Təminatı Mühəndisliyi');
                  }}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2.5 text-xs text-white focus:border-neon-blue focus:outline-none"
                >
                  <option value="CYBER-401">CYBER-401</option>
                  <option value="AI-301">AI-301</option>
                  <option value="DEV-302">DEV-302</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">İxtisas (Avtomatik)</label>
                <input
                  type="text"
                  disabled
                  value={regSpecialty}
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-3 py-2.5 text-xs text-gray-500 focus:outline-none cursor-not-allowed font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-white text-xs font-bold font-display uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-neon-blue-glow cursor-pointer mt-2"
            >
              <Sparkles className="h-4 w-4 text-neon-blue animate-spin" />
              Hesab Yarat və Giriş Et
            </button>

            <div className="text-center pt-3 border-t border-gray-900">
              <button
                type="button"
                onClick={() => { setIsRegisterMode(false); setError(null); }}
                className="text-[10px] text-gray-400 hover:text-white hover:underline font-mono"
              >
                Geri dön və mövcud hesabla daxil ol
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
