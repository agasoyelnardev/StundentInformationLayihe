export interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  group: string;
  specialty: string; // ixtisas
  gpa: number; // ÜOMG (0-100)
  credits: number; // EXP kimi qazanılan kreditlər
  level: number; // Səviyyə (GPA və kreditlərdən törəyən)
  academicPoints: number; // Aktivlik xalları (Kills kimi)
  completedCourses: number; // Uğurla bitən fənlər (Wins kimi)
  backlogs: number; // Kəsrlər (Losses kimi)
  rank: number;
  phone: string;
  admissionYear: number;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  teacher: string;
  startDate: string;
  endDate: string;
  studentsCount: number;
  status: 'Gözlənilən' | 'Aktiv' | 'Bitmiş';
  image: string;
  syllabus: string[];
  gradingCriteria: {
    midterm: number;
    final: number;
    project: number;
    attendance: number;
  };
  description: string;
}

export interface StudentGroup {
  id: string;
  name: string;
  specialty: string;
  studentsCount: number;
  gpaAverage: number;
  achievements: number; // A alan tələbə sayı (Wins)
  warnings: number; // Kəsr sayı (Losses)
  leader: string; // Qrup nümayəndəsi
  logo: string;
  points: number; // Qrup reytinq xalı
}

export interface ScheduleItem {
  id: string;
  courseId: string;
  courseName: string;
  teacher: string;
  day: string;
  time: string;
  room: string;
  status: 'Aktiv' | 'Gözlənilən' | 'Bitmiş';
  topic: string;
  groupName: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  image: string;
  content: string;
}
