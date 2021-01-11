<template>
  <div>
    <h1>Choose your course</h1>

    <div v-if="submitted">
      <div v-if="responseStatusCode" class="materialert success">
        {{ this.responseMessage }}
      </div>

      <div v-else class="materialert error">
        {{ this.responseMessage }}
      </div>
    </div>

    <form
        @submit.prevent="selectCourse"
    >
      <ul
          class="collection"
          v-for="(course, index) in courses"
          :key="index"
      >
        <li class="collection-item">
          {{ course.name }}
          <div>
            {{ course.time }}
            {{ course.id }}
          </div>
          <label class="checkboxCourse">
            <input
                type="radio"
                :value="course.id"
                id="course.id"
                v-model="object.checkedCategories"
                @change="check($event)"
            >
            <span></span>
          </label>
        </li>
      </ul>
      <div class="bnt_right">
        <button type="submit" class="waves-effect waves-light btn">Save</button>
        <router-link to="/students" tag="button" class="waves-effect waves-light btn">Cancel</router-link>
      </div>
      <div style="display: none" class="checkbox-error" :class="{checkboxError: this.object.selected}">Select the
        checkbox
      </div>
    </form>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import studentsModule from "../api/students";
import instance from "../api/instance";

export default {
  name: 'ChosenCourse',
  data() {
    return {
      object: {
        studentId: this.$route.params.profile_id,
        checkedCategories: null,
        selected: false,
      },
      responseStatusCode: null,
      responseMessage: null,
      submitted: false,
    }
  },
  computed: {
    courses() {
      return this.$store.getters.getCourses;
    }
  },
  methods: {
    ...mapActions({
      load: 'loadCourses',
      check: function (event) {
        console.log(event);
      },
      async selectCourse() {
        if (this.object.checkedCategories.length !== 0) {
          this.object.selected = false;
          this.submitted = true;

          try {
            let res = await studentsModule(instance).selectCourse({
              studentId: this.object.studentId,
              courseId: this.object.checkedCategories,
            });

            this.responseStatusCode = res.data.status;
            this.responseMessage = res.data.message;
          } catch (err) {
            this.responseStatusCode = err.response.data.status;
            this.responseMessage = err.response.data.message;
          }

          if (this.responseStatusCode) {
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          }
        }
        this.object.selected = true;
      }
    }),
  },
  created() {
    this.load();
  },
}
</script>

<style lang="sass" scoped>
.collection
  &-item
    position: relative
    padding: 8px 20px

  .checkboxCourse
    position: absolute
    top: 50%
    right: 0
    transform: translate(-50%, -50%)

.waves-effect
  margin: 10px 10px 30px 0

.checkboxError
  display: block
  color: red
$var1: #039be5
$var2: #ffffff
$var3: #43a047
$var4: #c62828
html
  line-height: 1.5
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif

.materialert
  position: relative
  min-width: 150px
  padding: 15px
  margin-bottom: 20px
  margin-top: 15px
  border: 1px solid transparent
  border-radius: 4px
  transition: all 0.1s linear
  webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)
  display: -webkit-box
  display: -webkit-flex
  display: -ms-flexbox
  display: flex
  -webkit-box-align: center
  -webkit-align-items: center
  -ms-flex-align: center
  align-items: center

  .material-icons
    margin-right: 10px

  .close-alert
    -webkit-appearance: none
    border: 0
    cursor: pointer
    color: inherit
    background: 0 0
    font-size: 22px
    line-height: 1
    font-weight: bold
    text-shadow: 0 1px 0 rgba(255, 255, 255, .7)
    margin-bottom: -5px
    position: absolute
    top: 16px
    right: 5px

  &.info
    background-color: $var1
    color: $var2

  &.success
    background-color: $var3
    color: $var2

  &.error
    background-color: $var4
    color: $var2
</style>
