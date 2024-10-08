// src/components/ClassGrades.jsx// src/components/ClassGrades.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClassGrades = ({ classId }) => {
    const [grades, setGrades] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/classes/${classId}/grades`);
                setGrades(response.data);
            } catch (err) {
                console.error('Error fetching grades:', err);
                setError('Error fetching grades');
            }
        };

        fetchGrades();
    }, [classId]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h3>Students in Class</h3>
            <ul>
                {grades.length > 0 ? (
                    grades.map((grade, index) => (
                        <li key={index}>
                            {grade.studentName}: Grade {grade.grade} (Weight: {grade.weight}) - {grade.description}
                        </li>
                    ))
                ) : (
                    <li>No grades available for this class.</li>
                )}
            </ul>
        </div>
    );
};

export default ClassGrades;

