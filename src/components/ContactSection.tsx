import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp, Send, Mail, MapPin, Phone, MessageSquare, Globe, Github } from 'lucide-react';
import { FAQS } from '../data/sampleData';

export default function ContactSection() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  
  // Contact Form State
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(prev => (prev === idx ? null : idx));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    // Simulate API call
    setIsSubmitted(true);
    setTimeout(() => {
      setFormState({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
      alert("Mesajınız uğurla göndərildi! Tezlər sizinlə əlaqə saxlayacağıq.");
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="border-b border-dark-border pb-5">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          📞 Əlaqə və Dəstək
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Sistem haqqında suallarınız üçün bizə yazın və yaxud tez-tez soruşulan suallarla tanış olun.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Contact Form & Contact Details */}
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-dark-card border border-dark-border space-y-4">
            <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-neon-blue" /> Bizə Mesaj Yazın
            </h2>
            
            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">Adınız Soyadınız</label>
                  <input 
                    type="text" required
                    value={formState.name}
                    onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Elnar Ağasoy"
                    className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-gray-300 focus:border-neon-blue focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-400 font-bold">E-mail</label>
                  <input 
                    type="email" required
                    value={formState.email}
                    onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="name@domain.com"
                    className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-gray-300 focus:border-neon-blue focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-gray-400 font-bold">Mövzu</label>
                <input 
                  type="text" required
                  value={formState.subject}
                  onChange={(e) => setFormState(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Mövzu başlığı"
                  className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-gray-300 focus:border-neon-blue focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-400 font-bold">Mesajınız</label>
                <textarea 
                  rows={4} required
                  value={formState.message}
                  onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Hörmətli dəstək heyəti..."
                  className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-gray-300 focus:border-neon-blue focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitted}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded font-display font-bold bg-neon-blue text-black hover:shadow-neon-blue-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                {isSubmitted ? "MESAJ GÖNDƏRİLİR..." : <><Send className="h-4 w-4" /> GÖNDƏR</>}
              </button>
            </form>
          </div>

          {/* Contact Details Info Card */}
          <div className="p-6 rounded-xl bg-dark-card border border-dark-border grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-gray-900 rounded-lg border border-gray-800 space-y-1">
              <Mail className="h-5 w-5 mx-auto text-neon-purple" />
              <span className="text-[10px] text-gray-500 uppercase block font-bold">E-poçt</span>
              <a href="mailto:support@eduneon.az" className="text-[10px] text-gray-300 hover:text-neon-purple font-medium">support@eduneon.az</a>
            </div>
            <div className="p-3 bg-gray-900 rounded-lg border border-gray-800 space-y-1">
              <Phone className="h-5 w-5 mx-auto text-neon-blue" />
              <span className="text-[10px] text-gray-500 uppercase block font-bold">Zəng Mərkəzi</span>
              <span className="text-[10px] text-gray-300 font-medium">+994 (12) 123-4567</span>
            </div>
            <div className="p-3 bg-gray-900 rounded-lg border border-gray-800 space-y-1">
              <MapPin className="h-5 w-5 mx-auto text-neon-pink" />
              <span className="text-[10px] text-gray-500 uppercase block font-bold">Ünvan</span>
              <span className="text-[10px] text-gray-300 font-medium">Bakı, Nizami küç. 104</span>
            </div>
          </div>
        </div>

        {/* FAQ Toggles Accordion */}
        <div className="p-6 rounded-xl bg-dark-card border border-dark-border space-y-4">
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-neon-purple" /> Tez-tez Soruşulan Suallar (FAQ)
          </h2>
          <p className="text-xs text-gray-400">
            Sistemdən istifadə edərkən yaranan əsas suallar və onların izahlı cavabları.
          </p>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-lg border border-gray-800 overflow-hidden bg-gray-900/40"
                >
                  {/* Question Title Bar */}
                  <button
                    id={`faq-btn-${idx}`}
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs text-white hover:text-neon-purple transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp className="h-4 w-4 text-neon-purple" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
                  </button>

                  {/* Accordion Answer Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-4 pt-0 text-[11px] text-gray-400 border-t border-gray-800/40 leading-relaxed bg-black/10">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Cyber Social links */}
          <div className="pt-6 border-t border-gray-800 flex items-center justify-between">
            <span className="text-[11px] text-gray-500 uppercase font-mono">Bizi İzləyin</span>
            <div className="flex gap-3">
              {[
                { id: "social-web", icon: Globe, link: "#" },
                { id: "social-github", icon: Github, link: "https://github.com" },
                { id: "social-discord", icon: MessageSquare, link: "https://discord.com" }
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.id}
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded bg-gray-900 border border-gray-800 text-gray-400 hover:text-neon-blue hover:border-neon-blue transition-all"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
