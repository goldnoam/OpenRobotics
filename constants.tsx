
import { Resource, ResourceCategory, Difficulty, RoadmapStep, ComparisonEntry } from './types';

export const RESOURCES: Resource[] = [
  {
    id: 'ros2',
    name: 'ROS 2 (Robot Operating System)',
    description: 'The global standard for robot software development. A distributed middleware system that enables communication between sensors, motors, and algorithms.',
    link: 'https://docs.ros.org/',
    category: ResourceCategory.Software,
    difficulty: Difficulty.Intermediate,
    isCommercial: true,
    tags: ['C++', 'Python', 'Middleware']
  },
  {
    id: 'gazebo',
    name: 'Gazebo Simulator',
    description: 'A powerful 3D physical simulator that allows testing robots in complex environments before transitioning to hardware.',
    link: 'https://gazebosim.org/',
    category: ResourceCategory.Simulation,
    difficulty: Difficulty.Intermediate,
    isCommercial: true,
    tags: ['Physics', 'SDF', 'Rendering']
  },
  {
    id: 'duckietown',
    name: 'Duckietown',
    description: 'A comprehensive ecosystem for learning robotics and AI. A platform combining hardware and software for research and academic education.',
    link: 'https://www.duckietown.org/',
    category: ResourceCategory.AI,
    difficulty: Difficulty.Intermediate,
    isCommercial: false,
    tags: ['Education', 'AI', 'Self-Driving']
  },
  {
    id: 'tortoisebot',
    name: 'TortoiseBot',
    description: 'A ROS-based mobile robot, extremely beginner-friendly and cost-effective. A full open-source project for building a basic service robot.',
    link: 'https://github.com/rigbetellabs/tortoisebot',
    category: ResourceCategory.Hardware,
    difficulty: Difficulty.Beginner,
    isCommercial: true,
    tags: ['ROS', 'Mobile Robot', 'Educational']
  },
  {
    id: 'rosblox',
    name: 'ROSBloX',
    description: 'Software building blocks that simplify the creation of the software stack in ROS-based robots.',
    link: 'https://rosblox.com/',
    category: ResourceCategory.Software,
    difficulty: Difficulty.Intermediate,
    isCommercial: true,
    tags: ['Software Stack', 'ROS2', 'Modular']
  },
  {
    id: 'andino',
    name: 'Andino',
    description: 'A fully open-source differential drive robot intended for educational purposes and extremely low-cost applications.',
    link: 'https://github.com/ekumenlabs/andino',
    category: ResourceCategory.Hardware,
    difficulty: Difficulty.Beginner,
    isCommercial: false,
    tags: ['Diff Drive', 'Educational', 'Low Cost']
  },
  {
    id: 'nasa-rover',
    name: 'NASA JPL Open-Source Rover',
    description: 'A scaled-down, open version of NASA\'s 6-wheeled Mars rover. An advanced engineering project for building a robotic off-road vehicle.',
    link: 'https://github.com/nasa-jpl/open-source-rover',
    category: ResourceCategory.Hardware,
    difficulty: Difficulty.Advanced,
    isCommercial: false,
    tags: ['NASA', 'Mars Rover', 'Advanced Hardware']
  },
  {
    id: 'arduino',
    name: 'Arduino',
    description: 'An open-source hardware and software platform. Perfect for learning motor control and sensor integration.',
    link: 'https://www.arduino.cc/',
    category: ResourceCategory.Hardware,
    difficulty: Difficulty.Beginner,
    isCommercial: true,
    tags: ['Microcontroller', 'Electronics', 'C']
  },
  {
    id: 'opencv',
    name: 'OpenCV',
    description: 'Open-source library for image processing and computer vision. Critical for robots that need to "see" their environment.',
    link: 'https://opencv.org/',
    category: ResourceCategory.Vision,
    difficulty: Difficulty.Advanced,
    isCommercial: true,
    tags: ['Vision', 'Image Processing', 'AI']
  },
  {
    id: 'pybullet',
    name: 'PyBullet',
    description: 'A lightweight and very fast simulator, especially popular for machine learning research in robotics.',
    link: 'https://pybullet.org/',
    category: ResourceCategory.Simulation,
    difficulty: Difficulty.Advanced,
    isCommercial: true,
    tags: ['Python', 'Deep Learning', 'Sim']
  },
  {
    id: 'webots',
    name: 'Webots',
    description: 'A professional and free robotics simulator offering a wide range of ready-to-use models of commercial robots.',
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
    useCase: 'Software Infrastructure (Middleware)',
    difficulty: Difficulty.Intermediate,
    industryStandard: 'Yes (Very High)',
    license: 'Apache 2.0',
    language: 'C++ / Python'
  },
  {
    name: 'Gazebo',
    useCase: '3D Physical Simulation',
    difficulty: Difficulty.Intermediate,
    industryStandard: 'Yes (Industry/Academic Standard)',
    license: 'Apache 2.0',
    language: 'C++'
  },
  {
    name: 'Duckietown',
    useCase: 'AI & Autonomous Driving Learning',
    difficulty: Difficulty.Intermediate,
    industryStandard: 'Partial (Academic focus)',
    license: 'MIT / CC',
    language: 'Python'
  },
  {
    name: 'TortoiseBot',
    useCase: 'Hardware: Basic Mobile Robot',
    difficulty: Difficulty.Beginner,
    industryStandard: 'No (Community project)',
    license: 'GPL',
    language: 'Python / ROS'
  },
  {
    name: 'NASA JPL Rover',
    useCase: 'Hardware: Advanced Terrain Vehicle',
    difficulty: Difficulty.Advanced,
    industryStandard: 'Yes (Educational benchmark)',
    license: 'Apache 2.0',
    language: 'Python / C++'
  }
];

export const ROADMAP: RoadmapStep[] = [
  {
    title: 'Step One: Electronics Fundamentals',
    description: 'Understanding circuits, LED control, using Arduino, and basic C/C++ coding.',
    level: Difficulty.Beginner,
    tools: ['Arduino', 'Tinkercad', 'Fritzing']
  },
  {
    title: 'Step Two: High-Level Programming',
    description: 'Learning Python for data processing and basic process automation.',
    level: Difficulty.Beginner,
    tools: ['Python', 'VS Code', 'Raspberry Pi']
  },
  {
    title: 'Step Three: Entering the ROS World',
    description: 'Understanding Nodes, Topics, and Services. Developing your first virtual robot.',
    level: Difficulty.Intermediate,
    tools: ['ROS2', 'Ubuntu', 'Docker']
  },
  {
    title: 'Step Four: Advanced Simulations',
    description: 'Creating work environments in Gazebo and modeling robots using URDF/SDF.',
    level: Difficulty.Intermediate,
    tools: ['Gazebo', 'FreeCAD', 'Blender']
  },
  {
    title: 'Step Five: AI and Computer Vision',
    description: 'Integrating OpenCV for object detection and LiDAR/Camera-based navigation.',
    level: Difficulty.Advanced,
    tools: ['OpenCV', 'TensorFlow', 'MediaPipe']
  }
];
