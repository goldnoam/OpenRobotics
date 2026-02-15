
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Cpu, 
  BookOpen, 
  Tool, 
  Map as MapIcon, 
  Search, 
  Moon, 
  Sun, 
  Github, 
  ExternalLink, 
  ChevronLeft,
  Settings,
  ShieldCheck,
  Code,
  CheckCircle2,
  XCircle,
  Layers,
  Globe,
  Filter
} from 'lucide-react';
import { RESOURCES, ROADMAP, TOP_COMPARISON } from './constants';
import { Resource, Difficulty, ResourceCategory, ComparisonEntry } from './types';
import { TRANSLATIONS, Language } from './translations';

// Components
const Navbar: React.FC<{ 
  theme: 'light' | 'dark', 
  toggleTheme: () => void,
  language: Language,
  setLanguage: (lang: Language) => void,
  t: any
}> = ({ theme, toggleTheme, language, setLanguage, t }) => {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center">
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
          <button 
            className="flex items-center gap-1 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            title="Change Language / החלף שפה"
          >
            <Globe className="w-5 h-5" />
            <span className="hidden md:inline text-xs font-bold uppercase">{language}</span>
          </button>
          <div className="absolute top-full left-0 md:right-0 md:left-auto mt-2 w-40 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
            {[
              { id: 'en', label: 'English' },
              { id: 'he', label: 'עברית' },
              { id: 'zh', label: '中文' },
              { id: 'hi', label: 'हिन्दी' },
              { id: 'de', label: 'Deutsch' },
              { id: 'es', label: 'Español' },
              { id: 'fr', label: 'Français' },
            ].map(lang => (
              <button
                key={lang.id}
                onClick={() => setLanguage(lang.id as Language)}
                className={`w-full text-left md:text-right px-4 py-2 text-sm hover:bg-primary/10 transition-colors ${language === lang.id ? 'text-primary font-bold' : ''}`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          title={theme === 'dark' ? "Switch to Light" : "Switch to Dark"}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
          title="GitHub"
        >
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
    <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(resource.difficulty)}`}>
          {resource.difficulty}
        </span>
        <div className="flex flex-col items-end">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            {resource.category}
          </span>
          {resource.isCommercial && (
            <span className="text-[10px] text-secondary font-bold flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3 h-3" /> Commercial
            </span>
          )}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{resource.name}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
        {resource.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-6">
        {resource.tags.map(tag => (
          <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
            #{tag}
          </span>
        ))}
      </div>
      <a 
        href={resource.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
        title={resource.name}
      >
        View Resource <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
};

const ComparisonTable: React.FC<{ t: any }> = ({ t }) => {
  if (!t.comparison_title) return null;
  return (
    <div className="py-20 bg-white dark:bg-gray-950 border-t border-b border-gray-100 dark:border-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <Layers className="text-primary w-8 h-8" />
            {t.comparison_title}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {t.comparison_desc}
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <table className="w-full text-right md:text-center border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-800">
                <th className="px-6 py-4 font-bold">{t.table_name}</th>
                <th className="px-6 py-4 font-bold">{t.table_usecase}</th>
                <th className="px-6 py-4 font-bold">{t.table_difficulty}</th>
                <th className="px-6 py-4 font-bold">{t.table_standard}</th>
                <th className="px-6 py-4 font-bold">{t.table_license}</th>
                <th className="px-6 py-4 font-bold">{t.table_language}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {TOP_COMPARISON.map((entry, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-primary">{entry.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{entry.useCase}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      entry.difficulty === Difficulty.Beginner ? 'bg-green-100 text-green-700' :
                      entry.difficulty === Difficulty.Intermediate ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {entry.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{entry.industryStandard}</td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-500">{entry.license}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{entry.language}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const RoadmapSection: React.FC<{ t: any }> = ({ t }) => {
  if (!t.roadmap_title) return null;
  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{t.roadmap_title}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {t.roadmap_desc}
          </p>
        </div>
        
        <div className="relative border-r-2 border-primary/20 mr-4 md:mr-0 md:border-r-0 md:after:content-[''] md:after:absolute md:after:top-0 md:after:left-1/2 md:after:h-full md:after:w-0.5 md:after:bg-primary/20">
          {ROADMAP.map((step, index) => (
            <div key={index} className={`relative mb-12 md:w-1/2 ${index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
              <div className="absolute top-0 -right-[11px] md:right-auto md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-white dark:border-dark z-10"></div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <span className="text-primary font-bold text-sm mb-2 block">{t.step} {index + 1}</span>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                  {step.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {step.tools.map(tool => (
                    <span key={tool} className="bg-primary/10 text-primary text-[11px] px-2 py-1 rounded">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [language, setLanguage] = useState<Language>('he');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<ResourceCategory | 'All'>('All');
  const [activeDifficulty, setActiveDifficulty] = useState<Difficulty | 'All'>('All');
  const [commercialFilter, setCommercialFilter] = useState<'All' | 'Commercial' | 'OpenSource'>('All');

  const t = useMemo(() => TRANSLATIONS[language], [language]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dir = t.dir || 'ltr';
    document.documentElement.lang = language;
  }, [theme, language, t]);

  const filteredResources = useMemo(() => {
    return RESOURCES.filter(res => {
      const matchesSearch = res.name.toLowerCase().includes(search.toLowerCase()) || 
                          res.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = activeCategory === 'All' || res.category === activeCategory;
      const matchesDifficulty = activeDifficulty === 'All' || res.difficulty === activeDifficulty;
      const matchesCommercial = commercialFilter === 'All' || 
                               (commercialFilter === 'Commercial' && res.isCommercial) ||
                               (commercialFilter === 'OpenSource' && !res.isCommercial);
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesCommercial;
    });
  }, [search, activeCategory, activeDifficulty, commercialFilter]);

  return (
    <div className="min-h-screen">
      <Navbar 
        theme={theme} 
        toggleTheme={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')} 
        language={language}
        setLanguage={setLanguage}
        t={t}
      />
      
      {/* Hero Section */}
      <header className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
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
          <p className="text-xl text-gray-500 max-w-3xl mx-auto mb-12">
            {t.hero_description}
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-primary/30 transition-all flex items-center gap-2"
              title={t.start_learning}
            >
              <BookOpen className="w-5 h-5" /> {t.start_learning}
            </button>
            <button 
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-xl font-bold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              title={t.view_projects}
            >
              {t.view_projects}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-6 pb-24">
        {/* Search & Filters */}
        <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative w-full lg:w-1/3">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder={t.search_placeholder}
                className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl pr-12 pl-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-center lg:justify-end">
               <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-2xl">
                 <Filter className="w-4 h-4 text-gray-400" />
                 <select 
                    className="bg-transparent text-sm font-bold outline-none border-none focus:ring-0 cursor-pointer"
                    value={activeDifficulty}
                    onChange={(e) => setActiveDifficulty(e.target.value as any)}
                    title={t.filter_difficulty}
                 >
                   <option value="All">{t.filter_difficulty}: {t.filter_all}</option>
                   {Object.values(Difficulty).map(diff => (
                     <option key={diff} value={diff}>{diff}</option>
                   ))}
                 </select>
               </div>

               <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-2xl">
                 <ShieldCheck className="w-4 h-4 text-gray-400" />
                 <select 
                    className="bg-transparent text-sm font-bold outline-none border-none focus:ring-0 cursor-pointer"
                    value={commercialFilter}
                    onChange={(e) => setCommercialFilter(e.target.value as any)}
                    title={t.filter_commercial}
                 >
                   <option value="All">{t.filter_commercial}: {t.filter_all}</option>
                   <option value="Commercial">{t.commercial_only}</option>
                   <option value="OpenSource">{t.open_source_only}</option>
                 </select>
               </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 justify-center lg:justify-start">
            {['All', ...Object.values(ResourceCategory)].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                title={cat === 'All' ? t.filter_all : cat}
              >
                {cat === 'All' ? t.filter_all : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map(res => (
            <ResourceCard key={res.id} resource={res} t={t} />
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No results found...</p>
          </div>
        )}
      </main>

      {/* Comparison Table Section */}
      <ComparisonTable t={t} />

      {/* Roadmap Section */}
      <RoadmapSection t={t} />

      {/* Commercial Section */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-8">{t.commercial_section_title}</h2>
          {t.commercial_section_desc && (
            <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-12">
              {t.commercial_section_desc}
            </p>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
            <div className="bg-white/10 p-6 rounded-2xl">
              <Settings className="w-8 h-8 mb-4 mx-auto" />
              <h4 className="text-xl font-bold mb-2">{t.scalability || 'Scalability'}</h4>
              <p className="text-sm opacity-80">{t.scalability_desc}</p>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl">
              <Code className="w-8 h-8 mb-4 mx-auto" />
              <h4 className="text-xl font-bold mb-2">{t.community || 'Community'}</h4>
              <p className="text-sm opacity-80">{t.community_desc}</p>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl">
              <ShieldCheck className="w-8 h-8 mb-4 mx-auto" />
              <h4 className="text-xl font-bold mb-2">{t.security || 'Security'}</h4>
              <p className="text-sm opacity-80">{t.security_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-dark border-t border-gray-100 dark:border-gray-800 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-1.5 rounded-lg">
                <Cpu className="text-white w-4 h-4" />
              </div>
              <span className="font-bold text-lg">{t.title}</span>
            </div>
            
            <div className="text-center text-gray-500 text-sm">
              <p>{t.footer_copy}</p>
              <p className="mt-1">
                {t.send_feedback}: <a href="mailto:goldnoamai@gmail.com" className="text-primary hover:underline" title={t.send_feedback}>goldnoamai@gmail.com</a>
              </p>
            </div>

            <div className="flex gap-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-primary transition-colors" title={t.privacy}>{t.privacy}</a>
              <a href="#" className="hover:text-primary transition-colors" title={t.terms}>{t.terms}</a>
              <a href="#" className="hover:text-primary transition-colors" title={t.about}>{t.about}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
