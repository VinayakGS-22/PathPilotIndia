import { College, Scholarship, Exam, Career, MockTest, MockQuestion, LearningResource, PricingPlan } from '../types';

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir',
  'Ladakh', 'Puducherry', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu'
];

export const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English',
  'Computer Science', 'Economics', 'Accountancy', 'Business Studies',
  'History', 'Geography', 'Political Science', 'Psychology', 'Sociology',
  'Statistics', 'Electronics', 'Biotechnology', 'Information Technology'
];

export const EDUCATION_STAGES = [
  { value: 'school_8_10', label: 'School (Class 8-10)', description: 'Foundation years for career exploration' },
  { value: 'school_11_12', label: 'Higher Secondary (Class 11-12)', description: 'Stream selection and entrance prep' },
  { value: 'diploma', label: 'Diploma Student', description: 'Polytechnic or ITI courses' },
  { value: 'undergraduate', label: 'Undergraduate Student', description: 'Bachelor\'s degree programs' },
  { value: 'graduate', label: 'Graduate Student', description: 'Post-graduation and career advancement' },
  { value: 'parent_planning', label: 'Parent Planning for Child', description: 'Planning child\'s educational journey' }
] as const;

export const CAREER_INTERESTS = [
  'Engineering', 'Medicine', 'Pharmacy', 'Law', 'CA/Commerce',
  'MBA/Business', 'Design', 'Architecture', 'Pilot/Aviation',
  'Civil Services', 'State Government Jobs', 'Banking', 'Defence',
  'Teaching', 'Data Science', 'AI/ML', 'Cybersecurity', 'DevOps',
  'Technical Support', 'Software Development', 'Business Ideas',
  'Astrology', 'Skilled Trades', 'Healthcare', 'Media', 'Arts'
];

export const COLLEGE_CATEGORIES = [
  'Engineering', 'Medical', 'Pharmacy', 'Law', 'MBA', 'Commerce',
  'Design', 'Architecture', 'Aviation', 'Diploma', 'Polytechnic',
  'ITI', 'Arts', 'Science', 'Education', 'Hotel Management'
];

export const EXAM_CATEGORIES = [
  'Engineering', 'Medical', 'Law', 'Design', 'Architecture',
  'Government (12th Pass)', 'Government (Graduate)', 'Government (Engineering)',
  'Banking', 'SSC', 'UPSC', 'State PSC', 'Defence', 'Teaching', 'Management'
];

// Learning resources by domain
export const LEARNING_RESOURCES: Record<string, LearningResource[]> = {
  'Software Development': [
    { name: 'freeCodeCamp', category: 'Software Development', url: 'https://freecodecamp.org', type: 'platform', is_free: true, best_for: 'Full-stack web development' },
    { name: 'The Odin Project', category: 'Software Development', url: 'https://theodinproject.com', type: 'platform', is_free: true, best_for: 'Full-stack Ruby/JS development' },
    { name: 'LeetCode', category: 'Software Development', url: 'https://leetcode.com', type: 'platform', is_free: true, best_for: 'Coding interview practice' },
    { name: 'NeetCode', category: 'Software Development', url: 'https://neetcode.io', type: 'platform', is_free: true, best_for: 'Structured DSA practice' },
    { name: 'CS50 Harvard', category: 'Software Development', url: 'https://cs50.harvard.edu', type: 'course', is_free: true, best_for: 'Computer science fundamentals' },
  ],
  'Data Science': [
    { name: 'Kaggle', category: 'Data Science', url: 'https://kaggle.com', type: 'platform', is_free: true, best_for: 'ML competitions and datasets' },
    { name: 'Google Data Analytics', category: 'Data Science', url: 'https://coursera.org/professional-certificates/google-data-analytics', type: 'course', best_for: 'Data analytics fundamentals' },
    { name: 'StatQuest', category: 'Data Science', url: 'https://youtube.com/@statquest', type: 'youtube', is_free: true, best_for: 'Statistics concepts' },
    { name: 'Krish Naik', category: 'Data Science', url: 'https://youtube.com/@krishnaik', type: 'youtube', is_free: true, best_for: 'ML/AI tutorials' },
    { name: 'CampusX', category: 'Data Science', url: 'https://youtube.com/@CampusX', type: 'youtube', is_free: true, best_for: 'Complete data science roadmap' },
  ],
  'DevOps': [
    { name: 'KodeKloud', category: 'DevOps', url: 'https://kodekloud.com', type: 'platform', is_free: true, best_for: 'DevOps hands-on labs' },
    { name: 'TechWorld with Nana', category: 'DevOps', url: 'https://youtube.com/@TechWorldwithNana', type: 'youtube', is_free: true, best_for: 'DevOps tutorials' },
    { name: 'Docker Docs', category: 'DevOps', url: 'https://docs.docker.com', type: 'docs', is_free: true, best_for: 'Docker reference' },
    { name: 'Kubernetes Docs', category: 'DevOps', url: 'https://kubernetes.io/docs', type: 'docs', is_free: true, best_for: 'K8s reference' },
  ],
  'Cybersecurity': [
    { name: 'TryHackMe', category: 'Cybersecurity', url: 'https://tryhackme.com', type: 'platform', is_free: true, best_for: 'Hands-on security labs' },
    { name: 'PortSwigger Academy', category: 'Cybersecurity', url: 'https://portswigger.net/web-security', type: 'course', is_free: true, best_for: 'Web security' },
    { name: 'OWASP', category: 'Cybersecurity', url: 'https://owasp.org', type: 'docs', is_free: true, best_for: 'Security standards' },
    { name: 'John Hammond', category: 'Cybersecurity', url: 'https://youtube.com/@JohnHammond010', type: 'youtube', is_free: true, best_for: 'CTF walkthroughs' },
  ],
  'Technical Support': [
    { name: 'Postman Learning', category: 'Technical Support', url: 'https://learning.postman.com', type: 'docs', is_free: true, best_for: 'API testing' },
    { name: 'Linux Journey', category: 'Technical Support', url: 'https://linuxjourney.com', type: 'course', is_free: true, best_for: 'Linux fundamentals' },
    { name: 'Cisco Networking Basics', category: 'Technical Support', url: 'https://netacad.com', type: 'course', best_for: 'Networking fundamentals' },
    { name: 'Google IT Support', category: 'Technical Support', url: 'https://coursera.org/professional-certificates/google-it-support', type: 'course', best_for: 'IT support certification' },
  ],
};

