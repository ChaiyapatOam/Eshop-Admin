<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 offset-sm-2">
          <div>
            <h2 class="text-center">เข้าสู่ระบบร้านค้า</h2>
            <form @submit.prevent="handleSubmit">
              <!-- อีเมล -->
              <div class="form-group">
                <label for="email">อีเมล</label>
                <input
                  type="email"
                  v-model="email"
                  id="email"
                  name="email"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.email.$error }"
                />
                <div
                  v-if="submitted && $v.email.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.email.required">โปรดใส่อีเมล</span>
                </div>
              </div>

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
                </div>
              </div>
              <!-- button  -->
              <div class="form-group text-center">
                <button class="btn btn-primary text-center">เข้าสู่ระบบ</button>
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
import { Jwt, StoreAuth } from '../libs/sessionStorage'
import { required } from 'vuelidate/lib/validators'
export default {
  head() {
    return {
      title: 'เข้าสู่ระบบ',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'login',
          name: 'login',
          content: 'เข้าสู่ระบบหลังร้าน',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },
  data() {
    return {
      email: '',
      password: '',
      submitted: false,
    }
  },
  validations: {
    email: { required },
    password: { required },
  },
  methods: {
    async handleSubmit() {
      this.submitted = true
      try {
        const url = 'https://test-eshop-api.herokuapp.com/api/v1'
        const res = await this.$axios.post(url + '/store/admin/login', {
          email: this.email,
          password: this.password,
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
            .then(this.$router.push('/dashboard'))
          Jwt.setJwtToken(res.data.token)
          StoreAuth.setStoreAuth(res.data.data)
        }
      } catch (err) {
        console.error(err)
        this.$swal.fire({
          type: 'error',
          title: 'ชื่อหรือรหัสผ่านไม่ถูกต้อง',
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
}
</script>
