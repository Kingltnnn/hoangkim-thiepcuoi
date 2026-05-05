import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Calendar, MapPin, Clock, X, ChevronLeft, ChevronRight, Send, Check, Music } from 'lucide-react';

// Import local images
import backgroundImage from './assets/img/background.webp';
import flowerImage from './assets/img/flower.png';
import frameTopLeft from './assets/img/frame-corner-top-left.webp';
import frameHorizontal from './assets/img/frame-middle-horizontal.webp';
import frameVertical from './assets/img/frame-middle-vertical.webp';

// --- Constants & Data ---

const WEDDING_DATE = new Date('2026-05-30T11:00:00');
const CEREMONY_DATE = new Date('2026-02-01T09:00:00');

const ALBUM_IMAGES = [
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1465495910483-0d61899121c6?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522673607200-164883eecd1c?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1550005816-09246d377488?auto=format&fit=crop&q=80',
];

const TIMELINE_DATA = [
  { time: '17:30', event: 'Đón khách' },
  { time: '18:30', event: 'Khai tiệc' },
  { time: '18:45', event: 'Rót rượu, cắt bánh' },
  { time: '19:00', event: 'Phục vụ món chính' },
  { time: '21:00', event: 'Kết thúc tiệc' },
];

// --- Utilities ---

const formatNumber = (num: number) => num.toString().padStart(2, '0');

// --- Components ---

const Frame = ({ children }: { children: React.ReactNode }) => {
  const cornerSize = 'clamp(56px, 11.9vw, 91px)';
  const horizontalSize = 'clamp(65px, 13.8vw, 106px)';
  const verticalWidth = 'clamp(21px, 4.55vw, 35px)';

  const Dots = ({ vertical = false }: { vertical?: boolean }) => (
    <div className={`flex ${vertical ? 'flex-col' : 'flex-row'} items-center gap-1 opacity-60`}>
      <div className="w-1.5 h-1.5 rounded-full bg-gold-champagne"></div>
      <div className="w-1 h-1 rounded-full bg-gold-champagne"></div>
      <div className="w-1.5 h-1.5 rounded-full bg-gold-champagne"></div>
    </div>
  );

  return (
    <div className="relative w-[95%] mx-auto z-10 my-10">
      {/* Grid Border Layer */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          display: 'grid',
          gridTemplateRows: `${cornerSize} 1fr ${cornerSize}`,
          gridTemplateColumns: `${cornerSize} 1fr ${cornerSize}`
        }}
      >
        {/* Corners */}
        <img src={frameTopLeft} className="self-start justify-self-start" style={{ width: cornerSize }} alt="" />
        <div className="flex items-center justify-center px-2">
          <div className="flex-1 flex items-center gap-2">
            <Dots />
            <div className="flex-1 h-px bg-gold-champagne/40"></div>
          </div>
          <img src={frameHorizontal} style={{ width: horizontalSize }} alt="" />
          <div className="flex-1 flex items-center gap-2">
            <div className="flex-1 h-px bg-gold-champagne/40"></div>
            <Dots />
          </div>
        </div>
        <img src={frameTopLeft} className="self-start justify-self-end -scale-x-100" style={{ width: cornerSize }} alt="" />

        {/* Middle Vertical Links */}
        <div className="flex flex-col items-center justify-center py-2 h-full">
           <div className="flex-1 flex flex-col items-center gap-2">
             <Dots vertical />
             <div className="flex-1 w-px bg-gold-champagne/40"></div>
           </div>
           <img src={frameVertical} style={{ width: verticalWidth }} alt="" />
           <div className="flex-1 flex flex-col items-center gap-2">
             <div className="flex-1 w-px bg-gold-champagne/40"></div>
             <Dots vertical />
           </div>
        </div>
        <div></div> {/* Content Area Empty in Grid Overlay */}
        <div className="flex flex-col items-center justify-center py-2 h-full scale-x-[-1]">
           <div className="flex-1 flex flex-col items-center gap-2">
             <Dots vertical />
             <div className="flex-1 w-px bg-gold-champagne/40"></div>
           </div>
           <img src={frameVertical} style={{ width: verticalWidth }} alt="" />
           <div className="flex-1 flex flex-col items-center gap-2" >
             <div className="flex-1 w-px bg-gold-champagne/40"></div>
             <Dots vertical />
           </div>
        </div>

        {/* Bottom Borders */}
        <img src={frameTopLeft} className="self-end justify-self-start -scale-y-100" style={{ width: cornerSize }} alt="" />
        <div className="flex items-center justify-center px-2">
           <div className="flex-1 flex items-center gap-2">
            <Dots />
            <div className="flex-1 h-px bg-gold-champagne/40"></div>
          </div>
          <img src={frameHorizontal} style={{ width: horizontalSize }} className="-scale-y-100" alt="" />
          <div className="flex-1 flex items-center gap-2">
            <div className="flex-1 h-px bg-gold-champagne/40"></div>
            <Dots />
          </div>
        </div>
        <img src={frameTopLeft} className="self-end justify-self-end -scale-100" style={{ width: cornerSize }} alt="" />
      </div>

      {/* Actual Content Wrapper */}
      <div 
        className="relative z-0"
        style={{
          paddingTop: cornerSize,
          paddingBottom: cornerSize,
          paddingLeft: cornerSize,
          paddingRight: cornerSize
        }}
      >
        {children}
      </div>
    </div>
  );
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = WEDDING_DATE.getTime() - now.getTime();
      
      if (diff <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / 1000 / 60) % 60),
        s: Math.floor((diff / 1000) % 60)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <p className="font-signora font-normal uppercase text-3xl tracking-widest text-gold-champagne/90">Cùng đếm ngược</p>
      <div className="flex gap-4 sm:gap-6 text-gold-champagne font-baskerville">
        <div className="flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-bold">{formatNumber(timeLeft.d)}</span>
          <span className="text-[10px] uppercase opacity-60">Ngày</span>
        </div>
        <div className="flex flex-col items-stretch pt-2">
            <div className="w-[3px] h-[3px] rounded-full bg-gold-champagne mb-2"></div>
            <div className="w-[3px] h-[3px] rounded-full bg-gold-champagne"></div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-bold">{formatNumber(timeLeft.h)}</span>
          <span className="text-[10px] uppercase opacity-60">Giờ</span>
        </div>
        <div className="flex flex-col items-stretch pt-2">
            <div className="w-[3px] h-[3px] rounded-full bg-gold-champagne mb-2"></div>
            <div className="w-[3px] h-[3px] rounded-full bg-gold-champagne"></div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-bold">{formatNumber(timeLeft.m)}</span>
          <span className="text-[10px] uppercase opacity-60">Phút</span>
        </div>
        <div className="flex flex-col items-stretch pt-2">
            <div className="w-[3px] h-[3px] rounded-full bg-gold-champagne mb-2"></div>
            <div className="w-[3px] h-[3px] rounded-full bg-gold-champagne"></div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-bold">{formatNumber(timeLeft.s)}</span>
          <span className="text-[10px] uppercase opacity-60">Giây</span>
        </div>
      </div>
    </div>
  );
};

