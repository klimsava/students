<template>
  <div>
    <h2 class="course-title">Edit course</h2>

    <div v-if="submitted">
      <div v-if="responseStatusCode" class="materialert success">
        {{ this.responseMessage }}
      </div>

      <div v-else class="materialert error">
        {{ this.responseMessage }}
      </div>
    </div>

    <div class="row">
      <form
          @submit.prevent="editCourse"
          class="col s12"
      >
        <div class="row">
          <div class="input-field col s12">
            <input
                id="name"
                v-model.trim="form.name"
                name="name"
                type="text"
                class="validate"
                :class="$v.form.name.$error ? 'invalid-feedback' : ''"
            >
            <label for="name">Course name</label>
            <p v-if="$v.form.name.$dirty && !$v.form.name.required" class="invalid-feedback">Invalid course name!</p>
            <p v-if="$v.form.name.$dirty && !$v.form.name.minLength" class="invalid-feedback">Enter a long name!</p>
          </div>
        </div>
        <div class="row">
          <label>Select a time</label>
          <select class="browser-default" v-model="form.time" @click="clickSelect()">
            <option value="" disabled time>Possible time</option>
            <option
                v-for="time in form.times"
                :key="time"
            >{{ time }}
            </option>
          </select>
          <p v-if="$v.form.time.$dirty && !$v.form.time.required" class="invalid-feedback">Time is not selected!</p>
          <span class="selected-time" v-if="form.time" name="selectedTime">Selected time: {{ form.time }}</span>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input
                id="description"
                name="description"
                v-model.trim="form.description"
                type="text"
                class="validate"
                :class="$v.form.description.$error ? 'invalid-feedback' : ''"
            >
            <label for="description">Course description</label>
            <p v-if="$v.form.description.$dirty && !$v.form.description.required" class="invalid-feedback">Invalid
              description!</p>
            <p v-if="$v.form.description.$dirty && !$v.form.description.minLength" class="invalid-feedback">Enter a long
              description!</p>
          </div>
        </div>
        <div class="row">
          <button class="waves-effect waves-light btn" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {validationMixin} from 'vuelidate'
import {required, minLength} from 'vuelidate/lib/validators'
import coursesModule from "@/api/courses";
import instance from "@/api/instance";

export default {
  mixins: [validationMixin],
  name: 'AddCourse',
  data() {
    return {
      form: {
        times: null,
        timeCourse: '',
        name: '',
        description: '',
        course_id: this.$route.params.course_id,
      },
      responseStatusCode: null,
      responseMessage: null,
      submitted: false,
    }
  },
  validations: {
    form: {
      name: {required, minLength: minLength(3)},
      description: {required, minLength: minLength(10)},
      time: {required},
    }
  },
  methods: {
    clickSelect() {
      this.form.times = this.getCourseTimes();
    },
    async editCourse() {
      this.$v.form.$touch()

      if (!this.$v.form.$error) {
        this.submitted = true;
        const {...form} = this.form;

        try {
          let res = await coursesModule(instance).changeCourse({
            name: form.name,
            description: form.description,
            time: form.time,
          }, form.course_id);

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
    },
    getCourseTimes() {
      const times = [];
      const result = [];
      let time = 8.00;
      let count = 0;

      times.push(time);

      for (let i = 0; i < 35; i++) {
        count++;
        if (count === 3) {
          time = Math.ceil(time);
          times.push(time);
          count = 0;
        }
        time += 0.15;

        times.push(time.toFixed(2));
      }

      times.forEach(num => {
        if (typeof (num) == 'string') {
          result.push(num.replace('.', ':'))
        } else {
          result.push(`${num}:00`);
        }
      });

      return result;
    }
  }
}
</script>

<style lang="sass" scoped>
.course-title
  font-size: 30px
  font-weight: 600
  text-transform: uppercase
  margin: 0
  padding: 50px 0

.browser-default
  width: 150px

.selected-time
  display: block
  padding-top: 15px
  font-size: 16px
  text-transform: uppercase

.invalid-feedback
  color: red

#course_name.invalid-feedback
  border-bottom: 1px solid red

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