<template>
  <div class="root">
    <Sidebar />

    <div class="wrapper">
      <h1>Product Edit</h1>
      <button @click="onAddProduct">Add Product</button>

      <main>
        <table class="table" v-if="products">
          <thead>
            <tr>
              <th scope="col">ชื่อสินค้า</th>
              <th scope="col">รูปภาพ</th>
              <th scope="col">คำอธิบาย</th>
              <th scope="col">ราคา</th>
              <th scope="col">จำนวน</th>
              <th scope="col">หมวดหมู่</th>
              <th scope="col">แก้ไขข้อมูล</th>
            </tr>
          </thead>

          <tbody v-for="(product, index) in products" :key="index">
            <tr>
              <td class="name" scope="row">{{ product.name }}</td>
              <td class="pic">
                <img :src="product.image" />
              </td>
              <td class="price">{{ product.description }}</td>
              <td class="price">{{ product.price }}</td>
              <td class="stock">{{ product.countInStock }}</td>
              <td class="stock">{{ product.countInStock }}</td>
              <td class="edit">
                <button
                  class="edit btn btn-warning"
                  @click="onUpdateProduct(product._id)"
                >
                  แก้ไข
                </button>
                <button
                  class="edit btn btn-outline-danger"
                  @click="onDelete(product._id, index)"
                >
                  ลบ
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from '../../../components/Sidebar.vue'
import { Jwt, StoreAuth } from '../../../libs/sessionStorage'
import axios from 'axios'

import '../../../styles/layout.css'

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      store: null,
      products: [],
    }
  },
  async mounted() {
    const storeAuth = StoreAuth.getStoreAuth()
    this.store = storeAuth.store
    console.log(this.store)

    try {
      await this.fetchData()
    } catch (err) {}
  },
  methods: {
    async fetchData() {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/store/${this.store}`,
        {
          headers: {
            'Content-Type': 'Application/JSON',
            // Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log(data[0].products)

      this.products = data[0].products
    },
    onAddProduct() {
      this.$swal({
        title: 'เพิ่มสินค้า',
        html: ` 
  <label class='swal2-label' style="text-align: left;">ชื่อสินค้า</label>
  <input type="text" id="name" class="swal2-input" placeholder="ชื่อสินค้า">
  <input type="text" id="price"  class="swal2-input" placeholder="ราคา" required>
  <input type="text" id="description" class="swal2-input" placeholder="คำอธิบาย">
  <input type="number" id="countInStock" class="swal2-input" placeholder="สต็อค">
  <input type="file" accept="image/png, image/jpeg" id="image" class="swal2-input" >`,
        confirmButtonText: 'เพิ่ม',
        focusConfirm: false,
        preConfirm: () => {
          const name = this.$swal.getPopup().querySelector('#name').value
          const price = this.$swal.getPopup().querySelector('#price').value
          const image = this.$swal.getPopup().querySelector('#image').files[0]
          const countInStock = this.$swal
            .getPopup()
            .querySelector('#countInStock').value
          const description = this.$swal
            .getPopup()
            .querySelector('#description').value
          return {
            name,
            description,
            price,
            countInStock,
            image,
            store: this.store,
          }
        },
      }).then(async (result) => {
        const data = new FormData()
        data.append('name', result.value.name)
        data.append('description', result.value.description)
        data.append('price', result.value.price)
        data.append('countInStock', result.value.countInStock)
        data.append('image', result.value.image)
        data.append('store', result.value.store)
        await axios.post('http://localhost:3000/api/v1/addproduct', data)

        this.$swal.fire({
          type: 'success',
          title: 'เพิ่มสินค้าสำเร็จ',
          text: ``,
        })

        await this.fetchData()
      })
    },
    async onUpdateProduct(id) {
      const product = await axios.get(
        `http://localhost:3000/api/v1/products/${id}`
      )
      console.log(product)
      this.$swal({
        title: 'แก้ไขสินค้า',
        html: ` 
  <label class='swal2-label' style="text-align: left;">ชื่อสินค้า</label>
  <input type="text" id="name" class="swal2-input" placeholder="ชื่อสินค้า" required="true">
  <input type="text" id="price"  class="swal2-input" placeholder="ราคา">
  <input type="text" id="description" class="swal2-input" placeholder="คำอธิบาย">
  <input type="number" id="countInStock" class="swal2-input" placeholder="สต็อค">
  <input type="file" accept="image/png, image/jpeg" id="image" class="swal2-input" >`,
        confirmButtonText: 'แก้ไข',
        focusConfirm: false,
        preConfirm: () => {
          const name = this.$swal.getPopup().querySelector('#name').value
          const price = this.$swal.getPopup().querySelector('#price').value
          const image = this.$swal.getPopup().querySelector('#image').files[0]
          const countInStock = this.$swal
            .getPopup()
            .querySelector('#countInStock').value
          const description = this.$swal
            .getPopup()
            .querySelector('#description').value
          return {
            name,
            description,
            price,
            countInStock,
            image,
            store: this.store,
          }
        },
      }).then(async (result) => {
        const data = new FormData()
        data.append('name', result.value.name)
        data.append('description', result.value.description)
        data.append('price', result.value.price)
        data.append('countInStock', result.value.countInStock)
        data.append('image', result.value.image)
        data.append('store', result.value.store)
        await axios.put('http://localhost:3000/api/v1/products', data)

        this.$swal.fire({
          type: 'success',
          title: 'เพิ่มสินค้าสำเร็จ',
          text: ``,
        })

        await this.fetchData()
      })
      this.$swal.fire({
        type: 'success',
        title: 'Success',
        text: ``,
      })
    },
    async onDelete(id, index) {
      //   this.$swal.fire({
      //   title: 'ลบสินค้า',
      //   showCancelButton: true,
      //   cancelButtonText: 'ยกเลิก',
      //   showConfirmButton: true,
      //   text: `คุณต้องการลบสินค้า  หรือไม่`,
      //   type: 'warning',
      //   confirmButtonText: 'ลบ',
      //   confirmButtonColor: 'rgb(239, 68, 68)',
      // })
      //   .then(async(result) => {
      //     if (!result.isConfirmed) return
      //     let response  = await axios.delete(`http://localhost:3000/api/v1/products/${id}`)

      //     if (response.status) {
      //       this.products.splice(index , 1)
      //     }

      //   })
      let response = await axios.delete(
        `http://localhost:3000/api/v1/products/${id}`
      )

      if (response.status) {
        this.products.splice(index, 1)
      }
    },
  },
}
</script>

<style scoped>
.root {
  min-height: 100vh;
  min-width: 100vw;

  margin-left: auto;
  margin-right: auto;
}

.wrapper {
  padding: 20px;

  height: 100%;
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: center;

  gap: 2.5rem;
}

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
