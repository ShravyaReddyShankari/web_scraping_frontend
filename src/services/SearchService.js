export async function getBestPrductDeal() {

    const response = await fetch('/best-product-deal/');
    return await response.json();
}
