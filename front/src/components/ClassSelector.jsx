import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClassSelector = () => {
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const [grades, setGrades] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get('http://localhost:3001/classes');
                setClasses(response.data);
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };

        fetchClasses();
    }, []);

    const handleClassChange = async (e) => {
        const classId = e.target.value;
        setSelectedClass(classId);

        // Fetch students for the selected class
        const studentsResponse = await axios.get(`http://localhost:3001/classes/${classId}/students`);
        setStudents(studentsResponse.data);

        // Fetch grades for the selected class
        const gradesResponse = await axios.get(`http://localhost:3001/classes/${classId}/grades`);
        setGrades(gradesResponse.data);
    };

    return (
        <div>
            <select onChange={handleClassChange}>
                <option value="">Select a class</option>
                {classes.map((classItem) => (
                    <option key={classItem.id} value={classItem.id}>
                        {classItem.name}
                    </option>
                ))}
            </select>

            <h2>Students in Class</h2>
            <ul>
                {students.map((student) => (
                    <li key={student.id}>{student.name}</li>
                ))}
            </ul>

            <h2>Grades</h2>
            <table>
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Grade</th>
                        <th>Weight</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {grades.map((grade, index) => (
                        <tr key={index}>
                            <td>{grade.studentName}</td>
                            <td>{grade.grade}</td>
                            <td>{grade.weight}</td>
                            <td>{grade.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Calculate and display averages */}
            <div>
                <h3>Class Average: {calculateClassAverage(grades)}</h3>
                <h3>Individual Averages:</h3>
                {students.map((student) => (
                    <div key={student.id}>
                        <strong>{student.name}:</strong> {calculateStudentAverage(student.id)} {/* Add logic for this */}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Helper functions to calculate averages
const calculateClassAverage = (grades) => {
    if (grades.length === 0) return 0;
    const total = grades.reduce((sum, grade) => sum + grade.grade * grade.weight, 0);
    const weightSum = grades.reduce((sum, grade) => sum + grade.weight, 0);
    return (total / weightSum).toFixed(2);
};

const calculateStudentAverage = (studentId) => {
    // Logic to calculate individual student's average grade
    // Implement this based on how you store and manage state
};

export default ClassSelector;

