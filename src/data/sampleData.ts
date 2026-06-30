import { Student, Course, StudentGroup, ScheduleItem, NewsItem } from '../types';

export const SAMPLE_STUDENTS: Student[] = [
  {
    id: "ST-101",
    name: "Elnar Ağasoy",
    email: "agasoyelnar@gmail.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
    group: "CYBER-401",
    specialty: "Kiber-Təhlükəsizlik",
    gpa: 98.4,
    credits: 180,
    level: 18,
    academicPoints: 2450,
    completedCourses: 32,
    backlogs: 0,
    rank: 1,
    phone: "+994 (50) 123-45-67",
    admissionYear: 2023
  },
  {
    id: "ST-102",
    name: "Leyla Məmmədova",
    email: "leyla.m@code.edu.az",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    group: "CYBER-401",
    specialty: "Kiber-Təhlükəsizlik",
    gpa: 96.2,
    credits: 172,
    level: 17,
    academicPoints: 2310,
    completedCourses: 31,
    backlogs: 0,
    rank: 2,
    phone: "+994 (55) 765-43-21",
    admissionYear: 2023
  },
  {
    id: "ST-103",
    name: "Nicat Həsənov",
    email: "nicat.h@code.edu.az",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    group: "AI-301",
    specialty: "Süni İntellekt Mühəndisliyi",
    gpa: 94.8,
    credits: 120,
    level: 12,
    academicPoints: 1980,
    completedCourses: 22,
    backlogs: 1,
    rank: 3,
    phone: "+994 (77) 444-22-11",
    admissionYear: 2024
  },
  {
    id: "ST-104",
    name: "Fidan Əliyeva",
    email: "fidan.a@code.edu.az",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    group: "DEV-302",
    specialty: "Proqram Təminatı Mühəndisliyi",
    gpa: 92.5,
    credits: 114,
    level: 11,
    academicPoints: 1840,
    completedCourses: 20,
    backlogs: 0,
    rank: 4,
    phone: "+994 (50) 999-88-77",
    admissionYear: 2024
  },
  {
    id: "ST-105",
    name: "Toğrul Kərimov",
    email: "togrul.k@code.edu.az",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    group: "DEV-302",
    specialty: "Proqram Təminatı Mühəndisliyi",
    gpa: 89.9,
    credits: 110,
    level: 11,
    academicPoints: 1650,
    completedCourses: 19,
    backlogs: 2,
    rank: 5,
    phone: "+994 (51) 555-44-33",
    admissionYear: 2024
  },
  {
    id: "ST-106",
    name: "Aysel Hüseynova",
    email: "aysel.h@code.edu.az",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
    group: "AI-301",
    specialty: "Süni İntellekt Mühəndisliyi",
    gpa: 88.3,
    credits: 124,
    level: 12,
    academicPoints: 1720,
    completedCourses: 21,
    backlogs: 0,
    rank: 6,
    phone: "+994 (99) 333-22-11",
    admissionYear: 2024
  },
  {
    id: "ST-107",
    name: "Orxan Qasımov",
    email: "orxan.q@code.edu.az",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    group: "CYBER-401",
    specialty: "Kiber-Təhlükəsizlik",
    gpa: 85.1,
    credits: 160,
    level: 16,
    academicPoints: 1540,
    completedCourses: 28,
    backlogs: 1,
    rank: 7,
    phone: "+994 (50) 666-55-44",
    admissionYear: 2023
  },
  {
    id: "ST-108",
    name: "Şəms Bağırova",
    email: "sems.b@code.edu.az",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    group: "DEV-302",
    specialty: "Proqram Təminatı Mühəndisliyi",
    gpa: 82.4,
    credits: 98,
    level: 9,
    academicPoints: 1390,
    completedCourses: 17,
    backlogs: 3,
    rank: 8,
    phone: "+994 (55) 222-11-00",
    admissionYear: 2024
  }
];

