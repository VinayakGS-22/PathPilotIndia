import { useState } from 'react';
import {
  Users,
  Plus,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
  Trash2,
  Check,
  Shield,
  Gift,
  Mail,
  User as UserIcon,
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

interface LinkedParent {
  id: string;
  name: string;
  email: string;
  relationship: 'father' | 'mother' | 'guardian';
  status: 'approved' | 'pending';
}

interface LinkedChild {
  id: string;
  name: string;
  educationStage: string;
  status: 'approved' | 'pending';
}

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  educationStage: string;
  classLevel: string;
}

interface PendingRequest {
  id: string;
  name: string;
  email: string;
  type: 'parent' | 'child';
  requestedAt: string;
}

export default function FamilyPage() {
  const { user } = useAuth();
  const { showToast } = useToast();

  // Demo data for students (parent-linked users)
  const [linkedParents, setLinkedParents] = useState<LinkedParent[]>([
    { id: '1', name: 'Rajesh Kumar', email: 'rajesh@example.com', relationship: 'father', status: 'approved' },
    { id: '2', name: 'Priya Kumar', email: 'priya@example.com', relationship: 'mother', status: 'pending' },
  ]);

  const [pendingParentRequests, setPendingParentRequests] = useState<PendingRequest[]>([
    { id: '1', name: 'Unknown Parent', email: 'parent.waiting@example.com', type: 'parent', requestedAt: '2 days ago' },
  ]);

  // Demo data for parents (child-linked users)
  const [linkedChildren, setLinkedChildren] = useState<LinkedChild[]>([
    { id: '1', name: 'Arjun Kumar', educationStage: 'Class 10', status: 'approved' },
    { id: '2', name: 'Aisha Kumar', educationStage: 'Class 12', status: 'approved' },
  ]);

  const [pendingChildRequests, setPendingChildRequests] = useState<LinkedChild[]>([
    { id: '3', name: 'Ananya Sharma', educationStage: 'Class 11', status: 'pending' },
  ]);

  // Family members for plan transfer
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    { id: '1', name: 'Rajesh Kumar', relationship: 'Father', educationStage: 'Working Professional', classLevel: 'N/A' },
    { id: '2', name: 'Priya Kumar', relationship: 'Mother', educationStage: 'Working Professional', classLevel: 'N/A' },
    { id: '3', name: 'Arjun Kumar', relationship: 'Brother', educationStage: 'Class 10', classLevel: '10' },
  ]);

  // Form states
  const [showAddParentForm, setShowAddParentForm] = useState(false);
  const [showAddFamilyForm, setShowAddFamilyForm] = useState(false);
  const [parentForm, setParentForm] = useState({
    name: '',
    email: '',
    relationship: 'father' as 'father' | 'mother' | 'guardian',
  });
  const [familyForm, setFamilyForm] = useState({
    name: '',
    relationship: '',
    educationStage: '',
    classLevel: '',
  });

  const handleAddParent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentForm.name || !parentForm.email) {
      showToast('Please fill in all fields', 'error');
      return;
    }
    const newParent: LinkedParent = {
      id: Date.now().toString(),
      ...parentForm,
      status: 'pending',
    };
    setLinkedParents([...linkedParents, newParent]);
    setParentForm({ name: '', email: '', relationship: 'father' });
    setShowAddParentForm(false);
    showToast('Parent invitation sent', 'success');
  };

  const handleRemoveParent = (id: string) => {
    setLinkedParents(linkedParents.filter((p) => p.id !== id));
    showToast('Parent access removed', 'success');
  };

  const handleApproveChild = (id: string) => {
    setPendingChildRequests(pendingChildRequests.filter((c) => c.id !== id));
    const child = pendingChildRequests.find((c) => c.id === id);
    if (child) {
      setLinkedChildren([...linkedChildren, { ...child, status: 'approved' }]);
      showToast('Child request approved', 'success');
    }
  };

  const handleRejectChild = (id: string) => {
    setPendingChildRequests(pendingChildRequests.filter((c) => c.id !== id));
    showToast('Child request rejected', 'success');
  };

  const handleRemoveChild = (id: string) => {
    setLinkedChildren(linkedChildren.filter((c) => c.id !== id));
    showToast('Child access removed', 'success');
  };

  const handleAddFamilyMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!familyForm.name || !familyForm.relationship) {
      showToast('Please fill in required fields', 'error');
      return;
    }
    const newMember: FamilyMember = {
      id: Date.now().toString(),
      ...familyForm,
    };
    setFamilyMembers([...familyMembers, newMember]);
    setFamilyForm({ name: '', relationship: '', educationStage: '', classLevel: '' });
    setShowAddFamilyForm(false);
    showToast('Family member added', 'success');
  };

  const handleRemoveFamilyMember = (id: string) => {
    setFamilyMembers(familyMembers.filter((m) => m.id !== id));
    showToast('Family member removed', 'success');
  };

  const handleTransferPlan = () => {
    showToast('Redirecting to plan transfer...', 'info');
    // In a real app, this would navigate to pricing/checkout
    // window.location.href = '/pricing?transfer=true';
  };

  const isStudent = user?.role === 'student';
  const isParent = user?.role === 'parent';

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            Family Management
          </h1>
          <p className="text-gray-500 mt-2">Manage parent-child links, pending requests, and family members for plan transfer</p>
        </div>

        {/* Student Section */}
        {isStudent && (
          <div className="space-y-4">
            {/* Linked Parents */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-900">Linked Parents</h2>
                      <p className="text-sm text-gray-500">Parents who have access to your information</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAddParentForm(!showAddParentForm)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Parent
                  </button>
                </div>
              </div>

              {/* Add Parent Form */}
              {showAddParentForm && (
                <div className="p-6 border-b border-gray-100 bg-gray-50">
                  <form onSubmit={handleAddParent} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Parent Name</label>
                        <input
                          type="text"
                          value={parentForm.name}
                          onChange={(e) => setParentForm({ ...parentForm, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          placeholder="Enter parent name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={parentForm.email}
                          onChange={(e) => setParentForm({ ...parentForm, email: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          placeholder="parent@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                      <select
                        value={parentForm.relationship}
                        onChange={(e) => setParentForm({ ...parentForm, relationship: e.target.value as 'father' | 'mother' | 'guardian' })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                      >
                        <option value="father">Father</option>
                        <option value="mother">Mother</option>
                        <option value="guardian">Guardian</option>
                      </select>
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Send Invitation
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddParentForm(false)}
                        className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Parents List */}
              <div className="divide-y divide-gray-100">
                {linkedParents.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <p>No parents linked yet. Add a parent to share your information.</p>
                  </div>
                ) : (
                  linkedParents.map((parent) => (
                    <div key={parent.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                          <UserIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{parent.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <p className="text-sm text-gray-500">{parent.email}</p>
                          </div>
                          <p className="text-sm text-gray-500 mt-2 capitalize">{parent.relationship}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {parent.status === 'approved' ? (
                          <div className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                            <CheckCircle className="w-4 h-4" />
                            Approved
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm font-medium">
                            <Clock className="w-4 h-4" />
                            Pending
                          </div>
                        )}
                        <button
                          onClick={() => handleRemoveParent(parent.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Pending Parent Requests */}
            {pendingParentRequests.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">Pending Requests</h2>
                    <p className="text-sm text-gray-500">Parents waiting for your approval</p>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {pendingParentRequests.map((req) => (
                    <div key={req.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-full flex items-center justify-center flex-shrink-0">
                          <UserIcon className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{req.name}</p>
                          <p className="text-sm text-gray-500 mt-1">{req.email}</p>
                          <p className="text-xs text-gray-400 mt-2">Requested {req.requestedAt}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                          Approve
                        </button>
                        <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Parent Section */}
        {isParent && (
          <div className="space-y-4">
            {/* Linked Children */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">Linked Children</h2>
                    <p className="text-sm text-gray-500">Your children on PathPilot India</p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {linkedChildren.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <p>No children linked yet.</p>
                  </div>
                ) : (
                  linkedChildren.map((child) => (
                    <div key={child.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                          <UserIcon className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{child.name}</p>
                          <p className="text-sm text-gray-500 mt-1">{child.educationStage}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                          <CheckCircle className="w-4 h-4" />
                          Approved
                        </div>
                        <button
                          onClick={() => handleRemoveChild(child.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Pending Child Requests */}
            {pendingChildRequests.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">Pending Requests</h2>
                    <p className="text-sm text-gray-500">Children waiting for your approval</p>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {pendingChildRequests.map((child) => (
                    <div key={child.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-full flex items-center justify-center flex-shrink-0">
                          <UserIcon className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{child.name}</p>
                          <p className="text-sm text-gray-500 mt-1">{child.educationStage}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApproveChild(child.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium inline-flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectChild(child.id)}
                          className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Family Members Section */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Gift className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">Family Members</h2>
                  <p className="text-sm text-gray-500">For plan transfer and sharing</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddFamilyForm(!showAddFamilyForm)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Member
              </button>
            </div>
          </div>

          {/* Add Family Member Form */}
          {showAddFamilyForm && (
            <div className="p-6 border-b border-gray-100 bg-gray-50">
              <form onSubmit={handleAddFamilyMember} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      value={familyForm.name}
                      onChange={(e) => setFamilyForm({ ...familyForm, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="Enter name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Relationship *</label>
                    <input
                      type="text"
                      value={familyForm.relationship}
                      onChange={(e) => setFamilyForm({ ...familyForm, relationship: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="e.g., Brother, Sister, Cousin"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Education Stage</label>
                    <input
                      type="text"
                      value={familyForm.educationStage}
                      onChange={(e) => setFamilyForm({ ...familyForm, educationStage: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="e.g., Class 10, College"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Class/Course</label>
                    <input
                      type="text"
                      value={familyForm.classLevel}
                      onChange={(e) => setFamilyForm({ ...familyForm, classLevel: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="e.g., 10, 12-Science"
                    />
                  </div>
                </div>

                {/* Aadhaar Note */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex gap-3">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">Privacy & Compliance:</span> For privacy and compliance, Aadhaar details are not stored on PathPilot India. Verification is done through DigiLocker/KYC partner.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Add Member
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddFamilyForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Family Members List */}
          <div className="divide-y divide-gray-100">
            {familyMembers.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <p>No family members added yet.</p>
              </div>
            ) : (
              familyMembers.map((member) => (
                <div key={member.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <UserIcon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>{member.relationship}</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{member.educationStage}</span>
                        {member.classLevel && <span>{member.classLevel}</span>}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFamilyMember(member.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Transfer Plan Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 overflow-hidden">
          <div className="p-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">Transfer Your Plan</h2>
                <p className="text-gray-600 mt-2 max-w-lg">
                  Transfer your PathPilot India subscription to a family member. Your plan benefits will move to them while you maintain advisory access.
                </p>
                <div className="mt-6">
                  <button
                    onClick={handleTransferPlan}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
                  >
                    <Gift className="w-5 h-5" />
                    Explore Transfer Options
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
