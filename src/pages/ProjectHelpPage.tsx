import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { useToast } from '../contexts/ToastContext';

interface FormData {
  name: string;
  email: string;
  phone: string;
  branch: string;
  projectTopic: string;
  deadline: string;
  budgetRange: string;
  documentationNeeded: boolean;
  presentationNeeded: boolean;
  additionalRequirements: string;
}

const branches = [
  'Computer Science',
  'Information Science',
  'Electronics',
  'Electrical',
  'Mechanical',
  'Civil',
  'Biotechnology',
  'AI/ML',
  'Data Science',
  'Cybersecurity'
];

const budgetRanges = [
  'Not decided yet',
  'Less than $500',
  '$500 - $1,000',
  '$1,000 - $2,500',
  '$2,500 - $5,000',
  'More than $5,000'
];

export default function ProjectHelpPage() {
  const { showToast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    branch: '',
    projectTopic: '',
    deadline: '',
    budgetRange: '',
    documentationNeeded: false,
    presentationNeeded: false,
    additionalRequirements: ''
  });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.branch) newErrors.branch = 'Please select a branch';
    if (!formData.projectTopic.trim()) newErrors.projectTopic = 'Project topic is required';
    if (!formData.deadline) newErrors.deadline = 'Deadline is required';
    if (!formData.budgetRange) newErrors.budgetRange = 'Please select a budget range';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast('Please fill in all required fields correctly', 'error');
      return;
    }

    setLoading(true);

    try {
      // Save to localStorage
      const projectLeads = JSON.parse(localStorage.getItem('pathpilot_project_leads') || '[]');
      const newLead = {
        id: crypto.randomUUID(),
        ...formData,
        status: 'new' as const,
        created_at: new Date().toISOString()
      };
      projectLeads.push(newLead);
      localStorage.setItem('pathpilot_project_leads', JSON.stringify(projectLeads));

      // Save to Supabase if configured
      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('project_leads').insert([newLead]);
        } catch (supabaseError) {
          console.warn('Supabase save failed, using localStorage fallback:', supabaseError);
        }
      }

      setSubmitted(true);
      showToast('Your project help request has been submitted successfully!', 'success');

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          branch: '',
          projectTopic: '',
          deadline: '',
          budgetRange: '',
          documentationNeeded: false,
          presentationNeeded: false,
          additionalRequirements: ''
        });
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      showToast('Failed to submit request. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <div className="bg-gradient-to-br from-green-50 to-white py-12 min-h-screen flex items-center">
          <div className="max-w-md mx-auto w-full px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for submitting your project help request. We'll review your details and get back to you soon via email or phone.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-green-800">
                  <strong>Reference ID:</strong> {formData.email}
                </p>
              </div>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gradient-to-br from-blue-50 to-white py-12 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              <Send className="w-4 h-4" />
              Get Expert Project Help
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Request Project Assistance
            </h1>
            <p className="text-lg text-gray-600">
              Tell us about your project and what kind of help you need. Our team will review your request and connect you with the right resources.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Branch */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Engineering Branch <span className="text-red-600">*</span>
                </label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.branch ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select your branch</option>
                  {branches.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
                {errors.branch && <p className="text-red-600 text-sm mt-1">{errors.branch}</p>}
              </div>

              {/* Project Topic */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Project Topic / Title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="projectTopic"
                  value={formData.projectTopic}
                  onChange={handleInputChange}
                  placeholder="e.g., Smart Home IoT System"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.projectTopic ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.projectTopic && <p className="text-red-600 text-sm mt-1">{errors.projectTopic}</p>}
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Project Deadline <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.deadline ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.deadline && <p className="text-red-600 text-sm mt-1">{errors.deadline}</p>}
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Budget Range <span className="text-red-600">*</span>
                </label>
                <select
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.budgetRange ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select budget range</option>
                  {budgetRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
                {errors.budgetRange && <p className="text-red-600 text-sm mt-1">{errors.budgetRange}</p>}
              </div>

              {/* Checkboxes */}
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="documentationNeeded"
                    checked={formData.documentationNeeded}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-900 font-medium">Documentation Help Needed</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="presentationNeeded"
                    checked={formData.presentationNeeded}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-900 font-medium">Presentation/Demo Help Needed</span>
                </label>
              </div>

              {/* Additional Requirements */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Additional Requirements or Details
                </label>
                <textarea
                  name="additionalRequirements"
                  value={formData.additionalRequirements}
                  onChange={handleInputChange}
                  placeholder="Tell us more about your project, specific challenges you're facing, or any special requirements..."
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                />
              </div>

              {/* Terms Note */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                  We'll use your information to connect you with project resources and assistance. You'll hear from us within 24 hours.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </div>

          {/* Info Box */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <h3 className="text-lg font-bold text-gray-900 mb-2">What Happens Next?</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">1.</span>
                <span>We review your project details and requirements</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">2.</span>
                <span>Our team contacts you via email or phone within 24 hours</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">3.</span>
                <span>We provide guidance, resources, and connect you with experts</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">4.</span>
                <span>You receive support throughout your project journey</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