const CalendarMay = () => {
  const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  const dates = [
    null, null, null, null, 1, 2, 3,
    4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17,
    18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29, 30, 31
  ];

  return (
    <div className="w-full max-w-[280px] sm:max-w-[310px] mx-auto border border-gold-champagne/30 rounded-lg overflow-hidden bg-wine-red/50">
      <div className="text-center py-2 border-b border-gold-champagne/30 font-semibold text-sm">
        Tháng 5 / 2026
      </div>
      <div className="grid grid-cols-7 text-center py-2 bg-gold-champagne/5">
        {days.map(d => (
          <span key={d} className="text-[11px] opacity-60 uppercase font-medium">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center">
        {dates.map((date, i) => (
          <div key={i} className="relative h-8 sm:h-[34px] flex items-center justify-center text-sm">
            {date === 30 ? (
              <div className="relative flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="absolute w-10 h-10 fill-gold-champagne opacity-100">
                  <path d="M50 88L15 50C15 35 30 20 50 40C70 20 85 35 85 50L50 88Z" />
                </svg>
                <span className="relative z-10 text-wine-red font-bold">30</span>
              </div>
            ) : date ? (
              <span>{date}</span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-lg bg-wine-red rounded-2xl overflow-hidden border border-gold-champagne/20 shadow-2xl"
      >
        <div className="bg-gold-champagne px-6 py-4 flex justify-between items-center text-wine-red">
          <h2 className="text-xl font-signora font-normal tracking-[0.2em] flex-1 text-center pl-6">{title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-wine-red/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

const RedEnvelopeModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="modal-box max-w-lg sm:max-w-xl p-0 max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl relative bg-[#3E0001]"
            >
                <div className="relative px-6 pt-8 pb-6 text-center bg-[#E1BC7C]">
                    <button 
                        onClick={onClose}
                        className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 text-wine-red hover:bg-black/20 transition-colors"
                    >
                        <X size={20} />
                    </button>
                    <h2 className="text-2xl font-signora font-normal text-wine-red tracking-[0.1em]" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>Hộp Mừng Cưới</h2>
                </div>
                
                <div className="p-4 sm:p-8 overflow-y-auto max-h-[calc(90vh-80px)]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Groom */}
                        <div className="rounded-2xl p-6 flex flex-col items-center bg-[#E1BC7C]/5 border border-[#E1BC7C]/20 shadow-lg">
                    <h3 className="text-sm font-signora font-normal text-[#E1BC7C] mb-4 text-center tracking-wider">Chú Rể - Quốc Anh</h3>
                            <div className="w-40 h-40 bg-white rounded-xl p-3 shadow-inner flex items-center justify-center mb-4">
                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=VCB-874897489498" alt="QR Quốc Anh" className="w-full h-full" />
                            </div>
                            <div className="text-center mb-4">
                                <p className="text-xs font-bold text-[#E1BC7C]">Phan Quốc Anh</p>
                                <p className="text-[10px] text-[#E1BC7C]/70">Vietcombank · 874897489498</p>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E1BC7C]/10 border border-[#E1BC7C]/30 text-[10px] font-bold text-[#E1BC7C] hover:bg-[#E1BC7C]/20 transition-colors uppercase tracking-wider">
                                <Heart size={12} fill="currentColor" /> Lưu QR
                            </button>
                        </div>

                        {/* Bride */}
                        <div className="rounded-2xl p-6 flex flex-col items-center bg-[#E1BC7C]/5 border border-[#E1BC7C]/20 shadow-lg">
                    <h3 className="text-sm font-signora font-normal text-[#E1BC7C] mb-4 text-center tracking-wider">Cô Dâu - Cát Tường</h3>
                            <div className="w-40 h-40 bg-white rounded-xl p-3 shadow-inner flex items-center justify-center mb-4">
                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=VTB-8084856145" alt="QR Cát Tường" className="w-full h-full" />
                            </div>
                            <div className="text-center mb-4">
                                <p className="text-xs font-bold text-[#E1BC7C]">Lê Thị Cát Tường</p>
                                <p className="text-[10px] text-[#E1BC7C]/70">VietinBank · 8084856145</p>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E1BC7C]/10 border border-[#E1BC7C]/30 text-[10px] font-bold text-[#E1BC7C] hover:bg-[#E1BC7C]/20 transition-colors uppercase tracking-wider">
                                <Heart size={12} fill="currentColor" /> Lưu QR
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const RSVPModal = ({ isOpen, onClose, initialName }: { isOpen: boolean, onClose: () => void, initialName: string }) => {
  const [attending, setAttending] = useState<'yes' | 'no' | null>(null);
  const [rsvpName, setRsvpName] = useState(initialName);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[85vh] relative overflow-hidden"
      >
        <div className="relative px-6 pt-6 pb-4">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors"
            aria-label="Đóng"
          >
            <X size={16} />
          </button>
        </div>
        <div className="px-6 pb-6 overflow-y-auto max-h-[calc(85vh-72px)]">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Xác nhận tham dự</h2>
            <div className="text-sm font-chu text-gray-500 mb-6 leading-relaxed">
              Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi. Xin xác nhận để chúng tôi chuẩn bị chu đáo nhất cho bạn.
            </div>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tên của bạn</label>
                <input 
                  required 
                  placeholder="Nhập tên của bạn" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow placeholder:text-gray-400 bg-white text-gray-900" 
                  type="text" 
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bạn sẽ đến chứ?</label>
                <div className="space-y-2">
                  <label 
                    className={`flex items-center gap-3 py-2.5 px-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${attending === 'yes' ? 'border-gold-champagne bg-gold-champagne/5' : 'border-gray-100 bg-gray-50/50 hover:border-gray-200 hover:bg-gray-50'}`}
                    onClick={() => setAttending('yes')}
                  >
                    <input className="sr-only" type="radio" value="yes" name="attending" readOnly checked={attending === 'yes'} />
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${attending === 'yes' ? 'bg-gold-champagne' : 'bg-gray-200'}`}>
                      <Check size={16} className={attending === 'yes' ? 'text-wine-red' : 'text-gray-500'} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Tôi sẽ đến</span>
                  </label>
                  <label 
                    className={`flex items-center gap-3 py-2.5 px-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${attending === 'no' ? 'border-gold-champagne bg-gold-champagne/5' : 'border-gray-100 bg-gray-50/50 hover:border-gray-200 hover:bg-gray-50'}`}
                    onClick={() => setAttending('no')}
                  >
                    <input className="sr-only" type="radio" value="no" name="attending" readOnly checked={attending === 'no'} />
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${attending === 'no' ? 'bg-gold-champagne' : 'bg-gray-200'}`}>
                      <X size={16} className={attending === 'no' ? 'text-wine-red' : 'text-gray-500'} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Rất tiếc, tôi không thể đến</span>
                  </label>
                </div>
              </div>
              <button 
                type="submit" 
                disabled={!attending}
                className="w-full py-3.5 text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#E1BC7C', color: '#3E0001', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 4px 12px -2px' }}
              >
                Gửi xác nhận
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [isRedEnvelopeOpen, setIsRedEnvelopeOpen] = useState(false);
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [messages, setMessages] = useState<{name: string, text: string, date: string}[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    if (to) {
      setName(to);
    } else {
      setName('Anh Quân + người thương...');
    }
  }, []);

  const handleOpenInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);
    
    // Play music on open
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.log("Autoplay blocked:", err));
    }

    // Trigger reveal while explosion is still peaking for better overlap
    setTimeout(() => {
      setIsOpen(true);
    }, 1200);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessages([{ name: name || 'Ẩn danh', text: message, date: new Date().toLocaleDateString('vi-VN') }, ...messages]);
    setMessage('');
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log("Play error:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative text-gold-champagne min-h-screen overflow-x-hidden selection:bg-gold-champagne selection:text-wine-red">
      <audio 
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
        loop
        preload="auto"
      />
      {/* COVER PAGE */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            exit={{ 
              y: -1200, 
              opacity: 0,
              scale: 0.95,
              transition: { 
                duration: 1.5, 
                ease: [0.4, 0, 0.2, 1],
                opacity: { duration: 1 }
              } 
            }}
            className="fixed inset-0 z-[500] bg-wine-red flex items-center justify-center p-4 overflow-hidden"
          >
            {/* Stars Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: ['0vh', '100vh'], opacity: [0, 1, 1, 0], rotate: [0, 360] }}
                        transition={{ 
                            duration: 10 + Math.random() * 20, 
                            repeat: Infinity, 
                            delay: Math.random() * 10,
                            ease: "linear" 
                        }}
                        className="absolute text-gold-champagne text-[10px] md:text-[14px]"
                        style={{ left: `${Math.random() * 100}%` }}
                    >
                        ✦
                    </motion.div>
                ))}
            </div>

            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1 }}
               className="relative w-full max-w-sm aspect-[3/4.5] bg-red-gradient border border-gold-champagne/20 rounded-2xl shadow-2xl flex flex-col items-center justify-between py-16 px-8 text-center"
            >
               {/* Seal Top */}
               <div className="absolute top-10 left-1/2 rounded-full w-14 h-14 bg-gradient-to-br from-gold-champagne to-yellow-600 animate-seal-pulse flex items-center justify-center border-2 border-white/20">
                    <Heart size={28} fill="currentColor" className="text-wine-red" />
               </div>

               {/* Flowers for Opening Effect */}
               <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <img src={flowerImage} alt="" className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] opacity-40" />
                  <img src={flowerImage} alt="" className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[90%] opacity-40 -scale-y-100" />
                  
                  {isOpening && (
                    <>
                      <motion.img 
                        src={flowerImage} 
                        initial={{ scale: 1, opacity: 0.5, x: '-50%', y: '-50%', top: 0, left: '50%' }}
                        animate={{ scale: 6, opacity: 0, filter: 'blur(20px)' }}
                        transition={{ duration: 2 }}
                        className="absolute w-[90%]"
                      />
                      <motion.img 
                        src={flowerImage} 
                        initial={{ scale: 1, opacity: 0.5, x: '-50%', y: '50%', bottom: 0, left: '50%', scaleY: -1 }}
                        animate={{ scale: 6, opacity: 0, filter: 'blur(20px)', scaleY: -1 }}
                        transition={{ duration: 2 }}
                        className="absolute w-[90%]"
                      />
                    </>
                  )}
               </div>

               <div className="relative z-10 flex flex-col items-center gap-2 mt-8">
                  <h1 className="font-qellia text-4xl sm:text-5xl leading-tight">Quốc Anh<br/><span className="text-2xl font-baskerville">&</span><br/>Cát Tường</h1>
                  <p className="font-baskerville text-sm tracking-widest opacity-80 mt-4">30 . 05 . 2026</p>
               </div>

                <div className="relative z-10 w-full flex flex-col items-center gap-4">
                  <div className="flex flex-col items-center gap-3">
                    <span className="font-baskerville text-[10px] uppercase tracking-[0.4em] opacity-60">Thân gửi tới</span>
                    <div className="bg-[#E1BC7C]/[0.08] inline-block px-5 py-2.5 rounded-xl border border-gold-champagne/10 shadow-sm mb-2">
                       <h2 className="text-gold-champagne font-lora text-lg sm:text-xl font-semibold sm:font-medium tracking-wide">
                        {name}
                      </h2>
                    </div>
                  </div>
                  <div className="h-px w-24 bg-gold-champagne/40"></div>
                  <motion.button
                    onClick={handleOpenInvitation}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-12 py-3 bg-gold-champagne text-wine-red font-roman font-bold rounded-full overflow-hidden shadow-[0_0_15px_rgba(225,188,124,0.4)]"
                  >
                    MỞ THIỆP
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
                  </motion.button>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* GLOBAL BACKGROUNDS */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img 
          src={backgroundImage} 
          alt="" 
          className="absolute top-0 left-1/2 -translate-x-1/2 min-w-[130%] w-[130%] h-auto opacity-30 object-cover" 
        />
        <div className="absolute inset-0 bg-red-gradient opacity-80" />
      </div>

      <div className="relative z-10 w-full max-w-[480px] md:max-w-[900px] mx-auto md:border md:border-gold-champagne/13 shadow-2xl bg-wine-red/40 backdrop-blur-[2px]">
        
        {/* HEADER SECTION */}
        <header className="relative flex flex-col items-center text-center pt-[clamp(208px,43vw,358px)] pb-[83px] md:pb-[146px]">
          {/* Top Flower Decor */}
          <img 
            src={flowerImage} 
            alt="" 
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] z-1 pointer-events-none" 
          />
          
          <div className="relative z-10 flex flex-col items-center">
            <span className="font-baskerville text-[clamp(13px,2.2vw,18px)] tracking-[0.25em] opacity-85 mb-4">THE WEDDING OF</span>
            <div className="flex flex-col items-center">
              <h1 className="font-nautigal text-[clamp(57px,11.8vw,107px)] leading-[1.45]">Quốc Anh</h1>
              <span className="font-baskerville text-[clamp(29px,6vw,53px)] leading-[1.3] my-2">&</span>
              <h1 className="font-nautigal text-[clamp(57px,11.8vw,107px)] leading-[1.45]">Cát Tường</h1>
            </div>
          </div>
        </header>

        {/* TRANSITIONAL DECOR (optional, based on layout) */}

        {/* CLASSICAL FRAME CONTENT */}
        <Frame>
           <div className="flex flex-col items-center gap-10 text-center">
             
             {/* Section: Thông tin lễ cưới */}
             <div className="flex flex-col items-center gap-8 w-full">
                <h2 className="font-roman font-bold uppercase tracking-[0.04em] text-[20px] md:text-[32px]">Thông tin lễ cưới</h2>
                
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="flex flex-col gap-1">
                    <p className="text-[12px] opacity-60 font-medium">ÔNG BÀ</p>
                    <p className="font-baskerville text-[13px] md:text-[23px] font-bold">Phan Tiến Minh<br/>Vương Thị Hồng</p>
                    <p className="text-[11px] md:text-[18px] opacity-70 w-[90%] mx-auto whitespace-pre-line leading-relaxed">
                      Số 85 Nguyễn Thái Sơn, Phường 4, Gò Vấp, TP. Hồ Chí Minh
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[12px] opacity-60 font-medium">ÔNG BÀ</p>
                    <p className="font-baskerville text-[13px] md:text-[23px] font-bold">Lê Đăng Khoa<br/>Nguyễn Kim Oanh</p>
                    <p className="text-[11px] md:text-[18px] opacity-70 w-[90%] mx-auto whitespace-pre-line leading-relaxed">
                      Ngõ 95 Láng Hạ, Láng Hạ, Đống Đa, Hà Nội
                    </p>
                  </div>
                </div>

                <div className="whitespace-pre-line font-baskerville text-[14px] md:text-[26px] leading-relaxed flex flex-col gap-2 mt-4">
                  TRÂN TRỌNG BÁO TIN{"\n"}LỄ THÀNH HÔN CỦA CON CHÚNG TÔI
                </div>

                <div className="flex flex-col items-center gap-1 py-4 w-full">
                  <div className="w-full flex flex-col items-center">
                    <h3 className="font-qellia text-[clamp(28px,10vw,56px)] leading-tight text-center px-4 whitespace-nowrap">
                      Phan Quốc Anh
                    </h3>
                    <span className="text-[10px] md:text-xs uppercase tracking-[.2em] mt-1">ÚT NAM</span>
                  </div>
                  <span className="font-baskerville text-[clamp(20px,6vw,32px)] my-2">&</span>
                  <div className="w-full flex flex-col items-center">
                    <h3 className="font-qellia text-[clamp(28px,10vw,56px)] leading-tight text-center px-4 whitespace-nowrap">
                      Lê Thị Cát Tường
                    </h3>
                    <span className="text-[10px] md:text-xs uppercase tracking-[.2em] mt-1">ÚT NỮ</span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 font-baskerville pt-4">
                   <p className="text-[13px] md:text-[18px] tracking-wide">LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI TƯ GIA</p>
                   <p className="text-[12px] md:text-[18px] uppercase tracking-widest opacity-60">Vào lúc</p>
                   <p className="text-[20px] md:text-[30px] font-bold">09:00</p>
                   <div className="flex items-center gap-4 py-2">
                       <span className="text-[12px] md:text-[16px] flex-1 text-right">CHỦ NHẬT</span>
                       <span className="text-[20px] md:text-[28px] opacity-50 font-light">|</span>
                       <span className="text-[30px] md:text-[40px] font-bold">01</span>
                       <span className="text-[20px] md:text-[28px] opacity-50 font-light">|</span>
                       <span className="text-[12px] md:text-[16px] flex-1 text-left">THÁNG 02</span>
                   </div>
                   <p className="text-[18px] md:text-[24px] font-bold">2026</p>
                   <p className="text-[10px] md:text-[12px] uppercase tracking-[0.25em] opacity-60">(Tức ngày 14/12 năm Ất Tỵ)</p>
                </div>
             </div>

             <div className="w-full h-px bg-gold-champagne/10 my-6"></div>

             {/* Section: Album Ảnh Cưới */}
             <div className="flex flex-col items-center gap-6 w-full">
                <h2 className="font-roman font-bold uppercase tracking-[0.04em] text-[20px] md:text-[24px]">Album Ảnh Cưới</h2>
                <div className="grid grid-cols-2 gap-3 md:gap-4 w-full max-w-[400px]">
                   {ALBUM_IMAGES.slice(0, 4).map((src, i) => (
                     <div 
                        key={i} 
                        onClick={() => setActiveImage(i)}
                        className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl border border-gold-champagne/20 bg-gold-champagne/5"
                     >
                        <img src={src} alt="Album" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
                        {i === 3 && (
                            <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center">
                                <span className="text-white text-xl font-semibold">+6</span>
                            </div>
                        )}
                     </div>
                   ))}
                </div>
             </div>

             <div className="w-full h-px bg-gold-champagne/10 my-6"></div>

             {/* Section: Thông tin tiệc cưới */}
             <div className="flex flex-col items-center gap-8 w-full">
                <h2 className="font-roman font-bold uppercase tracking-[0.04em] text-[20px] md:text-[24px]">Thông tin tiệc cưới</h2>
                <div className="flex flex-col items-center gap-4">
                    <p className="font-roman font-bold uppercase text-lg italic opacity-80">Tiệc cưới sẽ diễn ra vào lúc:</p>
                    <p className="text-[20px] md:text-[30px] font-bold">11:00</p>
                    <div className="flex items-center gap-6 font-baskerville">
                        <span className="text-[12px] md:text-[16px] flex-1 text-right">THỨ BẢY</span>
                        <div className="w-[2px] h-6 bg-gold-champagne"></div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-[30px] md:text-[40px] leading-none font-bold">30</span>
                            <span className="text-[10px] md:text-[12px] uppercase opacity-70">Tháng 05</span>
                        </div>
                        <div className="w-[2px] h-6 bg-gold-champagne"></div>
                        <span className="text-[18px] md:text-[24px] font-bold">2026</span>
                    </div>
                    <p className="text-[10px] md:text-[12px] uppercase tracking-[0.2em] opacity-60">(Tức ngày 14/04 năm Bính Ngọ)</p>
                </div>

                <div className="flex items-center gap-8 sm:gap-16 pt-2">
                    <div className="flex flex-col items-center">
                        <p className="text-[10px] uppercase opacity-60 font-medium mb-1">ĐÓN KHÁCH</p>
                        <p className="text-xl md:text-2xl font-bold">10:30</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-[10px] uppercase opacity-60 font-medium mb-1">KHAI TIỆC</p>
                        <p className="text-xl md:text-2xl font-bold">11:00</p>
                    </div>
                </div>

                <Countdown />

                <CalendarMay />

                <a 
                    href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Đám+cưới+Quốc+Anh+và+Cát+Tường&dates=20260530T103000Z/20260530T140000Z&details=Tiệc+cưới+tổ+chức+tại+Trống+Đồng+Cảnh+Hồ&location=Trống+Đồng+Cảnh+Hồ,+173+Trường+Chinh,+Hà+Nội"
                    target="_blank"
                    className="font-baskerville text-sm underline opacity-80 hover:opacity-100 transition-opacity"
                >
                    Thêm vào lịch
                </a>

                <button 
                  onClick={() => setIsRSVPModalOpen(true)}
                  className="bg-[#E1BC7C] text-[#3E0001] rounded-full px-8 py-2.5 font-roman font-bold text-sm sm:text-base hover:scale-[1.03] active:scale-[0.95] transition-all shadow-[0_4px_12px_-2px_rgba(0,0,0,0.2)] tracking-wider"
                >
                   XÁC NHẬN THAM DỰ
                </button>
             </div>
           </div>
        </Frame>

        <RSVPModal isOpen={isRSVPModalOpen} onClose={() => setIsRSVPModalOpen(false)} initialName={name} />

        {/* Music Toggle Button */}
        {isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={toggleMusic}
            className="fixed bottom-6 right-6 z-[650] w-14 h-14 rounded-full bg-wine-red/80 backdrop-blur-md border border-gold-champagne/40 flex items-center justify-center text-gold-champagne shadow-[0_4px_15px_rgba(0,0,0,0.5)] group overflow-hidden"
          >
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <Music size={28} className={isPlaying ? 'opacity-100' : 'opacity-40'} />
            </motion.div>
            {!isPlaying && (
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                className="absolute w-10 h-0.5 bg-red-600 rotate-45 origin-center" 
              />
            )}
            
            {/* Pulsing effect when playing */}
            {isPlaying && (
              <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-gold-champagne/20"
              />
            )}
          </motion.button>
        )}

        {/* SECTION: ĐỊA ĐIỂM */}
        <section className="relative z-10 px-6 md:px-10 py-10 flex flex-col items-center text-center gap-4">
             <h2 className="font-roman font-bold uppercase text-[20px] md:text-[24px]">Tiệc cưới sẽ tổ chức tại</h2>
             <a 
                href="https://www.google.com/maps/search/?api=1&query=20.999571122176352,105.83075952485943"
                target="_blank"
                rel="noreferrer"
                className="font-baskerville text-sm md:text-base opacity-85 max-w-xs md:max-w-md mx-auto hover:text-gold-champagne transition-colors"
             >
                Tiệc cưới Trống Đồng Cảnh Hồ<br/>
                173 Trường Chinh, Quận Thanh Xuân, Hà Nội
             </a>
             <a 
                href="https://www.google.com/maps/search/?api=1&query=20.999571122176352,105.83075952485943"
                target="_blank"
                rel="noreferrer"
                className="w-full max-w-[300px] md:max-w-[480px] aspect-[1/1] sm:aspect-video rounded-2xl overflow-hidden border border-gold-champagne/20 shadow-xl block group"
             >
                <div className="w-full h-full relative">
                  <iframe 
                      src="https://maps.google.com/maps?q=20.999571122176352,105.83075952485943&hl=vi&z=16&output=embed" 
                      className="w-full h-full pointer-events-none"
                      loading="lazy"
                  ></iframe>
                  <div className="absolute inset-0 bg-gold-champagne/5 group-hover:bg-transparent transition-colors flex items-center justify-center">
                    <span className="bg-wine-red/80 px-4 py-2 rounded-full text-xs font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">XEM BẢN ĐỒ</span>
                  </div>
                </div>
             </a>
        </section>

        {/* SECTION: LỊCH TRÌNH */}
        <section className="relative z-10 px-6 md:px-10 pb-12 flex flex-col items-center">
             <h2 className="font-signora font-normal uppercase text-[28px] md:text-[34px] mb-8 tracking-wider">LỊCH TRÌNH NGÀY CƯỚI</h2>
             <div className="w-full max-w-[320px] md:max-w-[400px]">
                <ol className="relative flex flex-col gap-0">
                   {TIMELINE_DATA.map((item, i) => (
                     <li key={i} className="grid grid-cols-[1fr_40px_1.5fr] items-start pb-8 last:pb-4">
                        <div className="text-right pr-4 pt-0.5">
                            <span className="font-helvetica-light text-base md:text-lg tabular-nums tracking-wide">{item.time}</span>
                        </div>
                        <div className="relative flex flex-col items-center justify-center p-1.5 h-full">
                           <div className="w-2.5 h-2.5 rounded-full bg-gold-champagne relative z-10 shadow-[0_0_8px_#E1BC7C]"></div>
                           {i < TIMELINE_DATA.length - 1 && (
                               <div className="absolute top-1/2 bottom-[-2rem] w-px bg-gold-champagne/30 left-1/2 -translate-x-1/2 h-[calc(100%+2rem)]"></div>
                           )}
                           {i === TIMELINE_DATA.length - 1 && (
                               <div className="absolute top-1/2 bottom-1/2 w-px bg-gold-champagne/30 left-1/2 -translate-x-1/2"></div>
                           )}
                        </div>
                        <div className="pl-4 pt-0">
                           <span className="font-chu text-lg md:text-xl font-medium tracking-wide">{item.event}</span>
                        </div>
                     </li>
                   ))}
                </ol>
             </div>
        </section>

        {/* SECTION: SỔ LƯU BÚT */}
        <section className="relative z-10 px-6 md:px-10 py-12 bg-wine-red/20 backdrop-blur-sm">
             <h2 className="font-signora font-normal uppercase text-[24px] md:text-[32px] mb-8 text-center tracking-widest">Sổ lưu bút</h2>
             <div className="w-full max-w-[600px] mx-auto flex flex-col gap-4">
                 <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập tên của bạn*" 
                    className="w-full bg-wine-red/80 border border-gold-champagne/30 rounded-lg px-4 py-3 placeholder:text-gold-champagne/30 focus:outline-none focus:border-gold-champagne/60 transition-colors"
                  />
                  <textarea 
                     rows={4} 
                     value={message}
                     onChange={(e) => setMessage(e.target.value)}
                     placeholder="Nhập lời chúc của bạn*" 
                     className="w-full bg-wine-red/80 border border-gold-champagne/30 rounded-lg px-4 py-3 placeholder:text-gold-champagne/30 focus:outline-none focus:border-gold-champagne/60 transition-colors resize-none"
                  />
                  <button 
                     onClick={handleSendMessage}
                     className="bg-gold-champagne text-wine-red rounded-full py-3 px-8 font-signora font-normal text-xl tracking-wider hover:scale-[1.05] transition-transform self-center shadow-lg"
                  >
                     GỬI LỜI CHÚC
                  </button>

                 <div className="mt-8 max-h-[400px] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-gold-champagne/20">
                     {messages.length === 0 ? (
                        <p className="text-center italic opacity-40 py-10">Chưa có lời chúc nào. Hãy là người đầu tiên!</p>
                     ) : (
                        messages.map((msg, i) => (
                            <div key={i} className="p-4 bg-white/5 rounded-xl border border-gold-champagne/10">
                                <p className="font-bold text-sm mb-1">{msg.name}</p>
                                <p className="opacity-80 text-sm italic">{msg.text}</p>
                                <p className="text-[10px] opacity-40 text-right mt-2">{msg.date}</p>
                            </div>
                        ))
                     )}
                 </div>
             </div>
        </section>

        {/* SECTION: HỘP MỪNG CƯỚI (RED ENVELOPE) */}
        <section className="relative z-10 py-12 flex flex-col items-center">
            <h2 className="font-baskerville text-2xl font-bold mb-8 text-[#E1BC7C]">Hộp Mừng Cưới</h2>
            <button 
                onClick={() => setIsRedEnvelopeOpen(true)}
                className="group relative cursor-pointer outline-none border-none bg-transparent w-[160px] h-[208px] sm:w-[200px] sm:h-[256px]"
                aria-label="Mở hộp mừng cưới"
            >
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* Animated Coins */}
                    {[
                        { size: 30.8, top: '5%', right: '5%', delay: 0 },
                        { size: 25.2, top: '20%', left: '0%', delay: 0.2 },
                        { size: 28, bottom: '20%', right: '0%', delay: 0.4 },
                        { size: 22.4, bottom: '8%', left: '8%', delay: 0.6 },
                        { size: 21, top: '45%', right: '-5%', delay: 0.8 }
                    ].map((coin, i) => (
                        <motion.div
                            key={i}
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, delay: coin.delay, ease: "easeInOut" }}
                            className="absolute rounded-full"
                            style={{ 
                                width: coin.size, 
                                height: coin.size, 
                                top: coin.top, 
                                bottom: coin.bottom, 
                                left: coin.left, 
                                right: coin.right,
                                background: '#FBBF24',
                                border: '2px solid #F59E0B',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                            }}
                        >
                            <div className="absolute inset-[2px] rounded-full border-2 border-[#FDE047]"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] border-2 border-[#D97706] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]"></div>
                        </motion.div>
                    ))}

                    {/* Sparkles */}
                    {[{t: '8%', l: '20%', s: 14}, {b: '35%', r: '8%', s: 11.2}, {t: '40%', l: '3%', s: 8.4}].map((s, i) => (
                        <motion.span 
                            key={i}
                            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                            className="absolute text-white" 
                            style={{ top: s.t, bottom: s.b, left: s.l, right: s.r, fontSize: s.s }}
                        >
                            ✦
                        </motion.span>
                    ))}

                    {/* Envelope Body */}
                    <div className="relative" style={{ width: '140px', height: '196px' }}>
                        <div className="absolute inset-0 translate-x-[2px] translate-y-[3px] bg-[#5C1612] rounded-lg"></div>
                        <div className="absolute inset-x-0 inset-y-0 translate-x-[3px] bg-[#6B1D18] rounded-lg"></div>
                        <div className="absolute inset-0 rounded-lg overflow-hidden bg-[#B91C1C] shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                            <div 
                                className="absolute inset-0 opacity-20"
                                style={{
                                    backgroundImage: 'repeating-radial-gradient(circle at 0px 0px, transparent 0px, transparent 11.2px, #7F1D1D 11.2px, #7F1D1D 11.9px)',
                                    backgroundSize: '21px 21px',
                                    backgroundPosition: '10.5px 10.5px'
                                }}
                            ></div>
                            <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#FBBF24]"></div>
                            
                            {/* Seal */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center shadow-lg" style={{ width: '63px', height: '63px', background: 'radial-gradient(circle, #FBBF24 0%, #D97706 100%)', border: '3px solid #FEF3C7' }}>
                                <span className="font-bold" style={{ fontSize: '30.8px', color: '#B91C1C', lineHeight: 1, textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>囍</span>
                            </div>

                            {/* Corner Ornaments */}
                            {[0, 90, -90, 180].map((rot, i) => (
                                <svg 
                                    key={i}
                                    className={`absolute ${i === 0 ? 'top-2 left-2' : i === 1 ? 'top-2 right-2' : i === 2 ? 'bottom-2 left-2' : 'bottom-2 right-2'}`} 
                                    width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2" style={{ transform: `rotate(${rot}deg)` }}
                                >
                                    <path d="M2 2 L2 16 L6 16 L6 6 L16 6 L16 2 Z" opacity="0.85" strokeLinecap="square" strokeLinejoin="miter"></path>
                                    <path d="M6 10 L10 10 L10 6" opacity="0.85" strokeLinecap="square"></path>
                                </svg>
                            ))}
                        </div>
                    </div>
                </div>
                <p className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap font-medium text-[#E1BC7C] animate-bounce">Nhấn để mở</p>
            </button>
        </section>

        {/* FOOTER */}
        <footer className="relative z-10 py-16 px-6 text-center border-t border-gold-champagne/13">
            <p className="font-chu italic text-xl md:text-2xl leading-relaxed mb-12 whitespace-pre-line text-gold-champagne/90">
                Gia đình xin chân thành cảm ơn quý khách{"\n"}đã đến chung vui.
             </p>
             <div className="text-center opacity-40">
                <a href="#" className="font-baskerville text-xs hover:opacity-100 transition-opacity">♡ chungdoi.com</a>
             </div>
        </footer>
      </div>

      </motion.div>

      {/* LIGHTBOX & MODALS */}
      <AnimatePresence>
        {activeImage !== null && (
          <div className="fixed inset-0 z-[300] bg-black/90 flex flex-col items-center">
            <button 
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 text-white z-[301] p-2 hover:bg-white/10 rounded-full"
            >
                <X size={32} />
            </button>
            
            <div className="relative flex-1 w-full flex items-center justify-center px-4 pt-16 pb-20">
                <button 
                    onClick={(e) => { e.stopPropagation(); setActiveImage(activeImage === 0 ? ALBUM_IMAGES.length - 1 : activeImage - 1); }}
                    className="absolute left-4 text-white hover:scale-110 transition-transform"
                >
                    <ChevronLeft size={48} />
                </button>
                <img 
                    src={ALBUM_IMAGES[activeImage]} 
                    alt="Album Detail" 
                    className="max-h-full max-w-full object-contain shadow-2xl"
                />
                <button 
                    onClick={(e) => { e.stopPropagation(); setActiveImage((activeImage + 1) % ALBUM_IMAGES.length); }}
                    className="absolute right-4 text-white hover:scale-110 transition-transform"
                >
                    <ChevronRight size={48} />
                </button>

                <div className="absolute top-6 left-6 px-3 py-1 bg-black/40 rounded-full text-sm font-medium text-white">
                    {activeImage + 1} / {ALBUM_IMAGES.length}
                </div>
            </div>

            <div className="absolute bottom-4 left-0 right-0 px-4">
                <div className="flex gap-2 justify-center overflow-x-auto py-2">
                    {ALBUM_IMAGES.map((src, i) => (
                        <div 
                            key={i} 
                            onClick={() => setActiveImage(i)}
                            className={`w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${activeImage === i ? 'border-gold-champagne scale-110' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        >
                            <img src={src} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <RedEnvelopeModal isOpen={isRedEnvelopeOpen} onClose={() => setIsRedEnvelopeOpen(false)} />

    </div>
  );
}
