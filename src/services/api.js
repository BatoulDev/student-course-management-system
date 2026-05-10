// In-memory store initialized from static JSON via fetch()
let courses = [];
let students = [];
let nextCourseId = 7;
let nextStudentId = 9;

const BASE = '/data';

const initData = async () => {
  try {
    const [coursesRes, studentsRes] = await Promise.all([
      fetch(`${BASE}/courses.json`),
      fetch(`${BASE}/students.json`),
    ]);
    courses = await coursesRes.json();
    students = await studentsRes.json();
  } catch (err) {
    console.error('Failed to load initial data:', err);
  }
};

initData();

export const getCourses = async () => {
  try {
    const res = await fetch(`${BASE}/courses.json`);
    const data = await res.json();
    return { success: true, data };
  } catch (err) {
    return { success: false, message: 'Failed to fetch courses.' };
  }
};

export const getCourseById = async (id) => {
  try {
    const res = await fetch(`${BASE}/courses.json`);
    const data = await res.json();
    const course = data.find((c) => c.id === Number(id));
    if (!course) return { success: false, message: 'Course not found.' };
    return { success: true, data: course };
  } catch (err) {
    return { success: false, message: 'Failed to fetch course details.' };
  }
};

export const addCourse = async (courseData) => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  try {
    const newCourse = {
      id: nextCourseId++,
      ...courseData,
      studentsCount: 0,
      status: 'Active',
    };
    courses.push(newCourse);
    return { success: true, data: newCourse };
  } catch (err) {
    return { success: false, message: 'Failed to add course.' };
  }
};

export const deleteCourse = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  try {
    const index = courses.findIndex((c) => c.id === Number(id));
    if (index === -1) return { success: false, message: 'Course not found.' };
    const deleted = courses.splice(index, 1)[0];
    return { success: true, data: deleted };
  } catch (err) {
    return { success: false, message: 'Failed to delete course.' };
  }
};

export const getStudents = async () => {
  try {
    const res = await fetch(`${BASE}/students.json`);
    const data = await res.json();
    return { success: true, data };
  } catch (err) {
    return { success: false, message: 'Failed to fetch students.' };
  }
};

export const addStudent = async (studentData) => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  try {
    const newStudent = { id: nextStudentId++, ...studentData };
    students.push(newStudent);
    return { success: true, data: newStudent };
  } catch (err) {
    return { success: false, message: 'Failed to add student.' };
  }
};

export const deleteStudent = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  try {
    const index = students.findIndex((s) => s.id === Number(id));
    if (index === -1) return { success: false, message: 'Student not found.' };
    const deleted = students.splice(index, 1)[0];
    return { success: true, data: deleted };
  } catch (err) {
    return { success: false, message: 'Failed to delete student.' };
  }
};
