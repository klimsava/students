import instance from '../api/instance';

import studentsModule from '../api/students';
import coursesModule from '../api/courses';

const loadCourses = async () => {
  return (await coursesModule(instance).getAllCourses()).data;
}

const loadStudents = async () => {
  return (await studentsModule(instance).getAllStudents()).data;
}

export default {
  namespace: true,
  state: {
    courses: [],
    students: [],
  },
  getters: {
    getCourses(state) {
      return state.courses;
    },
    getStudents(state) {
      return state.students;
    }
  },
  mutations: {
    SET_COURSES(state, payload) {
      state.courses = payload;
    },
    REMOVE_COURSE(state, id) {
      state.courses = state.courses.filter(course => course.id !== id);
    },
    SET_STUDENTS(state, payload) {
      state.students = payload;
    },
    REMOVE_STUDENT(state, id) {
      state.students = state.students.filter(student => student.id !== id);
    },
  },
  actions: {
    async loadCourses({commit}) {
      try {
        const courses = await loadCourses();
        commit('SET_COURSES', courses)
      } catch (err) {
        console.log(err);
      }
    },
    async loadStudents({commit}) {
      try {
        const students = await loadStudents();
        commit('SET_STUDENTS', students)
      } catch (err) {
        console.log(err);
      }
    },
  }
}