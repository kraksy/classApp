import React, { useState } from 'react';
import ClassSelector from '../components/ClassSelector';
import StudentList from '../components/StudentList';
import GradeForm from '../components/GradeForm';

function HomePage() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <div>
      <h1>School Grade System</h1>
      <ClassSelector onClassSelect={setSelectedClass} />
      {selectedClass && (
        <div>
          <h2>Students in Class</h2>
          <StudentList classId={selectedClass} onStudentSelect={setSelectedStudent} />
        </div>
      )}
      {selectedStudent && (
        <div>
          <h3>Add Grade for Student</h3>
          <GradeForm studentId={selectedStudent} onGradeAdded={() => alert('Grade added!')} />
        </div>
      )}
    </div>
  );
}

export default HomePage;

