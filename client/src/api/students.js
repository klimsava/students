const qs = require('querystring');

export default function (instance) {
  return {
    getAllStudents() {
      return instance.get('/api/students/');
    },
    removeStudent(id) {
      return instance.delete(`api/students/${id}`);
    },
    addStudent(payload) {
      return instance.post('api/students/', qs.stringify(payload));
    },
    editStudent(payload, id) {
      return instance.put(`api/students/${id}`, qs.stringify(payload));
    },
    selectCourse(payload) {
      return instance.post(`api/students/chosen-course`, qs.stringify(payload));
    }
  }
}