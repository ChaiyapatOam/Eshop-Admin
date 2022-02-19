<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium"></div>
            <h2 style="text-align: center">แก้ไข</h2>
            <form action="">
              <!-- Category Dropdown -->
              <div class="a-spacing-top-medium">
                <label for="">หมวดหมู่</label>
                <select class="a-select-option">
                  <option></option>
                </select>
              </div>
              <!-- Name -->

              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">ชื่อสินค้า</label>
                <input
                  type="text"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="name"
                />
              </div>
              <!-- Description -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">คำอธิบาย</label>
                <textarea style="width: 100%" v-model="description"></textarea>
              </div>
              <!-- Price -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">ราคา</label>
                <input
                  type="text"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="price"
                />
              </div>
              <!-- Stock -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">จำนวนสต็อค</label>
                <input
                  type="text"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="stock"
                />
              </div>

              <!-- Photo -->  <!--
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">แก้ไขรูปภาพ</label>
                <div class="a-row a-spacing-top-medium">
                  <label class="choosefile-button">
                    <input type="file" @change="onFileSelected" />
                    <p style="margin-top: 70px">{{ filename }}</p>
                  </label>
                </div>
              </div> -->
              <!-- Button -->

              <button class="btn btn-primary m-1" @click="Update">แก้ไข</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      name: '',
      description: '',
      image: '',
      price: 0,
      stock: 0,
      filename: '',
      selectedFile: null
    }
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
      this.filename = event.target.files[0].name
    },
    async fetchData() {
      const param = this.$route.params.id
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/products/${param}`,
        {
          headers: {
            'Content-Type': 'Application/JSON',
          },
        }
      )
      // console.log(data)
      this.name = data.name
      this.description = data.description
      this.price = data.price
      this.stock = data.stock
      this.image = data.image
    },
    async Update() {
      const data = new FormData()
      data.append('name', this.name)
      data.append('price', this.price)
      data.append('description', this.description)
      // data.append('image', this.selectedFile, this.selectedFile.name)
      data.append('stock', this.stock)
      console.log(data)
      // let result = await axios.put(
      //   `http://localhost:3000/api/v1/products/${this.$route.params.id}`,
      //   data
      // )
      // this.$router.push('/admin/products')
    },
  },
  mounted() {
    this.fetchData()
  },
}
</script>
