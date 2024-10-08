import React, { useState } from 'react';
import { addGrade } from '../services/api';

function GradeForm({ studentId, onGradeAdded }) {
  const [grade, setGrade] = useState(1);
  const [weight, setWeight] = useState(1);
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addGrade(studentId, grade, weight, description).then(() => {
      onGradeAdded();
      setGrade(1);
      setWeight(1);
      setDescription('');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Grade (1-5):</label>
      <input
        type="number"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        min="1"
        max="5"
        required
      />

      <label>Weight (1-10):</label>
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        min="1"
        max="10"
        required
      />

      <label>Description:</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <button type="submit">Add Grade</button>
    </form>
  );
}

export default GradeForm;

