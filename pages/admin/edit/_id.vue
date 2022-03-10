<template>
  <div class="jumbotron">
    <head>
      <link
        href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
        rel="stylesheet"
      />
    </head>
    <div class="container">
      <div class="row">
        <div class="col-sm-8 offset-sm-2">
          <div>
            <h2 class="text-center">แก้ไขข้อมูลร้านค้า</h2>
            <form>
              <div class="form-group">
                <label for="store">ชื่อร้าน</label>
                <input
                  type="text"
                  v-model="user.store"
                  id="store"
                  name="store"
                  class="form-control"
                />
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
                />
              </div>

              <!-- เบอร์โทรศัพท์ -->
              <div class="form-group">
                <label for="phone">เบอร์โทรศัพท์ (xxx-xxx-xxxx)</label>
                <input
                  type="text"
                  v-model="user.phone"
                  id="phone"
                  name="phone"
                  class="form-control"
                />
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
                />
              </div>

              <div
                class="text-center text-primary"
                v-if="!sw"
                @click="sw = !sw"
                style="cursor: pointer"
              >
                <i class="bx bx-edit-alt">แก้ไขรหัสผ่าน</i>
              </div>
            </form>
            <!-- button  -->
            <div class="text-center pt-2" v-if="!sw">
              <button class="btn small btn-danger" @click="Back">
                ย้อนกลับ
              </button>
              <button class="btn btn-primary" @click="Edit">บันทึก</button>
            </div>

            <!-- Form Password -->
            <form @submit.prevent="handlePassword" v-if="this.sw == true">
              <!-- password  -->
              <div class="form-group">
                <label for="password">รหัสผ่านใหม่</label>
                <input
                  :type="type"
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
                <label for="confirmPassword">รหัสผ่านใหม่อีกครั้ง</label>
                <input
                  :type="type"
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
              <div class="text-left">
                <input type="checkbox" @change="showPassword" /> แสดงรหัสผ่าน
              </div>
              <!-- Button Save  -->
              <div class="form-group text-right">
                <button class="btn small btn-danger" @click="sw = !sw">
                  ยกเลิก
                </button>
                <button class="btn btn-primary">บันทึก</button>
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
import { required, minLength, sameAs } from 'vuelidate/lib/validators'

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
      sw: false,
      type: 'password',
    }
  },
  validations: {
    user: {
      password: { required, minLength: minLength(6) },
      confirmPassword: { required, sameAsPassword: sameAs('password') },
    },
  },
  methods: {
    async fetchData() {
      const id = this.$route.params.id
      const { data } = await axios.get(`${this.url}/store/admin/store/${id}`, {
        headers: {
          'Content-Type': 'Application/JSON',
        },
      })
      console.log(data[0])

      this.user.store = data[0].store
      this.user.address = data[0].address
      this.user.email = data[0].email
      this.user.phone = data[0].phone
    },
    async Edit() {
      const body = {
        store: this.user.store,
        email: this.user.email,
        phone: this.user.phone,
        address: this.user.address,
      }
      console.log(body)
      const id = this.$route.params.id
      const res = await axios.put(`${this.url}/store/${id}`, body)
      console.log(res)
      if (res.status == 200) {
        this.$router.push('/admin/store')
      }
    },
    async handlePassword(e) {
      this.submitted = true

      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      const body = {
        store: this.user.store,
        email: this.user.email,
        phone: this.user.phone,
        address: this.user.address,
        password: this.user.password,
      }
      const id = this.$route.params.id
      const res = await axios.put(`${this.url}/store/update_password/${id}`, body)
      // console.log(res)
      if (res.status == 200) {
        this.$router.push('/admin/store')
      }
    },
    Back() {
      this.$router.go(-1)
    },
    GO() {
      this.$router.push('/admin/store')
    },
    showPassword() {
      if (this.type === 'password') {
        this.type = 'text'
      } else {
        this.type = 'password'
      }
    },
  },
  computed: {
    ...mapState(['url']),
  },
  mounted() {
    this.fetchData()
  },
}
</script>
