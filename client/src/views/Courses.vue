<template>
  <div>
    <div class="top-box">
      <h1 class="top-box__title">Courses</h1>
      <a class="btn-floating btn-large waves-effect teal accent-4" @click="$router.push({name: 'AddCourse'})">+</a>
    </div>
    <div class="box-courses">
      <ul v-if="courses.length" class="box-courses__list">
        <div
            v-for="(course, index) in courses"
            :key="index"
            class="box-item"
        >
          <li class="box-courses__item">
            <h4 class="box-courses__title">{{ course.name }}</h4>
            <span class="box-courses__time">{{ course.time }}</span>
            <p class="box-courses__desc">{{ course.description }}</p>
          </li>
          <a class="waves-effect waves-light btn"
             @click="$router.push({name: 'EditCourse', params: {course_id: course.id}})">Edit</a>
          <a class="waves-effect waves-light btn" @click="removeCourse(course.id)">Delete</a>
        </div>
      </ul>
      <p v-else>There are no courses now!</p>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import coursesModule from "../api/courses";
import instance from "../api/instance";

export default {
  name: 'Courses',
  data() {
    return {}
  },
  computed: {
    courses() {
      return this.$store.getters.getCourses;
    }
  },
  methods: {
    ...mapActions({
      load: 'loadCourses',
    }),
    async removeCourse(id) {
      await this.$store.commit('REMOVE_COURSE', id);
      await coursesModule(instance).removeCourse(id);
    },
    changeCourse(id) {
      this.form.id = id;
      this.change = !this.change;
    },
  },
  created() {
    this.load()
  }
}
</script>

<style lang="sass" scoped>
.box-courses
  height: 620px
  overflow: scroll

  .box-courses__list
    .box-item
      width: 700px
      display: flex
      align-items: center
      justify-content: space-between
      margin-bottom: 20px

      .btn
        display: block

    .box-courses__item
      width: 500px
      border: 1px solid #000
      padding: 15px
      border-radius: 10px

    .box-courses
      &__title
        font-size: 16px
        font-weight: 600
        color: #8c26a6
        text-transform: uppercase
        margin: 0
        padding: 10px 0px

      &__desc
        font-size: 16px
        margin: 0
        padding: 10px 0px

.top-box
  display: flex
  align-items: center
  justify-content: space-between
  margin: 20px

  &__title
    text-transform: uppercase
    margin: 0

.btn-floating.btn-large
  font-size: 30px

  &:hover
    background-color: red

.invalid-feedback
  color: red

#course_name.invalid-feedback
  border-bottom: 1px solid red
</style>
