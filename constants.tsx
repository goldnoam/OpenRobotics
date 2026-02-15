
import { Resource, ResourceCategory, Difficulty, RoadmapStep, ComparisonEntry } from './types';

export const RESOURCES: Resource[] = [
  {
    id: 'ros2',
    name: 'ROS 2 (Robot Operating System)',
    description: 'הסטנדרט העולמי לפיתוח רובוטים. מערכת הפעלה מבוזרת המאפשרת תקשורת בין חיישנים, מנועים ואלגוריתמים.',
    link: 'https://docs.ros.org/',
    category: ResourceCategory.Software,
    difficulty: Difficulty.Intermediate,
    isCommercial: true,
    tags: ['C++', 'Python', 'Middleware']
  },
  {
    id: 'gazebo',
    name: 'Gazebo Simulator',
    description: 'סימולטור פיזיקלי תלת-ממדי רב עוצמה המאפשר לבחון רובוטים בסביבות מורכבות לפני המעבר לחומרה.',
    link: 'https://gazebosim.org/',
    category: ResourceCategory.Simulation,
    difficulty: Difficulty.Intermediate,
    isCommercial: true,
    tags: ['Physics', 'SDF', 'Rendering']
  },
  {
    id: 'duckietown',
    name: 'Duckietown',
    description: 'מערכת אקולוגית מקיפה ללימוד רובוטיקה ובינה מלאכותית. פלטפורמה המשלבת חומרה ותוכנה למטרות מחקר וחינוך אקדמי.',
    link: 'https://www.duckietown.org/',
    category: ResourceCategory.AI,
    difficulty: Difficulty.Intermediate,
    isCommercial: false,
    tags: ['Education', 'AI', 'Self-Driving']
  },
  {
    id: 'tortoisebot',
    name: 'TortoiseBot',
    description: 'רובוט נייד מבוסס ROS, ידידותי במיוחד ללומדים וחסכוני בעלויות. פרויקט קוד פתוח מלא לבניית רובוט שירות בסיסי.',
    link: 'https://github.com/rigbetellabs/tortoisebot',
    category: ResourceCategory.Hardware,
    difficulty: Difficulty.Beginner,
    isCommercial: true,
    tags: ['ROS', 'Mobile Robot', 'Educational']
  },
  {
    id: 'rosblox',
    name: 'ROSBloX',
    description: 'אבני בניין תוכנתיות המפשטות את תהליך היצירה של ערימת התוכנה (Software Stack) ברובוטים מבוססי ROS.',
    link: 'https://rosblox.com/',
    category: ResourceCategory.Software,
    difficulty: Difficulty.Intermediate,
    isCommercial: true,
    tags: ['Software Stack', 'ROS2', 'Modular']
  },
  {
    id: 'andino',
    name: 'Andino',
    description: 'רובוט הנעה דיפרנציאלית בקוד פתוח מלא, המיועד למטרות חינוכיות ויישומים בעלות נמוכה במיוחד.',
    link: 'https://github.com/ekumenlabs/andino',
    category: ResourceCategory.Hardware,
    difficulty: Difficulty.Beginner,
    isCommercial: false,
    tags: ['Diff Drive', 'Educational', 'Low Cost']
  },
  {
    id: 'nasa-rover',
    name: 'NASA JPL Open-Source Rover',
    description: 'גרסה מוקטנת ופתוחה של רכב המאדים בעל 6 הגלגלים של נאס״א. פרויקט הנדסי מתקדם לבנייה עצמית של רכב שטח רובוטי.',
    link: 'https://github.com/nasa-jpl/open-source-rover',
    category: ResourceCategory.Hardware,
    difficulty: Difficulty.Advanced,
    isCommercial: false,
    tags: ['NASA', 'Mars Rover', 'Advanced Hardware']
  },
  {
    id: 'arduino',
    name: 'Arduino',
    description: 'פלטפורמת קוד פתוח המבוססת על חומרה ותוכנה קלה לשימוש. מושלם ללימוד בקרת מנועים וחיישנים.',
    link: 'https://www.arduino.cc/',
    category: ResourceCategory.Hardware,
    difficulty: Difficulty.Beginner,
    isCommercial: true,
    tags: ['Microcontroller', 'Electronics', 'C']
  },
  {
    id: 'opencv',
    name: 'OpenCV',
    description: 'ספריית קוד פתוח לעיבוד תמונה וראייה ממוחשבת. קריטי לרובוטים שצריכים "לראות" את הסביבה.',
    link: 'https://opencv.org/',
    category: ResourceCategory.Vision,
    difficulty: Difficulty.Advanced,
    isCommercial: true,
    tags: ['Vision', 'Image Processing', 'AI']
  },
  {
    id: 'pybullet',
    name: 'PyBullet',
    description: 'סימולטור קל משקל ומהיר מאוד, פופולרי במיוחד למחקר של למידת מכונה ורובוטיקה.',
    link: 'https://pybullet.org/',
    category: ResourceCategory.Simulation,
    difficulty: Difficulty.Advanced,
    isCommercial: true,
    tags: ['Python', 'Deep Learning', 'Sim']
  },
  {
    id: 'webots',
    name: 'Webots',
    description: 'סימולטור רובוטיקה מקצועי וחינמי המציע מגוון רחב של מודלים מוכנים של רובוטים מסחריים.',
    link: 'https://cyberbotics.com/',
    category: ResourceCategory.Simulation,
    difficulty: Difficulty.Beginner,
    isCommercial: true,
    tags: ['Multi-platform', 'Education']
  }
];

