import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Map, GraduationCap, Award, Calendar, FileText, LayoutDashboard, ArrowRight, Check, ChevronDown, Star, Shield, Lock, Globe, BookOpen, Users, TrendingUp, Zap } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { PRICING_PLANS } from '../lib/constants';

const features = [
  { icon: Map, title: 'Career Roadmaps', description: 'Personalized step-by-step career roadmaps from Class 8 to college graduation', link: '/roadmap', gradient: 'from-blue-500 to-blue-600' },
  { icon: GraduationCap, title: 'College Recommendations', description: 'Smart college matching based on scores, interests, and budget', link: '/colleges', gradient: 'from-emerald-500 to-teal-600' },
  { icon: Award, title: 'Scholarship Discovery', description: 'Find relevant scholarships with eligibility matching across India', link: '/scholarships', gradient: 'from-amber-500 to-orange-500' },
  { icon: Calendar, title: 'Entrance Exam Planner', description: 'Never miss an exam date with personalized exam calendars', link: '/exams', gradient: 'from-violet-500 to-purple-600' },
  { icon: FileText, title: 'Personalized Reports', description: 'Detailed reports with career predictions and action plans', link: '/sample-report', gradient: 'from-rose-500 to-pink-600' },
  { icon: LayoutDashboard, title: 'Parent Dashboard', description: 'Track multiple children and monitor career planning progress', link: '/dashboard', gradient: 'from-sky-500 to-blue-600' },
];

const howItWorks = [
  { step: 1, title: 'Create Profile', description: "Add your child's academic details, interests, and goals", icon: Users },
  { step: 2, title: 'AI Analysis', description: 'Our engine analyzes strengths, interests, and market trends', icon: Zap },
  { step: 3, title: 'Get Roadmap', description: 'Receive a personalized career roadmap with actionable steps', icon: Map },
  { step: 4, title: 'Track Progress', description: 'Monitor milestones and adjust plans as your child grows', icon: TrendingUp },
];

const testimonials = [
  { name: 'Priya Sharma', role: 'Parent from Bangalore', content: 'PathPilot helped us understand that our daughter has strong analytical skills suited for data science. She\'s now preparing with focus!', rating: 5 },
  { name: 'Rajesh Kumar', role: 'Parent from Delhi', content: 'The scholarship matching feature saved us over 2 lakhs. We found scholarships we never knew existed.', rating: 5 },
  { name: 'Meena Patel', role: 'Parent from Mumbai', content: 'Finally, a platform that gives Indian parents clear guidance. The roadmap feature is incredibly detailed.', rating: 5 },
];

const trustBadges = [
  { icon: Shield, label: 'India-Wide Guidance', sub: 'All states covered' },
  { icon: Lock, label: 'Privacy First', sub: 'No Aadhaar stored' },
  { icon: Globe, label: 'Verified Sources', sub: 'Official data only' },
  { icon: BookOpen, label: 'Expert Curated', sub: 'Education specialists' },
];

const faqs = [
  { question: 'How does PathPilot India work?', answer: "PathPilot uses AI to analyze your child's academic profile, interests, strengths, and goals. It then creates personalized career roadmaps with college recommendations, scholarship matches, and exam timelines." },
  { question: 'Is PathPilot only for engineering and medical careers?', answer: 'No! PathPilot covers all major career paths including law, design, commerce, civil services, business management, and more.' },
  { question: 'How accurate are the career recommendations?', answer: 'Our recommendations are based on comprehensive analysis of academic performance, psychographics, market trends, and historical placement data.' },
  { question: 'Can I track multiple children?', answer: 'Yes! With the Family Plan, you can create profiles for all your children and manage their career planning from a single dashboard.' },
  { question: 'What exams does PathPilot cover?', answer: 'We cover all major Indian entrance exams including JEE, NEET, CLAT, CUET, KCET, COMEDK, NIFT, NATA, and many more.' },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full p-6 text-left"
      >
        <span className="font-semibold text-gray-900 pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">{answer}</div>}
    </div>
  );
}

