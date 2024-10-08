import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Replace with your backend server URL
});

export const fetchClasses = () => api.get('/classes');
export const fetchStudentsByClass = (classId) => api.get(`/classes/${classId}/students`);
export const addStudent = (name, classId) => api.post('/students', { name, class_id: classId });
export const addGrade = (studentId, grade, weight, description) =>
  api.post(`/students/${studentId}/grades`, { grade, weight, description });
export const fetchGradesByStudent = (studentId) => api.get(`/students/${studentId}/grades`);
export const deleteStudent = (studentId) => api.delete(`/students/${studentId}`);
export const deleteGrade = (gradeId) => api.delete(`/grades/${gradeId}`);

