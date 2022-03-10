<template>
  <Layout>
    <div class="row">
      <h1>สินค้าในร้าน</h1>
    </div>

    <button class="btn btn-success" @click="onAddProduct">เพิ่มสินค้า</button>
    <main>
      <table class="table" v-if="products">
        <thead>
          <tr>
            <th scope="col">ชื่อสินค้า</th>
            <th scope="col">รูปภาพ</th>
            <th scope="col">คำอธิบาย</th>
            <th scope="col">ราคา</th>
            <th scope="col">จำนวน</th>
            <th scope="col">สถานะ</th>
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
            <td class="stock">{{ product.stock }}</td>
            <td class="active">
              <label class="switch">
                <!-- active == true  -->
                <input
                  type="checkbox"
                  @click="Active(product.id)"
                  v-if="product.active == true"
                  checked
                />

                <!-- active == false   -->
                <input
                  type="checkbox"
                  @click="Stock"
                  v-if="product.stock === 0"
                />
                <input
                  type="checkbox"
                  @click="InActive(product.id)"
                  v-if="product.active == false"
                />
                <span class="slider round"></span>
              </label>
            </td>
            <td class="edit">
              <button
                class="btn btn-warning"
                @click="onUpdateProduct(product.id)"
              >
                <!-- <a :href="`/admin/product/${product._id}`"> แก้ไข</a> -->
                แก้ไข
              </button>
              <button
                class="btn btn-danger"
                @click="
                  onDelete(product._id, index, product.image, product.name)
                "
              >
                ลบ
              </button>
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
      title: 'สินค้า',
    }
  },
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
    if (!Jwt.getJwtToken()) this.$router.push('/login')
    const storeAuth = StoreAuth.getStoreAuth()
    this.store = storeAuth.store

    try {
      if (this.store == null) this.$router.push('/login')
      await this.fetchData()
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async fetchData() {
      const { data } = await axios.get(
        `${this.url}/store/admin/product/${this.store}`,
        {
          headers: {
            'Content-Type': 'Application/JSON',
            // Authorization: `Bearer ${token}`,
          },
        }
      )

      // console.log(data[0].products)

      this.products = data[0].products
    },
    onAddProduct() {
      this.$swal({
        title: 'เพิ่มสินค้า',
        html: ` 
  <label class='swal2-label' style="width: 80px;">ชื่อสินค้า</label>
  <input type="text" id="name" class="swal2-input" style='width: 200px;' placeholder="ชื่อสินค้า"> <br>
  <label class='swal2-label' style="width: 80px;">ราคา</label>
  <input type="text" id="price"  class="swal2-input" style='width: 200px;' placeholder="ราคา"> <br>
  <label class='swal2-label' style="width: 80px;">คำอธิบาย</label>
  <textarea type="text" id="description" class="swal2-textarea" style='width: 200px; vertical-align: middle;' placeholder="คำอธิบาย" ></textarea><br>
  <label class='swal2-label' style="width: 80px;">สต็อค</label>
  <input type="number" id="stock" class="swal2-input" style='width: 200px;' placeholder="สต็อค" >
  <input type="file" accept="image/png, image/jpeg" id="image" style='width: 300px;' class="swal2-input" >`,
        confirmButtonText: 'เพิ่ม',
        focusConfirm: false,
        showCloseButton: true,
        preConfirm: () => {
          const name = this.$swal.getPopup().querySelector('#name').value
          const price = this.$swal.getPopup().querySelector('#price').value
          const image = this.$swal.getPopup().querySelector('#image').files[0]
          const stock = this.$swal.getPopup().querySelector('#stock').value
          const description = this.$swal
            .getPopup()
            .querySelector('#description').value
          if (!name) {
            this.$swal.showValidationMessage('โปรดกรอกชื่อสินค้า')
          }
          if (!price || price > 100000) {
            this.$swal.showValidationMessage('โปรดกรอกราคาสินค้า')
          }
          if (isNaN(price)) {
            this.$swal.showValidationMessage('โปรดกรอกราคาสินค้าเป็นตัวเลข')
          }
          if (!image) {
            this.$swal.showValidationMessage('โปรดใส่รูปภาพสินค้า')
          }
          if (!stock) {
            this.$swal.showValidationMessage('โปรดใส่สต็อคสินค้า')
          }
          if (stock <= 0) {
            this.$swal.showValidationMessage('สต็อคสินค้าต้องมากกว่า 0')
          }
          return {
            name,
            description,
            price,
            stock,
            image,
            store: this.store,
          }
        },
      }).then(async (result) => {
        const data = new FormData()
        data.append('name', result.value.name)
        data.append('description', result.value.description)
        data.append('price', result.value.price)
        data.append('stock', result.value.stock)
        data.append('image', result.value.image)
        data.append('store', result.value.store)
        await axios.post(`${this.url}/addproduct`, data)

        this.$swal.fire({
          type: 'success',
          title: 'เพิ่มสินค้าสำเร็จ',
          text: ``,
        })

        await this.fetchData()
      })
    },
    async onUpdateProduct(id) {
      try {
        const { data } = await axios.get(`${this.url}/products/${id}`)
        this.$swal({
          title: 'แก้ไขสินค้า',
          html: ` 
  <label class='swal2-label' style="width: 80px;">ชื่อสินค้า</label>
  <input type="text" id="name" class="swal2-input" style='width: 200px;' placeholder="ชื่อสินค้า" value="${data.name}"> <br>
  <label class='swal2-label' style="width: 80px;">ราคา</label>
  <input type="text" id="price"  class="swal2-input" style='width: 200px; ' placeholder="ราคา" value="${data.price}"> <br>
  <label class='swal2-label' >คำอธิบาย</label> &nbsp; 
  <textarea type="text" id="description" class="swal2-textarea" style='width: 200px; vertical-align: middle;' placeholder="คำอธิบาย" >${data.description}</textarea><br>
  <label class='swal2-label' style="width: 80px;">สต็อค</label>
  <input type="number" id="stock" class="swal2-input" style='width: 200px;' placeholder="สต็อค" value="${data.stock}" >`,
          cancelButtonText: 'ยกเลิก',
          confirmButtonText: 'แก้ไข',
          showCancelButton: true,
          focusConfirm: false,
          reverseButtons: true,
          showCloseButton: true,
          preConfirm: () => {
            const name = this.$swal.getPopup().querySelector('#name').value
            const price = this.$swal.getPopup().querySelector('#price').value
            const stock = this.$swal.getPopup().querySelector('#stock').value
            const description = this.$swal
              .getPopup()
              .querySelector('#description').value
            if (!name) {
              this.$swal.showValidationMessage('โปรดกรอกชื่อสินค้า')
            }
            if (!price || price > 1000000) {
              this.$swal.showValidationMessage('โปรดกรอกราคาสินค้า')
            }
            if (isNaN(price)) {
              this.$swal.showValidationMessage('โปรดกรอกราคาสินค้าเป็นตัวเลข')
            }
            if (!stock) {
              this.$swal.showValidationMessage('โปรดใส่สต็อคสินค้า')
            }
            if (stock <= 0) {
              this.$swal.showValidationMessage('สต็อคสินค้าต้องมากกว่า 0')
            }
            return {
              name,
              description,
              price,
              stock,
            }
          },
        }).then(async (result) => {
          /*const data = new FormData()
          data.append('name', result.value.name)
          data.append('description', result.value.description)
          data.append('price', result.value.price)
          data.append('stock', result.value.stock)
          data.append('image', result.value.image)
          console.log(data); */
          const body = {
            name: result.value.name,
            description: result.value.description,
            price: result.value.price,
            stock: result.value.stock,
          }
          // console.log(body)

          const res = await axios.put(`${this.url}/products/${id}`, body)
          // console.log(res)
          this.$swal.fire({
            type: 'success',
            title: 'แก้ไขสำเร็จ',
          })

          await this.fetchData()
        })
      } catch (err) {
        console.log(err)
        this.$swal.fire({
          type: 'error',
          title: 'เกิดข้อผิดพลาด',
          // text: `name:${result.value.name}`,
        })
      }
    },
    async onDelete(id, index, img, name) {
      this.$swal
        .fire({
          imageUrl: img,
          showCancelButton: true,
          cancelButtonText: 'ยกเลิก',
          text: `คุณต้องการลบสินค้า ${name} หรือไม่`,
          confirmButtonText: 'ลบ',
          confirmButtonColor: 'rgb(239, 68, 68)',
        })
        .then(async (result) => {
          if (result.value) {
            this.products.splice(index, 1)
            const body = {
              store: this.store,
            }
            const res = await axios.put(
              `${this.url}/products/delete/${id}`,
              body
            )
          } else {
            console.log('error!!!!')
          }
        })
    },
    async Active(id) {
      const body = {
        active: false,
      }
      await axios.put(`${this.url}/products/${id}`, body)
      await this.fetchData()
    },
    async InActive(id) {
      const body = {
        active: true,
      }
      await axios.put(`${this.url}/products/${id}`, body)
      await this.fetchData()
    },
    Stock() {
      this.$swal({
        type: 'info',
        title: 'กรุณาเพิ่มสต็อคสินค้า',
        timer: 1500,
      })
    },
  },
  computed: {
    ...mapState(['url']),
  },
}
</script>

<style scoped>
h2 .swal2-title {
  margin: 0px;
  font-size: 25px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.21);
  margin-bottom: 28px;
  color: red;
}
/* .root {
  min-height: 100vh;

  margin-left: auto;
  margin-right: auto;

  display: grid;
  grid-template-columns: auto 1fr;
}

.wrapper {
  padding: 20px;

  height: 100%;
  width: 100%;

  display: flex;
  flex: 1 1;
  flex-direction: column;
  align-content: center;

  gap: 2.5rem;
} */

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
