<template>
  <div>
    <h2 class="course-title">Edit student</h2>

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
          @submit.prevent="editStudent"
          class="col s12"
      >
        <div class="row">
          <div class="input-field col s12">
            <input
                id="student_firstName"
                v-model.trim="form.firstName"
                name="student_firstName"
                type="text"
                class="validate"
                :class="$v.form.firstName.$error ? 'invalid-feedback' : ''"
            >
            <label for="student_firstName">First name student</label>
            <p v-if="$v.form.firstName.$dirty && !$v.form.firstName.required" class="invalid-feedback">Invalid student
              firstName!</p>
            <p v-if="$v.form.firstName.$dirty && !$v.form.firstName.minLength" class="invalid-feedback">Enter a long
              firstName!</p>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input
                id="student_lastName"
                v-model.trim="form.lastName"
                name="student_lastName"
                type="text"
                class="validate"
                :class="$v.form.lastName.$error ? 'invalid-feedback' : ''"
            >
            <label for="student_lastName">Last name student</label>
            <p v-if="$v.form.lastName.$dirty && !$v.form.lastName.required" class="invalid-feedback">Invalid student
              lastName!</p>
            <p v-if="$v.form.lastName.$dirty && !$v.form.lastName.minLength" class="invalid-feedback">Enter a long
              lastName!</p>
          </div>
        </div>
        <div class="row">
          <label>Select a age</label>
          <select class="browser-default" v-model="form.age">
            <option value="" disabled age>Possible age</option>
            <option
                v-for="age in 85"
                :key="age"
                :class="$v.form.age.$error ? 'invalid-feedback' : ''"
            >{{ age }}
            </option>
          </select>
          <p v-if="$v.form.age.$dirty && !$v.form.age.required" class="invalid-feedback">Age is not selected!</p>
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
import studentsModule from "../api/students";
import instance from "../api/instance";

export default {
  mixins: [validationMixin],
  name: 'AddStudent',
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        age: '',
        profile_id: this.$route.params.profile_id,
      },
      responseStatusCode: null,
      responseMessage: null,
      submitted: false,
    }
  },
  validations: {
    form: {
      firstName: {required, minLength: minLength(3)},
      lastName: {required, minLength: minLength(3)},
      age: {required},
    }
  },
  methods: {
    async editStudent() {
      this.$v.form.$touch();

      if (!this.$v.form.$error) {
        this.submitted = true;
        const {...form} = this.form;
        try {
          let res = await studentsModule(instance).editStudent({
            first_name: form.firstName,
            last_name: form.lastName,
            age: form.age,
          }, form.profile_id);

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
