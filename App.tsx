
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { 
  Cpu, 
  BookOpen, 
  Search, 
  Moon, 
  Sun, 
  Github, 
  ExternalLink, 
  ShieldCheck, 
  Settings, 
  Code, 
  Layers, 
  Globe, 
  X,
  RotateCcw,
  Check,
  Bot,
  Play,
  Pause,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Info,
  Palette
} from 'lucide-react';
import { RESOURCES, ROADMAP, TOP_COMPARISON } from './constants';
import { Resource, Difficulty, ResourceCategory } from './types';
import { TRANSLATIONS, Language } from './translations';

type Theme = 'light' | 'dark' | 'colorful';

// --- Components ---

const RobotSandbox: React.FC<{ t: any }> = ({ t }) => {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [isPaused, setIsPaused] = useState(false);
  const sandboxRef = useRef<HTMLDivElement>(null);
  const step = 5;

  const move = useCallback((dir: 'U' | 'D' | 'L' | 'R') => {
    if (isPaused) return;
    setPos(prev => {
      let { x, y } = prev;
      if (dir === 'U') y = Math.max(5, y - step);
      if (dir === 'D') y = Math.min(95, y + step);
      if (dir === 'L') x = Math.max(5, x - step);
      if (dir === 'R') x = Math.min(95, x + step);
      return { x, y };
    });
  }, [isPaused]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['w', 'W', 'ArrowUp'].includes(e.key)) move('U');
      if (['s', 'S', 'ArrowDown'].includes(e.key)) move('D');
      if (['a', 'A', 'ArrowLeft'].includes(e.key)) move('L');
      if (['d', 'D', 'ArrowRight'].includes(e.key)) move('R');
      if (e.key === ' ') {
        e.preventDefault();
        setIsPaused(p => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  const reset = () => setPos({ x: 50, y: 50 });

  return (
    <div className="my-16 glass rounded-3xl overflow-hidden shadow-2xl border border-white/10">
      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black flex items-center gap-2">
            <Bot className="text-primary" />
            {t.dir === 'rtl' ? 'מעבדת הרובוטיקה' : 'Robotics Sandbox'}
          </h2>
          <p className="text-sm opacity-60">
            {t.dir === 'rtl' ? 'שלטו ברובוט בעזרת WASD או החיצים' : 'Control using WASD or Arrows'}
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsPaused(!isPaused)} 
            className="p-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            title={isPaused ? "Play" : "Pause"}
          >
            {isPaused ? <Play className="w-5 h-5 text-secondary fill-secondary" /> : <Pause className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
          </button>
          <button 
            onClick={reset} 
            className="p-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            title="Reset position"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative h-96 bg-black/5 dark:bg-black/40 p-4 overflow-hidden" ref={sandboxRef}>
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, #3B82F6 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div 
          className="absolute transition-all duration-200 ease-out flex flex-col items-center"
          style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div className={`p-4 rounded-2xl bg-primary shadow-2xl shadow-primary/50 ${isPaused ? 'opacity-50' : 'animate-pulse-soft'}`}>
            <Bot className="text-white w-10 h-10" />
          </div>
          <div className="mt-3 text-[10px] font-bold bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-gray-200 dark:border-slate-700 uppercase shadow-sm">
            R-UNIT 2026
          </div>
        </div>

        {/* Mobile Controls (WASD for mobile) */}
        <div className="absolute bottom-6 right-6 flex flex-col items-center gap-2 md:hidden">
          <button onPointerDown={(e) => { e.preventDefault(); move('U'); }} className="p-4 bg-white/20 dark:bg-slate-800/60 rounded-2xl backdrop-blur-md active:bg-primary active:scale-95 transition-all shadow-lg border border-white/20"><ChevronUp /></button>
          <div className="flex gap-2">
            <button onPointerDown={(e) => { e.preventDefault(); move('L'); }} className="p-4 bg-white/20 dark:bg-slate-800/60 rounded-2xl backdrop-blur-md active:bg-primary active:scale-95 transition-all shadow-lg border border-white/20"><ChevronLeft /></button>
            <button onPointerDown={(e) => { e.preventDefault(); move('D'); }} className="p-4 bg-white/20 dark:bg-slate-800/60 rounded-2xl backdrop-blur-md active:bg-primary active:scale-95 transition-all shadow-lg border border-white/20"><ChevronDown /></button>
            <button onPointerDown={(e) => { e.preventDefault(); move('R'); }} className="p-4 bg-white/20 dark:bg-slate-800/60 rounded-2xl backdrop-blur-md active:bg-primary active:scale-95 transition-all shadow-lg border border-white/20"><ChevronRight /></button>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-black/5 dark:bg-black/20 flex items-center gap-3 text-xs opacity-70">
        <Info className="w-4 h-4 text-primary shrink-0" />
        {t.dir === 'rtl' 
          ? 'בקרת זמן אמת: הלב הפועם של כל מערכת רובוטית מתקדמת.' 
          : 'Real-time control: The beating heart of any advanced robotic system.'}
      </div>
    </div>
  );
};

const Navbar: React.FC<{ 
  theme: Theme, 
  toggleTheme: () => void,
  language: Language,
  setLanguage: (lang: Language) => void,
  t: any
}> = ({ theme, toggleTheme, language, setLanguage, t }) => {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10 px-6 py-4 flex justify-between items-center transition-all">
      <div className="flex items-center gap-3">
        <div className="bg-primary p-2 rounded-lg shadow-lg shadow-primary/20">
          <Cpu className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-black tracking-tighter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {t.title}
        </h1>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative group">
          <button className="flex items-center gap-2 p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            <Globe className="w-5 h-5 opacity-70" />
            <span className="hidden md:inline text-xs font-black uppercase tracking-widest">{language}</span>
          </button>
          <div className="absolute top-full left-0 md:right-0 md:left-auto mt-2 w-48 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
            {['en', 'he', 'zh', 'hi', 'de', 'es', 'fr'].map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang as Language)}
                className={`w-full text-left md:text-right px-6 py-3 text-sm hover:bg-primary/10 transition-colors ${language === lang ? 'text-primary font-black bg-primary/5' : ''}`}
              >
                {lang === 'he' ? 'עברית' : lang === 'en' ? 'English' : lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all flex items-center gap-2 border border-transparent hover:border-white/10"
          title="Switch Theme"
        >
          {theme === 'dark' ? <Moon className="w-5 h-5 text-indigo-400" /> : 
           theme === 'light' ? <Sun className="w-5 h-5 text-yellow-500" /> : 
           <Palette className="w-5 h-5 text-pink-500" />}
          <span className="hidden lg:inline text-[10px] font-black uppercase opacity-60">{theme}</span>
        </button>

        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
          <Github className="w-5 h-5 opacity-70" />
        </a>
      </div>
    </nav>
  );
};

const ResourceCard: React.FC<{ resource: Resource, t: any, theme: Theme }> = ({ resource, t, theme }) => {
  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case Difficulty.Beginner: return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case Difficulty.Intermediate: return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case Difficulty.Advanced: return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    }
  };

  const cardStyle = theme === 'colorful' ? 'colorful-card' : 'bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800';

  return (
    <div className={`group ${cardStyle} rounded-3xl p-8 transition-all hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full shadow-lg shadow-black/5`}>
      <div className="flex justify-between items-start mb-6">
        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getDifficultyColor(resource.difficulty)}`}>
          {t.diffs[resource.difficulty]}
        </span>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-[0.2em]">
            {t.cats[resource.category]}
          </span>
          {resource.isCommercial && (
            <span className="text-[10px] text-secondary font-black flex items-center gap-1 mt-2">
              <ShieldCheck className="w-3 h-3" /> INDUSTRIAL
            </span>
          )}
        </div>
      </div>
      <h3 className="text-2xl font-black mb-3 group-hover:text-primary transition-colors">{resource.name}</h3>
      <p className="opacity-70 text-sm mb-8 leading-relaxed flex-grow">
        {resource.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-8">
        {resource.tags.map(tag => (
          <span key={tag} className="text-[10px] px-3 py-1 rounded-lg bg-black/5 dark:bg-white/5 opacity-60 font-bold">
            #{tag}
          </span>
        ))}
      </div>
      <a 
        href={resource.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 text-primary font-black hover:gap-5 transition-all group/link"
      >
        EXPLORE NOW <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
};

const ComparisonTable: React.FC<{ t: any, theme: Theme }> = ({ t, theme }) => {
  const tableBg = theme === 'colorful' ? 'bg-white/10' : 'bg-white dark:bg-slate-900';
  return (
    <div className="my-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black mb-4 tracking-tighter">{t.comparison_title}</h2>
        <p className="opacity-60 max-w-2xl mx-auto">{t.comparison_desc}</p>
      </div>
      
      <div className={`overflow-x-auto rounded-[2rem] border border-white/10 shadow-2xl ${tableBg}`}>
        <table className="w-full text-sm text-left rtl:text-right border-collapse">
          <thead className="bg-black/5 dark:bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
            <tr>
              <th className="px-8 py-6">{t.table_name}</th>
              <th className="px-8 py-6">{t.table_usecase}</th>
              <th className="px-8 py-6">{t.table_difficulty}</th>
              <th className="px-8 py-6">{t.table_standard}</th>
              <th className="px-8 py-6">{t.table_license}</th>
              <th className="px-8 py-6">{t.table_language}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {TOP_COMPARISON.map((entry, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition-colors">
                <td className="px-8 py-6 font-black text-primary">{entry.name}</td>
                <td className="px-8 py-6 opacity-70">{entry.useCase}</td>
                <td className="px-8 py-6">
                   <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase">
                    {t.diffs[entry.difficulty]}
                   </span>
                </td>
                <td className="px-8 py-6 font-bold">{entry.industryStandard}</td>
                <td className="px-8 py-6 font-mono text-xs opacity-60">{entry.license}</td>
                <td className="px-8 py-6 text-secondary font-black">{entry.language}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const RoadmapSection: React.FC<{ t: any }> = ({ t }) => {
  return (
    <div className="my-24">
      <div className="text-center mb-20">
        <h2 className="text-4xl font-black mb-4 tracking-tighter">{t.roadmap_title}</h2>
        <p className="opacity-60 max-w-2xl mx-auto">{t.roadmap_desc}</p>
      </div>

      <div className="relative">
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent -translate-x-1/2 hidden md:block opacity-20"></div>
        
        <div className="space-y-16">
          {ROADMAP.map((step, idx) => (
            <div key={idx} className={`relative flex flex-col md:flex-row items-start md:items-center gap-10 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className="flex-1 w-full">
                <div className={`p-10 glass rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all border border-white/10 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <span className="text-primary font-black text-xs uppercase tracking-[0.2em] mb-4 block">{t.step} {idx + 1}</span>
                  <h3 className="text-2xl font-black mb-4">{step.title}</h3>
                  <p className="opacity-60 text-sm leading-relaxed mb-6">{step.description}</p>
                  <div className={`flex flex-wrap gap-3 ${idx % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                    {step.tools.map(tool => (
                      <span key={tool} className="px-4 py-1.5 bg-white/5 rounded-xl text-[10px] font-black uppercase border border-white/5 opacity-80">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="absolute left-8 md:static md:left-auto -translate-x-1/2 md:translate-x-0 z-10">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black text-2xl shadow-2xl shadow-primary/40 border-8 border-white dark:border-slate-950">
                  {idx + 1}
                </div>
              </div>
              
              <div className="flex-1 hidden md:block"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- App Root ---

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'dark';
  });
  const [language, setLanguage] = useState<Language>('he');
  const [search, setSearch] = useState('');
  
  const [selectedCategories, setSelectedCategories] = useState<ResourceCategory[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<Difficulty[]>([]);
  const [commercialFilter, setCommercialFilter] = useState<'All' | 'Commercial' | 'OpenSource'>('All');

  const t = useMemo(() => TRANSLATIONS[language], [language]);

  useEffect(() => {
    document.documentElement.className = '';
    if (theme === 'dark') document.documentElement.classList.add('dark');
    if (theme === 'colorful') document.documentElement.classList.add('colorful');
    localStorage.setItem('theme', theme);
    document.documentElement.dir = t.dir || 'ltr';
    document.documentElement.lang = language;
  }, [theme, language, t]);

  const filteredResources = useMemo(() => {
    return RESOURCES.filter(res => {
      const matchesSearch = res.name.toLowerCase().includes(search.toLowerCase()) || 
                          res.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(res.category);
      const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.includes(res.difficulty);
      const matchesCommercial = commercialFilter === 'All' || 
                               (commercialFilter === 'Commercial' && res.isCommercial) ||
                               (commercialFilter === 'OpenSource' && !res.isCommercial);
      return matchesSearch && matchesCategory && matchesDifficulty && matchesCommercial;
    });
  }, [search, selectedCategories, selectedDifficulties, commercialFilter]);

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'colorful';
      return 'light';
    });
  };

  const toggleCategory = (cat: ResourceCategory) => {
    setSelectedCategories(p => p.includes(cat) ? p.filter(c => c !== cat) : [...p, cat]);
  };

  const toggleDifficulty = (diff: Difficulty) => {
    setSelectedDifficulties(p => p.includes(diff) ? p.filter(d => d !== diff) : [...p, diff]);
  };

  const clearAllFilters = () => {
    setSearch('');
    setSelectedCategories([]);
    setSelectedDifficulties([]);
    setCommercialFilter('All');
  };

  const hasActiveFilters = search !== '' || selectedCategories.length > 0 || selectedDifficulties.length > 0 || commercialFilter !== 'All';

  return (
    <div className="min-h-screen selection:bg-primary selection:text-white">
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        language={language}
        setLanguage={setLanguage}
        t={t}
      />
      
      <header className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary rounded-full blur-[160px] animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 rounded-full text-xs font-black tracking-widest uppercase mb-10 border border-primary/20">
            <ShieldCheck className="w-4 h-4" />
            {t.all_needs}
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-10 leading-[0.9] tracking-tighter">
            {t.tagline.split('.')[0]} <br />
            <span className="text-primary">{t.tagline.split('.')[1] || ''}</span>
          </h1>
          <p className="text-xl opacity-60 max-w-3xl mx-auto mb-16 leading-relaxed">
            {t.hero_description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-2xl font-black shadow-2xl shadow-primary/40 transition-all hover:scale-105 flex items-center justify-center gap-3 group">
              <BookOpen className="w-6 h-6 group-hover:rotate-12 transition-transform" /> {t.start_learning}
            </button>
            <button className="w-full sm:w-auto glass px-10 py-5 rounded-2xl font-black border border-white/20 hover:bg-white/20 transition-all hover:scale-105">
              {t.view_projects}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 pb-32">
        <RobotSandbox t={t} />

        {/* Filter Toolbar */}
        <div className="glass p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-10 mb-20">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            <div className="relative w-full lg:w-3/5">
              <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-primary w-6 h-6" />
              <input 
                type="text" 
                placeholder={t.search_placeholder}
                className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-primary/50 rounded-2xl pr-14 pl-6 py-4 outline-none transition-all font-bold"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            {hasActiveFilters && (
              <button 
                onClick={clearAllFilters}
                className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors bg-red-500/10 px-6 py-3 rounded-xl border border-red-500/20"
              >
                <RotateCcw className="w-4 h-4" />
                {t.clear_filters}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-5">
              <span className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em]">{t.filter_all}</span>
              <div className="flex flex-wrap gap-3">
                {Object.values(ResourceCategory).map(cat => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all border ${
                      selectedCategories.includes(cat) 
                      ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-primary/50'
                    }`}
                  >
                    {t.cats[cat]}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <span className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em]">{t.filter_difficulty}</span>
              <div className="flex flex-wrap gap-3">
                {Object.values(Difficulty).map(diff => (
                  <button
                    key={diff}
                    onClick={() => toggleDifficulty(diff)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all border ${
                      selectedDifficulties.includes(diff) 
                      ? 'bg-secondary border-secondary text-white shadow-lg shadow-secondary/20' 
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-secondary/50'
                    }`}
                  >
                    {t.diffs[diff]}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <span className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em]">{t.filter_commercial}</span>
              <div className="flex bg-black/10 dark:bg-white/5 p-1.5 rounded-2xl border border-white/5">
                {[
                  { value: 'All', label: t.filter_all },
                  { value: 'Commercial', label: t.commercial_only },
                  { value: 'OpenSource', label: t.open_source_only }
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setCommercialFilter(opt.value as any)}
                    className={`flex-1 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${
                      commercialFilter === opt.value 
                      ? 'bg-white dark:bg-slate-700 text-primary shadow-xl' 
                      : 'text-gray-500 hover:text-gray-400'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredResources.map(res => (
            <ResourceCard key={res.id} resource={res} t={t} theme={theme} />
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-32 flex flex-col items-center">
            <div className="bg-white/5 p-10 rounded-full mb-8 border border-white/10">
              <X className="w-16 h-16 text-gray-500" />
            </div>
            <p className="text-gray-500 text-2xl font-bold">{t.no_results}</p>
            <button onClick={clearAllFilters} className="mt-6 text-primary font-black uppercase tracking-widest hover:underline">
              {t.reset_all}
            </button>
          </div>
        )}

        <ComparisonTable t={t} theme={theme} />
        <RoadmapSection t={t} />
      </main>

      {/* Footer */}
      <footer className="glass border-t border-white/10 py-20 mt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-4">
              <div className="bg-primary p-2 rounded-xl">
                <Cpu className="text-white w-5 h-5" />
              </div>
              <span className="font-black text-2xl tracking-tighter">{t.title}</span>
            </div>
            
            <div className="text-center space-y-4">
              <p className="opacity-50 text-sm font-bold">(C) Noam Gold AI 2026</p>
              <div className="flex items-center justify-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/5">
                <span className="text-xs font-black uppercase opacity-40">Send Feedback</span>
                <a href="mailto:goldnoamai@gmail.com" className="text-primary hover:text-secondary transition-colors font-black text-sm">goldnoamai@gmail.com</a>
              </div>
            </div>

            <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">About</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
