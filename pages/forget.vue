<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 offset-sm-2">
          <div>
            <h2 class="text-center">ลืมรหัสผ่าน</h2>
            <h4 class="text-center">ใส่ที่อยู่อีเมลของคุณ</h4>
            <form @submit.prevent="handleSubmit">
              <!-- อีเมล -->
              <div class="form-group">
                <label for="email"></label>
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
import { Jwt, StoreAuth } from '../libs/sessionStorage'
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  head() {
    return {
      title: 'ลืมรหัสผ่าน',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'forget-password',
          name: 'forget-password',
          content: 'ลืมรหัสผ่าน',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },
  data() {
    return {
      email: '',
      submitted: false,
    }
  },
  validations: {
    email: { required },
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
            .then(this.$router.push('/dashboard'))
          Jwt.setJwtToken(res.data.token)
          StoreAuth.setStoreAuth(res.data.data)
        }
      } catch (err) {
        console.error(err)
        this.$swal.fire({
          type: 'error',
          title: 'ไม่พบที่อยู่อีเมล',
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