export const SAMPLE_COURSES: Course[] = [
  {
    id: "C-101",
    name: "Kriptoqrafiya və Şəbəkə Təhlükəsizliyi",
    code: "SEC-402",
    credits: 8,
    teacher: "Prof. Dr. Kamran Əliyev",
    startDate: "2026-02-15",
    endDate: "2026-06-15",
    studentsCount: 32,
    status: "Aktiv",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
    syllabus: [
      "Kriptoqrafiyanın əsasları və simmetrik şifrələmə",
      "Asimmetrik kriptoqrafiya (RSA, ECC, Diffie-Hellman)",
      "Heş funksiyaları və rəqəmsal imzalar",
      "Şəbəkə protokollarının təhlükəsizliyi (SSL/TLS, IPsec)",
      "Zərərli proqram təminatı və müdaxilənin aşkarlanması"
    ],
    gradingCriteria: {
      midterm: 30,
      final: 40,
      project: 20,
      attendance: 10
    },
    description: "Bu fənn tələbələrə müasir şifrələmə üsulları, rəqəmsal təhlükəsizlik alətləri və şəbəkə hücumlarından qorunma metodlarını dərindən öyrədir."
  },
  {
    id: "C-102",
    name: "Dərin Öyrənmə və Neyron Şəbəkələri",
    code: "AI-311",
    credits: 7,
    teacher: "Dos. Dr. Aytən Rəhimova",
    startDate: "2026-02-16",
    endDate: "2026-06-16",
    studentsCount: 25,
    status: "Aktiv",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop",
    syllabus: [
      "Xətti reqressiyadan Neyron şəbəkələrinə keçid",
      "Geri yayılma (Backpropagation) alqoritmi",
      "Konvolusiya Neyron Şəbəkələri (CNN) və təsvirlərin tanınması",
      "Rekurrent Neyron Şəbəkələri (RNN) və NLP",
      "Generativ Rəqib Şəbəkələri (GANs) və gələcək trendlər"
    ],
    gradingCriteria: {
      midterm: 25,
      final: 45,
      project: 20,
      attendance: 10
    },
    description: "Tələbələr neyron şəbəkələrinin qurulması, öyrədilməsi və maşın görməsi (CV), təbii dilin emalı (NLP) sahəsində tətbiqini mənimsəyirlər."
  },
  {
    id: "C-103",
    name: "Fullstack Veb Proqramlaşdırma (React + Node.js)",
    code: "DEV-304",
    credits: 6,
    teacher: "Müt. İlkin Quliyev",
    startDate: "2026-02-18",
    endDate: "2026-06-18",
    studentsCount: 45,
    status: "Aktiv",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
    syllabus: [
      "Modern React konsepsiyaları (Hooks, Context, State)",
      "Node.js, Express framework və REST API-lərin yaradılması",
      "Verilənlər bazası ilə inteqrasiya (MongoDB / PostgreSQL)",
      "Təhlükəsizlik və JWT əsaslı autentifikasiya",
      "Veb layihənin bulud serverində (Cloud Run) yerləşdirilməsi"
    ],
    gradingCriteria: {
      midterm: 20,
      final: 40,
      project: 30,
      attendance: 10
    },
    description: "Həm kliyent, həm də server tərəfli modern tətbiqlərin yaradılması, memarlığı və real layihə üzərində komanda işini ehtiva edən praktiki fənn."
  },
  {
    id: "C-104",
    name: "Bulud Hesablamaları və DevOps İnfrastrukturu",
    code: "DEV-410",
    credits: 6,
    teacher: "Müt. Elşən Həsənov",
    startDate: "2026-09-15",
    endDate: "2027-01-15",
    studentsCount: 28,
    status: "Gözlənilən",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop",
    syllabus: [
      "Bulud modelləri (IaaS, PaaS, SaaS) və GCP/AWS əsasları",
      "Konteynerləşdirmə texnologiyası - Docker",
      "Konteyner idarəetməsi - Kubernetes",
      "CI/CD boru kəmərlərinin (GitHub Actions) qurulması",
      "İnfrastruktur kod kimi (Terraform)"
    ],
    gradingCriteria: {
      midterm: 30,
      final: 35,
      project: 25,
      attendance: 10
    },
    description: "Müasir proqram təminatı buraxılışlarının avtomatlaşdırılması, bulud resurslarının idarə olunması və genişlənən infrastrukturların qurulması metodikası."
  },
  {
    id: "C-105",
    name: "Mobil Tətbiq Mühəndisliyi (Flutter / React Native)",
    code: "DEV-311",
    credits: 5,
    teacher: "Müt. Günel Məmmədova",
    startDate: "2025-09-10",
    endDate: "2026-01-20",
    studentsCount: 38,
    status: "Bitmiş",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
    syllabus: [
      "Mobil tətbiq arxitekturası və UI dizayn prinsipləri",
      "State management (Provider, BLoC, Redux)",
      "Yerli aparat funksiyalarından istifadə (Kamera, GPS)",
      "Mobil tətbiqlərdə oflayn keşləmə və verilənlər bazası",
      "Tətbiqlərin App Store və Google Play-də dərci"
    ],
    gradingCriteria: {
      midterm: 30,
      final: 30,
      project: 30,
      attendance: 10
    },
    description: "Android və iOS platformaları üçün vahid kod bazasından istifadə edərək yüksək performanslı mobil tətbiqlərin sıfırdan hazırlanması kursu."
  }
];

