<template>
  <Layout>
    <h1>รายชื่อลูกค้า</h1>
    <main>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ชื่อลูกค้า</th>
            <th scope="col">ที่อยู่</th>
            <th scope="col">เบอร์โทรศัพท์</th>
          </tr>
        </thead>

        <tbody v-for="(user, index) in users" :key="index">
          <tr>
            <td class="name" scope="row">{{ user.name }}</td>
            <td class="price">{{ user.address }}</td>
            <td class="price">{{ user.phone }}</td>
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
import axios from 'axios'

import '../styles/layout.css'

export default {
  head() {
    return {
      title: 'ลูกค้า',
    }
  },
  components: {
    Sidebar,
  },
  data() {
    return {
      users: [],
    }
  },
  async mounted() {
    try {
      await this.fetchData()
    } catch (err) {}
  },
  methods: {
    async fetchData() {
      const { data } = await axios.get(
        `https://test-eshop-api.herokuapp.com/api/v1/users`,
        {
          headers: {
            'Content-Type': 'Application/JSON',
          },
        }
      )

      //   console.log(data)
      this.users = data
    },
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
</style>
