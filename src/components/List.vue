<template>
  <div>
    <div>{{title}}</div>
    <button @click="isAdding = true" v-if="!isAdding" class="btn btn-success">+</button>
    <div v-if="this.isAdding" class="form-field">
      <div><span class="fa fa-apple-alt"/><input type="text" v-model='form.name' placeholder="Product name" required></div>
      <div><span class="fa fa-boxes"/><input type="number" step="1" v-model="form.quantity" placeholder="Quantity" required></div>
      <div><span class="fa fa-inbox"/><input type="text" v-model="form.unit" placeholder="Unit"></div>
      <div><span class="fa fa-money-bill-alt"/><input type="number" v-model="form.price" placeholder="Item price"></div>
      <div><span class="fa fa-edit"/><input v-model="form.description" placeholder="Description"/></div>
    </div>
    <div v-if="this.isAdding">
      <button @click="saveItem" class="btn btn-success">Save</button>
      <button @click="isAdding = false" class="btn btn-danger">Cancel</button>
    </div>
    <div class="table-wrapper">
    <table>
      <th>Expand</th>
      <th>Name</th>
      <th>Price/unit</th>
      <th>Quantity</th>
      <th>Status</th>
      <th>Item price</th>
      <tbody>
      <template v-for="product in acquisition.products">
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
    <div>
      <div>Operations</div>
      <button class="btn">Finish acquisition</button>
      <button class="btn">Add product type to list</button>
      <button class="btn">Add unit type to list</button>
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
      acquisition: {},
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
      await this.$http.post(this.$rootUrl + 'get-acquisition', JSON.parse(localStorage.getItem('user')))
        .then(response => {
          this.acquisition = response.data.acquisition
        })
      let sum = 0
      for (let prod of this.acquisition.products) sum += prod.itemPrice
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
  .table-wrapper table {
    margin-left: auto;
    margin-right: auto;
    alignment: center;
    border-bottom: #ccc solid 1px;
    margin-bottom: 20px;
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
</style>
