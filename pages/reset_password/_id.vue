<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 offset-sm-2">
          <div>
            <h2 class="text-center">กรอกรหัสผ่าน</h2>
            <h4 class="text-center">ใส่ที่รหัสผ่านใหม่ของคุณ</h4>
            <form @submit.prevent="handleSubmit">
              <!-- password  -->
              <div class="form-group">
                <label for="password">รหัสผ่าน</label>
                <input
                  type="password"
                  v-model="password"
                  id="password"
                  name="password"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.password.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.password.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.password.required">โปรดใส่รหัสผ่าน</span>
                  <span v-if="!$v.password.minLength"
                    >รหัสผ่านต้องทีอย่างน้อย 6 ตัว</span
                  >
                </div>
              </div>

              <!-- Confirm password  -->
              <div class="form-group">
                <label for="confirmPassword">รหัสผ่านอีกครั้ง</label>
                <input
                  type="password"
                  v-model="confirmPassword"
                  id="confirmPassword"
                  name="confirmPassword"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.confirmPassword.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.confirmPassword.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.confirmPassword.required"
                    >โปรดใส่รหัสผ่านอีกครั้ง</span
                  >
                  <span v-else-if="!$v.confirmPassword.sameAsPassword"
                    >รหัสผ่านไม่ตรงกัน</span
                  >
                </div>
              </div>

              <!-- button  -->
              <div class="form-group text-center">
                <button class="btn btn-primary text-center">ยืนยัน</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Jwt, StoreAuth } from '../../libs/sessionStorage'
import { mapState } from 'vuex'
import { required, minLength,maxLength, sameAs } from 'vuelidate/lib/validators'
export default {
  head() {
    return {
      title: 'รหัสผ่านใหม่',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'forget-password',
          name: 'forget-password',
          content: 'ใส่รหัสผ่าน',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },
  data() {
    return {
      password: '',
      confirmPassword: '',
      submitted: false,
    }
  },
  validations: {
    password: { required, minLength: minLength(6) },
    confirmPassword: { required, sameAsPassword: sameAs('password') },
  },
  methods: {
    async handleSubmit() {
      this.submitted = true
      try {
        const res = await this.$axios.post(`${this.url}/store/admin/login`, {
          email: this.email,
        })

        console.log(res)
        console.log(res.data)
        if (!res) {
          console.log('error')
        }
        if (res.status == 200) {
          this.$swal
            .fire({
              type: 'success',
              title: 'สำเร็จ',
              timer: 1000,
              showConfirmButton: false,
            })
            .then(this.$router.push('/login'))
          Jwt.setJwtToken(res.data.token)
          StoreAuth.setStoreAuth(res.data.data)
        }
      } catch (err) {
        // console.error(err)
        this.$swal.fire({
          type: 'error',
          title: 'เกิดผิดพลาด',
          timer: 1500,
          showConfirmButton: false,
        })
      }
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
    },
  },
  computed: {
    ...mapState(['url']),
  },
  mounted() {
    if (Jwt.getJwtToken()) this.$router.push('/dashboard')
  },
}
</script>
