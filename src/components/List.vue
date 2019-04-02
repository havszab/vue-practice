<template>
  <div>
    <div>{{title}}</div>
    <button @click="isAdding = true" v-if="!isAdding" class="btn-success">+</button>
    <div v-if="this.isAdding" class="form-field">
      <div><span class="fa fa-apple-alt"/><input type="text" v-model='form.name' placeholder="Product name" required></div>
      <div><span class="fa fa-boxes"/><input type="number" step="1" v-model="form.quantity" placeholder="Quantity" required></div>
      <div><span class="fa fa-inbox"/><input type="text" v-model="form.unit" placeholder="Unit"></div>
      <div><span class="fa fa-money-bill-alt"/><input type="number" v-model="form.price" placeholder="Total price"></div>
      <div><span class="fa fa-edit"/><input v-model="form.description" placeholder="Description"/></div>
    </div>
    <div v-if="this.isAdding">
      <button @click="saveItem" class="btn-success">Save</button>
      <button @click="isAdding = false" class="btn-danger">Cancel</button>
    </div>
    <div class="table-wrapper">
    <table>
      <th>Expand</th>
      <th>Name</th>
      <th>Price/unit</th>
      <th>Quantity</th>
      <th>Status</th>
      <th>Total price</th>
      <tbody>
      <template v-for="product in products">
        <tr class="row" v-bind:key="product.id">
          <td><button>+</button></td>
          <td>{{ product.productCategory.productName }}</td>
          <td>{{product.unitPrice + ' ' + currency}}</td>
          <td>{{product.quantity + ' ' + product.unitCategory.unitName + (product.quantity > 1 ? 's' : '')}}</td>
          <td>{{product.status}}</td>
          <td>{{product.itemPrice + ' ' + currency}}</td>
        </tr>
        <tr v-if="product.description" v-bind:key="product.id + 'desc'">
          <td colspan="6">{{product.description}}</td>
        </tr>
      </template>
      <tr>
        <td colspan="5">Price of current acquisition: </td>
        <td v-bind="getSumPrice">{{sum + ' ' + currency}}</td>
      </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'List',
  components: {Navbar},
  data () {
    return {
      title: 'CURRENT ACQUISITION',
      products: [],
      currency: 'Ft',
      isAdding: false,
      sum: this.getSumPrice,
      form: {
        name: '',
        price: null,
        quantity: null,
        unit: '',
        description: ''
      }
    }
  },
  methods: {
    async getList  () {
      let response = await this.$http.get(this.$rootUrl + 'products', {'Access-Control-Allow-Origin': '*'})
      this.products = response.data.products
      let sum = 0
      for (let prod of this.products) sum += prod.itemPrice
      this.sum = sum
      console.log(this.products)
    },
    saveItem () {
      this.$http.post(this.$rootUrl + 'save', this.form)
        .then(response => {
          console.log(response)
        })
        .then(() => this.getList())
        .then(() => this.resetForm())
    },
    resetForm () {
      this.form = {
        name: '',
        price: null,
        quantity: null,
        unit: '',
        description: ''
      }
    }
  },
  computed: {
    getSumPrice () {
      return this.sum
    }
  },
  created () {
    this.getList()
  }
}

</script>

<style scoped>
  .form-field div{
    display: inline-block;
    margin: 3px;
  }
  .form-field span {
    padding: 5px;
    font-size: 1.3em;
  }
  .form-field input {
    border-radius: 7px;
    padding: 7px;
    font-size: 1em;
  }
  .table-wrapper {
    position: relative;
    top: 23%;
    left: 23%;
  }
  .table-wrapper table {
    border-bottom: #ccc solid 1px;
    margin-bottom: 10%;
    font-size: 1.2em;
  }
  .table-wrapper th {
    border-bottom: #ccc solid 1px;
  }
  .table-wrapper td {
    padding: 10px 28px;
  }
  .row {
    border-bottom: #ccc solid 1px;
    background-color: #CCFFCC;
  }
  .btn-success {
    background-color: #CCFFCC;
  }
  .btn-danger {
    background-color: #FF5C3E;
  }
</style>
