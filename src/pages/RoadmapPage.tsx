import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowRight, Check, BookOpen, Target, Briefcase, TrendingUp } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { CAREERS } from '../lib/constants';
import { Career } from '../types';

const careerCategories = [
  { id: 'engineering', name: 'Engineering', careers: ['Software Engineering', 'Data Science', 'Cybersecurity', 'Mechanical Engineering'] },
  { id: 'medicine', name: 'Medicine & Healthcare', careers: ['Medicine'] },
  { id: 'law', name: 'Law', careers: ['Law'] },
  { id: 'commerce', name: 'Commerce & Finance', careers: ['Chartered Accountancy', 'Business Management'] },
  { id: 'design', name: 'Design', careers: ['Design'] },
  { id: 'civil-services', name: 'Civil Services', careers: ['Civil Services'] }
];

export default function RoadmapPage() {
  const [searchParams] = useSearchParams();
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [activeCategory, setActiveCategory] = useState('engineering');

  useEffect(() => {
    const careerId = searchParams.get('career');
    if (careerId) {
      const career = CAREERS.find(c => c.id === careerId);
      if (career) setSelectedCareer(career);
    }
  }, [searchParams]);

  const getCareersForCategory = (categoryId: string) => {
    const category = careerCategories.find(c => c.id === categoryId);
    if (!category) return [];
    return CAREERS.filter(c => category.careers.includes(c.name));
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-green-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4"><Target className="w-4 h-4" />Step-by-Step Career Planning</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Career Roadmaps</h1>
            <p className="text-lg text-gray-600">Explore detailed career roadmaps from Class 8 to graduation for every major career path in India</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-2 mb-8 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {careerCategories.map(category => (
                <button key={category.id} onClick={() => { setActiveCategory(category.id); setSelectedCareer(null); }} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${activeCategory === category.id ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}>{category.name}</button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {getCareersForCategory(activeCategory).map(career => (
                  <button key={career.id} onClick={() => setSelectedCareer(career)} className={`w-full text-left p-5 rounded-xl border-2 transition-all ${selectedCareer?.id === career.id ? 'border-green-500 bg-green-50' : 'border-gray-100 bg-white hover:border-green-200 hover:shadow-md'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{career.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${career.risk_level === 'Low' ? 'bg-green-100 text-green-700' : career.risk_level === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{career.risk_level} Risk</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{career.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Demand Score</span>
                      <span className="font-medium text-green-600">{career.future_demand_score}%</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              {selectedCareer ? (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-6 bg-gradient-to-r from-green-600 to-green-500">
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedCareer.name}</h2>
                    <p className="text-green-100">{selectedCareer.description}</p>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="bg-green-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500 mb-1">Future Demand</p>
                        <p className="text-xl font-bold text-green-600">{selectedCareer.future_demand_score}%</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500 mb-1">Salary Range</p>
                        <p className="text-lg font-bold text-blue-600">{selectedCareer.salary_range}</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500 mb-1">Risk Level</p>
                        <p className="text-xl font-bold text-purple-600">{selectedCareer.risk_level}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Required Subjects</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCareer.required_subjects.map(subject => (<span key={subject} className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">{subject}</span>))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Entrance Exams</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCareer.entrance_exams.map(exam => (<Link key={exam} to={`/exams?exam=${exam}`} className="px-3 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors">{exam}</Link>))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Career Roadmap</h3>
                      <div className="relative">
                        {selectedCareer.roadmap.map((phase, index) => (
                          <div key={index} className="flex gap-4 mb-6 last:mb-0">
                            <div className="flex flex-col items-center">
                              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">{index + 1}</div>
                              {index < selectedCareer.roadmap.length - 1 && (<div className="w-0.5 h-full bg-green-200 flex-1" />)}
                            </div>
                            <div className="flex-1 pb-6">
                              <div className="bg-gray-50 rounded-xl p-4">
                                <h4 className="font-semibold text-gray-900 mb-2">{phase.class}</h4>
                                <ul className="space-y-2">
                                  {phase.actions.map((action, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                      <ArrowRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />{action}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Alternative Career Options</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCareer.alternative_careers.map(alt => (<span key={alt} className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">{alt}</span>))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                  <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Career Path</h3>
                  <p className="text-gray-500 max-w-md mx-auto">Click on a career card to view the detailed roadmap, entrance exams, and preparation tips</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
