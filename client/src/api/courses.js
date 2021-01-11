const qs = require('querystring');

export default function (instance) {
  return {
    getAllCourses() {
      return instance.get('api/courses');
    },
    removeCourse(id) {
      return instance.delete(`api/courses/${id}`);
    },
    AddCourse(payload) {
      return instance.post('api/courses/', qs.stringify(payload));
    },
    changeCourse(payload, id) {
      return instance.put(`api/courses/${id}`, qs.stringify(payload));
    },
  }
}