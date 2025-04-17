let students = JSON.parse(localStorage.getItem("students")) || [];
let editingIndex = null;

const form = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const courseInput = document.getElementById("course");
const tableBody = document.getElementById("studentTableBody");

function renderStudents() {
  tableBody.innerHTML = "";
  students.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.email}</td>
      <td>${student.course}</td>
      <td class="actions">
        <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newStudent = {
    name: nameInput.value,
    email: emailInput.value,
    course: courseInput.value,
  };

  if (editingIndex === null) {
    students.push(newStudent);
  } else {
    students[editingIndex] = newStudent;
    editingIndex = null;
  }

  localStorage.setItem("students", JSON.stringify(students));
  form.reset();
  renderStudents();
});

function editStudent(index) {
  const student = students[index];
  nameInput.value = student.name;
  emailInput.value = student.email;
  courseInput.value = student.course;
  editingIndex = index;
}

function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student?")) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    renderStudents();
  }
}

renderStudents();
