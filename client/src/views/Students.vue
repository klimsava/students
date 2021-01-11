<template>
  <div>
    <div class="top-box">
      <h1 class="top-box__title">Students</h1>
      <a class="btn-floating btn-large waves-effect teal accent-4" @click="$router.push({name: 'AddStudent'})">+</a>
    </div>
    <div class="box-students">
      <ul v-if="students.length" class="box-courses__list">
        <div
            v-for="(student, index) in students"
            :key="index"
            class="box-item"
        >
          <li class="box-students__item">
            <h4 class="box-students__fullName">
              Full name:
              <span class="box-students__firstName">{{ student.first_name }}</span> <span class="box-students__lastName">{{ student.last_name }}</span>
            </h4>

            <span class="box-students__age">Age: {{ student.age }}</span>
            <div v-if="student.name" class="box-students__courses">
              <div>
                <span>Your course: </span>
                {{ student.name }}
              </div>
              <div>
                <span>Time course: </span>
                {{ student.time }}
              </div>
            </div>
          </li>
          <div class="box-students__btns">
            <a class="waves-effect waves-light btn" @click="$router.push({name: 'ChosenCourse', params: {profile_id: student.id}})">Chosen course</a>
            <a class="waves-effect waves-light btn" @click="$router.push({name: 'EditStudent', params: {profile_id: student.id}})">Edit</a>
            <a class="waves-effect waves-light btn" @click="removeStudent(student.id)">Delete</a>
          </div>
        </div>
      </ul>
      <p v-else>There are no courses now!</p>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import studentsModule from "@/api/students";
import instance from "@/api/instance";

export default {
  name: 'Students',
  data() {
    return {
    }
  },
  computed: {
    students() {
      return this.$store.getters.getStudents;
    }
  },
  methods: {
    ...mapActions({
      load: 'loadStudents',
    }),
    async removeStudent(id) {
      await this.$store.commit('REMOVE_STUDENT', id);
      await studentsModule(instance).removeStudent(id);
    },
  },
  created() {
    this.load();
  },
}
</script>

<style lang="sass" scoped>
.top-box
  display: flex
  align-items: center
  justify-content: space-between
  margin: 20px
  &__title
    text-transform: uppercase
    margin: 0
.box-students
  &__age,&__courses
    font-weight: bold
  &__btns
    width: 330px
    display: flex
    justify-content: space-between
    align-items: center
  &__firstName,&__lastName
    font-size: 18px
.box-item
  display: flex
  align-items: center
  justify-content: space-between
  border: 1px solid #222
  padding: 10px
  margin-bottom: 10px
  border-radius: 10px
.btn-floating.btn-large
  font-size: 30px
</style>