export const SAMPLE_GROUPS: StudentGroup[] = [
  {
    id: "G-201",
    name: "CYBER-401",
    specialty: "Kiber-Təhlükəsizlik",
    studentsCount: 16,
    gpaAverage: 92.1,
    achievements: 8, // A alanlar
    warnings: 1, // Kəsr sayı
    leader: "Elnar Ağasoy",
    logo: "🛡️",
    points: 2850
  },
  {
    id: "G-202",
    name: "AI-301",
    specialty: "Süni İntellekt Mühəndisliyi",
    studentsCount: 12,
    gpaAverage: 89.4,
    achievements: 5,
    warnings: 2,
    leader: "Nicat Həsənov",
    logo: "🧠",
    points: 2540
  },
  {
    id: "G-203",
    name: "DEV-302",
    specialty: "Proqram Təminatı Mühəndisliyi",
    studentsCount: 20,
    gpaAverage: 87.6,
    achievements: 6,
    warnings: 5,
    leader: "Fidan Əliyeva",
    logo: "💻",
    points: 2410
  }
];

export const SAMPLE_SCHEDULE: ScheduleItem[] = [
  {
    id: "SCH-101",
    courseId: "C-101",
    courseName: "Kriptoqrafiya və Şəbəkə Təhlükəsizliyi",
    teacher: "Prof. Dr. Kamran Əliyev",
    day: "Bazar ertəsi",
    time: "09:00 - 10:30",
    room: "Lab 305 (Cyber Zone)",
    status: "Bitmiş",
    topic: "Asimmetrik şifrələmə alqoritmləri (RSA)",
    groupName: "CYBER-401"
  },
  {
    id: "SCH-102",
    courseId: "C-102",
    courseName: "Dərin Öyrənmə və Neyron Şəbəkələri",
    teacher: "Dos. Dr. Aytən Rəhimova",
    day: "Çərşənbə axşamı",
    time: "11:00 - 12:30",
    room: "Auditoriya 402 (AI Sandbox)",
    status: "Aktiv",
    topic: "Geri yayılma və Qradiyent enişi",
    groupName: "AI-301"
  },
  {
    id: "SCH-103",
    courseId: "C-103",
    courseName: "Fullstack Veb Proqramlaşdırma (React + Node.js)",
    teacher: "Müt. İlkin Quliyev",
    day: "Çərşənbə",
    time: "14:00 - 15:30",
    room: "Lab 201 (Web Arena)",
    status: "Gözlənilən",
    topic: "Express-də Middleware-lərin yaradılması",
    groupName: "DEV-302"
  },
  {
    id: "SCH-104",
    courseId: "C-101",
    courseName: "Kriptoqrafiya və Şəbəkə Təhlükəsizliyi",
    teacher: "Prof. Dr. Kamran Əliyev",
    day: "Cümə axşamı",
    time: "10:00 - 11:30",
    room: "Lab 305 (Cyber Zone)",
    status: "Gözlənilən",
    topic: "SSL/TLS Protokol daxili təhlillər",
    groupName: "CYBER-401"
  },
  {
    id: "SCH-105",
    courseId: "C-102",
    courseName: "Dərin Öyrənmə və Neyron Şəbəkələri",
    teacher: "Dos. Dr. Aytən Rəhimova",
    day: "Cümə",
    time: "15:00 - 16:30",
    room: "Auditoriya 402 (AI Sandbox)",
    status: "Gözlənilən",
    topic: "CNN ilə təsvirlərin konvolusiyası",
    groupName: "AI-301"
  }
];

