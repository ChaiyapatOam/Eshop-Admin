<template>
  <Layout>
    <h1>รายการสั่งซื้อ</h1>
    <main>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ชื่อ</th>
            <th scope="col">เบอร์โทรศัพท์</th>
            <th scope="col">ที่อยู่</th>
            <th scope="col">สินค้า</th>
            <th scope="col">ราคารวม</th>
            <th scope="col">วันที่สั่งซื้อ</th>
            <th scope="col">สถานะ</th>
            <th scope="col">แก้ไขข้อมูล</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(o, index) in orders" :key="index">
            <td class="name" scope="row">{{ o.store }}</td>
            <td class="price">{{ o.phone }}</td>
            <td class="price">{{ o.address }}</td>

            <!-- Product  -->
            <td class="product">
              <ul class="list-group">
                <li
                  class="list-group-item"
                  v-for="(item, index) in JSON.parse(o.cart)"
                  :key="index"
                >
                  {{ item.product.name }}
                  {{ item.product.price }}
                  {{ 'X' + item.quantity }} ชิ้น
                </li>
              </ul>
            </td>

            <td class="total">{{ o.total }}</td>

            <td class="total">{{ moment(o.DateOrder)  }}</td>
    
            <td class="status">
              <select name="" class="a-select-option">
                <option>
                  {{ o.status }}
                </option>
                <option>
                  purchase
                </option>
              </select>
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
import {mapState} from 'vuex'
import axios from 'axios'
import moment from 'moment'

import '../styles/layout.css'

export default {
  head() {
    return {
      title: 'ออเดอร์',
    }
  },
  components: {
    Sidebar,
  },
  data() {
    return {
      store: null,
      orders: [],
    }
  },
  async mounted() {
    const storeAuth = StoreAuth.getStoreAuth()
    this.store = storeAuth.store
    // console.log(this.store)
    try {
      await this.fetchData()
    } catch (err) {}
  },
  methods: {
    async fetchData() {
      const { data } = await axios.get(
        `${this.url}/orders/${this.store}`,
        {
          headers: {
            'Content-Type': 'Application/JSON',
          },
        }
      )
      console.log(data)
      // console.log(data[0])

      this.orders = data
      console.log(orders)
    },
    moment(date){
      return moment(date).format("DD/MM/YYYY HH:mm")
    }
  },
  computed: {
    ...mapState(["url"]),
  }
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
