import { useState, useEffect } from "react";
import StudentTable from "./Components/StudentTable.jsx";
import StudentForm from "./Components/StudentForm.jsx";
import Loader from "./Components/Loader.jsx";
import studentsData from "./data/students.json";
function App() {

  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStudents(studentsData);
      setLoading(false);
    }, 1000);
  }, []);

  const addStudent = (student) => {
    setStudents([...students, { ...student, id: Date.now() }]);
  };

  const updateStudent = (updatedStudent) => {
    setStudents(
      students.map((s) =>
        s.id === updatedStudent.id ? updatedStudent : s
      )
    );
    setEditingStudent(null);
  };

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1>Students Table</h1>

      <StudentForm
        addStudent={addStudent}
        editingStudent={editingStudent}
        updateStudent={updateStudent}
      />

      <StudentTable
        students={students}
        setEditingStudent={setEditingStudent}
        deleteStudent={deleteStudent}
      />
    </div>
  );
}

export default App;
