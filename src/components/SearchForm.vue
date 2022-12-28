<template>
    <form @submit.prevent="findBestProductDeal">
        <label>Product Name:</label>
        <input type="text" required v-model="productName">
        <div class="submit">
            <button> Find best deal </button>
        </div>
        <img v-if="bestProductDealData" :src="getProductImageSrc()"/>
        <p v-if="bestProductDealData">Product Name: {{ bestProductDealData['product_name'] }}</p>
        <p v-if="bestProductDealData">Product Price: {{ bestProductDealData['product_price'] }}</p>
        <p v-if="bestProductDealData">Product Rating: {{ bestProductDealData['product_rating'] }}</p>
        <p v-if="bestProductDealData">Product Link: <a :href="getProductLink()" target="_blank"> View on Website </a></p>

    </form>
</template>

<script>
import { getBestProductDeal } from '../services/SearchService'
export default {
 data() {
    return {
        productName: '',
        bestProductDealData: null,
    }
 },
 methods: {
    findBestProductDeal() {
        fetch('http://127.0.0.1:8000/best-product-deal/?product_name='+ this.productName).then(async response => {
            if(response.ok){
                let result = await response.json()
                this.bestProductDealData = result['best-deal']
                console.log(this.bestProductDealData)
            } else{
                alert("Server returned " + response.status + " : " + response.statusText);
            }      
        })
    },
    getProductImageSrc() {
        return this.bestProductDealData['product_image']
    },
    getProductLink() {
        return this.bestProductDealData['product_link']
    }
 }
}
</script>

<style>
    form {
        max-width: 420px;
        margin: 30px auto;
        background: white;
        text-align: left;
        padding: 40px;
        border-radius: 10px;
    }
    label {
        color: #aaa;
        display: inline-block;
        margin: 25px 0 15px;
        font-size: 0.6em;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: bold;
    }
    input {
        display: block;
        padding: 10px 6px;
        width: 100%;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #ddd;
        color: #555;
    }
    button {
        background: #0b6dff;
        border: 0;
        padding: 10px 20px;
        margin-top: 20px;
        color: white;
        border-radius: 20px;
    }
    .submit {
        text-align: center;
    }
</style>