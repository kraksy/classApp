import React, { useEffect, useState } from 'react';
import { fetchStudentsByClass } from '../services/api';

function StudentList({ classId, onStudentSelect }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (classId) {
      fetchStudentsByClass(classId).then((response) => {
        setStudents(response.data);
      });
    }
  }, [classId]);

  return (
    <ul>
      {students.map((student) => (
        <li key={student.id} onClick={() => onStudentSelect(student.id)}>
          {student.name}
        </li>
      ))}
    </ul>
  );
}

export default StudentList;

