import { useState } from 'react';
import { ExternalLink, Zap, Code2, Briefcase } from 'lucide-react';
import Layout from '../components/layout/Layout';

interface ProjectIdea {
  id: string;
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  techStack: string[];
  problemStatement: string;
  features: string[];
  resumeValue: string;
  inspirationLink: string;
}

interface Branch {
  id: string;
  name: string;
  icon: string;
  color: string;
  projects: ProjectIdea[];
}

const branches: Branch[] = [
  {
    id: 'cs',
    name: 'Computer Science',
    icon: 'Code2',
    color: 'from-blue-500 to-blue-600',
    projects: [
      {
        id: 'cs-1',
        name: 'AI-Powered Code Review System',
        difficulty: 'Advanced',
        techStack: ['Python', 'OpenAI API', 'Flask', 'PostgreSQL'],
        problemStatement: 'Developers spend hours reviewing code manually, missing critical issues and inconsistencies.',
        features: [
          'Automated code analysis using AI',
          'Bug detection and suggestions',
          'Performance optimization tips',
          'Code style consistency checker',
          'Integration with GitHub/GitLab'
        ],
        resumeValue: 'Shows AI integration, backend development, API design',
        inspirationLink: 'https://github.com'
      },
      {
        id: 'cs-2',
        name: 'Real-time Collaborative Coding Platform',
        difficulty: 'Advanced',
        techStack: ['Node.js', 'React', 'WebSocket', 'MongoDB'],
        problemStatement: 'Remote teams struggle to collaborate on code in real-time with proper synchronization.',
        features: [
          'Real-time code synchronization',
          'Live cursor tracking',
          'Integrated chat and video',
          'Syntax highlighting',
          'Version history'
        ],
        resumeValue: 'Full-stack development, WebSocket programming, scalability',
        inspirationLink: 'https://github.com'
      },
      {
        id: 'cs-3',
        name: 'Automated Testing Framework Generator',
        difficulty: 'Intermediate',
        techStack: ['Python', 'JavaScript', 'Selenium', 'Jest'],
        problemStatement: 'Writing test cases is tedious and time-consuming for developers.',
        features: [
          'Auto-generate test cases from code',
          'Test coverage analysis',
          'CI/CD integration',
          'Report generation',
          'Multi-language support'
        ],
        resumeValue: 'Testing expertise, automation, DevOps knowledge',
        inspirationLink: 'https://github.com'
      },
      {
        id: 'cs-4',
        name: 'Personal Finance Tracker Dashboard',
        difficulty: 'Beginner',
        techStack: ['React', 'Firebase', 'Recharts', 'Tailwind CSS'],
        problemStatement: 'Users cannot easily track their spending habits and financial goals.',
        features: [
          'Income and expense tracking',
          'Budget planning',
          'Visual analytics',
          'Bill reminders',
          'Monthly reports'
        ],
        resumeValue: 'Frontend development, data visualization, UX design',
        inspirationLink: 'https://github.com'
      }
    ]
  },
  {
    id: 'is',
    name: 'Information Science',
    icon: 'Database',
    color: 'from-purple-500 to-purple-600',
    projects: [
      {
        id: 'is-1',
        name: 'Advanced Search Engine & Indexing System',
        difficulty: 'Advanced',
        techStack: ['Python', 'Elasticsearch', 'Flask', 'PostgreSQL'],
        problemStatement: 'Existing search solutions fail to handle complex queries and semantic search efficiently.',
        features: [
          'Full-text search capabilities',
          'Semantic similarity search',
          'Real-time indexing',
          'Query optimization',
          'Advanced filtering'
        ],
        resumeValue: 'Information retrieval, data structures, database optimization',
        inspirationLink: 'https://github.com'
      },
      {
        id: 'is-2',
        name: 'Data Quality & Validation Platform',
        difficulty: 'Intermediate',
        techStack: ['Python', 'Pandas', 'Flask', 'MongoDB'],
        problemStatement: 'Organizations lose data quality without automated validation and cleansing tools.',
        features: [
          'Data validation rules',
          'Duplicate detection',
          'Missing value handling',
          'Data profiling',
          'Quality dashboards'
        ],
        resumeValue: 'Data management, quality assurance, ETL processes',
        inspirationLink: 'https://github.com'
      },
      {
        id: 'is-3',
        name: 'Web Content Aggregator & Feed Reader',
        difficulty: 'Intermediate',
        techStack: ['Node.js', 'React', 'MongoDB', 'REST API'],
        problemStatement: 'Users struggle to stay updated with multiple news sources and information feeds.',
        features: [
          'Multi-source aggregation',
          'Custom RSS feeds',
          'Content filtering',
          'Smart categorization',
          'Read-later feature'
        ],
        resumeValue: 'Web scraping, API integration, user preferences',
        inspirationLink: 'https://github.com'
      },
      {
        id: 'is-4',
        name: 'Document Management System',
        difficulty: 'Beginner',
        techStack: ['React', 'Node.js', 'Firebase', 'Tailwind CSS'],
        problemStatement: 'Teams lack centralized, searchable document management with proper access control.',
        features: [
          'File upload and storage',
          'Search functionality',
          'Version control',
          'Access permissions',
          'Document preview'
        ],
        resumeValue: 'File handling, access control, UX design',
        inspirationLink: 'https://github.com'
      }
    ]
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: 'Zap',
    color: 'from-yellow-500 to-yellow-600',
    projects: [
      {
        id: 'elec-1',
        name: 'Smart Home IoT Control System',
        difficulty: 'Advanced',
        techStack: ['Arduino', 'Raspberry Pi', 'Python', 'MQTT', 'React'],
        problemStatement: 'Home automation requires expensive, proprietary systems with limited customization.',
        features: [
          'Device control dashboard',
          'Automated scheduling',
          'Energy monitoring',
          'Mobile app control',
          'Real-time notifications'
        ],
        resumeValue: 'IoT development, embedded systems, full-stack integration',
        inspirationLink: 'https://github.com'
      },
      {
        id: 'elec-2',
        name: 'Environment Monitoring Station',
        difficulty: 'Intermediate',
        techStack: ['Arduino', 'Sensors', 'Python', 'InfluxDB', 'Grafana'],
        problemStatement: 'Environmental data collection is manual and expensive for research institutions.',
        features: [
          'Multi-sensor data collection',
          'Real-time monitoring',
          'Data logging',
          'Alert system',
          'Historical analysis'
        ],
        resumeValue: 'Sensor integration, data logging, hardware programming',
        inspirationLink: 'https://github.com'
      },
      {
        id: 'elec-3',
        name: 'Wireless Weather Station',
        difficulty: 'Beginner',
        techStack: ['Arduino', 'RF Module', 'LCD Display', 'C++'],
        problemStatement: 'Affordable home weather monitoring solutions lack accuracy and user-friendly design.',
        features: [
          'Temperature & humidity sensing',
          'Wireless data transmission',
          'LCD display',
          'Data logging',
          'Low power consumption'
        ],
        resumeValue: 'Sensor programming, embedded systems, hardware design',
        inspirationLink: 'https://github.com'
      }
    ]
  },
  {
    id: 'electrical',
    name: 'Electrical',
    icon: 'Zap',
    color: 'from-red-500 to-red-600',
    projects: [
      {
        id: 'ee-1',
        name: 'Smart Grid Load Balancing System',
        difficulty: 'Advanced',
        techStack: ['Python', 'MATLAB', 'IoT Devices', 'PostgreSQL'],
        problemStatement: 'Power distribution systems lack intelligent load balancing, causing inefficiencies.',
        features: [
          'Real-time load monitoring',
          'Predictive load balancing',
          'Fault detection',
          'Optimization algorithms',
          'Integration with renewable sources'
        ],
        resumeValue: 'Power systems, optimization, smart grid knowledge',
        inspirationLink: 'https://github.com'
      },
      {
        id: 'ee-2',
        name: 'Electric Vehicle Charging Station Optimizer',
        difficulty: 'Intermediate',
        techStack: ['Python', 'C++', 'IoT', 'Redis'],
        problemStatement: 'EV charging stations operate independently without network optimization.',
        features: [
          'Charging station mapping',
          'Availability tracking',
          'Route optimization',
          'Payment integration',
          'Load prediction'
        ],
        resumeValue: 'EV technology, optimization algorithms, system design',
        inspirationLink: 'https://github.com'
      },
      {
        id: 'ee-3',
        name: 'Home Energy Consumption Analyzer',
        difficulty: 'Beginner',
        techStack: ['Arduino', 'Python', 'SQLite', 'Tkinter'],
        problemStatement: 'Household energy usage lacks detailed analysis and optimization suggestions.',
        features: [
          'Power consumption tracking',
          'Device-level analysis',
          'Cost estimation',
          'Savings recommendations',
          'Historical reports'
        ],
        resumeValue: 'Energy systems, data analysis, embedded systems',
        inspirationLink: 'https://github.com'
      }
    ]
  },
  {
    id: 'mechanical',
    name: 'Mechanical',
    icon: 'Briefcase',
    color: 'from-orange-500 to-orange-600',
    projects: [
      {
        id: 'mech-1',
        name: 'Industrial Robotics Control System',
        difficulty: 'Advanced',
        techStack: ['Python', 'ROS', 'C++', 'MATLAB', 'Real-time OS'],
        problemStatement: 'Industrial robots lack flexible, scalable control systems for diverse manufacturing tasks.',
        features: [
          'Motion planning algorithms',
          'Path optimization',
          'Collision detection',
          'Multi-robot coordination',
          'Simulation environment'
        ],
        resumeValue: 'Robotics, control systems, advanced algorithms',
        inspirationLink: 'https://github.com'
      },
      {
        id: 'mech-2',
        name: 'Structural Stress Analysis Tool',
        difficulty: 'Intermediate',
        techStack: ['Python', 'NumPy', 'SciPy', 'Visualization library'],
        problemStatement: 'FEA software is expensive; engineers need affordable analysis tools.',
        features: [
          'Stress distribution analysis',
          '3D visualization',
          'Material property handling',
          'Report generation',
          'Design optimization'
        ],
        resumeValue: 'FEA, structural mechanics, computational methods',
        inspirationLink: 'https://github.com'
      },
      {
        id: 'mech-3',
        name: 'Machine Condition Monitoring System',
        difficulty: 'Intermediate',
        techStack: ['Python', 'Sensors', 'Flask', 'SQLite'],
        problemStatement: 'Equipment failures occur unexpectedly due to lack of real-time monitoring.',
        features: [
          'Vibration analysis',
          'Temperature monitoring',
          'Anomaly detection',
          'Predictive maintenance',
          'Alert system'
        ],
        resumeValue: 'Predictive maintenance, signal processing, IoT',
        inspirationLink: 'https://github.com'
      }
    ]
  },
  {
    id: 'civil',
    name: 'Civil',
    icon: 'Briefcase',
    color: 'from-green-500 to-green-600',
    projects: [
      {
        id: 'civil-1',
        name: 'Smart Traffic Management System',
        difficulty: 'Advanced',
        techStack: ['Python', 'OpenCV', 'IoT', 'Machine Learning'],
        problemStatement: 'Urban traffic congestion causes economic losses and environmental impact.',
        features: [
          'Vehicle detection and counting',
          'Traffic flow optimization',
          'Signal timing adjustment',
          'Congestion prediction',
          'Real-time dashboards'
        ],
        resumeValue: 'Computer vision, optimization, smart city knowledge',
        inspirationLink: 'https://github.com'
      },
      {
        id: 'civil-2',
        name: 'Construction Site Safety Monitoring',
        difficulty: 'Intermediate',
        techStack: ['Python', 'IoT Sensors', 'Flask', 'MongoDB'],
        problemStatement: 'Construction sites lack real-time safety monitoring, increasing accident risks.',
        features: [
          'Worker tracking',
          'Equipment monitoring',
          'Safety rule enforcement',
          'Alert system',
          'Incident reporting'
        ],
        resumeValue: 'Safety systems, IoT integration, real-time monitoring',
        inspirationLink: 'https://github.com'
      },
      {
        id: 'civil-3',
        name: 'Building Energy Efficiency Auditor',
        difficulty: 'Beginner',
        techStack: ['Python', 'Flask', 'SQLite', 'Matplotlib'],
        problemStatement: 'Building owners lack tools to identify energy efficiency improvement opportunities.',
        features: [
          'Energy consumption analysis',
          'HVAC efficiency assessment',
          'Lighting optimization',
          'Improvement recommendations',
          'Cost-benefit analysis'
        ],
        resumeValue: 'Sustainability, energy systems, data analysis',
        inspirationLink: 'https://github.com'
      }
    ]
  },
  {
    id: 'biotech',
    name: 'Biotechnology',
    icon: 'Code2',
    color: 'from-pink-500 to-pink-600',
    projects: [
      {
        id: 'biotech-1',
        name: 'Genome Sequence Analysis Platform',
        difficulty: 'Advanced',
        techStack: ['Python', 'Bioinformatics libraries', 'Machine Learning', 'PostgreSQL'],
        problemStatement: 'Analyzing genome sequences manually is time-consuming and error-prone.',
        features: [
          'Sequence alignment tools',
          'Gene prediction',
          'Mutation detection',
          'Disease risk assessment',
          'Visualization tools'
        ],
        resumeValue: 'Bioinformatics, computational biology, data analysis',
        inspirationLink: 'https://github.com'
      },
      {
        id: 'biotech-2',
        name: 'Drug Compound Interaction Predictor',
        difficulty: 'Advanced',
        techStack: ['Python', 'TensorFlow', 'RDKit', 'Flask'],
        problemStatement: 'Predicting drug interactions requires expensive computational infrastructure.',
        features: [
          'Molecular docking simulation',
          'Interaction prediction',
          'Toxicity assessment',
          'Side effect analysis',
          'Drug similarity finder'
        ],
        resumeValue: 'Drug discovery, machine learning, computational chemistry',
        inspirationLink: 'https://github.com'
      },
      {
        id: 'biotech-3',
        name: 'Lab Sample Management System',
        difficulty: 'Intermediate',
        techStack: ['Python', 'Flask', 'PostgreSQL', 'QR Codes'],
        problemStatement: 'Labs struggle with sample tracking, causing lost samples and wasted resources.',
        features: [
          'Sample tracking with QR codes',
          'Inventory management',
          'Test scheduling',
          'Results logging',
          'Report generation'
        ],
        resumeValue: 'Lab automation, database management, system design',
        inspirationLink: 'https://github.com'
      }
    ]
  },
  {
    id: 'aiml',
    name: 'AI/ML',
    icon: 'Code2',
    color: 'from-indigo-500 to-indigo-600',
    projects: [
      {
        id: 'aiml-1',
        name: 'Sentiment Analysis for Social Media',
        difficulty: 'Intermediate',
        techStack: ['Python', 'NLP libraries', 'TensorFlow', 'Flask'],
        problemStatement: 'Brands struggle to understand customer sentiment at scale across social platforms.',
        features: [
          'Multi-platform sentiment tracking',
          'Real-time analysis',
          'Trend detection',
          'Competitive analysis',
          'Actionable insights'
        ],
        resumeValue: 'NLP, machine learning, social media analysis',
        inspirationLink: 'https://github.com'
      },
      {
        id: 'aiml-2',
        name: 'Personalized Recommendation Engine',
        difficulty: 'Intermediate',
        techStack: ['Python', 'Scikit-learn', 'Collaborative filtering', 'Flask'],
        problemStatement: 'E-commerce platforms fail to provide personalized recommendations, reducing sales.',
        features: [
          'Collaborative filtering',
          'Content-based recommendations',
          'User behavior analysis',
          'A/B testing framework',
          'Real-time personalization'
        ],
        resumeValue: 'Recommendation systems, machine learning, algorithms',
        inspirationLink: 'https://github.com'
      },
      {
        id: 'aiml-3',
        name: 'Image Classification for Medical Diagnosis',
        difficulty: 'Advanced',
        techStack: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV'],
        problemStatement: 'Medical professionals need AI-assisted diagnosis tools to improve accuracy.',
        features: [
          'Disease detection in medical images',
          'Confidence scoring',
          'Multi-class classification',
          'Model explainability',
          'Performance metrics'
        ],
        resumeValue: 'Deep learning, medical AI, computer vision',
        inspirationLink: 'https://github.com'
      }
    ]
  },
  {
    id: 'datasci',
    name: 'Data Science',
    icon: 'Code2',
    color: 'from-cyan-500 to-cyan-600',
    projects: [
      {
        id: 'ds-1',
        name: 'Time Series Forecasting for Sales',
        difficulty: 'Intermediate',
        techStack: ['Python', 'Pandas', 'Statsmodels', 'Plotly'],
        problemStatement: 'Businesses struggle to forecast sales accurately, leading to inventory issues.',
        features: [
          'ARIMA/SARIMA modeling',
          'Seasonal trend analysis',
          'Confidence intervals',
          'Interactive dashboards',
          'Accuracy metrics'
        ],
        resumeValue: 'Time series analysis, forecasting, business intelligence',
        inspirationLink: 'https://github.com'
      },
      {
        id: 'ds-2',
        name: 'Customer Churn Prediction Model',
        difficulty: 'Intermediate',
        techStack: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit'],
        problemStatement: 'Companies lose customers without early warning signs or intervention strategies.',
        features: [
          'Churn prediction ML model',
          'Feature importance analysis',
          'Risk scoring',
          'Retention recommendations',
          'Interactive analytics'
        ],
        resumeValue: 'Predictive analytics, customer insights, ML deployment',
        inspirationLink: 'https://github.com'
      },
      {
        id: 'ds-3',
        name: 'Real Estate Price Prediction',
        difficulty: 'Beginner',
        techStack: ['Python', 'Pandas', 'Scikit-learn', 'Jupyter'],
        problemStatement: 'Real estate agents lack data-driven tools for accurate property valuation.',
        features: [
          'Price prediction model',
          'Feature analysis',
          'Market trend visualization',
          'Comparable properties',
          'Investment insights'
        ],
        resumeValue: 'Data analysis, regression modeling, visualization',
        inspirationLink: 'https://github.com'
      }
    ]
  },
  {
    id: 'cybersec',
    name: 'Cybersecurity',
    icon: 'Code2',
    color: 'from-rose-500 to-rose-600',
    projects: [
      {
        id: 'cyber-1',
        name: 'Network Intrusion Detection System',
        difficulty: 'Advanced',
        techStack: ['Python', 'Scapy', 'Machine Learning', 'Flask'],
        problemStatement: 'Networks lack intelligent systems to detect sophisticated cyber attacks in real-time.',
        features: [
          'Packet analysis and filtering',
          'Anomaly detection',
          'Attack signature matching',
          'Real-time alerts',
          'Incident logging'
        ],
        resumeValue: 'Network security, anomaly detection, threat intelligence',
        inspirationLink: 'https://github.com'
      },
      {
        id: 'cyber-2',
        name: 'Password Security Strength Validator',
        difficulty: 'Intermediate',
        techStack: ['Python', 'JavaScript', 'REST API', 'Node.js'],
        problemStatement: 'Users choose weak passwords that are vulnerable to attacks.',
        features: [
          'Real-time strength assessment',
          'Breach database checking',
          'Dictionary attack resistance',
          'Suggestions for stronger passwords',
          'Compliance checking'
        ],
        resumeValue: 'Authentication, security best practices, API design',
        inspirationLink: 'https://github.com'
      },
      {
        id: 'cyber-3',
        name: 'Security Audit Report Generator',
        difficulty: 'Beginner',
        techStack: ['Python', 'Flask', 'SQLite', 'ReportLab'],
        problemStatement: 'Organizations need automated security compliance audits with detailed reports.',
        features: [
          'Compliance checklist',
          'Vulnerability scanning',
          'Risk assessment',
          'PDF report generation',
          'Remediation tracking'
        ],
        resumeValue: 'Security assessment, compliance knowledge, report generation',
        inspirationLink: 'https://github.com'
      }
    ]
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-green-100 text-green-800';
    case 'Intermediate':
      return 'bg-yellow-100 text-yellow-800';
    case 'Advanced':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getBranchColor = (color: string) => `bg-gradient-to-r ${color}`;

export default function ProjectsPage() {
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const currentBranch = branches.find(b => b.id === selectedBranch);

  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-white py-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              <Code2 className="w-4 h-4" />
              Project Ideas for Students
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Real-World Engineering Projects
            </h1>
            <p className="text-lg text-gray-600">
              Build impressive portfolio projects across different engineering branches with detailed guidance, tech stacks, and inspiration
            </p>
          </div>

          {/* Branch Selection */}
          {!selectedBranch ? (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Select Your Branch</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {branches.map((branch) => (
                  <button
                    key={branch.id}
                    onClick={() => setSelectedBranch(branch.id)}
                    className={`${getBranchColor(branch.color)} text-white rounded-xl p-6 text-center font-semibold text-lg hover:shadow-lg transition-all transform hover:scale-105`}
                  >
                    {branch.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {/* Branch Header */}
              <div className="mb-8">
                <button
                  onClick={() => {
                    setSelectedBranch(null);
                    setExpandedProject(null);
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium mb-4 flex items-center gap-2"
                >
                  ← Back to Branches
                </button>
                <h2 className={`${getBranchColor(currentBranch?.color || '')} text-white rounded-xl p-6 text-3xl font-bold`}>
                  {currentBranch?.name}
                </h2>
              </div>

              {/* Projects Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {currentBranch?.projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
                  >
                    <div className="p-6">
                      {/* Project Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                            {project.difficulty}
                          </span>
                        </div>
                      </div>

                      {/* Problem Statement */}
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 font-medium mb-1">Problem Statement</p>
                        <p className="text-sm text-gray-700">{project.problemStatement}</p>
                      </div>

                      {/* Tech Stack */}
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 font-medium mb-2">Tech Stack</p>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech, idx) => (
                            <span key={idx} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg font-medium">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Features Preview */}
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 font-medium mb-2">Features</p>
                        <div className="max-h-20 overflow-hidden">
                          <ul className="text-sm text-gray-700 space-y-1">
                            {project.features.slice(0, 2).map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">•</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                            {project.features.length > 2 && (
                              <li className="text-blue-600 text-xs font-medium">
                                +{project.features.length - 2} more features
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>

                      {/* Resume Value */}
                      <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                        <p className="text-xs text-gray-600 font-medium mb-1">Resume Value</p>
                        <p className="text-sm text-purple-700">{project.resumeValue}</p>
                      </div>

                      {/* Expand/Collapse Button */}
                      <button
                        onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                        className="w-full text-blue-600 hover:text-blue-700 font-medium text-sm py-2 mb-3"
                      >
                        {expandedProject === project.id ? 'Show Less' : 'View All Features'}
                      </button>

                      {/* Expanded Content */}
                      {expandedProject === project.id && (
                        <div className="border-t pt-4 mt-4 space-y-4">
                          <div>
                            <p className="text-sm text-gray-600 font-medium mb-2">All Features</p>
                            <ul className="text-sm text-gray-700 space-y-2">
                              {project.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-green-600 font-bold">✓</span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <a
                            href={project.inspirationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View on GitHub
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
