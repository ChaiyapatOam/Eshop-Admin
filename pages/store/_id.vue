<template>
  <main>
    <h1>Welcome to store {{ param }}!</h1>
    <h1>{{ store.store }}</h1>
    <h2>{{ store.name }}</h2>
    <h3>{{ store.address }}</h3>
    <div class="a-spacing-large"></div>

    <div class="container-fluid browsing-history">
      <div class="row">
        <div class="col-sm-8 col-8">
          <h1 class="a-size-large a-spacing-none a-text-normal">All Product</h1>
          <div class="a-spacing-large"></div>
          <!-- Listing Page -->
        </div>
      </div>
    </div>

    <div class="a-spacing-large"></div>
    <div class="container-fluid browsing-history">
      <div class="row">
        <div
          v-for="(product, index) in products"
          :key="product._id"
          class="col-xl-2 col-lg-2 col-md-3 col-sm-6 col-6 br bb"
        >
          <div class="history-box">
            <!-- Product image -->
            <a href="#" class="a-link-normal">
              <img :src="product.image" class="img-fluid" />
            </a>
            <!-- Product Title -->
            <div class="a-spacing-top-base asin-title">
              <span class="a-text-normal">
                <div class="p13n-sc-truncated">{{ product.name }}</div>
              </span>
            </div>

            <!-- Product Price -->
            <div class="a-row">
              <span class="a-size-base a-color-price">
                <span class="p13n-sc-price">${{ product.price }}</span>
              </span>
            </div>
            <!-- Product Button  -->
            <div class="a-row">
              <nuxt-link
                :to="`/products/${product._id}`"
                class="a-button-history margin-right-10"
                >Update</nuxt-link
              >
              <a
                href="#"
                class="a-button-history margin-right-10"
                @click="onDeleteProduct(product._id, index)"
                >Delete</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    const param = params.id
    try {
      let response = await $axios.$get(
        `http://localhost:3000/api/v1/store/${param}`
      )
      //   let product = $axios.$get(`http://localhost:3000/api/products/${params.id}`);

      // const [cateRes, ownerRes,productRes] = await Promise.all([categories, owner,product]);
      // console.log(response)
      console.log(response[0].products)
      return {
        param: param,
        store: response,
        products: response[0].products,
      }
    } catch (err) {}
  },
}
</script>
