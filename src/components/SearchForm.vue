<template>
    <form @submit.prevent="findBestProductDeal">
        <label>Product Name:</label>
        <input type="text" required v-model="productName">
        <div class="submit">
            <button> Find best deal </button>
        </div>
        <br>
        <br>
        <div v-for="(bestProductDealData, index) in bestProductDealDataList">
            <p v-if="index == 0" class="heading">Best Deal: </p>
            <div class="row">
                <div class = "column">
                    <img v-if="bestProductDealData" :src="getProductImageSrc(index)"/>
                </div>
                <div class="column">
                    <p v-if="bestProductDealData">{{ bestProductDealData['product_name'] }}</p>
                    <p v-if="bestProductDealData">${{ bestProductDealData['product_price'] }}</p>
                    <p v-if="bestProductDealData">{{ bestProductDealData['product_rating'] }}</p>
                    <p v-if="bestProductDealData"><a :href="getProductLink(index)" target="_blank"> View on Website </a></p>
                </div>
            </div>
            <br>
            <br>
        </div>
        

    </form>
</template>

<script>
export default {
 data() {
    return {
        productName: '',
        bestProductDealDataList: null
    }
 },
 methods: {
    findBestProductDeal() {
        fetch('http://127.0.0.1:8000/best-product-deal/?product_name='+ this.productName).then(async response => {
            if(response.ok){
                let result = await response.json()
                this.bestProductDealDataList = result['best-product-deal-data-list']
                console.log(this.bestProductDealDataList)
            } else{
                alert("Server returned " + response.status + " : " + response.statusText);
            }      
        })
    },
    getProductImageSrc(index) {
        return this.bestProductDealDataList[index]['product_image']
    },
    getProductLink(index) {
        return this.bestProductDealDataList[index]['product_link']
    }
 }
}
</script>

<style>
    form {
        max-width: 700px;
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
    img {
        height: 170px;
    }
    .submit {
        text-align: center;
    }
    .row {
        display: flex;
    }
    .column {
        flex: 50%;
    }
    .heading {
        font-weight: bold;
    }
</style>
