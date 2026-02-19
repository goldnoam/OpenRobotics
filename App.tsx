
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
  Info
} from 'lucide-react';
import { RESOURCES, ROADMAP, TOP_COMPARISON } from './constants';
import { Resource, Difficulty, ResourceCategory } from './types';
import { TRANSLATIONS, Language } from './translations';

// --- Components ---

// Fix: Implemented the missing RobotSandbox component with WASD and mobile controls
const RobotSandbox: React.FC<{ t: any }> = ({ t }) => {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [isPaused, setIsPaused] = useState(false);
  const sandboxRef = useRef<HTMLDivElement>(null);
  const step = 5;

  const move = useCallback((dir: 'U' | 'D' | 'L' | 'R') => {
    if (isPaused) return;
    setPos(prev => {
      let { x, y } = prev;
      if (dir === 'U') y = Math.max(0, y - step);
      if (dir === 'D') y = Math.min(100, y + step);
      if (dir === 'L') x = Math.max(0, x - step);
      if (dir === 'R') x = Math.min(100, x + step);
      return { x, y };
    });
  }, [isPaused]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['w', 'W', 'ArrowUp'].includes(e.key)) move('U');
      if (['s', 'S', 'ArrowDown'].includes(e.key)) move('D');
      if (['a', 'A', 'ArrowLeft'].includes(e.key)) move('L');
      if (['d', 'D', 'ArrowRight'].includes(e.key)) move('R');
      if (e.key === ' ') setIsPaused(p => !p);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  const reset = () => setPos({ x: 50, y: 50 });

  return (
    <div className="my-16 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl">
      <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black flex items-center gap-2">
            <Bot className="text-primary" />
            {t.dir === 'rtl' ? 'מעבדת הרובוטיקה' : 'Robotics Sandbox'}
          </h2>
          <p className="text-sm text-gray-500">{t.dir === 'rtl' ? 'שלטו ברובוט בעזרת WASD או החיצים' : 'Control the robot using WASD or Arrows'}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsPaused(!isPaused)} className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
            {isPaused ? <Play className="w-5 h-5 text-secondary" /> : <Pause className="w-5 h-5 text-yellow-500" />}
          </button>
          <button onClick={reset} className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative h-80 bg-slate-50 dark:bg-slate-950 p-4 overflow-hidden" ref={sandboxRef}>
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, #3B82F6 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        {/* The Robot */}
        <div 
          className="absolute transition-all duration-150 ease-out flex flex-col items-center"
          style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div className={`p-3 rounded-2xl bg-primary shadow-lg shadow-primary/40 ${isPaused ? 'opacity-50' : 'animate-pulse-soft'}`}>
            <Bot className="text-white w-8 h-8" />
          </div>
          <div className="mt-2 text-[10px] font-bold bg-white/80 dark:bg-slate-800/80 px-2 py-0.5 rounded-full border border-gray-200 dark:border-slate-700 uppercase">
            Bot-01
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col items-center gap-1 md:hidden">
          <button onPointerDown={() => move('U')} className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm active:bg-primary active:text-white transition-all"><ChevronUp /></button>
          <div className="flex gap-1">
            <button onPointerDown={() => move('L')} className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm active:bg-primary active:text-white transition-all"><ChevronLeft /></button>
            <button onPointerDown={() => move('D')} className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm active:bg-primary active:text-white transition-all"><ChevronDown /></button>
            <button onPointerDown={() => move('R')} className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm active:bg-primary active:text-white transition-all"><ChevronRight /></button>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 dark:bg-slate-900/50 flex items-center gap-3 text-xs text-gray-500">
        <Info className="w-4 h-4 text-primary shrink-0" />
        {t.dir === 'rtl' 
          ? 'דוגמה זו ממחישה אינטראקציה פשוטה בזמן אמת - הבסיס לכל מערכת רובוטית.' 
          : 'This demo illustrates simple real-time interaction - the basis of any robotic system.'}
      </div>
    </div>
  );
};

