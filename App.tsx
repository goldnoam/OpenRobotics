
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
  Layers
} from 'lucide-react';
import { RESOURCES, ROADMAP, TOP_COMPARISON } from './constants';
import { Resource, Difficulty, ResourceCategory, ComparisonEntry } from './types';

// Components
const Navbar: React.FC<{ theme: 'light' | 'dark', toggleTheme: () => void }> = ({ theme, toggleTheme }) => {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="bg-primary p-2 rounded-lg">
          <Cpu className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          OpenRobotics Hub
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          title={theme === 'dark' ? "החלף למצב בהיר" : "החלף למצב כהה"}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
          title="צפה בפרויקט ב-GitHub"
        >
          <Github className="w-5 h-5" />
        </a>
      </div>
    </nav>
  );
};

const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => {
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
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          {resource.category}
        </span>
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
        title={`עבור לאתר הרשמי של ${resource.name}`}
      >
        צפה במשאב <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
};

const ComparisonTable: React.FC = () => {
  return (
    <div className="py-20 bg-white dark:bg-gray-950 border-t border-b border-gray-100 dark:border-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <Layers className="text-primary w-8 h-8" />
            השוואת פלטפורמות מובילות
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            מבט טכני מהיר על חמשת המשאבים הפופולריים ביותר לפיתוח רובוטיקה בקוד פתוח.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <table className="w-full text-right border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-800">
                <th className="px-6 py-4 font-bold">שם הפלטפורמה</th>
                <th className="px-6 py-4 font-bold">שימוש מרכזי</th>
                <th className="px-6 py-4 font-bold">רמת קושי</th>
                <th className="px-6 py-4 font-bold">סטנדרט בתעשייה</th>
                <th className="px-6 py-4 font-bold">רישיון</th>
                <th className="px-6 py-4 font-bold">שפות פיתוח</th>
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

const RoadmapSection: React.FC = () => {
  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">מפת דרכים למפתח הרובוטיקה</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            ממתחילים ועד למתקדמים: המסלול המומלץ לכניסה לעולם הרובוטיקה בקוד פתוח.
          </p>
        </div>
        
        <div className="relative border-r-2 border-primary/20 mr-4 md:mr-0 md:border-r-0 md:after:content-[''] md:after:absolute md:after:top-0 md:after:left-1/2 md:after:h-full md:after:w-0.5 md:after:bg-primary/20">
          {ROADMAP.map((step, index) => (
            <div key={index} className={`relative mb-12 md:w-1/2 ${index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
              <div className="absolute top-0 -right-[11px] md:right-auto md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-white dark:border-dark z-10"></div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <span className="text-primary font-bold text-sm mb-2 block">שלב {index + 1}</span>
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
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<ResourceCategory | 'All'>('All');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const filteredResources = useMemo(() => {
    return RESOURCES.filter(res => {
      const matchesSearch = res.name.toLowerCase().includes(search.toLowerCase()) || 
                          res.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = activeCategory === 'All' || res.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen">
      <Navbar theme={theme} toggleTheme={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')} />
      
      {/* Hero Section */}
      <header className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-[120px]"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-8">
            <ShieldCheck className="w-4 h-4" />
            כל מה שצריך כדי לבנות רובוט בקוד פתוח
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            עתיד הרובוטיקה <br />
            <span className="text-primary">מתחיל כאן.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto mb-12">
            מאגר המשאבים המוביל למהנדסי רובוטיקה, חוקרים וחובבים. סביבות פיתוח, סימולטורים, וכלים מתקדמים למטרות לימודיות ומסחריות.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-primary/30 transition-all flex items-center gap-2"
              title="התחל ללמוד את יסודות הרובוטיקה"
            >
              <BookOpen className="w-5 h-5" /> התחל ללמוד עכשיו
            </button>
            <button 
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-xl font-bold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              title="צפה בפרויקטים אמיתיים שנבנו בקוד פתוח"
            >
              צפה בפרויקטים לדוגמה
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-6 pb-24">
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12 bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="relative w-full md:w-96">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="חפש כלים, שפות או טכנולוגיות..."
              className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl pr-12 pl-4 py-3 focus:ring-2 focus:ring-primary outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              title="הזן מילות חיפוש לסינון המשאבים"
            />
          </div>
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0">
            {['All', ...Object.values(ResourceCategory)].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                title={cat === 'All' ? 'הצג את כל המשאבים' : `הצג משאבים בקטגוריית ${cat}`}
              >
                {cat === 'All' ? 'הכל' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map(res => (
            <ResourceCard key={res.id} resource={res} />
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">לא נמצאו משאבים התואמים את החיפוש שלך...</p>
          </div>
        )}
      </main>

      {/* Comparison Table Section */}
      <ComparisonTable />

      {/* Roadmap Section */}
      <RoadmapSection />

      {/* Commercial Section */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-8">מוכן להפוך את הרעיון למוצר מסחרי?</h2>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-12">
            הכלים בקוד פתוח כמו ROS 2 ו-Gazebo מאפשרים פיתוח של רובוטים ברמה תעשייתית עם רישיונות (כמו Apache 2.0) המאפשרים שימוש מסחרי מלא ללא עלויות רישוי.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right max-w-4xl mx-auto">
            <div className="bg-white/10 p-6 rounded-2xl">
              <Settings className="w-8 h-8 mb-4" />
              <h4 className="text-xl font-bold mb-2">סקלאביליות</h4>
              <p className="text-sm opacity-80">מערכות מבוזרות שתומכות בציים של מאות רובוטים.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl">
              <Code className="w-8 h-8 mb-4" />
              <h4 className="text-xl font-bold mb-2">קהילה ענקית</h4>
              <p className="text-sm opacity-80">אלפי מפתחים ותרומות קוד שחוסכות לך זמן יקר.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl">
              <ShieldCheck className="w-8 h-8 mb-4" />
              <h4 className="text-xl font-bold mb-2">אבטחה וסטנדרטים</h4>
              <p className="text-sm opacity-80">עמידה בסטנדרטים של Cyber-Security ו-DDS.</p>
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
              <span className="font-bold text-lg">OpenRobotics Hub</span>
            </div>
            
            <div className="text-center text-gray-500 text-sm">
              <p>(C) Noam Gold AI 2026</p>
              <p className="mt-1">
                Send Feedback: <a href="mailto:goldnoamai@gmail.com" className="text-primary hover:underline" title="שלח לנו דוא״ל עם משוב או שאלות">goldnoamai@gmail.com</a>
              </p>
            </div>

            <div className="flex gap-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-primary transition-colors" title="קרא את מדיניות הפרטיות שלנו">פרטיות</a>
              <a href="#" className="hover:text-primary transition-colors" title="קרא את תנאי השימוש באתר">תנאי שימוש</a>
              <a href="#" className="hover:text-primary transition-colors" title="קרא עלינו ועל הפרויקט">אודות</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
