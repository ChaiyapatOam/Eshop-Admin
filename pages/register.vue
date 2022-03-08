<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 offset-sm-2">
          <div>
            <h2 class="text-center">สร้างร้านค้าของคุณ</h2>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="store">ชื่อร้าน</label>
                <input
                  type="text"
                  v-model="user.store"
                  id="store"
                  name="store"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.user.store.$error }"
                />
                <div
                  v-if="submitted && !$v.user.store.required"
                  class="invalid-feedback"
                >
                  โปรดใส่ชื่อร้าน
                </div>
              </div>

              <!-- ที่อยู่ร้าน -->
              <div class="form-group">
                <label for="address">ที่อยู่ร้าน</label>
                <input
                  type="text"
                  v-model="user.address"
                  id="address"
                  name="address"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.user.address.$error }"
                />
                <div
                  v-if="submitted && !$v.user.address.required"
                  class="invalid-feedback"
                >
                  โปรดใส่ที่อยู่ร้าน
                </div>
              </div>

              <!-- เบอร์โทรศัพท์ -->
              <div class="form-group">
                <label for="phone">เบอร์โทรศัพท์</label>
                <input
                  type="text"
                  v-model="user.phone"
                  id="phone"
                  name="phone"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.user.phone.$error }"
                />
                <div
                  v-if="submitted && !$v.user.phone.required"
                  class="invalid-feedback"
                >
                  โปรดใส่ที่เบอร์โทรศัพท์
                </div>
              </div>

              <!-- อีเมล -->
              <div class="form-group">
                <label for="email">อีเมล</label>
                <input
                  type="email"
                  v-model="user.email"
                  id="email"
                  name="email"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.user.email.$error }"
                />
                <div
                  v-if="submitted && $v.user.email.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.email.required">โปรดใส่อีเมล</span>
                  <span v-if="!$v.user.email.email">อีเมลไม่ถูกต้อง</span>
                </div>
              </div>

              <!-- password  -->
              <div class="form-group">
                <label for="password">รหัสผ่าน</label>
                <input
                  type="password"
                  v-model="user.password"
                  id="password"
                  name="password"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.user.password.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.user.password.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.password.required">โปรดใส่รหัสผ่าน</span>
                  <span v-if="!$v.user.password.minLength"
                    >รหัสผ่านต้องทีอย่างน้อย 6 ตัว</span
                  >
                </div>
              </div>

              <!-- Confirm password  -->
              <div class="form-group">
                <label for="confirmPassword">รหัสผ่านอีกครั้ง</label>
                <input
                  type="password"
                  v-model="user.confirmPassword"
                  id="confirmPassword"
                  name="confirmPassword"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.user.confirmPassword.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.user.confirmPassword.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.confirmPassword.required"
                    >โปรดใส่รหัสผ่านอีกครั้ง</span
                  >
                  <span v-else-if="!$v.user.confirmPassword.sameAsPassword"
                    >รหัสผ่านไม่ตรงกัน</span
                  >
                </div>
              </div>
              
              <div class="form-group text-center">
                <h5>
                  มีร้านค้าแล้ว?
                  <nuxt-link to="/login">เข้าสู่ระบบเลย</nuxt-link>
                </h5>
              </div>
              <!-- button  -->
              <div class="form-group text-center">
                <button class="btn btn-primary text-center">
                  สร้างร้านค้า
                </button>
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
import { mapState } from 'vuex'
import { required, email, minLength,maxLength, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'app',
  head() {
    return {
      title: 'สร้างร้านค้า',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'สร้างร้านค้า',
          name: 'สร้างร้านค้า',
          content: 'มาสร้างร้านค้ากับเรา เพื่อจัดการสินค้า',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },
  data() {
    return {
      user: {
        store: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        address: '',
      },
      submitted: false,
    }
  },
  validations: {
    user: {
      store: { required },
      address: { required },
      email: { required, email },
      phone: { required, minLength: minLength(10), maxLength:maxLength(10) },
      password: { required, minLength: minLength(6) },
      confirmPassword: { required, sameAsPassword: sameAs('password') },
    },
  },
  methods: {
    async handleSubmit(e) {
      this.submitted = true

      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      const body = {
        store: this.user.store,
        email: this.user.email,
        password: this.user.password,
        phone: this.user.phone,
        address: this.user.address,
      }
      const res = await axios.post(`${this.url}/store`, body)
      // console.log(res)
      if (res.status == 200) {
        this.$router.push('/login')
      }
    },
  },
  computed: {
    ...mapState(['url']),
  },
}
</script>
