<template>
  <Layout>
    <h1>ร้านค้าทั้งหมด</h1>
    <button class="btn btn-success" @click="Register" target="_blank">
      เพิ่มร้านค้า
    </button>
    <main>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ชื่อร้านค้า</th>
            <th scope="col">อีเมล</th>
            <th scope="col">ที่อยู่</th>
            <th scope="col">โทร</th>
            <th scope="col">สถานะ</th>
            <th scope="col">ไปที่ร้าน</th>
          </tr>
        </thead>

        <tbody v-for="(store, index) in store" :key="index">
          <tr>
            <td class="name" scope="row">{{ store.store }}</td>
            <td class="price">{{ store.email }}</td>
            <td class="price">{{ store.address }}</td>
            <td class="stock">{{ store.phone }}</td>
            <td>
              <label class="switch">
                <!-- active == true  ร้านเปิดอยู่ -->
                <input
                  type="checkbox"
                  @click="Active(store.store)"
                  v-if="store.active == true"
                  checked
                />

                <!-- active == false  ร้านปิดอยู่ -->
                <input type="checkbox" @click="InActive(store.store)" v-else />
                <span class="slider round"></span>
              </label>
            </td>
            <!-- icon -->
            <td>
              <a
                :href="`https://nuxt-eshop-shop.netlify.app/${store.store}`"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-box-arrow-up-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                  /></svg
              ></a>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  </Layout>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import Layout from '../components/Layout.vue'

import { Jwt, StoreAuth } from '../libs/sessionStorage'
import { mapState } from 'vuex'
import axios from 'axios'

import '../styles/layout.css'

export default {
  head() {
    return {
      title: 'ร้านค้า',
    }
  },
  components: {
    Sidebar,
  },
  data() {
    return {
      store: [],
    }
  },
  async mounted() {
    try {
      await this.fetchData()
      if (!Jwt.getJwtToken()) this.$router.push('/login')
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async fetchData() {
      const { data } = await axios.get(`${this.url}/store`, {
        headers: {
          'Content-Type': 'Application/JSON',
        },
      })
      this.store = data
    },
    Register() {
      this.$router.push('/register')
    },
    async Active(store) {
      const body = {
        active: false,
      }
      await axios.put(`${this.url}/store/${store}`, body)
      await this.fetchData()
    },
    async InActive(store) {
      const body = {
        active: true,
      }
      await axios.put(`${this.url}/store/${store}`, body)
      await this.fetchData()
    },
  },
  computed: {
    ...mapState(['url']),
  },
}
</script>

<style scoped>
.product-id,
.name,
.price,
.stock,
.order-no {
  font-size: 1rem;
}

main {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-left: auto;
  margin-right: auto;
}

table {
  width: 100%;
  table-layout: fixed;

  text-align: center;
}

table thead {
  color: black;
  font-weight: 500;
}

table tbody td .edit:hover {
  text-decoration: underline;
}

table tbody td,
table thead th {
  padding: 0.125rem 0.25rem;

  border-width: 2px;
}

/* .pic {
  @apply flex flex-col justify-center items-center;
} */

.pic img {
  aspect-ratio: auto 1/1;
  background-size: contain;
  background-position: center;
  height: 80px;
  text-align: center;

  margin-left: auto;
  margin-right: auto;
}

.status.success {
  color: chartreuse;
}

.status.failed {
  color: red;
}
.status.pending {
  color: yellow;
}

.swal2-label {
  text-align: left;
}
/* switch */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