export default function LandingPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 50%, #7C3AED 100%)' }}>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1250452/pexels-photo-1250452.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-8" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.92) 0%, rgba(79,70,229,0.90) 50%, rgba(124,58,237,0.88) 100%)' }} />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-7 border border-white/20">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                Trusted by 10,000+ Indian Families
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                Discover the Right<br />
                <span className="text-amber-300">Career Path</span> for<br />
                Your Child
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-white/75 leading-relaxed max-w-lg">
                Personalized career roadmaps, college recommendations, entrance exam planning, and scholarships for Indian students.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-2xl shadow-black/25 text-base"
                >
                  Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/sample-report"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/12 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/25 hover:bg-white/18 transition-all text-base"
                >
                  View Sample Report
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-white/65">
                <div className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" />Free to start</div>
                <div className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" />No credit card required</div>
                <div className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" />All India coverage</div>
              </div>
            </div>

            <div className="relative lg:pl-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20">
                <img
                  src="https://images.pexels.com/photos/1250452/pexels-photo-1250452.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Indian students studying"
                  className="w-full h-[380px] lg:h-[460px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B4B]/60 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Top Career Match: Software Engineering</p>
                      <p className="text-xs text-gray-500 mt-0.5">Based on Mathematics strength & interest in Technology</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stat */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-2xl p-4 border border-gray-100">
                <p className="text-3xl font-bold text-blue-600">150+</p>
                <p className="text-xs text-gray-500 mt-0.5">Colleges Listed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" fill="#F8FAFC" />
          </svg>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-10 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {trustBadges.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{label}</p>
                  <p className="text-xs text-gray-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">Everything You Need</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Complete Career Planning Platform</h2>
            <p className="mt-4 text-lg text-gray-600">Comprehensive tools to guide your child from school to a successful career</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Link
                key={feature.title}
                to={feature.link}
                className="group p-6 lg:p-8 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
                <div className={`w-13 h-13 w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                <div className="mt-4 flex items-center gap-1 text-sm text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">Simple Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">How PathPilot Works</h2>
            <p className="mt-4 text-lg text-gray-600">Four simple steps to your child's brighter future</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={item.step} className="relative text-center">
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+2.5rem)] right-[-calc(50%-2.5rem)] h-px bg-gradient-to-r from-blue-200 to-blue-100 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-600/25">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 lg:left-1/2 lg:right-auto lg:translate-x-2 w-6 h-6 bg-white border-2 border-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">{item.step}</span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us — dark section */}
      <section className="py-16 lg:py-24 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Why PathPilot</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">Built for Indian Families</h2>
              <p className="text-lg text-white/60 mb-8">We simplify the complex world of career planning with India-specific data and guidance</p>
              <ul className="space-y-4">
                {[
                  'Save hours of research on colleges and careers',
                  "Make data-driven decisions about your child's future",
                  'Discover scholarships you never knew existed',
                  'Never miss important exam dates again',
                  'Get personalized recommendations, not generic advice',
                  'Track multiple children in one dashboard',
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-600/30 border border-blue-500/40 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-blue-400" />
                    </div>
                    <span className="text-white/75 text-sm leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Parents helping student"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-2xl p-5 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">30+</p>
                    <p className="text-xs text-gray-500 mt-0.5">Scholarships</p>
                  </div>
                  <div className="w-px h-10 bg-gray-200" />
                  <div className="text-center">
                    <p className="text-3xl font-bold text-emerald-600">50+</p>
                    <p className="text-xs text-gray-500 mt-0.5">Exams Covered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">Testimonials</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Trusted by Indian Parents</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-sm">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-lg text-gray-600">Start free, upgrade as you grow</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING_PLANS.slice(0, 3).map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl p-6 lg:p-8 border transition-all hover:shadow-xl ${
                  plan.popular
                    ? 'border-blue-600 ring-2 ring-blue-600 shadow-xl shadow-blue-600/10'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-full shadow-lg">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-base font-bold text-gray-900 mb-1">{plan.name}</h3>
                <div className="mb-5 mt-3">
                  <span className="text-4xl font-bold text-gray-900">₹{plan.price.toLocaleString('en-IN')}</span>
                  {plan.period !== 'forever' && <span className="text-gray-400 text-sm ml-1">/{plan.period}</span>}
                </div>
                <ul className="space-y-2.5 mb-7">
                  {plan.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={plan.price === 0 ? '/signup' : '/pricing'}
                  className={`block w-full text-center py-3 rounded-xl font-semibold transition-all text-sm ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-600/25'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/pricing" className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center gap-1.5">
              View all plans <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => <FAQItem key={index} {...faq} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24" style={{ background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 50%, #7C3AED 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Plan Your Child's Future?</h2>
          <p className="text-xl text-white/70 mb-10">Join thousands of Indian parents making informed career decisions</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-2xl shadow-black/20"
            >
              Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/sample-report"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/25 hover:bg-white/18 transition-all"
            >
              View Sample Report
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