export const SAMPLE_NEWS: NewsItem[] = [
  {
    id: "N-101",
    title: "Milli Kiber-Təhlükəsizlik Turnirinin Qalibi 'CYBER-401' Qrupu Oldu!",
    summary: "Universitetimizin Kiber-Təhlükəsizlik tələbələri ölkə səviyyəsində keçirilən 'CTF (Capture The Flag)' yarışmasında ən yüksək xal toplayaraq 1-ci yeri qazanıblar.",
    date: "2026-06-28",
    category: "Nailiyyət",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
    content: "Ölkəmizin rəqəmsal təhlükəsizlik mütəxəssislərini bir araya gətirən milli CTF turnirində universitetimizi təmsil edən 'CYBER-401' komandası bütün rəqiblərini geridə qoyub. Tələbələrimiz Elnar Ağasoy və Leyla Məmmədova kiber hücumların qarşısının alınması və boşluqların aşkarlanması tapşırıqlarında mükəmməl çeviklik nümayiş etdiriblər. Onlar reytinq cədvəlində 2850 xal toplayaraq turnirin çempion kubokuna və 10,000 AZN dəyərində pul mükafatına layiq görülüblər."
  },
  {
    id: "N-102",
    title: "Süni İntellekt Laboratoriyamızda Yeni Neyro-Klaster İşə Salındı",
    summary: "Süni İntellekt ixtisası tələbələrinin dərin öyrənmə modellərini daha sürətli öyrətməsi üçün 4x H100 GPU klasteri istifadəyə verilib.",
    date: "2026-06-25",
    category: "Yenilik",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop",
    content: "Tələbələrimizin tədqiqat və layihə işlərində resurs çatışmazlığını aradan qaldırmaq məqsədilə ən son texnoloji avadanlıqlarla təchiz olunmuş Neyro-Klaster istifadəyə verilmişdir. Dosent Aytən Rəhimovanın rəhbərlik etdiyi layihə çərçivəsində, AI-301 qrupundakı tələbələr böyük dil modellərini (LLM) və generativ tətbiqləri artıq bir neçə saat ərzində test edə biləcəklər. Klasterə birbaşa tələbə paneli vasitəsilə növbə əsaslı giriş tətbiq olunub."
  },
  {
    id: "N-103",
    title: "Google Cloud İnteqrasiyalı DevOps Seminarı Baş tutur",
    summary: "Sənaye mütəxəssisi Elşən Həsənov tərəfindən təşkil olunacaq seminarda Kubernetes və Jenkins vasitəsilə CI/CD prosesləri izah olunacaq.",
    date: "2026-06-20",
    category: "Seminar",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop",
    content: "Tələbələrimizin məzun olmadan əvvəl sənaye tələblərinə hazır olması üçün növbəti DevOps seminarı keçiriləcək. Seminarda real vaxt rejimində bulud serverlərinə kodların avtomatlaşdırılmış yerləşdirilməsi prinsipləri göstəriləcək. İştirakçılara beynəlxalq sertifikatlar təqdim ediləcək və ən fəal tələbələrə yay təcrübə proqramı təklif olunacaq."
  }
];

export const FAQS = [
  {
    question: "Tələbə reytinqi (Rank/ÜOMG) necə hesablanır?",
    answer: "Tələbələrin akademik reytinqi onların fənlərdən aldıqları yekun balların (ÜOMG) və qazandıqları ümumi kreditlərin çəkili cəminə əsasən müəyyənləşdirilir. Hər bir imtahan uğurla keçildikdə (A+, A, B və s.) tələbənin Akademik Reytinq Xalları (XP) artır."
  },
  {
    question: "Kəsri (Backlog) olan tələbə turnirdən və ya liderlər lövhəsindən kənarlaşdırılırmı?",
    answer: "Xeyr, kəsri olan tələbələr sistemdə aktiv qalırlar, lakin onların reytinqində azalma baş verir (Shield/HP azalır) və ÜOMG-yə təsir etdiyi üçün ümumi rankları bir qədər aşağı düşür. Kəsri təmizlədikdə isə xalları bərpa olunur."
  },
  {
    question: "Kurs statusları (Aktiv, Gözlənilən, Bitmiş) nəyi ifadə edir?",
    answer: "Aktiv kurslar hal-hazırda dərsləri davam edən və tələbələrin hər həftə qiymət topladığı fənlərdir. Gözlənilən kurslar növbəti semestrdə açılacaq fənlərdir. Bitmiş kurslar isə imtahan mərhələsi tamamlanmış və kreditləri artıq tələbələrin hesabına yazılmış fənlərdir."
  },
  {
    question: "Admin panelində məlumatları dəyişdikdə bu digər səhifələrdə görünürmü?",
    answer: "Bəli! Sistem yerli state (React Context/State) üzərindən işləyir. Admin panelində yeni tələbə yaratdıqda, redaktə etdikdə və ya fənn sildikdə, bütün dəyişikliklər reytinq cədvəlinə, tələbə siyahılarına və statistika panellərinə real vaxtda tətbiq olunur."
  }
];