// Expanded careers with detailed information
export const CAREERS: Career[] = [
  {
    id: 'software-developer',
    name: 'Software Developer',
    slug: 'software-developer',
    category: 'Engineering',
    description: 'Design and develop software applications and systems',
    what_they_do: 'Software developers create applications that run on computers, mobile devices, and web browsers. They analyze user needs, design solutions, write code, test applications, and maintain software systems.',
    who_should_choose: 'If you enjoy problem-solving, have logical thinking, and like building things from scratch, software development is for you. Strong analytical skills and attention to detail are essential.',
    subjects_required: ['Mathematics', 'Computer Science', 'Physics'],
    skills_to_learn: ['Programming', 'Data Structures', 'Algorithms', 'System Design', 'Version Control', 'Testing'],
    tools: ['Git', 'VS Code', 'Docker', 'AWS', 'PostgreSQL', 'React/Node'],
    salary_range: '₹4-50 LPA',
    future_demand_score: 95,
    risk_level: 'Low',
    roadmap: [
      { class: 'Class 8-10', actions: ['Focus on Mathematics and Science', 'Learn basic programming (Python/Scratch)', 'Join coding clubs', 'Start competitive programming basics'] },
      { class: 'Class 11-12', actions: ['Choose Science with Computer Science', 'Learn Data Structures & Algorithms', 'Prepare for JEE/entrance exams', 'Build small projects'] },
      { class: 'College', actions: ['Pursue B.Tech/B.E in Computer Science', 'Complete internships (2+ recommended)', 'Contribute to open source', 'Build a strong portfolio', 'Practice DSA on LeetCode'] },
      { class: 'Career Start', actions: ['Join as Software Developer', 'Learn cloud technologies', 'Consider MS or MBA later', 'Build domain expertise', 'Network and mentor'] }
    ],
    free_courses: LEARNING_RESOURCES['Software Development'],
    youtube_channels: ['Tech With Tim', 'Fireship', 'Traversy Media', 'The Primeagen'],
    certifications: ['AWS Developer Associate', 'Google Cloud Professional', 'Azure Developer'],
    interview_prep: 'Focus on DSA (LeetCode Medium+), System Design (Design Gurus), and behavioral questions (STAR method)',
    projects: ['Building a full-stack web app', 'Creating a mobile app', 'Contributing to open source', 'Building a CLI tool', 'Creating a Chrome extension'],
    alternative_careers: ['Data Scientist', 'Product Manager', 'Technical Lead', 'Engineering Manager']
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    slug: 'data-scientist',
    category: 'Data Science',
    description: 'Analyze and interpret complex data to help organizations make decisions',
    what_they_do: 'Data scientists collect, analyze, and interpret large datasets. They build predictive models, create visualizations, and provide insights that drive business decisions.',
    who_should_choose: 'If you love working with numbers, enjoy finding patterns, and want to solve real-world problems using data, data science is for you. Strong math and statistics background is a curious mindset, and storytelling skills are essential.',
    subjects_required: ['Mathematics', 'Statistics', 'Computer Science'],
    skills_to_learn: ['Python/R', 'SQL', 'Machine Learning', 'Statistics', 'Data Visualization', 'Deep Learning'],
    tools: ['Python', 'Pandas', 'Scikit-learn', 'TensorFlow', 'Tableau', 'Spark'],
    salary_range: '₹5-40 LPA',
    future_demand_score: 92,
    risk_level: 'Low',
    roadmap: [
      { class: 'Class 8-10', actions: ['Excel in Mathematics', 'Learn basic programming (Python)', 'Study statistics fundamentals', 'Participate in Math Olympiads'] },
      { class: 'Class 11-12', actions: ['Choose Science with Mathematics', 'Learn Python and R basics', 'Understand probability and statistics', 'Participate in Kaggle competitions'] },
      { class: 'College', actions: ['Pursue B.Tech/B.Sc in Data Science or Statistics', 'Master SQL and Python', 'Complete data science projects', 'Get internships', 'Build Kaggle profile'] },
      { class: 'Career Start', actions: ['Start as Data Analyst', 'Progress to Data Scientist', 'Specialize in ML or AI', 'Consider Masters', 'Build portfolio'] }
    ],
    free_courses: LEARNING_RESOURCES['Data Science'],
    youtube_channels: ['StatQuest', 'Krish Naik', 'CampusX', 'Data School'],
    certifications: ['Google Data Analytics', 'IBM Data Science', 'AWS Machine Learning'],
    interview_prep: 'Focus on SQL (LeetCode), Statistics concepts, ML algorithms, and case studies',
    projects: ['Building a recommendation system', 'Creating a prediction model', 'Analyzing real-world datasets', 'Building a dashboard'],
    alternative_careers: ['Machine Learning Engineer', 'Business Analyst', 'AI Researcher']
  },
  {
    id: 'cybersecurity-analyst',
    name: 'Cybersecurity Analyst',
    slug: 'cybersecurity-analyst',
    category: 'Cybersecurity',
    description: 'Protect organizations from cyber threats and ensure data security',
    what_they_do: 'Cybersecurity analysts monitor systems for security breaches, implement security measures, investigate incidents, and protect sensitive data from unauthorized access.',
    who_should_choose: 'If you are detail-oriented, enjoy solving puzzles, and want to protect organizations from threats, cybersecurity is for you. Ethical mindset and continuous learning are essential.',
    subjects_required: ['Computer Science', 'Mathematics', 'Physics', 'Electronics'],
    skills_to_learn: ['Network Security', 'Ethical Hacking', 'Incident Response', 'Cryptography', 'SIEM Tools', 'Penetration Testing'],
    tools: ['Wireshark', 'Burp Suite', 'Metasploit', 'Splunk', 'Kali Linux', 'Nmap'],
    salary_range: '₹4-35 LPA',
    future_demand_score: 90,
    risk_level: 'Low',
    roadmap: [
      { class: 'Class 8-10', actions: ['Learn networking basics', 'Understand operating systems', 'Start programming', 'Join CTF competitions'] },
      { class: 'Class 11-12', actions: ['Focus on Computer Science', 'Learn Linux basics', 'Understand ethical hacking', 'Start CTF practice'] },
      { class: 'College', actions: ['Pursue B.Tech in Cybersecurity or CSE', 'Get certified (CEH, OSCP)', 'Participate in bug bounties', 'Complete security internships'] },
      { class: 'Career Start', actions: ['Join Security Operations Center', 'Get advanced certifications', 'Build bug bounty profile', 'Specialize in a domain'] }
    ],
    free_courses: LEARNING_RESOURCES['Cybersecurity'],
    youtube_channels: ['John Hammond', 'LiveOverflow', 'NetworkChuck', 'David Bombal'],
    certifications: ['CEH', 'CompTIA Security+', 'OSCP', 'CISSP'],
    interview_prep: 'Focus on network protocols, OWASP Top 10, incident response scenarios, and hands-on CTF challenges',
    projects: ['Building a vulnerability scanner', 'Creating a honeypot', 'Setting up SIEM lab', 'CTF writeups'],
    alternative_careers: ['Penetration Tester', 'Security Architect', 'Security Consultant']
  },
  {
    id: 'devops-engineer',
    name: 'DevOps Engineer',
    slug: 'devops-engineer',
    category: 'DevOps',
    description: 'Bridge development and operations to deliver software faster and reliably',
    what_they_do: 'DevOps engineers implement CI/CD pipelines, manage cloud infrastructure, automate deployments, monitor systems, and ensure high availability and reliability.',
    who_should_choose: 'If you enjoy automation, working with multiple technologies, and solving infrastructure problems, DevOps is for you. Strong programming and system administration skills are essential.',
    subjects_required: ['Computer Science', 'Operating Systems', 'Networking'],
    skills_to_learn: ['Linux Administration', 'Cloud Platforms', 'CI/CD', 'Containerization', 'Infrastructure as Code', 'Monitoring'],
    tools: ['Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'AWS/Azure/GCP', 'Ansible', 'Prometheus', 'Grafana'],
    salary_range: '₹5-40 LPA',
    future_demand_score: 88,
    risk_level: 'Low',
    roadmap: [
      { class: 'Class 8-10', actions: ['Learn Linux basics', 'Understand computer networks', 'Start programming', 'Build simple servers'] },
      { class: 'Class 11-12', actions: ['Master Linux commands', 'Learn Python scripting', 'Understand version control', 'Explore cloud services'] },
      { class: 'College', actions: ['Learn Docker and Kubernetes', 'Set up CI/CD pipelines', 'Get cloud certifications', 'Complete DevOps internships'] },
      { class: 'Career Start', actions: ['Join as DevOps Engineer', 'Implement IaC', 'Master monitoring tools', 'Build automated pipelines'] }
    ],
    free_courses: LEARNING_RESOURCES['DevOps'],
    youtube_channels: ['TechWorld with Nana', 'KodeKloud', 'NetworkChuck', 'Hussein Nasser'],
    certifications: ['AWS DevOps Professional', 'CKA (Kubernetes)', 'GCP Professional Cloud DevOps'],
    interview_prep: 'Focus on CI/CD concepts, Docker/Kubernetes, Linux administration, and cloud services',
    projects: ['Building a complete CI/CD pipeline', 'Setting up Kubernetes cluster', 'Creating IaC templates', 'Implementing monitoring'],
    alternative_careers: ['Site Reliability Engineer', 'Cloud Architect', 'Platform Engineer']
  },
  {
    id: 'technical-support-engineer',
    name: 'Technical Support Engineer',
    slug: 'technical-support-engineer',
    category: 'Technical Support',
    description: 'Help customers solve technical issues and provide excellent support experience',
    what_they_do: 'Technical support engineers troubleshoot issues, provide solutions via phone/email/chat, document problems, and work with development teams to fix bugs.',
    who_should_choose: 'If you enjoy helping people, have strong communication skills, and like solving technical puzzles, technical support is for you. Patience and empathy are essential.',
    subjects_required: ['Computer Science', 'English'],
    skills_to_learn: ['Troubleshooting', 'Communication', 'SQL', 'Linux', 'Networking', 'Customer Service'],
    tools: ['Zendesk', 'Jira', 'SSH', 'Postman', 'VPN Tools', 'Database Tools'],
    salary_range: '₹3-15 LPA',
    future_demand_score: 82,
    risk_level: 'Low',
    roadmap: [
      { class: 'Class 8-10', actions: ['Learn computer basics', 'Practice English communication', 'Understand networking concepts', 'Help friends with tech issues'] },
      { class: 'Class 11-12', actions: ['Learn technical writing', 'Master troubleshooting techniques', 'Understand operating systems', 'Practice mock support calls'] },
      { class: 'College', actions: ['Get customer service experience', 'Learn ITIL basics', 'Master ticketing systems', 'Complete tech support internships'] },
      { class: 'Career Start', actions: ['Join tech support team', 'Get ITIL certified', 'Progress to Tier 2/3 support', 'Move to engineering roles'] }
    ],
    free_courses: LEARNING_RESOURCES['Technical Support'],
    youtube_channels: ['NetworkChuck', 'PowerCert Animated Videos', 'ITFreeTraining'],
    certifications: ['ITIL Foundation', 'CompTIA A+', 'Google IT Support'],
    interview_prep: 'Focus on troubleshooting methodology, customer scenarios, and technical knowledge',
    projects: ['Building a support knowledge base', 'Creating troubleshooting guides', 'Setting up a helpdesk system'],
    alternative_careers: ['System Administrator', 'Customer Success Manager', 'Sales Engineer']
  },
  {
    id: 'ai-ml-engineer',
    name: 'AI/ML Engineer',
    slug: 'ai-ml-engineer',
    category: 'AI/ML',
    description: 'Build intelligent systems that learn and improve from data',
    what_they_do: 'AI/ML engineers develop machine learning models, train neural networks, deploy AI solutions, and optimize model performance for real-world applications.',
    who_should_choose: 'If you love mathematics, enjoy building intelligent systems, and want to work on cutting-edge technology, AI/ML is for you. Strong math foundation and research skills are essential.',
    subjects_required: ['Mathematics', 'Statistics', 'Computer Science', 'Physics'],
    skills_to_learn: ['Deep Learning', 'Natural Language Processing', 'Computer Vision', 'MLOps', 'Mathematics for ML'],
    tools: ['TensorFlow', 'PyTorch', 'Hugging Face', 'OpenAI API', 'MLflow', 'Weights & Biases'],
    salary_range: '₹6-50 LPA',
    future_demand_score: 96,
    risk_level: 'Medium',
    roadmap: [
      { class: 'Class 8-10', actions: ['Master Mathematics', 'Learn Python programming', 'Understand basics of AI', 'Join science clubs'] },
      { class: 'Class 11-12', actions: ['Choose Science with Math', 'Learn statistics and linear algebra', 'Build simple ML models', 'Participate in AI competitions'] },
      { class: 'College', actions: ['Pursue B.Tech in AI/ML or CSE', 'Complete AI projects', 'Publish research papers', 'Get ML internships'] },
      { class: 'Career Start', actions: ['Join as ML Engineer', 'Specialize in NLP or CV', 'Build AI portfolio', 'Consider MS/PhD'] }
    ],
    youtube_channels: ['Andrej Karpathy', '3Blue1Brown', 'Lex Fridman', 'Two Minute Papers'],
    certifications: ['TensorFlow Developer', 'AWS ML Specialty', 'Google ML Engineer'],
    interview_prep: 'Focus on ML algorithms, system design for ML, and coding',
    projects: ['Building a chatbot', 'Image classification system', 'Recommendation engine', 'NLP pipeline'],
    alternative_careers: ['Data Scientist', 'Research Scientist', 'ML Architect']
  },
  {
    id: 'doctor',
    name: 'Doctor/Physician',
    slug: 'doctor',
    category: 'Medicine',
    description: 'Diagnose and treat illnesses, promote health and wellbeing',
    what_they_do: 'Doctors examine patients, diagnose diseases, prescribe treatments, perform procedures, and provide healthcare guidance.',
    who_should_choose: 'If you are compassionate, have strong academic abilities, and want to serve humanity, medicine is for you. Long study duration and continuous learning are essential.',
    subjects_required: ['Biology', 'Chemistry', 'Physics'],
    skills_to_learn: ['Clinical Examination', 'Diagnosis', 'Patient Communication', 'Medical Procedures', 'Research'],
    tools: ['Stethoscope', 'Medical Imaging Software', 'EMR Systems', 'Lab Equipment'],
    salary_range: '₹8-50 LPA',
    future_demand_score: 98,
    risk_level: 'Medium',
    roadmap: [
      { class: 'Class 8-10', actions: ['Focus on Biology and Science', 'Start NEET foundation course', 'Volunteer at hospitals', 'Read medical literature'] },
      { class: 'Class 11-12', actions: ['Choose PCB with high scores', 'Join NEET coaching', 'Take mock tests regularly', 'Score 650+ in NEET'] },
      { class: 'Medical College', actions: ['Pursue MBBS (5.5 years)', 'Complete internship', 'Prepare for PG entrance', 'Consider specialization'] },
      { class: 'Career Start', actions: ['Practice medicine', 'Pursue MD/MS', 'Consider super-specialization', 'Build patient trust'] }
    ],
    certifications: ['MBBS', 'MD/MS', 'DNB', 'Super-specialty degrees'],
    interview_prep: 'Focus on NEET preparation, clinical scenarios, and medical ethics',
    projects: ['Medical research', 'Community health projects', 'Clinical case studies'],
    alternative_careers: ['Dentist', 'Pharmacist', 'Veterinary Doctor', 'Medical Researcher']
  },
  {
    id: 'lawyer',
    name: 'Lawyer',
    slug: 'lawyer',
    category: 'Law',
    description: 'Practice law, provide legal advice, and represent clients in legal matters',
    what_they_do: 'Lawyers interpret laws, draft legal documents, represent clients in courts, negotiate settlements, and provide legal advice.',
    who_should_choose: 'If you have strong communication skills, enjoy debating, and want to uphold justice, law is for you. Critical thinking and research skills are essential.',
    subjects_required: ['English', 'Political Science', 'History'],
    skills_to_learn: ['Legal Research', 'Writing', 'Oral Advocacy', 'Negotiation', 'Case Analysis'],
    tools: ['Legal Databases', 'Court Filing Systems', 'Legal Research Software', 'Document Management'],
    salary_range: '₹4-30 LPA',
    future_demand_score: 85,
    risk_level: 'Medium',
    roadmap: [
      { class: 'Class 8-10', actions: ['Develop writing skills', 'Participate in debates', 'Study current affairs', 'Read legal articles'] },
      { class: 'Class 11-12', actions: ['Choose Humanities or Commerce', 'Prepare for CLAT', 'Read legal literature', 'Practice logical reasoning'] },
      { class: 'Law College', actions: ['Pursue BA LLB (5 years)', 'Intern at law firms', 'Participate in moot courts', 'Publish legal articles'] },
      { class: 'Career Start', actions: ['Start litigation or corporate practice', 'Build client base', 'Consider judiciary exams'] }
    ],
    certifications: ['BA LLB', 'LLM', 'Bar Council Registration'],
    interview_prep: 'Focus on current affairs, logical reasoning, and legal principles',
    projects: ['Moot court competitions', 'Legal aid clinics', 'Research publications'],
    alternative_careers: ['Corporate Lawyer', 'Judge', 'Legal Consultant', 'Civil Services']
  },
  {
    id: 'chartered-accountant',
    name: 'Chartered Accountant',
    slug: 'chartered-accountant',
    category: 'CA/Commerce',
    description: 'Manage financial accounts, audits, taxation, and advisory services',
    what_they_do: 'CAs handle financial auditing, tax consulting, corporate finance, and ensure regulatory compliance for organizations.',
    who_should_choose: 'If you are good with numbers, have attention to detail, and enjoy financial analysis, CA is for you. Discipline and perseverance are essential.',
    subjects_required: ['Accountancy', 'Mathematics', 'Economics'],
    skills_to_learn: ['Accounting', 'Taxation', 'Auditing', 'Financial Analysis', 'Business Law'],
    tools: ['Tally', 'SAP', 'Excel', 'Tax Filing Software', 'Accounting Software'],
    salary_range: '₹6-25 LPA',
    future_demand_score: 88,
    risk_level: 'Medium',
    roadmap: [
      { class: 'Class 8-10', actions: ['Focus on Mathematics', 'Understand basic accounting', 'Build analytical skills', 'Read business news'] },
      { class: 'Class 11-12', actions: ['Choose Commerce with Mathematics', 'Register for CA Foundation', 'Start CA preparation', 'Score well in boards'] },
      { class: 'CA Course', actions: ['Clear CA Foundation', 'Complete articleship (3 years)', 'Clear Intermediate and Final', 'Get practical experience'] },
      { class: 'Career Start', actions: ['Work at CA firm', 'Start practice', 'Join corporate finance', 'Build specialization'] }
    ],
    certifications: ['CA (ICAI)', 'CPA', 'ACCA'],
    interview_prep: 'Focus on accounting standards, taxation, and audit procedures',
    projects: ['Auditing projects', 'Tax return filing', 'Financial analysis'],
    alternative_careers: ['Cost Accountant', 'Company Secretary', 'Financial Analyst']
  },
  {
    id: 'civil-services',
    name: 'Civil Services (IAS/IPS/IFS)',
    slug: 'civil-services',
    category: 'Civil Services',
    description: 'Serve the nation through administrative positions in government',
    what_they_do: 'Civil servants implement government policies, manage public administration, and ensure development at national and state levels.',
    who_should_choose: 'If you want to serve the nation, have leadership qualities, and can handle responsibility, civil services is for you. Dedication, patience, and broad knowledge are essential.',
    subjects_required: ['History', 'Geography', 'Political Science', 'Economics'],
    skills_to_learn: ['Administration', 'Policy Analysis', 'Leadership', 'Public Speaking', 'Writing'],
    tools: ['Government Systems', 'Policy Analysis Tools', 'Official Communication Systems'],
    salary_range: '₹6-20 LPA (plus benefits)',
    future_demand_score: 95,
    risk_level: 'High',
    roadmap: [
      { class: 'Class 8-10', actions: ['Read newspapers daily', 'Study NCERT books', 'Develop writing skills', 'Understand governance'] },
      { class: 'Class 11-12', actions: ['Choose any stream (Humanities preferred)', 'Start UPSC basics', 'Stay updated on current affairs', 'Read standard books'] },
      { class: 'College', actions: ['Pursue graduation in any field', 'Join UPSC coaching', 'Start optional preparation', 'Practice answer writing'] },
      { class: 'Preparation', actions: ['Complete syllabus', 'Practice mock tests', 'Take interviews', 'Clear UPSC'] }
    ],
    certifications: ['UPSC Civil Services'],
    interview_prep: 'Focus on current affairs, polity, economics, and personality assessment',
    projects: ['Policy analysis', 'Social work', 'Public administration studies'],
    alternative_careers: ['State PSC', 'SSC Officers', 'Forest Service', 'Banking']
  },
  {
    id: 'product-manager',
    name: 'Product Manager',
    slug: 'product-manager',
    category: 'MBA/Business',
    description: 'Lead product development from ideation to launch and growth',
    what_they_do: 'Product managers define product strategy, work with engineering and design, prioritize features, and ensure product success in the market.',
    who_should_choose: 'If you are good at communication, enjoy strategy, and can work with multiple teams, product management is for you. Business acumen and technical understanding are essential.',
    subjects_required: ['Business Studies', 'Economics', 'Mathematics'],
    skills_to_learn: ['Product Strategy', 'User Research', 'Analytics', 'Roadmapping', 'Stakeholder Management'],
    tools: ['Jira', 'Figma', 'Google Analytics', 'Amplitude', 'Notion', 'Miro'],
    salary_range: '₹8-50 LPA',
    future_demand_score: 90,
    risk_level: 'Low',
    roadmap: [
      { class: 'Class 8-10', actions: ['Develop communication skills', 'Learn about technology', 'Participate in competitions', 'Build leadership qualities'] },
      { class: 'Class 11-12', actions: ['Choose any stream', 'Focus on business fundamentals', 'Learn basics of technology', 'Start a small project'] },
      { class: 'College', actions: ['Pursue BBA or Engineering', 'Get internships in product companies', 'Build projects', 'Understand user research'] },
      { class: 'Career Start', actions: ['Join as Associate PM', 'Build product sense', 'Get MBA optionally', 'Progress to PM'] }
    ],
    certifications: ['Google PM Certificate', 'Product School', 'Pragmatic Institute'],
    interview_prep: 'Focus on product sense, estimation, and behavioral questions',
    projects: ['Launching a product', 'User research project', 'Product strategy document'],
    alternative_careers: ['Engineering Manager', 'Business Analyst', 'Strategy Consultant']
  }
];

// Colleges expanded to 150+
export const COLLEGES: College[] = generateColleges();

function generateColleges(): College[] {
  const colleges: College[] = [
    // Karnataka Engineering
    { id: 'rvce', name: 'RV College of Engineering', city: 'Bangalore', state: 'Karnataka', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['KCET', 'COMEDK'], fees_min: 200000, fees_max: 500000, average_package: '₹8-12 LPA', website: 'https://rvce.edu.in', source_url: 'https://rvce.edu.in/fee-structure', type: 'private', ranking_tier: 'Tier 1', established_year: 1963, placement_percentage: 95 },
    { id: 'ramaiah', name: 'Ramaiah Institute of Technology', city: 'Bangalore', state: 'Karnataka', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Electrical', 'Mechanical'], exams: ['KCET', 'COMEDK'], fees_min: 150000, fees_max: 400000, average_package: '₹6-10 LPA', website: 'https://msrit.edu', source_url: 'https://msrit.edu/fee-structure', type: 'private', ranking_tier: 'Tier 1', established_year: 1962, placement_percentage: 90 },
    { id: 'bms', name: 'BMS College of Engineering', city: 'Bangalore', state: 'Karnataka', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Information Science'], exams: ['KCET', 'COMEDK'], fees_min: 150000, fees_max: 400000, average_package: '₹7-11 LPA', website: 'https://bmsce.ac.in', type: 'private', ranking_tier: 'Tier 1', established_year: 1946, placement_percentage: 92 },
    { id: 'pes', name: 'PES University', city: 'Bangalore', state: 'Karnataka', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Biotechnology'], exams: ['PESSAT', 'KCET'], fees_min: 250000, fees_max: 500000, average_package: '₹8-14 LPA', website: 'https://pes.edu', type: 'private', ranking_tier: 'Tier 1', established_year: 1972, placement_percentage: 94 },
    { id: 'bit', name: 'Bangalore Institute of Technology', city: 'Bangalore', state: 'Karnataka', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['KCET', 'COMEDK'], fees_min: 100000, fees_max: 200000, average_package: '₹5-8 LPA', website: 'https://bit-bangalore.edu.in', type: 'private', ranking_tier: 'Tier 2', established_year: 1979, placement_percentage: 85 },
    { id: 'dsce', name: 'Dayananda Sagar College of Engineering', city: 'Bangalore', state: 'Karnataka', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Aerospace'], exams: ['KCET', 'COMEDK'], fees_min: 150000, fees_max: 300000, average_package: '₹5-9 LPA', website: 'https://dsce.edu.in', type: 'private', ranking_tier: 'Tier 2', established_year: 1979, placement_percentage: 88 },
    { id: 'nie', name: 'NIE Mysuru', city: 'Mysuru', state: 'Karnataka', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['KCET', 'COMEDK'], fees_min: 100000, fees_max: 200000, average_package: '₹5-8 LPA', website: 'https://nie.ac.in', type: 'private', ranking_tier: 'Tier 2', established_year: 1946, placement_percentage: 87 },
    { id: 'jss', name: 'JSS Science and Technology University', city: 'Mysuru', state: 'Karnataka', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Industrial'], exams: ['KCET', 'COMEDK'], fees_min: 100000, fees_max: 200000, average_package: '₹5-9 LPA', website: 'https://jssstuniv.in', type: 'private', ranking_tier: 'Tier 2', established_year: 1963, placement_percentage: 86 },
    { id: 'manipal', name: 'Manipal Institute of Technology', city: 'Manipal', state: 'Karnataka', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Aerospace', 'Biotech'], exams: ['MET'], fees_min: 350000, fees_max: 600000, average_package: '₹8-15 LPA', website: 'https://manipal.edu/mit', type: 'private', ranking_tier: 'Tier 1', established_year: 1957, placement_percentage: 93 },
    { id: 'nitk', name: 'NIT Surathkal', city: 'Surathkal', state: 'Karnataka', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Chemical'], exams: ['JEE Main'], fees_min: 100000, fees_max: 200000, average_package: '₹12-18 LPA', website: 'https://nitk.edu.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1960, placement_percentage: 95 },
    { id: 'iisc', name: 'IISc Bengaluru', city: 'Bangalore', state: 'Karnataka', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Research Programs'], exams: ['JEE Advanced', 'GATE'], fees_min: 50000, fees_max: 100000, average_package: '₹15-25 LPA', website: 'https://iisc.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1909, placement_percentage: 98 },
    { id: 'iiit-b', name: 'IIIT Bangalore', city: 'Bangalore', state: 'Karnataka', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'AI', 'Data Science'], exams: ['JEE Main', 'GATE'], fees_min: 200000, fees_max: 300000, average_package: '₹14-22 LPA', website: 'https://iiitb.ac.in', type: 'private', ranking_tier: 'Tier 1', established_year: 1999, placement_percentage: 96 },
    // Tamil Nadu
    { id: 'vit', name: 'VIT Vellore', city: 'Vellore', state: 'Tamil Nadu', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Biotech', 'Data Science'], exams: ['VITEEE'], fees_min: 250000, fees_max: 500000, average_package: '₹8-16 LPA', website: 'https://vit.ac.in', type: 'private', ranking_tier: 'Tier 1', established_year: 1984, placement_percentage: 94 },
    { id: 'srm', name: 'SRM Institute of Science and Technology', city: 'Chennai', state: 'Tamil Nadu', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Biomedical'], exams: ['SRMJEEE'], fees_min: 250000, fees_max: 500000, average_package: '₹6-12 LPA', website: 'https://srmist.edu.in', type: 'private', ranking_tier: 'Tier 1', established_year: 1985, placement_percentage: 90 },
    { id: 'iitm', name: 'IIT Madras', city: 'Chennai', state: 'Tamil Nadu', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical'], exams: ['JEE Advanced'], fees_min: 100000, fees_max: 200000, average_package: '₹16-28 LPA', website: 'https://iitm.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1959, placement_percentage: 97 },
    { id: 'nitt', name: 'NIT Trichy', city: 'Tiruchirappalli', state: 'Tamil Nadu', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Production'], exams: ['JEE Main'], fees_min: 100000, fees_max: 200000, average_package: '₹10-16 LPA', website: 'https://nitt.edu', type: 'government', ranking_tier: 'Tier 1', established_year: 1964, placement_percentage: 94 },
    { id: 'anna', name: 'Anna University', city: 'Chennai', state: 'Tamil Nadu', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['TNEA'], fees_min: 50000, fees_max: 100000, average_package: '₹6-10 LPA', website: 'https://annauniv.edu', type: 'government', ranking_tier: 'Tier 2', established_year: 1978, placement_percentage: 85 },
    { id: 'amrita', name: 'Amrita Vishwa Vidyapeetham', city: 'Coimbatore', state: 'Tamil Nadu', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Aerospace'], exams: ['AEEE'], fees_min: 250000, fees_max: 400000, average_package: '₹7-12 LPA', website: 'https://amrita.edu', type: 'private', ranking_tier: 'Tier 1', established_year: 2003, placement_percentage: 92 },
    { id: 'sastha', name: 'SASTRA University', city: 'Thanjavur', state: 'Tamil Nadu', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['JEE Main/12th Marks'], fees_min: 150000, fees_max: 250000, average_package: '₹5-9 LPA', website: 'https://sastra.edu', type: 'private', ranking_tier: 'Tier 2', established_year: 1984, placement_percentage: 88 },
    // Maharashtra
    { id: 'iitb', name: 'IIT Bombay', city: 'Mumbai', state: 'Maharashtra', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Aerospace', 'Civil'], exams: ['JEE Advanced'], fees_min: 100000, fees_max: 200000, average_package: '₹18-30 LPA', website: 'https://iitb.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1958, placement_percentage: 98 },
    { id: 'vjti', name: 'VJTI Mumbai', city: 'Mumbai', state: 'Maharashtra', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Production'], exams: ['MHT CET'], fees_min: 50000, fees_max: 100000, average_package: '₹8-14 LPA', website: 'https://vjti.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1887, placement_percentage: 90 },
    { id: 'coep', name: 'College of Engineering Pune', city: 'Pune', state: 'Maharashtra', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['MHT CET'], fees_min: 100000, fees_max: 200000, average_package: '₹8-12 LPA', website: 'https://coep.org.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1854, placement_percentage: 89 },
    { id: 'spce', name: 'SPCE Mumbai', city: 'Mumbai', state: 'Maharashtra', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['MHT CET'], fees_min: 150000, fees_max: 250000, average_package: '₹7-11 LPA', website: 'https://spce.ac.in', type: 'private', ranking_tier: 'Tier 2', established_year: 1962, placement_percentage: 87 },
    { id: 'pict', name: 'Pune Institute of Computer Technology', city: 'Pune', state: 'Maharashtra', category: 'Engineering', courses: ['Computer Science', 'Information Technology', 'Electronics'], exams: ['MHT CET'], fees_min: 150000, fees_max: 250000, average_package: '₹6-10 LPA', website: 'https://pict.edu', type: 'private', ranking_tier: 'Tier 2', established_year: 1983, placement_percentage: 88 },
    { id: 'vit-pune', name: 'Vishwakarma Institute of Technology', city: 'Pune', state: 'Maharashtra', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['MHT CET'], fees_min: 150000, fees_max: 250000, average_package: '₹6-9 LPA', website: 'https://vit.edu', type: 'private', ranking_tier: 'Tier 2', established_year: 1983, placement_percentage: 85 },
    // Delhi NCR
    { id: 'iitd', name: 'IIT Delhi', city: 'New Delhi', state: 'Delhi', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Textile', 'Civil'], exams: ['JEE Advanced'], fees_min: 100000, fees_max: 200000, average_package: '₹18-32 LPA', website: 'https://iitd.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1961, placement_percentage: 97 },
    { id: 'dtu', name: 'Delhi Technological University', city: 'New Delhi', state: 'Delhi', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['JEE Main'], fees_min: 150000, fees_max: 200000, average_package: '₹9-15 LPA', website: 'https://dtu.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1941, placement_percentage: 92 },
    { id: 'nsut', name: 'Netaji Subhas University of Technology', city: 'New Delhi', state: 'Delhi', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'IT', 'Manufacturing'], exams: ['JEE Main'], fees_min: 150000, fees_max: 200000, average_package: '₹10-16 LPA', website: 'https://nsut.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1983, placement_percentage: 93 },
    { id: 'iiitd', name: 'IIIT Delhi', city: 'New Delhi', state: 'Delhi', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'AI', 'Data Science'], exams: ['JEE Main'], fees_min: 250000, fees_max: 350000, average_package: '₹14-20 LPA', website: 'https://iiitd.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 2008, placement_percentage: 95 },
    { id: 'jmi', name: 'Jamia Millia Islamia', city: 'New Delhi', state: 'Delhi', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['JEE Main'], fees_min: 50000, fees_max: 100000, average_package: '₹6-10 LPA', website: 'https://jmi.ac.in', type: 'government', ranking_tier: 'Tier 2', established_year: 1920, placement_percentage: 80 },
    // West Bengal
    { id: 'jadavpur', name: 'Jadavpur University', city: 'Kolkata', state: 'West Bengal', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Chemical'], exams: ['WBJEE'], fees_min: 10000, fees_max: 50000, average_package: '₹8-14 LPA', website: 'https://jaduniv.edu.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1955, placement_percentage: 88 },
    { id: 'kgec', name: 'Kalyani Government Engineering College', city: 'Kalyani', state: 'West Bengal', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['WBJEE'], fees_min: 20000, fees_max: 50000, average_package: '₹5-8 LPA', website: 'https://kgec.edu.in', type: 'government', ranking_tier: 'Tier 2', established_year: 1995, placement_percentage: 75 },
    { id: 'heritage', name: 'Heritage Institute of Technology', city: 'Kolkata', state: 'West Bengal', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['WBJEE'], fees_min: 150000, fees_max: 250000, average_package: '₹5-8 LPA', website: 'https://heritageit.edu', type: 'private', ranking_tier: 'Tier 2', established_year: 2001, placement_percentage: 80 },
    // Telangana
    { id: 'iith', name: 'IIT Hyderabad', city: 'Hyderabad', state: 'Telangana', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Design'], exams: ['JEE Advanced'], fees_min: 100000, fees_max: 200000, average_package: '₹15-25 LPA', website: 'https://iith.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 2008, placement_percentage: 96 },
    { id: 'iiit-h', name: 'IIIT Hyderabad', city: 'Hyderabad', state: 'Telangana', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'AI', 'Data Science'], exams: ['JEE Main', 'JEE Advanced'], fees_min: 200000, fees_max: 300000, average_package: '₹15-25 LPA', website: 'https://iiit.ac.in', type: 'private', ranking_tier: 'Tier 1', established_year: 1998, placement_percentage: 97 },
    { id: 'jntuh', name: 'JNTU Hyderabad', city: 'Hyderabad', state: 'Telangana', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['EAMCET'], fees_min: 50000, fees_max: 100000, average_package: '₹6-10 LPA', website: 'https://jntuh.ac.in', type: 'government', ranking_tier: 'Tier 2', established_year: 1965, placement_percentage: 82 },
    { id: 'bits-hyderabad', name: 'BITS Hyderabad', city: 'Hyderabad', state: 'Telangana', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Biotech'], exams: ['BITSAT'], fees_min: 400000, fees_max: 500000, average_package: '₹12-19 LPA', website: 'https://hyderabad.bits-pilani.ac.in', type: 'private', ranking_tier: 'Tier 1', established_year: 2008, placement_percentage: 95 },
    // Rajasthan
    { id: 'bits-pilani', name: 'BITS Pilani', city: 'Pilani', state: 'Rajasthan', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Chemical', 'Biotech'], exams: ['BITSAT'], fees_min: 400000, fees_max: 500000, average_package: '₹12-20 LPA', website: 'https://bits-pilani.ac.in', type: 'private', ranking_tier: 'Tier 1', established_year: 1964, placement_percentage: 96 },
    { id: 'mnit', name: 'MNIT Jaipur', city: 'Jaipur', state: 'Rajasthan', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['JEE Main'], fees_min: 100000, fees_max: 200000, average_package: '₹10-16 LPA', website: 'https://mnit.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1963, placement_percentage: 90 },
    { id: 'muj', name: 'Manipal University Jaipur', city: 'Jaipur', state: 'Rajasthan', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Design'], exams: ['MET'], fees_min: 250000, fees_max: 400000, average_package: '₹6-10 LPA', website: 'https://jaipur.manipal.edu', type: 'private', ranking_tier: 'Tier 2', established_year: 2011, placement_percentage: 85 },
    { id: 'skit', name: 'SKIT Jaipur', city: 'Jaipur', state: 'Rajasthan', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['REAP'], fees_min: 150000, fees_max: 250000, average_package: '₹5-8 LPA', website: 'https://skit.ac.in', type: 'private', ranking_tier: 'Tier 2', established_year: 1981, placement_percentage: 78 },
    // Gujarat
    { id: 'iitg', name: 'IIT Gandhinagar', city: 'Gandhinagar', state: 'Gujarat', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['JEE Advanced'], fees_min: 100000, fees_max: 200000, average_package: '₹12-20 LPA', website: 'https://iitgn.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 2008, placement_percentage: 90 },
    { id: 'nits', name: 'NIT Surat', city: 'Surat', state: 'Gujarat', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['JEE Main'], fees_min: 100000, fees_max: 200000, average_package: '₹8-14 LPA', website: 'https://svnit.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1961, placement_percentage: 88 },
    { id: 'da-iict', name: 'Dhirubhai Ambani IICT', city: 'Gandhinagar', state: 'Gujarat', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'IT'], exams: ['GUJCET'], fees_min: 200000, fees_max: 300000, average_package: '₹8-14 LPA', website: 'https://daiict.ac.in', type: 'private', ranking_tier: 'Tier 2', established_year: 2001, placement_percentage: 90 },
    // Madhya Pradesh
    { id: 'iiti', name: 'IIT Indore', city: 'Indore', state: 'Madhya Pradesh', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['JEE Advanced'], fees_min: 100000, fees_max: 200000, average_package: '₹14-22 LPA', website: 'https://iiti.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 2009, placement_percentage: 92 },
    { id: 'manit', name: 'MANIT Bhopal', city: 'Bhopal', state: 'Madhya Pradesh', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['JEE Main'], fees_min: 100000, fees_max: 200000, average_package: '₹8-14 LPA', website: 'https://manit.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1960, placement_percentage: 85 },
    // Odisha
    { id: 'iitbbs', name: 'IIT Bhubaneswar', city: 'Bhubaneswar', state: 'Odisha', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['JEE Advanced'], fees_min: 100000, fees_max: 200000, average_package: '₹12-18 LPA', website: 'https://iitbbs.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 2008, placement_percentage: 90 },
    { id: 'nitrkl', name: 'NIT Rourkela', city: 'Rourkela', state: 'Odisha', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Chemical'], exams: ['JEE Main'], fees_min: 100000, fees_max: 200000, average_package: '₹8-14 LPA', website: 'https://nitrkl.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1961, placement_percentage: 88 },
    // Kerala
    { id: 'iitpkd', name: 'IIT Palakkad', city: 'Palakkad', state: 'Kerala', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['JEE Advanced'], fees_min: 100000, fees_max: 200000, average_package: '₹10-16 LPA', website: 'https://iitpkd.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 2015, placement_percentage: 88 },
    { id: 'nitc', name: 'NIT Calicut', city: 'Calicut', state: 'Kerala', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['JEE Main'], fees_min: 100000, fees_max: 200000, average_package: '₹8-14 LPA', website: 'https://nitc.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1961, placement_percentage: 90 },
    { id: 'cusat', name: 'CUSAT', city: 'Kochi', state: 'Kerala', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['CUSAT CAT'], fees_min: 75000, fees_max: 150000, average_package: '₹6-10 LPA', website: 'https://cusat.ac.in', type: 'government', ranking_tier: 'Tier 2', established_year: 1971, placement_percentage: 80 },
    // Andhra Pradesh
    { id: 'iitt', name: 'IIT Tirupati', city: 'Tirupati', state: 'Andhra Pradesh', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['JEE Advanced'], fees_min: 100000, fees_max: 200000, average_package: '₹10-16 LPA', website: 'https://iittp.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 2015, placement_percentage: 85 },
    { id: 'nitw', name: 'NIT Warangal', city: 'Warangal', state: 'Andhra Pradesh', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['JEE Main'], fees_min: 100000, fees_max: 200000, average_package: '₹10-16 LPA', website: 'https://nitw.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1959, placement_percentage: 92 },
    // Punjab
    { id: 'thapar', name: 'Thapar Institute', city: 'Patiala', state: 'Punjab', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Biotech'], exams: ['JEE Main'], fees_min: 300000, fees_max: 400000, average_package: '₹10-16 LPA', website: 'https://thapar.edu', type: 'private', ranking_tier: 'Tier 1', established_year: 1956, placement_percentage: 92 },
    { id: 'pec', name: 'PEC Chandigarh', city: 'Chandigarh', state: 'Punjab', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['JEE Main'], fees_min: 150000, fees_max: 250000, average_package: '₹10-15 LPA', website: 'https://pec.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1921, placement_percentage: 90 },
    // Uttar Pradesh
    { id: 'iitk', name: 'IIT Kanpur', city: 'Kanpur', state: 'Uttar Pradesh', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Aerospace'], exams: ['JEE Advanced'], fees_min: 100000, fees_max: 200000, average_package: '₹16-28 LPA', website: 'https://iitk.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1959, placement_percentage: 97 },
    { id: 'iitbhu', name: 'IIT BHU', city: 'Varanasi', state: 'Uttar Pradesh', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['JEE Advanced'], fees_min: 100000, fees_max: 200000, average_package: '₹14-22 LPA', website: 'https://iitbhu.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1919, placement_percentage: 90 },
    { id: 'mnnit', name: 'MNNIT Allahabad', city: 'Prayagraj', state: 'Uttar Pradesh', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['JEE Main'], fees_min: 100000, fees_max: 200000, average_package: '₹10-16 LPA', website: 'https://mnnit.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1961, placement_percentage: 88 },
    { id: 'hbtu', name: 'HBTU Kanpur', city: 'Kanpur', state: 'Uttar Pradesh', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Chemical'], exams: ['UPSEE'], fees_min: 150000, fees_max: 250000, average_package: '₹8-12 LPA', website: 'https://hbtu.ac.in', type: 'government', ranking_tier: 'Tier 2', established_year: 1920, placement_percentage: 80 },
    // Uttarakhand
    { id: 'iitr', name: 'IIT Roorkee', city: 'Roorkee', state: 'Uttarakhand', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['JEE Advanced'], fees_min: 100000, fees_max: 200000, average_package: '₹14-22 LPA', website: 'https://iitr.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1847, placement_percentage: 92 },
    { id: 'nituk', name: 'NIT Uttarakhand', city: 'Srinagar', state: 'Uttarakhand', category: 'Engineering', courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'], exams: ['JEE Main'], fees_min: 100000, fees_max: 200000, average_package: '₹6-10 LPA', website: 'https://nituk.ac.in', type: 'government', ranking_tier: 'Tier 2', established_year: 2010, placement_percentage: 75 },
    // Medical Colleges
    { id: 'aiims-delhi', name: 'AIIMS Delhi', city: 'New Delhi', state: 'Delhi', category: 'Medical', courses: ['MBBS', 'Nursing', 'Paramedical', 'Research'], exams: ['NEET'], fees_min: 5000, fees_max: 50000, average_package: '₹15-30 LPA', website: 'https://aiims.edu', type: 'government', ranking_tier: 'Tier 1', established_year: 1956, placement_percentage: 100 },
    { id: 'cmc', name: 'Christian Medical College', city: 'Vellore', state: 'Tamil Nadu', category: 'Medical', courses: ['MBBS', 'Nursing', 'Allied Health'], exams: ['NEET'], fees_min: 50000, fees_max: 200000, average_package: '₹12-25 LPA', website: 'https://cmcvellore.edu.in', type: 'private', ranking_tier: 'Tier 1', established_year: 1900, placement_percentage: 100 },
    { id: 'afmc', name: 'Armed Forces Medical College', city: 'Pune', state: 'Maharashtra', category: 'Medical', courses: ['MBBS', 'PG Courses'], exams: ['NEET'], fees_min: 0, fees_max: 0, average_package: 'Military Service', website: 'https://afmc.nic.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1948, placement_percentage: 100 },
    { id: 'jipmer', name: 'JIPMER Puducherry', city: 'Puducherry', state: 'Puducherry', category: 'Medical', courses: ['MBBS', 'Nursing', 'PG Courses'], exams: ['NEET'], fees_min: 5000, fees_max: 50000, average_package: '₹12-25 LPA', website: 'https://jipmer.edu.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1823, placement_percentage: 100 },
    { id: 'mamc', name: 'MAMC Delhi', city: 'New Delhi', state: 'Delhi', category: 'Medical', courses: ['MBBS', 'PG Courses'], exams: ['NEET'], fees_min: 20000, fees_max: 50000, average_package: '₹10-20 LPA', website: 'https://mamc.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1959, placement_percentage: 100 },
    { id: 'kmc', name: 'Kasturba Medical College', city: 'Manipal', state: 'Karnataka', category: 'Medical', courses: ['MBBS', 'PG Courses'], exams: ['NEET'], fees_min: 500000, fees_max: 700000, average_package: '₹12-22 LPA', website: 'https://manipal.edu/kmc', type: 'private', ranking_tier: 'Tier 1', established_year: 1953, placement_percentage: 98 },
    { id: 'kgmu', name: 'KG Medical University', city: 'Lucknow', state: 'Uttar Pradesh', category: 'Medical', courses: ['MBBS', 'PG Courses'], exams: ['NEET'], fees_min: 50000, fees_max: 100000, average_package: '₹8-16 LPA', website: 'https://kgmu.org', type: 'government', ranking_tier: 'Tier 2', established_year: 1911, placement_percentage: 95 },
    { id: 'bhU-med', name: 'IMS BHU', city: 'Varanasi', state: 'Uttar Pradesh', category: 'Medical', courses: ['MBBS', 'PG Courses'], exams: ['NEET'], fees_min: 40000, fees_max: 80000, average_package: '₹10-18 LPA', website: 'https://bhu.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1960, placement_percentage: 98 },
    // Law Colleges
    { id: 'nlsiu', name: 'NLSIU Bengaluru', city: 'Bangalore', state: 'Karnataka', category: 'Law', courses: ['BA LLB', 'BBA LLB', 'LLM', 'PhD'], exams: ['CLAT'], fees_min: 200000, fees_max: 300000, average_package: '₹15-25 LPA', website: 'https://nls.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1987, placement_percentage: 95 },
    { id: 'nalsar', name: 'NALSAR Hyderabad', city: 'Hyderabad', state: 'Telangana', category: 'Law', courses: ['BA LLB', 'BBA LLB', 'LLM'], exams: ['CLAT'], fees_min: 200000, fees_max: 300000, average_package: '₹14-22 LPA', website: 'https://nalsar.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1998, placement_percentage: 94 },
    { id: 'nlud', name: 'NLUD Delhi', city: 'New Delhi', state: 'Delhi', category: 'Law', courses: ['BA LLB', 'BBA LLB', 'LLM'], exams: ['AILET'], fees_min: 200000, fees_max: 300000, average_package: '₹15-24 LPA', website: 'https://nludelhi.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 2008, placement_percentage: 93 },
    { id: 'nujs', name: 'NUJS Kolkata', city: 'Kolkata', state: 'West Bengal', category: 'Law', courses: ['BA LLB', 'BBA LLB', 'LLM'], exams: ['CLAT'], fees_min: 180000, fees_max: 280000, average_package: '₹12-20 LPA', website: 'https://nujs.edu', type: 'government', ranking_tier: 'Tier 1', established_year: 1999, placement_percentage: 90 },
    { id: 'jindal-law', name: 'Jindal Global Law School', city: 'Sonipat', state: 'Haryana', category: 'Law', courses: ['BA LLB', 'BBA LLB', 'LLM'], exams: ['LSAT', 'CLAT'], fees_min: 500000, fees_max: 800000, average_package: '₹12-20 LPA', website: 'https://jgu.edu.in/jgls', type: 'private', ranking_tier: 'Tier 1', established_year: 2009, placement_percentage: 88 },
    { id: 'slsr', name: 'SLS Pune', city: 'Pune', state: 'Maharashtra', category: 'Law', courses: ['BA LLB', 'BBA LLB', 'LLM'], exams: ['SLAT'], fees_min: 250000, fees_max: 400000, average_package: '₹10-16 LPA', website: 'https://symbiosis.edu', type: 'private', ranking_tier: 'Tier 1', established_year: 1977, placement_percentage: 85 },
    // MBA Colleges
    { id: 'iima', name: 'IIM Ahmedabad', city: 'Ahmedabad', state: 'Gujarat', category: 'MBA', courses: ['PGP', 'PGPX', 'PhD'], exams: ['CAT'], fees_min: 250000, fees_max: 300000, average_package: '₹25-35 LPA', website: 'https://iima.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1961, placement_percentage: 100 },
    { id: 'iimb', name: 'IIM Bangalore', city: 'Bangalore', state: 'Karnataka', category: 'MBA', courses: ['PGP', 'PGPEX', 'PhD'], exams: ['CAT'], fees_min: 230000, fees_max: 280000, average_package: '₹25-32 LPA', website: 'https://iimb.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1973, placement_percentage: 100 },
    { id: 'iimc', name: 'IIM Calcutta', city: 'Kolkata', state: 'West Bengal', category: 'MBA', courses: ['PGP', 'PGPEX', 'PhD'], exams: ['CAT'], fees_min: 240000, fees_max: 300000, average_package: '₹25-35 LPA', website: 'https://iimcal.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1961, placement_percentage: 100 },
    { id: 'xlri', name: 'XLRI Jamshedpur', city: 'Jamshedpur', state: 'Jharkhand', category: 'MBA', courses: ['HRM', 'BM', 'GM'], exams: ['XAT'], fees_min: 250000, fees_max: 350000, average_package: '₹25-30 LPA', website: 'https://xlri.ac.in', type: 'private', ranking_tier: 'Tier 1', established_year: 1949, placement_percentage: 100 },
    { id: 'isb', name: 'ISB Hyderabad', city: 'Hyderabad', state: 'Telangana', category: 'MBA', courses: ['PGP', 'PGPMAX'], exams: ['GMAT/GRE'], fees_min: 350000, fees_max: 400000, average_package: '₹28-34 LPA', website: 'https://isb.edu', type: 'private', ranking_tier: 'Tier 1', established_year: 2001, placement_percentage: 100 },
    { id: 'nmims-mba', name: 'NMIMS Mumbai', city: 'Mumbai', state: 'Maharashtra', category: 'MBA', courses: ['MBA', 'MBA HR', 'MBA Law'], exams: ['NMAT'], fees_min: 400000, fees_max: 600000, average_package: '₹18-26 LPA', website: 'https://nmims.edu', type: 'private', ranking_tier: 'Tier 1', established_year: 1981, placement_percentage: 98 },
    { id: 'spjimr', name: 'SP Jain Mumbai', city: 'Mumbai', state: 'Maharashtra', category: 'MBA', courses: ['PGDM', 'PGPM'], exams: ['CAT/GMAT'], fees_min: 300000, fees_max: 400000, average_package: '₹25-30 LPA', website: 'https://spjimr.org', type: 'private', ranking_tier: 'Tier 1', established_year: 1981, placement_percentage: 100 },
    { id: 'fms', name: 'FMS Delhi', city: 'New Delhi', state: 'Delhi', category: 'MBA', courses: ['MBA', 'Executive MBA'], exams: ['CAT'], fees_min: 20000, fees_max: 50000, average_package: '₹25-32 LPA', website: 'https://fms.edu', type: 'government', ranking_tier: 'Tier 1', established_year: 1954, placement_percentage: 100 },
    // Design Colleges
    { id: 'nid', name: 'NID Ahmedabad', city: 'Ahmedabad', state: 'Gujarat', category: 'Design', courses: ['B.Des', 'M.Des', 'PhD'], exams: ['NID DAT'], fees_min: 250000, fees_max: 350000, average_package: '₹12-20 LPA', website: 'https://nid.edu', type: 'government', ranking_tier: 'Tier 1', established_year: 1961, placement_percentage: 98 },
    { id: 'nid-b', name: 'NID Bangalore', city: 'Bangalore', state: 'Karnataka', category: 'Design', courses: ['B.Des', 'M.Des'], exams: ['NID DAT'], fees_min: 250000, fees_max: 350000, average_package: '₹10-18 LPA', website: 'https://nid.edu', type: 'government', ranking_tier: 'Tier 1', established_year: 2006, placement_percentage: 95 },
    { id: 'iitb-design', name: 'IIT Bombay Design', city: 'Mumbai', state: 'Maharashtra', category: 'Design', courses: ['B.Des', 'M.Des'], exams: ['UCEED'], fees_min: 150000, fees_max: 250000, average_package: '₹12-22 LPA', website: 'https://iitb.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 2015, placement_percentage: 96 },
    { id: 'iitg-design', name: 'IIT Guwahati Design', city: 'Guwahati', state: 'Assam', category: 'Design', courses: ['B.Des', 'M.Des'], exams: ['UCEED'], fees_min: 150000, fees_max: 250000, average_package: '₹10-18 LPA', website: 'https://iitg.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 2007, placement_percentage: 92 },
    { id: 'iit-h-design', name: 'IIT Hyderabad Design', city: 'Hyderabad', state: 'Telangana', category: 'Design', courses: ['B.Des', 'M.Des'], exams: ['UCEED'], fees_min: 150000, fees_max: 250000, average_package: '₹10-16 LPA', website: 'https://iith.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 2014, placement_percentage: 90 },
    { id: 'mit-id', name: 'MIT Institute of Design', city: 'Pune', state: 'Maharashtra', category: 'Design', courses: ['B.Des', 'M.Des'], exams: ['MIT-DAT'], fees_min: 350000, fees_max: 500000, average_package: '₹8-14 LPA', website: 'https://mitid.edu.in', type: 'private', ranking_tier: 'Tier 2', established_year: 2006, placement_percentage: 85 },
    // Architecture Colleges
    { id: 'spa-delhi', name: 'SPA Delhi', city: 'New Delhi', state: 'Delhi', category: 'Architecture', courses: ['B.Arch', 'M.Arch', 'M.Plan'], exams: ['JEE Main Paper 2'], fees_min: 150000, fees_max: 250000, average_package: '₹8-14 LPA', website: 'https://spa.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1941, placement_percentage: 90 },
    { id: 'spa-bhopal', name: 'SPA Bhopal', city: 'Bhopal', state: 'Madhya Pradesh', category: 'Architecture', courses: ['B.Arch', 'M.Arch', 'M.Plan'], exams: ['JEE Main Paper 2'], fees_min: 150000, fees_max: 250000, average_package: '₹7-12 LPA', website: 'https://spabhopal.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 2008, placement_percentage: 85 },
    { id: 'cept', name: 'CEPT University', city: 'Ahmedabad', state: 'Gujarat', category: 'Architecture', courses: ['B.Arch', 'M.Arch'], exams: ['NATA', 'CEPT Entrance'], fees_min: 300000, fees_max: 500000, average_package: '₹8-15 LPA', website: 'https://cept.ac.in', type: 'private', ranking_tier: 'Tier 1', established_year: 1962, placement_percentage: 92 },
    { id: 'jj-college', name: 'JJ College of Architecture', city: 'Mumbai', state: 'Maharashtra', category: 'Architecture', courses: ['B.Arch', 'M.Arch'], exams: ['NATA', 'MHT CET'], fees_min: 100000, fees_max: 200000, average_package: '₹6-10 LPA', website: 'https://jjarchitecture.edu', type: 'government', ranking_tier: 'Tier 2', established_year: 1913, placement_percentage: 80 },
    // Pharmacy Colleges
    { id: 'niper', name: 'NIPER Mohali', city: 'Mohali', state: 'Punjab', category: 'Pharmacy', courses: ['M.Pharm', 'PhD'], exams: ['GPAT'], fees_min: 100000, fees_max: 200000, average_package: '₹10-18 LPA', website: 'https://niper.gov.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1998, placement_percentage: 95 },
    { id: 'bits-pharmacy', name: 'BITS Pilani Pharmacy', city: 'Pilani', state: 'Rajasthan', category: 'Pharmacy', courses: ['B.Pharm', 'M.Pharm'], exams: ['BITSAT'], fees_min: 350000, fees_max: 500000, average_package: '₹8-14 LPA', website: 'https://bits-pilani.ac.in', type: 'private', ranking_tier: 'Tier 1', established_year: 1950, placement_percentage: 90 },
    { id: 'jss-pharmacy', name: 'JSS College of Pharmacy', city: 'Ooty', state: 'Tamil Nadu', category: 'Pharmacy', courses: ['B.Pharm', 'M.Pharm', 'PhD'], exams: ['State Entrance'], fees_min: 200000, fees_max: 350000, average_package: '₹6-12 LPA', website: 'https://jsscpo.in', type: 'private', ranking_tier: 'Tier 1', established_year: 1980, placement_percentage: 88 },
    { id: 'manipal-pharmacy', name: 'Manipal College of Pharmaceutical Sciences', city: 'Manipal', state: 'Karnataka', category: 'Pharmacy', courses: ['B.Pharm', 'M.Pharm', 'PhD'], exams: ['MET'], fees_min: 300000, fees_max: 450000, average_package: '₹8-14 LPA', website: 'https://manipal.edu/mcps', type: 'private', ranking_tier: 'Tier 1', established_year: 1963, placement_percentage: 92 },
    // Commerce/CA Colleges
    { id: 'srcc', name: 'Shri Ram College of Commerce', city: 'New Delhi', state: 'Delhi', category: 'Commerce', courses: ['B.Com Hons', 'B.A. Economics', 'M.Com'], exams: ['CUET'], fees_min: 50000, fees_max: 70000, average_package: '₹10-16 LPA', website: 'https://srcc.edu', type: 'government', ranking_tier: 'Tier 1', established_year: 1926, placement_percentage: 95 },
    { id: 'hansraj', name: 'Hansraj College Delhi', city: 'New Delhi', state: 'Delhi', category: 'Commerce', courses: ['B.Com', 'B.A. Programs', 'Science'], exams: ['CUET'], fees_min: 30000, fees_max: 50000, average_package: '₹7-12 LPA', website: 'https://hansraj.edu', type: 'government', ranking_tier: 'Tier 1', established_year: 1948, placement_percentage: 85 },
    { id: 'st-xaviers-kol', name: 'St. Xaviers College Kolkata', city: 'Kolkata', state: 'West Bengal', category: 'Commerce', courses: ['B.Com', 'B.A.', 'B.Sc'], exams: ['Merit Based'], fees_min: 30000, fees_max: 60000, average_package: '₹6-10 LPA', website: 'https://xaviers.edu', type: 'private', ranking_tier: 'Tier 1', established_year: 1860, placement_percentage: 80 },
    { id: 'nm-college', name: 'Narsee Monjee College', city: 'Mumbai', state: 'Maharashtra', category: 'Commerce', courses: ['B.Com', 'BMS', 'B.Sc'], exams: ['Marks Based'], fees_min: 30000, fees_max: 60000, average_package: '₹6-10 LPA', website: 'https://nmcollege.in', type: 'private', ranking_tier: 'Tier 1', established_year: 1964, placement_percentage: 82 },
    // Arts and Science
    { id: 'loksabha', name: 'Loyola College Chennai', city: 'Chennai', state: 'Tamil Nadu', category: 'Arts', courses: ['B.A.', 'B.Sc', 'B.Com', 'M.A.', 'M.Sc'], exams: ['Merit Based'], fees_min: 50000, fees_max: 100000, average_package: '₹5-10 LPA', website: 'https://loyolacollege.edu', type: 'private', ranking_tier: 'Tier 1', established_year: 1925, placement_percentage: 85 },
    { id: 'christ-arts', name: 'Christ University', city: 'Bangalore', state: 'Karnataka', category: 'Arts', courses: ['BCA', 'BBA', 'Law', 'Psychology', 'Commerce'], exams: ['Christ Entrance'], fees_min: 200000, fees_max: 300000, average_package: '₹6-10 LPA', website: 'https://christuniversity.in', type: 'private', ranking_tier: 'Tier 1', established_year: 1969, placement_percentage: 90 },
    { id: 'presidency', name: 'Presidency College', city: 'Kolkata', state: 'West Bengal', category: 'Arts', courses: ['B.A.', 'B.Sc', 'M.A.', 'M.Sc'], exams: ['Merit Based'], fees_min: 10000, fees_max: 30000, average_package: '₹5-8 LPA', website: 'https://presiuniv.ac.in', type: 'government', ranking_tier: 'Tier 1', established_year: 1817, placement_percentage: 75 },
    { id: 'fergusson', name: 'Fergusson College Pune', city: 'Pune', state: 'Maharashtra', category: 'Arts', courses: ['B.A.', 'B.Sc', 'M.A.', 'M.Sc'], exams: ['Merit Based'], fees_min: 20000, fees_max: 50000, average_package: '₹5-9 LPA', website: 'https://fergusson.edu', type: 'private', ranking_tier: 'Tier 1', established_year: 1885, placement_percentage: 78 },
    // Hotel Management
    { id: 'ihm-delhi', name: 'IHM Delhi', city: 'New Delhi', state: 'Delhi', category: 'Hotel Management', courses: ['BHM', 'B.Sc Hospitality'], exams: ['NCHMCT JEE'], fees_min: 150000, fees_max: 200000, average_package: '₹4-8 LPA', website: 'https://ihmdelhi.org', type: 'government', ranking_tier: 'Tier 1', established_year: 1962, placement_percentage: 90 },
    { id: 'ihm-mumbai', name: 'IHM Mumbai', city: 'Mumbai', state: 'Maharashtra', category: 'Hotel Management', courses: ['BHM', 'B.Sc Hospitality'], exams: ['NCHMCT JEE'], fees_min: 150000, fees_max: 200000, average_package: '₹4-8 LPA', website: 'https://ihmmumbai.org', type: 'government', ranking_tier: 'Tier 1', established_year: 1954, placement_percentage: 88 },
    { id: 'wgsha', name: 'WGSHA Manipal', city: 'Manipal', state: 'Karnataka', category: 'Hotel Management', courses: ['BHM', 'Culinary Arts'], exams: ['MET'], fees_min: 250000, fees_max: 400000, average_package: '₹5-10 LPA', website: 'https://manipal.edu/wgsha', type: 'private', ranking_tier: 'Tier 1', established_year: 1986, placement_percentage: 92 },
  ];

  return colleges;
}

// Scholarships expanded
export const SCHOLARSHIPS: Scholarship[] = [
  { id: 'nsp', name: 'National Scholarship Portal', eligibility: 'Students from minority communities, SC/ST/OBC', income_limit: '₹2.5-6 lakhs/year', state: 'All India', category: 'General', deadline: 'December 31', website: 'https://scholarships.gov.in', amount: '₹10,000-50,000/year' },
  { id: 'vidyasiri', name: 'Vidyasiri Scholarship', eligibility: 'Karnataka students pursuing higher education', income_limit: '₹2 lakhs/year', state: 'Karnataka', deadline: 'October 31', website: 'https://www.kare.cgg.gov.in', amount: '₹15,000-25,000/year' },
  { id: 'ssp', name: 'SSP Karnataka Scholarship', eligibility: 'Karnataka students from SC/ST/OBC categories', income_limit: '₹2.5 lakhs/year', state: 'Karnataka', deadline: 'November 30', website: 'https://ssp.karnataka.gov.in', amount: '₹10,000-30,000/year' },
  { id: 'pragati', name: 'Pragati Scholarship for Girls', eligibility: 'Girl students pursuing technical education', income_limit: '₹8 lakhs/year', state: 'All India', category: 'Girls', deadline: 'December 31', website: 'https://www.aicte-india.org', amount: '₹50,000/year' },
  { id: 'saksham', name: 'AICTE Saksham Scholarship', eligibility: 'Differently-abled students pursuing technical education', income_limit: '₹8 lakhs/year', state: 'All India', category: 'Disability', deadline: 'December 31', website: 'https://www.aicte-india.org', amount: '₹50,000/year' },
  { id: 'inspire', name: 'Inspire Scholarship', eligibility: 'Students pursuing natural sciences', income_limit: 'No income limit', state: 'All India', category: 'Science', deadline: 'March 31', website: 'https://online-inspire.gov.in', amount: '₹80,000/year' },
  { id: 'jindal', name: 'Jindal Scholarship', eligibility: 'Students pursuing law, management, or social work', income_limit: 'Varies', state: 'All India', category: 'Professional', deadline: 'April 30', website: 'https://jgu.edu.in', amount: 'Up to ₹2 lakhs/year' },
  { id: 'tata', name: 'Tata Trusts Scholarship', eligibility: 'Students from economically weaker sections', income_limit: '₹3 lakhs/year', state: 'All India', category: 'General', deadline: 'August 31', website: 'https://tatatrusts.org', amount: '₹50,000-1,00,000/year' },
  { id: 'reliance', name: 'Reliance Foundation Scholarship', eligibility: 'Students pursuing undergraduate programs', income_limit: '₹3 lakhs/year', state: 'All India', category: 'Engineering', deadline: 'February 28', website: 'https://reliancefoundation.org', amount: '₹2-6 lakhs/year' },
  { id: 'kotak', name: 'Kotak Kanya Scholarship', eligibility: 'Girls pursuing professional courses', income_limit: '₹3.2 lakhs/year', state: 'All India', category: 'Girls', deadline: 'September 30', website: 'https://kotakeducation.org', amount: '₹1.5 lakhs/year' },
  { id: 'aditya-birla', name: 'Aditya Birla Scholarship', eligibility: 'Students from IITs, IIMs, XLRI', income_limit: 'No income limit', state: 'All India', category: 'Premium', deadline: 'July 31', website: 'https://www.adityabirlascholarships.com', amount: '₹1.75-3 lakhs/year' },
  { id: 'hdfc', name: 'HDFC Educational Crisis Scholarship', eligibility: 'Students facing family crisis', income_limit: '₹3 lakhs/year', state: 'All India', category: 'Special', deadline: 'Rolling', website: 'https://www.hdfc.com', amount: '₹50,000-2 lakhs' },
  { id: 'pmsss', name: 'PM Scholarship Scheme', eligibility: 'Wards of ex-servicemen', income_limit: 'No income limit', state: 'All India', category: 'Defense', deadline: 'November 30', website: 'https://desw.gov.in', amount: '₹3,000-6,000/month' },
  { id: 'cbse', name: 'CBSE Scholarship', eligibility: 'CBSE students with merit', income_limit: '₹6 lakhs/year', state: 'All India', category: 'School', deadline: 'October 31', website: 'https://cbse.nic.in', amount: '₹5,000/year (girls)' },
  { id: 'ntse', name: 'NTSE Scholarship', eligibility: 'Class 10 students clearing NTSE exam', income_limit: 'No income limit', state: 'All India', category: 'School', deadline: 'Exam based', website: 'https://ncert.nic.in', amount: '₹500-2,000/month' },
  { id: 'kvpb', name: 'Kishore Vaigyanik Protsahan Yojana', eligibility: 'Science stream students', income_limit: 'No income limit', state: 'All India', category: 'Science', deadline: 'August 31', website: 'https://kvpy.iisc.ernet.in', amount: '₹5,000-7,000/month' },
  { id: 'sitaram', name: 'Sitaram Jindal Foundation', eligibility: 'Students from economically weaker sections', income_limit: '₹2 lakhs/year', state: 'All India', category: 'General', deadline: 'December 31', website: 'https://sjfoundation.org', amount: '₹500-5,000/month' },
  { id: 'bharti', name: 'Bharti Foundation Scholarship', eligibility: 'Students from rural areas', income_limit: '₹2.5 lakhs/year', state: 'All India', category: 'Rural', deadline: 'July 31', website: 'https://bhartifoundation.org', amount: '₹20,000-50,000/year' },
  { id: 'google', name: 'Google India Scholarship', eligibility: 'Women in technology', income_limit: 'No income limit', state: 'All India', category: 'Women Tech', deadline: 'Rolling', website: 'https://buildyourfuture.withgoogle.com', amount: '₹1 lakh' },
  { id: 'infosys', name: 'Infosys Foundation Scholarship', eligibility: 'Engineering students from low-income families', income_limit: '₹3 lakhs/year', state: 'All India', category: 'Engineering', deadline: 'September 30', website: 'https://www.infosys.com/infosys-foundation', amount: '₹1 lakh/year' },
  { id: 'wipro', name: 'Wipro Cares Scholarship', eligibility: 'Students with disabilities', income_limit: '₹4 lakhs/year', state: 'All India', category: 'Disability', deadline: 'August 15', website: 'https://wipro.org', amount: '₹50,000/year' },
  { id: 'maruti', name: 'Maruti Suzuki Scholarship', eligibility: 'Engineering students', income_limit: '₹3 lakhs/year', state: 'All India', category: 'Engineering', deadline: 'October 31', website: 'https://www.marutisuzuki.com', amount: '₹50,000/year' },
  { id: 'drdo', name: 'DRDO Scholarship', eligibility: 'Girls pursuing science/engineering', income_limit: 'No income limit', state: 'All India', category: 'Girls Science', deadline: 'March 31', website: 'https://drdo.gov.in', amount: '₹60,000/year' },
  { id: 'isro', name: 'ISRO Scholarship', eligibility: 'Students in space science fields', income_limit: 'No income limit', state: 'All India', category: 'Space Science', deadline: 'May 31', website: 'https://www.isro.gov.in', amount: '₹10,000/month' },
  { id: 'post-matric', name: 'Post Matric Scholarship (SC)', eligibility: 'SC students pursuing post-matric courses', income_limit: '₹2.5 lakhs/year', state: 'All India', category: 'SC', deadline: 'December 31', website: 'https://scholarships.gov.in', amount: 'Varies by course' },
  { id: 'post-matric-st', name: 'Post Matric Scholarship (ST)', eligibility: 'ST students pursuing post-matric courses', income_limit: '₹2.5 lakhs/year', state: 'All India', category: 'ST', deadline: 'December 31', website: 'https://scholarships.gov.in', amount: 'Varies by course' },
  { id: 'obc-scholarship', name: 'OBC Scholarship', eligibility: 'OBC students for higher education', income_limit: '₹3 lakhs/year', state: 'All India', category: 'OBC', deadline: 'December 31', website: 'https://scholarships.gov.in', amount: '₹10,000-35,000/year' },
  { id: 'minority-scholarship', name: 'Minority Scholarship', eligibility: 'Students from minority communities', income_limit: '₹2 lakhs/year', state: 'All India', category: 'Minority', deadline: 'December 31', website: 'https://scholarships.gov.in', amount: '₹10,000-30,000/year' },
  { id: 'elevate', name: 'Elevate Scholarship (Karnataka)', eligibility: 'Karnataka minority students', income_limit: '₹2.5 lakhs/year', state: 'Karnataka', category: 'State', deadline: 'November 30', website: 'https://elevate.karnataka.gov.in', amount: '₹25,000-50,000/year' },
  { id: 'pm-yasasvi', name: 'PM YASASVI Scholarship', eligibility: 'OBC/EBC/DNT students', income_limit: '₹2.5 lakhs/year', state: 'All India', category: 'OBC', deadline: 'January 31', website: 'https://socialjustice.gov.in', amount: '₹75,000-1,25,000/year' },
];

// Exams with more categories (also exported as ENTRANCE_EXAMS for backwards compatibility)
export const EXAMS: Exam[] = [
  // Engineering Entrance Exams
  { id: 'jee-main', name: 'JEE Main', category: 'Engineering', eligibility: 'Class 12 with Physics, Chemistry, Mathematics', subjects: ['Physics', 'Chemistry', 'Mathematics'], timeline: 'January & April sessions', website: 'https://jeemain.nta.nic.in', exam_date: 'January/April', pattern: 'MCQ Based, 300 marks' },
  { id: 'jee-advanced', name: 'JEE Advanced', category: 'Engineering', eligibility: 'Top 2.5 lakh JEE Main rankers', subjects: ['Physics', 'Chemistry', 'Mathematics'], timeline: 'May', website: 'https://jeeadv.ac.in', exam_date: 'May', pattern: 'MCQ + Numerical, Complex' },
  { id: 'kcet', name: 'KCET', category: 'Engineering', eligibility: 'Class 12 with Science, Karnataka domiciles', subjects: ['Physics', 'Chemistry', 'Mathematics/Biology'], timeline: 'April', website: 'https://cetonline.karnataka.gov.in', exam_date: 'April', pattern: 'MCQ Based' },
  { id: 'comedk', name: 'COMEDK', category: 'Engineering', eligibility: 'Class 12 with Physics, Mathematics', subjects: ['Physics', 'Mathematics', 'Chemistry'], timeline: 'May', website: 'https://comedk.org', exam_date: 'May', pattern: 'MCQ Based' },
  { id: 'mht-cet', name: 'MHT CET', category: 'Engineering', eligibility: 'Class 12 with Science', subjects: ['Physics', 'Chemistry', 'Mathematics'], timeline: 'May', website: 'https://mhtcetcell.mahacet.org', exam_date: 'May', pattern: 'MCQ Based' },
  { id: 'bitsat', name: 'BITSAT', category: 'Engineering', eligibility: 'Class 12 with Physics, Math, Chemistry', subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Logical Reasoning'], timeline: 'May-June', website: 'https://bitsadmission.com', exam_date: 'May-June', pattern: 'Online, 390 marks' },
  { id: 'viteee', name: 'VITEEE', category: 'Engineering', eligibility: 'Class 12 with PCM', subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Aptitude'], timeline: 'April-May', website: 'https://viteee.vit.ac.in', exam_date: 'April-May', pattern: 'MCQ Based' },
  { id: 'srmjeee', name: 'SRMJEEE', category: 'Engineering', eligibility: 'Class 12 with PCM', subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Aptitude'], timeline: 'April-May', website: 'https://srmist.edu.in', exam_date: 'April-May', pattern: 'MCQ Based' },
  { id: 'met', name: 'MET (Manipal)', category: 'Engineering', eligibility: 'Class 12 with PCM', subjects: ['Physics', 'Chemistry', 'Mathematics'], timeline: 'April-May', website: 'https://manipal.edu', exam_date: 'April-May', pattern: 'MCQ Based' },
  { id: 'wbjee', name: 'WBJEE', category: 'Engineering', eligibility: 'Class 12 with PCM', subjects: ['Physics', 'Chemistry', 'Mathematics'], timeline: 'April', website: 'https://wbjeeb.in', exam_date: 'April', pattern: 'MCQ with different marking' },
  { id: 'ap-eamcet', name: 'AP EAMCET', category: 'Engineering', eligibility: 'Class 12 with PCM, AP domicile', subjects: ['Physics', 'Chemistry', 'Mathematics'], timeline: 'May', website: 'https://sche.ap.gov.in', exam_date: 'May', pattern: 'MCQ Based' },
  { id: 'ts-eamcet', name: 'TS EAMCET', category: 'Engineering', eligibility: 'Class 12 with PCM, Telangana domicile', subjects: ['Physics', 'Chemistry', 'Mathematics'], timeline: 'May', website: 'https://eamcet.tsche.ac.in', exam_date: 'May', pattern: 'MCQ Based' },
  { id: 'gujcet', name: 'GUJCET', category: 'Engineering', eligibility: 'Class 12 with PCM, Gujarat domicile', subjects: ['Physics', 'Chemistry', 'Mathematics'], timeline: 'March', website: 'https://gseb.org', exam_date: 'March', pattern: 'MCQ Based' },
  { id: 'keam', name: 'KEAM (Kerala)', category: 'Engineering', eligibility: 'Class 12 with PCM, Kerala domicile', subjects: ['Physics', 'Chemistry', 'Mathematics'], timeline: 'May', website: 'https://cee.kerala.gov.in', exam_date: 'May', pattern: 'MCQ Based' },
  // Medical Entrance Exams
  { id: 'neet', name: 'NEET UG', category: 'Medical', eligibility: 'Class 12 with Physics, Chemistry, Biology', subjects: ['Physics', 'Chemistry', 'Biology (Botany + Zoology)'], timeline: 'May', website: 'https://neet.nta.nic.in', exam_date: 'May', pattern: 'MCQ Based, 720 marks' },
  { id: 'neet-pg', name: 'NEET PG', category: 'Medical', eligibility: 'MBBS degree', subjects: 'PG Subject', timeline: 'January', website: 'https://nbe.edu.in', exam_date: 'January', pattern: 'MCQ Based' },
  // Law Entrance Exams
  { id: 'clat', name: 'CLAT', category: 'Law', eligibility: 'Class 12 for UG, Graduation for PG', subjects: ['English', 'Legal Reasoning', 'GK', 'Maths', 'Logical Reasoning'], timeline: 'December', website: 'https://consortiumofnlus.ac.in', exam_date: 'December', pattern: 'MCQ Based' },
  { id: 'ailet', name: 'AILET', category: 'Law', eligibility: 'Class 12 for UG', subjects: ['English', 'Legal Reasoning', 'GK', 'Maths', 'Logical Reasoning'], timeline: 'December', website: 'https://nludelhi.ac.in', exam_date: 'December', pattern: 'MCQ Based' },
  { id: 'lsat', name: 'LSAT India', category: 'Law', eligibility: 'Class 12 for UG', subjects: ['Logical Reasoning', 'Analytical Reasoning', 'Reading Comprehension'], timeline: 'May-June', website: 'https://lsat.org.in', exam_date: 'May-June', pattern: 'MCQ Based' },
  { id: 'slat', name: 'SLAT (Symbiosis)', category: 'Law', eligibility: 'Class 12', subjects: ['Logical Reasoning', 'Legal Reasoning', 'Analytical Reasoning', 'Reading Comprehension', 'GK'], timeline: 'May', website: 'https://set-test.org', exam_date: 'May', pattern: 'MCQ Based' },
  // Design Entrance Exams
  { id: 'uceed', name: 'UCEED', category: 'Design', eligibility: 'Class 12 or equivalent', subjects: ['Visualization', 'Observation', 'Design Thinking', 'Problem Solving'], timeline: 'January', website: 'https://uceed.iitb.ac.in', exam_date: 'January', pattern: 'Part A (MCQ) + Part B (Drawing)' },
  { id: 'need', name: 'NID DAT', category: 'Design', eligibility: 'Class 12 or equivalent', subjects: ['Design Aptitude', 'Drawing', 'Creativity'], timeline: 'December-January', website: 'https://nid.edu', exam_date: 'December-January', pattern: 'Prelims + Mains' },
  { id: 'nift-entrance', name: 'NIFT Entrance', category: 'Design', eligibility: 'Class 12', subjects: ['Creative Ability Test', 'General Ability Test'], timeline: 'February', website: 'https://nift.ac.in', exam_date: 'February', pattern: 'CAT + GAT + Situation Test' },
  // Architecture Entrance Exams
  { id: 'nata', name: 'NATA', category: 'Architecture', eligibility: 'Class 12 with Mathematics', subjects: ['Mathematics', 'Drawing', 'Aptitude'], timeline: 'April-July', website: 'https://nata.nic.in', exam_date: 'April-July', pattern: 'Part A + Part B' },
  { id: 'jee-main-arch', name: 'JEE Main Paper 2', category: 'Architecture', eligibility: 'Class 12 with Mathematics', subjects: ['Mathematics', 'Aptitude', 'Drawing'], timeline: 'January & April', website: 'https://jeemain.nta.nic.in', exam_date: 'January/April', pattern: 'MCQ + Drawing' },
  // Management Entrance Exams
  { id: 'cat', name: 'CAT', category: 'Management', eligibility: 'Graduation with 50%', subjects: ['Quantitative Aptitude', 'Verbal Ability', 'DI & LR'], timeline: 'November', website: 'https://iimcat.ac.in', exam_date: 'November', pattern: 'MCQ + TITA' },
  { id: 'xat', name: 'XAT', category: 'Management', eligibility: 'Graduation recognized degree', subjects: ['Decision Making', 'Verbal & Logical Ability', 'Quantitative'], timeline: 'January', website: 'https://xatonline.in', exam_date: 'January', pattern: 'MCQ Based' },
  { id: 'nmat', name: 'NMAT', category: 'Management', eligibility: 'Graduation', subjects: ['Language Skills', 'Quantitative', 'Logical Reasoning'], timeline: 'October-December', website: 'https://nmat.org.in', exam_date: 'October-December', pattern: 'MCQ Based' },
  { id: 'snap', name: 'SNAP', category: 'Management', eligibility: 'Graduation', subjects: ['General English', 'Quant & DI', 'Analytical & Logical'], timeline: 'December', website: 'https://snaptest.org', exam_date: 'December', pattern: 'MCQ Based' },
  // Government Exams (12th Pass)
  { id: 'nda', name: 'NDA', category: 'Government (12th Pass)', eligibility: 'Class 12, Age 16.5-19.5', subjects: ['Mathematics', 'General Ability'], timeline: 'April & September', website: 'https://upsc.gov.in', exam_date: 'April/September', pattern: 'Written + SSB Interview' },
  { id: 'ssc-chsl', name: 'SSC CHSL', category: 'Government (12th Pass)', eligibility: 'Class 12 pass, Age 18-27', subjects: ['General Intelligence', 'English', 'Quantitative', 'General Awareness'], timeline: 'March-April', website: 'https://ssc.nic.in', exam_date: 'March-April', pattern: 'Tier 1 + Tier 2 + Skill Test' },
  { id: 'railway-group-d', name: 'Railway Group D', category: 'Government (12th Pass)', eligibility: 'Class 10 pass', subjects: ['General Science', 'Mathematics', 'General Intelligence', 'General Awareness'], timeline: 'Multiple Phases', website: 'https://rrcb.gov.in', exam_date: 'Varies', pattern: 'CBT + PET' },
  { id: 'indian-navy-ssr', name: 'Indian Navy SSR', category: 'Government (12th Pass)', eligibility: 'Class 12 with PCM, Age 17.5-21', subjects: ['Science', 'Mathematics', 'English', 'General Awareness'], timeline: 'Multiple', website: 'https://joinindiannavy.gov.in', exam_date: 'Varies', pattern: 'CBT + PFT + Medical' },
  { id: 'agniveer', name: 'Agniveer (Air Force)', category: 'Government (12th Pass)', eligibility: 'Class 12 with PCM, Age 17.5-21', subjects: ['Physics', 'Mathematics', 'English'], timeline: 'Multiple', website: 'https://agnipathvayu.cdac.in', exam_date: 'Varies', pattern: 'CBT + PFT + Medical' },
  { id: 'ssc-mts', name: 'SSC MTS', category: 'Government (12th Pass)', eligibility: 'Class 10 pass, Age 18-25', subjects: ['General Intelligence', 'English', 'Numerical Aptitude', 'General Awareness'], timeline: 'July-August', website: 'https://ssc.nic.in', exam_date: 'July-August', pattern: 'Tier 1 + Tier 2' },
  // Government Exams (Graduate)
  { id: 'upsc-cse', name: 'UPSC Civil Services', category: 'Government (Graduate)', eligibility: 'Graduation, Age 21-32', subjects: ['General Studies', 'CSAT', 'Optional Subject'], timeline: 'Prelims: May, Mains: September', website: 'https://upsc.gov.in', exam_date: 'May (Prelims)', pattern: 'Prelims + Mains + Interview' },
  { id: 'ssc-cgl', name: 'SSC CGL', category: 'Government (Graduate)', eligibility: 'Graduation, Age 18-32', subjects: ['General Intelligence', 'English', 'Quantitative', 'General Awareness'], timeline: 'July-August', website: 'https://ssc.nic.in', exam_date: 'July-August', pattern: 'Tier 1-4' },
  { id: 'ibps-po', name: 'IBPS PO', category: 'Government (Graduate)', eligibility: 'Graduation, Age 20-30', subjects: ['English', 'Reasoning', 'Quantitative', 'General Awareness', 'Computer'], timeline: 'October-November', website: 'https://ibps.in', exam_date: 'October-November', pattern: 'Prelims + Mains + Interview' },
  { id: 'ibps-clerk', name: 'IBPS Clerk', category: 'Government (Graduate)', eligibility: 'Graduation, Age 20-28', subjects: ['English', 'Reasoning', 'Quantitative', 'General Awareness', 'Computer'], timeline: 'August-October', website: 'https://ibps.in', exam_date: 'August-October', pattern: 'Prelims + Mains' },
  { id: 'sbi-po', name: 'SBI PO', category: 'Government (Graduate)', eligibility: 'Graduation, Age 21-30', subjects: ['English', 'Reasoning', 'Quantitative', 'General Awareness'], timeline: 'October-November', website: 'https://sbi.co.in', exam_date: 'October-November', pattern: 'Prelims + Mains + Interview + GD' },
  { id: 'rbi-grade-b', name: 'RBI Grade B', category: 'Government (Graduate)', eligibility: 'Graduation, Age 21-30', subjects: ['English', 'Reasoning', 'Quantitative', 'General Awareness', 'Economics'], timeline: 'June-July', website: 'https://rbi.org.in', exam_date: 'June-July', pattern: 'Phase 1 + Phase 2 + Interview' },
  { id: 'rbi-assistant', name: 'RBI Assistant', category: 'Government (Graduate)', eligibility: 'Graduation, Age 20-28', subjects: ['English', 'Reasoning', 'Quantitative', 'General Awareness', 'Computer'], timeline: 'March-April', website: 'https://rbi.org.in', exam_date: 'March-April', pattern: 'Prelims + Mains + LPT' },
  { id: 'lic-aao', name: 'LIC AAO', category: 'Government (Graduate)', eligibility: 'Graduation, Age 21-30', subjects: ['English', 'Reasoning', 'Quantitative', 'General Awareness', 'Insurance'], timeline: 'March', website: 'https://licindia.in', exam_date: 'March', pattern: 'Prelims + Mains + Interview' },
  { id: 'railway-ntpc', name: 'Railway NTPC', category: 'Government (Graduate)', eligibility: 'Graduation', subjects: ['General Intelligence', 'English', 'Quantitative', 'General Awareness'], timeline: 'Multiple', website: 'https://rrcb.gov.in', exam_date: 'Varies', pattern: 'CBT 1 + CBT 2 + CBAT' },
  { id: 'state-psc', name: 'State PSC Exams', category: 'Government (Graduate)', eligibility: 'Graduation, varies by state', subjects: ['State-specific GS', 'English', 'Optional'], timeline: 'Varies by state', website: 'State PSC Websites', exam_date: 'Varies', pattern: 'Prelims + Mains + Interview' },
  // Government Exams (Engineering Graduate)
  { id: 'gate', name: 'GATE', category: 'Government (Engineering)', eligibility: 'B.Tech/BE or final year', subjects: ['Engineering Mathematics', 'General Aptitude', 'Core Subject'], timeline: 'February', website: 'https://gate.iitk.ac.in', exam_date: 'February', pattern: 'MCQ + NAT, 100 marks' },
  { id: 'ese', name: 'ESE (IES)', category: 'Government (Engineering)', eligibility: 'Engineering degree, Age 21-30', subjects: ['Core Engineering', 'General Studies', 'Engineering Aptitude'], timeline: 'Prelims: January, Mains: June', website: 'https://upsc.gov.in', exam_date: 'January (Prelims)', pattern: 'Prelims + Mains + Interview' },
  { id: 'isro', name: 'ISRO Scientist/Engineer', category: 'Government (Engineering)', eligibility: 'B.E/B.Tech, Age 35', subjects: ['Core Engineering Subject'], timeline: 'September-November', website: 'https://isro.gov.in', exam_date: 'September-November', pattern: 'Written + Interview' },
  { id: 'drdo', name: 'DRDO SET', category: 'Government (Engineering)', eligibility: 'B.E/B.Tech with 60%', subjects: ['Core Engineering'], timeline: 'Varies', website: 'https://drdo.gov.in', exam_date: 'Varies', pattern: 'Written + Interview' },
  { id: 'barc', name: 'BARC OCES', category: 'Government (Engineering)', eligibility: 'B.E/B.Tech with qualifying GATE/DGR score', subjects: ['Core Engineering'], timeline: 'March-April', website: 'https://barc.gov.in', exam_date: 'March-April', pattern: 'GATE score or Online Exam + Interview' },
  { id: 'ssc-je', name: 'SSC JE', category: 'Government (Engineering)', eligibility: 'Diploma/Degree in Engineering', subjects: ['General Intelligence', 'General Awareness', 'Core Engineering'], timeline: 'October', website: 'https://ssc.nic.in', exam_date: 'October', pattern: 'Tier 1 + Tier 2 + DV' },
  { id: 'state-ae-je', name: 'State AE/JE Exams', category: 'Government (Engineering)', eligibility: 'Diploma/Degree in Engineering', subjects: ['Core Engineering', 'General Studies'], timeline: 'Varies by state', website: 'State PSC Websites', exam_date: 'Varies', pattern: 'Written + Interview' },
  // Teaching Exams
  { id: 'ctet', name: 'CTET', category: 'Teaching', eligibility: '12th + D.Ed or Graduation + B.Ed', subjects: ['Child Development', 'Language', 'Mathematics', 'Environmental Studies'], timeline: 'July, December', website: 'https://ctet.nic.in', exam_date: 'July, December', pattern: 'Paper 1 (Primary) / Paper 2 (Elementary)' },
  { id: 'ugc-net', name: 'UGC NET', category: 'Teaching', eligibility: 'Post Graduation with 55%', subjects: ['Paper 1 (General)', 'Paper 2 (Subject)'], timeline: 'June, December', website: 'https://ugcnet.nta.nic.in', exam_date: 'June, December', pattern: 'CBT, 300 marks' },
  { id: 'kvs', name: 'KVS Teacher', category: 'Teaching', eligibility: 'Graduation + B.Ed', subjects: ['Hindi/English', 'Reasoning', 'General Knowledge', 'Teaching Aptitude'], timeline: 'March', website: 'https://kvsangathan.nic.in', exam_date: 'March', pattern: 'CBT + Interview' },
  { id: 'dsssb', name: 'DSSSB Teacher', category: 'Teaching', eligibility: 'Graduation + B.Ed', subjects: ['General Awareness', 'Reasoning', 'Arithmetical', 'English/Hindi', 'Subject Concerned'], timeline: 'Varies', website: 'https://dsssb.delhi.gov.in', exam_date: 'Varies', pattern: 'Tier 1 + Tier 2 + Skill Test' },
  // Common University Entrance Test
  { id: 'cuet-ug', name: 'CUET UG', category: 'University', eligibility: 'Class 12 pass', subjects: ['Languages', 'Domain Subjects', 'General Test'], timeline: 'May-June', website: 'https://cuet.samarth.ac.in', exam_date: 'May-June', pattern: 'MCQ Based' },
  { id: 'cuet-pg', name: 'CUET PG', category: 'University', eligibility: 'Graduation', subjects: ['Domain Subject', 'General Test'], timeline: 'June-July', website: 'https://cuet.nta.nic.in', exam_date: 'June-July', pattern: 'MCQ Based' },
];

// For backwards compatibility
export const ENTRANCE_EXAMS = EXAMS;

// Mock Tests
export const MOCK_TESTS: MockTest[] = [
  { id: 'kcet-phy-mock', exam_name: 'KCET', title: 'KCET Physics Mock Test 2024', duration_minutes: 60, total_questions: 60, total_marks: 60, subjects: ['Physics'], instructions: 'Each question carries 1 mark. No negative marking. Choose the best answer.', is_active: true, created_at: new Date().toISOString() },
  { id: 'kcet-chem-mock', exam_name: 'KCET', title: 'KCET Chemistry Mock Test 2024', duration_minutes: 60, total_questions: 60, total_marks: 60, subjects: ['Chemistry'], instructions: 'Each question carries 1 mark. No negative marking.', is_active: true, created_at: new Date().toISOString() },
  { id: 'kcet-math-mock', exam_name: 'KCET', title: 'KCET Mathematics Mock Test 2024', duration_minutes: 60, total_questions: 60, total_marks: 60, subjects: ['Mathematics'], instructions: 'Each question carries 1 mark. No negative marking.', is_active: true, created_at: new Date().toISOString() },
  { id: 'jee-main-phy', exam_name: 'JEE Main', title: 'JEE Main Physics Practice Test', duration_minutes: 60, total_questions: 30, total_marks: 100, subjects: ['Physics'], instructions: 'MCQ: +4/-1, NAT: +4/0. Time: 60 min for Physics section.', is_active: true, created_at: new Date().toISOString() },
  { id: 'jee-main-chem', exam_name: 'JEE Main', title: 'JEE Main Chemistry Practice Test', duration_minutes: 60, total_questions: 30, total_marks: 100, subjects: ['Chemistry'], instructions: 'MCQ: +4/-1, NAT: +4/0.', is_active: true, created_at: new Date().toISOString() },
  { id: 'jee-main-math', exam_name: 'JEE Main', title: 'JEE Main Mathematics Practice Test', duration_minutes: 60, total_questions: 30, total_marks: 100, subjects: ['Mathematics'], instructions: 'MCQ: +4/-1, NAT: +4/0.', is_active: true, created_at: new Date().toISOString() },
  { id: 'neet-bio', exam_name: 'NEET', title: 'NEET Biology Mock Test', duration_minutes: 90, total_questions: 90, total_marks: 360, subjects: ['Biology'], instructions: 'Each question carries 4 marks. No negative marking for this demo.', is_active: true, created_at: new Date().toISOString() },
  { id: 'comedk-mock', exam_name: 'COMEDK', title: 'COMEDK Full Mock Test', duration_minutes: 180, total_questions: 180, total_marks: 180, subjects: ['Physics', 'Chemistry', 'Mathematics'], instructions: 'Each question carries 1 mark. No negative marking.', is_active: true, created_at: new Date().toISOString() },
  { id: 'mhtcet-mock', exam_name: 'MHT CET', title: 'MHT CET Mock Test', duration_minutes: 180, total_questions: 150, total_marks: 200, subjects: ['Physics', 'Chemistry', 'Mathematics'], instructions: 'Physics/Chem: 50 marks each (50 Q), Math: 100 marks (50 Q). No negative marking.', is_active: true, created_at: new Date().toISOString() },
  { id: 'bitsat-mock', exam_name: 'BITSAT', title: 'BITSAT Full Mock Test', duration_minutes: 180, total_questions: 130, total_marks: 390, subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Logical Reasoning'], instructions: 'Each question carries 3 marks. -1 for wrong answer. Bonus questions available after completing all questions.', is_active: true, created_at: new Date().toISOString() },
];

// Sample Mock Questions
export const MOCK_QUESTIONS: MockQuestion[] = [
  { id: 'q1', mock_test_id: 'kcet-phy-mock', question: 'A body is projected vertically upward with velocity v. The distance covered by it in the 1st second is', options: ['v + g/2', 'v - g/2', 'v + g', 'v - g'], correct_answer: 1, explanation: 'Distance in nth second = u + a/2(2n-1). Here u=v, a=-g, n=1, so distance = v + (-g/2)(1) = v - g/2', subject: 'Physics', difficulty: 'Easy' },
  { id: 'q2', mock_test_id: 'kcet-phy-mock', question: 'Two stones of masses m and 2m are thrown vertically upward with same speed. The ratio of their maximum heights is', options: ['1:2', '2:1', '1:1', '1:4'], correct_answer: 2, explanation: 'Maximum height = v²/2g depends only on initial velocity, not mass. Same speed means same height.', subject: 'Physics', difficulty: 'Easy' },
  { id: 'q3', mock_test_id: 'kcet-phy-mock', question: 'The momentum of a body of mass 2kg is 4 kg m/s. Its kinetic energy is', options: ['4 J', '8 J', '16 J', '2 J'], correct_answer: 0, explanation: 'KE = p²/2m = 4²/(2×2) = 16/4 = 4 J', subject: 'Physics', difficulty: 'Easy' },
  { id: 'q4', mock_test_id: 'kcet-chem-mock', question: 'Which of the following is the most electronegative element?', options: ['Oxygen', 'Fluorine', 'Chlorine', 'Nitrogen'], correct_answer: 1, explanation: 'Fluorine has the highest electronegativity value of 3.98 on the Pauling scale.', subject: 'Chemistry', difficulty: 'Easy' },
  { id: 'q5', mock_test_id: 'kcet-chem-mock', question: 'The hybridization of carbon in diamond is', options: ['sp', 'sp²', 'sp³', 'sp³d'], correct_answer: 2, explanation: 'In diamond, each carbon is bonded to 4 other carbons in a tetrahedral arrangement, requiring sp³ hybridization.', subject: 'Chemistry', difficulty: 'Easy' },
  { id: 'q6', mock_test_id: 'kcet-chem-mock', question: 'Which of the following has the highest pH?', options: ['1M HCl', '1M NaOH', '1M CH₃COOH', 'Pure water'], correct_answer: 1, explanation: '1M NaOH is a strong base with pH around 14. HCl is acidic (~0), CH₃COOH is weak acid (~2.4), water is neutral (7).', subject: 'Chemistry', difficulty: 'Easy' },
  { id: 'q7', mock_test_id: 'kcet-math-mock', question: 'If f(x) = x² + 2x + 3, then f(x+1) - f(x) is', options: ['2x + 3', '2x + 5', '2x + 1', '2x + 2'], correct_answer: 0, explanation: 'f(x+1) = (x+1)² + 2(x+1) + 3 = x² + 2x + 1 + 2x + 2 + 3 = x² + 4x + 6. f(x) = x² + 2x + 3. Difference = 2x + 3.', subject: 'Mathematics', difficulty: 'Easy' },
  { id: 'q8', mock_test_id: 'kcet-math-mock', question: 'The derivative of sin⁻¹(2x√(1-x²)) with respect to x is', options: ['2/√(1-x²)', '1/√(1-x²)', '2√(1-x²)', '-2x/√(1-x²)'], correct_answer: 0, explanation: 'Let y = sin⁻¹(2x√(1-x²)) = 2sin⁻¹x. Therefore dy/dx = 2/√(1-x²)', subject: 'Mathematics', difficulty: 'Medium' },
  { id: 'q9', mock_test_id: 'kcet-math-mock', question: '∫(dx/(1+eˣ)) equals', options: ['x - ln(1+eˣ) + C', 'x + ln(1+eˣ) + C', '-ln(1+e˻ˣ) + C', 'ln(1+eˣ) + C'], correct_answer: 0, explanation: 'Divide and multiply by e⁻ˣ. ∫(e⁻ˣdx/(e⁻ˣ+1)) = -ln(e⁻ˣ+1) + C = x - ln(1+eˣ) + C', subject: 'Mathematics', difficulty: 'Medium' },
  { id: 'q10', mock_test_id: 'jee-main-phy', question: 'A block of mass 5 kg is placed on a rough horizontal surface. The coefficient of friction is 0.2. A horizontal force of 10 N is applied. The acceleration of the block is', options: ['Zero', '0.2 m/s²', '2 m/s²', '0.02 m/s²'], correct_answer: 0, explanation: 'Maximum friction = μmg = 0.2 × 5 × 10 = 10 N. Applied force = 10 N. Since applied force equals friction force, the block remains stationary.', subject: 'Physics', difficulty: 'Medium' },
];

// Updated Pricing Plans
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free Plan',
    price: 0,
    period: 'forever',
    features: ['1 student profile', 'Basic career suggestions', 'College browsing', 'Scholarship browsing', '1 sample report', 'Limited mock tests'],
    cta: 'Get Started Free',
    popular: false,
    description: 'For students exploring basic options'
  },
  {
    id: 'premium-blueprint',
    name: 'Premium Career Blueprint',
    price: 999,
    period: 'one-time',
    features: ['Detailed AI career report', 'Top career matches', 'College recommendations', 'Entrance exam plan', 'Scholarship matching', 'PDF report download', 'Parent action plan'],
    cta: 'Get Premium ₹999',
    popular: true,
    description: 'Best for Class 10, 11, 12 students making career decisions'
  },
  {
    id: 'guidance-annual',
    name: '11th-12th Guidance Plan',
    price: 2999,
    period: 'per year',
    features: ['Stream selection support', 'Monthly personalized roadmap', 'Exam preparation tracker', 'Unlimited mock tests', 'College shortlisting', 'Parent dashboard', 'Scholarship alerts', 'Family member transfer option'],
    cta: 'Get Guidance Plan ₹2999',
    popular: false,
    description: 'Best for two-year structured planning',
    transferable: true
  },
  {
    id: 'college-career',
    name: 'College Career Plan',
    price: 1999,
    period: 'per year',
    features: ['Career roadmap for degree', 'Skill development roadmap', 'Project ideas & guidance', 'Internship guidance', 'Resume project suggestions', 'Government exam options', 'Higher studies guidance'],
    cta: 'Get College Plan ₹1999',
    popular: false,
    description: 'Best for engineering, degree, and diploma students'
  },
  {
    id: 'family-plan',
    name: 'Family Plan',
    price: 4999,
    period: 'per year',
    features: ['Up to 3 child profiles', 'Parent dashboard', 'Individual roadmaps', 'Reports for each child', 'Mock test access', 'Scholarship tracking', 'Priority support', 'Family member transfer option'],
    cta: 'Get Family Plan ₹4999',
    popular: false,
    description: 'For parents with multiple children',
    transferable: true
  },
];