export const TOP_COMPARISON: ComparisonEntry[] = [
  {
    name: 'ROS 2',
    useCase: 'תשתית תוכנה (Middleware)',
    difficulty: Difficulty.Intermediate,
    industryStandard: 'כן (גבוה מאוד)',
    license: 'Apache 2.0',
    language: 'C++ / Python'
  },
  {
    name: 'Gazebo',
    useCase: 'סימולציה פיזיקלית תלת-ממדית',
    difficulty: Difficulty.Intermediate,
    industryStandard: 'כן (סטנדרט אקדמי/תעשייתי)',
    license: 'Apache 2.0',
    language: 'C++'
  },
  {
    name: 'Duckietown',
    useCase: 'סביבה לימודית ל-AI ונהיגה אוטונומית',
    difficulty: Difficulty.Intermediate,
    industryStandard: 'חלקי (חינוך אקדמי)',
    license: 'MIT / CC',
    language: 'Python'
  },
  {
    name: 'TortoiseBot',
    useCase: 'חומרה: רובוט נייד בסיסי',
    difficulty: Difficulty.Beginner,
    industryStandard: 'לא (פרויקט קהילה)',
    license: 'GPL',
    language: 'Python / ROS'
  },
  {
    name: 'NASA JPL Rover',
    useCase: 'חומרה: רכב שטח מתקדם',
    difficulty: Difficulty.Advanced,
    industryStandard: 'כן (ייחוס חינוכי)',
    license: 'Apache 2.0',
    language: 'Python / C++'
  }
];

export const ROADMAP: RoadmapStep[] = [
  {
    title: 'צעד ראשון: יסודות האלקטרוניקה',
    description: 'הבנת מעגלים, בקרת LED, שימוש ב-Arduino וכתיבת קוד בסיסי ב-C/C++.',
    level: Difficulty.Beginner,
    tools: ['Arduino', 'Tinkercad', 'Fritzing']
  },
  {
    title: 'צעד שני: תכנות בשפה גבוהה',
    description: 'לימוד Python לטובת עיבוד נתונים ואוטומציה בסיסית של תהליכים.',
    level: Difficulty.Beginner,
    tools: ['Python', 'VS Code', 'Raspberry Pi']
  },
  {
    title: 'צעד שלישי: כניסה לעולם ה-ROS',
    description: 'הבנת קונספטים של Nodes, Topics ו-Services. פיתוח רובוט וירטואלי ראשון.',
    level: Difficulty.Intermediate,
    tools: ['ROS2', 'Ubuntu', 'Docker']
  },
  {
    title: 'צעד רביעי: סימולציות מתקדמות',
    description: 'יצירת סביבות עבודה ב-Gazebo ומידול רובוטים באמצעות URDF/SDF.',
    level: Difficulty.Intermediate,
    tools: ['Gazebo', 'FreeCAD', 'Blender']
  },
  {
    title: 'צעד חמישי: בינה מלאכותית וראייה',
    description: 'שילוב OpenCV לזיהוי אובייקטים וניווט אוטונומי מבוסס LiDAR/Camera.',
    level: Difficulty.Advanced,
    tools: ['OpenCV', 'TensorFlow', 'MediaPipe']
  }
];