const Navbar: React.FC<{ 
  theme: 'light' | 'dark', 
  toggleTheme: () => void,
  language: Language,
  setLanguage: (lang: Language) => void,
  t: any
}> = ({ theme, toggleTheme, language, setLanguage, t }) => {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="bg-primary p-2 rounded-lg">
          <Cpu className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {t.title}
        </h1>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative group">
          <button className="flex items-center gap-1 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
            <Globe className="w-5 h-5" />
            <span className="hidden md:inline text-xs font-bold uppercase">{language}</span>
          </button>
          <div className="absolute top-full left-0 md:right-0 md:left-auto mt-2 w-40 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
            {['en', 'he', 'zh', 'hi', 'de', 'es', 'fr'].map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang as Language)}
                className={`w-full text-left md:text-right px-4 py-2 text-sm hover:bg-primary/10 transition-colors ${language === lang ? 'text-primary font-bold' : ''}`}
              >
                {lang === 'he' ? 'עברית' : lang === 'en' ? 'English' : lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          title={theme === 'dark' ? "Switch to Light" : "Switch to Dark"}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
          <Github className="w-5 h-5" />
        </a>
      </div>
    </nav>
  );
};

const ResourceCard: React.FC<{ resource: Resource, t: any }> = ({ resource, t }) => {
  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case Difficulty.Beginner: return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case Difficulty.Intermediate: return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case Difficulty.Advanced: return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    }
  };

  return (
    <div className="group bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(resource.difficulty)}`}>
          {t.diffs[resource.difficulty]}
        </span>
        <div className="flex flex-col items-end">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            {t.cats[resource.category]}
          </span>
          {resource.isCommercial && (
            <span className="text-[10px] text-secondary font-bold flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3 h-3" /> Commercial
            </span>
          )}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{resource.name}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed flex-grow">
        {resource.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-6">
        {resource.tags.map(tag => (
          <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-gray-500">
            #{tag}
          </span>
        ))}
      </div>
      <a 
        href={resource.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
      >
        View Resource <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
};

// Fix: Implemented the missing ComparisonTable component
const ComparisonTable: React.FC<{ t: any }> = ({ t }) => {
  return (
    <div className="my-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black mb-4">{t.comparison_title}</h2>
        <p className="text-gray-500 dark:text-slate-400 max-w-2xl mx-auto">{t.comparison_desc}</p>
      </div>
      
      <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="bg-gray-50 dark:bg-slate-800/50 text-gray-500 dark:text-slate-400 uppercase text-[10px] font-black tracking-widest">
            <tr>
              <th className="px-6 py-4">{t.table_name}</th>
              <th className="px-6 py-4">{t.table_usecase}</th>
              <th className="px-6 py-4">{t.table_difficulty}</th>
              <th className="px-6 py-4">{t.table_standard}</th>
              <th className="px-6 py-4">{t.table_license}</th>
              <th className="px-6 py-4">{t.table_language}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
            {TOP_COMPARISON.map((entry, idx) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{entry.name}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-slate-400">{entry.useCase}</td>
                <td className="px-6 py-4">
                   <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                    {t.diffs[entry.difficulty]}
                   </span>
                </td>
                <td className="px-6 py-4">{entry.industryStandard}</td>
                <td className="px-6 py-4 font-mono text-xs">{entry.license}</td>
                <td className="px-6 py-4 text-secondary font-medium">{entry.language}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Fix: Implemented the missing RoadmapSection component
const RoadmapSection: React.FC<{ t: any }> = ({ t }) => {
  return (
    <div className="my-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-black mb-4">{t.roadmap_title}</h2>
        <p className="text-gray-500 dark:text-slate-400 max-w-2xl mx-auto">{t.roadmap_desc}</p>
      </div>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent -translate-x-1/2 hidden md:block"></div>
        
        <div className="space-y-12">
          {ROADMAP.map((step, idx) => (
            <div key={idx} className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className="flex-1 w-full">
                <div className={`p-8 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md transition-shadow ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <span className="text-primary font-black text-sm uppercase mb-2 block">{t.step} {idx + 1}</span>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed mb-4">{step.description}</p>
                  <div className={`flex flex-wrap gap-2 ${idx % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                    {step.tools.map(tool => (
                      <span key={tool} className="px-3 py-1 bg-gray-50 dark:bg-slate-800 rounded-lg text-xs font-bold text-gray-600 dark:text-slate-400 border border-gray-100 dark:border-slate-700">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="absolute left-8 md:static md:left-auto -translate-x-1/2 md:translate-x-0 z-10">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/40 border-4 border-gray-50 dark:border-slate-950">
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
  // Production setting: default to dark mode
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
  });
  const [language, setLanguage] = useState<Language>('he');
  const [search, setSearch] = useState('');
  
  // Filtering
  const [selectedCategories, setSelectedCategories] = useState<ResourceCategory[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<Difficulty[]>([]);
  const [commercialFilter, setCommercialFilter] = useState<'All' | 'Commercial' | 'OpenSource'>('All');

  const t = useMemo(() => TRANSLATIONS[language], [language]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
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
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <Navbar 
        theme={theme} 
        toggleTheme={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')} 
        language={language}
        setLanguage={setLanguage}
        t={t}
      />
      
      <header className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-[120px]"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-8">
            <ShieldCheck className="w-4 h-4" />
            {t.all_needs}
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            {t.tagline.split('.')[0]} <br />
            <span className="text-primary">{t.tagline.split('.')[1] || ''}</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-slate-400 max-w-3xl mx-auto mb-12">
            {t.hero_description}
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
              <BookOpen className="w-5 h-5" /> {t.start_learning}
            </button>
            <button className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-8 py-4 rounded-xl font-bold border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all">
              {t.view_projects}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 pb-24">
        {/* Sandbox Mini-Game Demo */}
        <RobotSandbox t={t} />

        {/* Search & Filters */}
        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-6 mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative w-full lg:w-1/2">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder={t.search_placeholder}
                className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-2xl pr-12 pl-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            {hasActiveFilters && (
              <button 
                onClick={clearAllFilters}
                className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-600 transition-colors bg-red-50 dark:bg-red-900/10 px-4 py-2 rounded-xl"
              >
                <RotateCcw className="w-4 h-4" />
                {t.clear_filters}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <span className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">{t.filter_all}</span>
              <div className="flex flex-wrap gap-2">
                {Object.values(ResourceCategory).map(cat => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      selectedCategories.includes(cat) 
                      ? 'bg-primary border-primary text-white' 
                      : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-500 hover:border-primary'
                    }`}
                  >
                    {t.cats[cat]}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">{t.filter_difficulty}</span>
              <div className="flex flex-wrap gap-2">
                {Object.values(Difficulty).map(diff => (
                  <button
                    key={diff}
                    onClick={() => toggleDifficulty(diff)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      selectedDifficulties.includes(diff) 
                      ? 'bg-secondary border-secondary text-white' 
                      : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-500 hover:border-secondary'
                    }`}
                  >
                    {t.diffs[diff]}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">{t.filter_commercial}</span>
              <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-xl">
                {[
                  { value: 'All', label: t.filter_all },
                  { value: 'Commercial', label: t.commercial_only },
                  { value: 'OpenSource', label: t.open_source_only }
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setCommercialFilter(opt.value as any)}
                    className={`flex-1 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                      commercialFilter === opt.value 
                      ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map(res => (
            <ResourceCard key={res.id} resource={res} t={t} />
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-20 flex flex-col items-center">
            <div className="bg-gray-100 dark:bg-slate-800 p-6 rounded-full mb-4">
              <X className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-400 text-lg">{t.no_results}</p>
            <button onClick={clearAllFilters} className="mt-4 text-primary font-bold hover:underline">
              {t.reset_all}
            </button>
          </div>
        )}

        <ComparisonTable t={t} />
        <RoadmapSection t={t} />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-1.5 rounded-lg">
                <Cpu className="text-white w-4 h-4" />
              </div>
              <span className="font-bold text-lg">{t.title}</span>
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-gray-500 text-sm font-medium">{t.footer_copy}</p>
              <p className="text-gray-400 text-xs">
                {t.send_feedback}: <a href="mailto:goldnoamai@gmail.com" className="text-primary hover:underline font-bold">goldnoamai@gmail.com</a>
              </p>
            </div>

            <div className="flex gap-6 text-gray-400 text-xs font-bold uppercase tracking-widest">
              <a href="#" className="hover:text-primary transition-colors">{t.privacy}</a>
              <a href="#" className="hover:text-primary transition-colors">{t.terms}</a>
              <a href="#" className="hover:text-primary transition-colors">{t.about}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
