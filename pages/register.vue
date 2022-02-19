<template>
  <div>
    <head>
      <!-- <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script> -->
      <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      <!------ Include the above in your HEAD tag ---------->

      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.0.8/css/all.css"
      />
    </head>

    <div class="container">

      <div class="card bg-light">
        <article class="card-body mx-auto" style="max-width: 400px">
          <h4 class="card-title mt-3 text-center">สร้างร้านค้าของคุณ</h4>
          <p class="text-center"></p>

          <form>
            <div class="form-group input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-user"></i>
                </span>
              </div>
              <input
                class="form-control"
                placeholder="ชื่อร้าน"
                type="text"
                v-model="store"
                required
              />
            </div>
            <div class="form-group input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-address-book"></i>
                </span>
              </div>
              <input
                class="form-control"
                placeholder="ที่อยู่ร้าน"
                type="text"
                v-model="address"
                required

              />
            </div>

            <!-- form-group// -->
            <div class="form-group input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-phone"></i>
                </span>
              </div>
              <input
                class="form-control"
                placeholder="เบอร์โทรศัพท์"
                type="text"
                v-model="phone"
                required

              />
            </div>
            <!-- form-group// -->
            <div class="form-group input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-envelope"></i>
                </span>
              </div>
              <input
                class="form-control"
                placeholder="อีเมล"
                type="email"
                v-model="email"
                required

              />
            </div>
            <!-- form-group end.// -->
            <div class="form-group input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
              <input
                class="form-control"
                placeholder="รหัสผ่าน"
                type="password"
                v-model="password"
                required

              />
            </div>
            <!-- form-group// -->
            <div class="form-group input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
              <input
                class="form-control"
                placeholder="รหัสผ่านอีกครั้ง"
                type="password"
                v-model="password1"
                required
              />
            </div>
            <!-- <p v-if="this.password != this.password1" class="text-center text-red">รหัสผ่านไม่ตรงกัน</p> -->
            <!-- form-group// -->
            <div class="form-group">
              <button
                class="btn btn-primary btn-block"
                @click="POST"
              >
                เพิ่มร้านค้า
              </button>
            </div>
            <!-- form-group// -->
            <!-- <p class="text-center">Have an account? <a href="">Log In</a></p> -->
          </form>
        </article>
      </div>
      <!-- card.// -->
    </div>
    <!--container end.//-->
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      store: '',
      email: '',
      phone: '',
      password: '',
      password1: '',
      address: '',
    }
  },
  methods: {
   async POST() {
      const body = {
        store: this.store,
        email: this.email,
        password: this.password,
        phone: this.phone,
        address: this.address,
      }
      if(this.store, this.email,this.password,this.phone,this.address){
         const url = "https://test-eshop-api.herokuapp.com/api/v1"
        const res = await axios.post(url+'/store',body)
        // console.log(res);
       
      } 
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped>
.divider-text {
  position: relative;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
}
.divider-text span {
  padding: 7px;
  font-size: 12px;
  position: relative;
  z-index: 2;
}
.divider-text:after {
  content: '';
  position: absolute;
  width: 100%;
  border-bottom: 1px solid #ddd;
  top: 55%;
  left: 0;
  z-index: 1;
}

.btn-facebook {
  background-color: #405d9d;
  color: #fff;
}
.btn-twitter {
  background-color: #42aeec;
  color: #fff;
}
</style>
