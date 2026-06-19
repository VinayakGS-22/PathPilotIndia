import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Student, Report, SavedExam } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface DataContextType {
  students: Student[];
  reports: Report[];
  savedExams: SavedExam[];
  loading: boolean;
  getStudent: (id: string) => Student | undefined;
  addStudent: (student: Omit<Student, 'id' | 'created_at'>) => Promise<Student>;
  updateStudent: (id: string, updates: Partial<Student>) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
  getReport: (id: string) => Report | undefined;
  addReport: (report: Omit<Report, 'id' | 'created_at'>) => Promise<Report>;
  deleteReport: (id: string) => Promise<void>;
  addSavedExam: (exam: Omit<SavedExam, 'id' | 'added_at'>) => Promise<void>;
  removeSavedExam: (id: string) => Promise<void>;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [savedExams, setSavedExams] = useState<SavedExam[]>([]);
  const [loading, setLoading] = useState(false);

  const getStorageKey = (key: string) => user ? `${key}_${user.id}` : key;

  const refreshData = async () => {
    if (!user) { setStudents([]); setReports([]); setSavedExams([]); return; }
    setLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const [studentsRes, reportsRes, examsRes] = await Promise.all([
          supabase.from('students').select('*').eq('user_id', user.id),
          supabase.from('reports').select('*').eq('user_id', user.id),
          supabase.from('saved_exams').select('*').eq('user_id', user.id)
        ]);
        setStudents(studentsRes.data || []);
        setReports(reportsRes.data || []);
        setSavedExams(examsRes.data || []);
      } else {
        const savedStudents = localStorage.getItem(getStorageKey('pathpilot_students'));
        const savedReports = localStorage.getItem(getStorageKey('pathpilot_reports'));
        const savedExamsData = localStorage.getItem(getStorageKey('pathpilot_saved_exams'));
        setStudents(savedStudents ? JSON.parse(savedStudents) : []);
        setReports(savedReports ? JSON.parse(savedReports) : []);
        setSavedExams(savedExamsData ? JSON.parse(savedExamsData) : []);
      }
    } catch (error) { console.error('Error fetching data:', error); }
    setLoading(false);
  };

  useEffect(() => { refreshData(); }, [user]);

  const getStudent = (id: string) => students.find(s => s.id === id);

  const addStudent = async (studentData: Omit<Student, 'id' | 'created_at'>): Promise<Student> => {
    const student: Student = { ...studentData, id: crypto.randomUUID(), created_at: new Date().toISOString() };
    if (isSupabaseConfigured && supabase && user) { await supabase.from('students').insert(student); }
    const updatedStudents = [...students, student];
    localStorage.setItem(getStorageKey('pathpilot_students'), JSON.stringify(updatedStudents));
    setStudents(updatedStudents);
    return student;
  };

  const updateStudent = async (id: string, updates: Partial<Student>) => {
    if (isSupabaseConfigured && supabase) { await supabase.from('students').update(updates).eq('id', id); }
    const updatedStudents = students.map(s => s.id === id ? { ...s, ...updates } : s);
    localStorage.setItem(getStorageKey('pathpilot_students'), JSON.stringify(updatedStudents));
    setStudents(updatedStudents);
  };

  const deleteStudent = async (id: string) => {
    if (isSupabaseConfigured && supabase) { await supabase.from('students').delete().eq('id', id); }
    const updatedStudents = students.filter(s => s.id !== id);
    localStorage.setItem(getStorageKey('pathpilot_students'), JSON.stringify(updatedStudents));
    setStudents(updatedStudents);
  };

  const getReport = (id: string) => reports.find(r => r.id === id);

  const addReport = async (reportData: Omit<Report, 'id' | 'created_at'>): Promise<Report> => {
    const report: Report = { ...reportData, id: crypto.randomUUID(), created_at: new Date().toISOString() };
    if (isSupabaseConfigured && supabase && user) { await supabase.from('reports').insert(report); }
    const updatedReports = [...reports, report];
    localStorage.setItem(getStorageKey('pathpilot_reports'), JSON.stringify(updatedReports));
    setReports(updatedReports);
    return report;
  };

  const deleteReport = async (id: string) => {
    if (isSupabaseConfigured && supabase) { await supabase.from('reports').delete().eq('id', id); }
    const updatedReports = reports.filter(r => r.id !== id);
    localStorage.setItem(getStorageKey('pathpilot_reports'), JSON.stringify(updatedReports));
    setReports(updatedReports);
  };

  const addSavedExam = async (examData: Omit<SavedExam, 'id' | 'added_at'>) => {
    const exam: SavedExam = { ...examData, id: crypto.randomUUID(), added_at: new Date().toISOString() };
    if (isSupabaseConfigured && supabase && user) { await supabase.from('saved_exams').insert(exam); }
    const updatedExams = [...savedExams, exam];
    localStorage.setItem(getStorageKey('pathpilot_saved_exams'), JSON.stringify(updatedExams));
    setSavedExams(updatedExams);
  };

  const removeSavedExam = async (id: string) => {
    if (isSupabaseConfigured && supabase) { await supabase.from('saved_exams').delete().eq('id', id); }
    const updatedExams = savedExams.filter(e => e.id !== id);
    localStorage.setItem(getStorageKey('pathpilot_saved_exams'), JSON.stringify(updatedExams));
    setSavedExams(updatedExams);
  };

  return (
    <DataContext.Provider value={{ students, reports, savedExams, loading, getStudent, addStudent, updateStudent, deleteStudent, getReport, addReport, deleteReport, addSavedExam, removeSavedExam, refreshData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) throw new Error('useData must be used within a DataProvider');
  return context;
}
