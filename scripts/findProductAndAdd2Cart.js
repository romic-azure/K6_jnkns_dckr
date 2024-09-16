import http from "k6/http";
import { Trend } from "k6/metrics";
import { group, sleep, check } from "k6";
import { BASE_URL } from '../utils/utils.js';
import {generateRandomCategoryAndProduct} from '../data/categ_prod_extr.js';
import { randomIntBetween, randomString, randomItem, uuidv4, findBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";

const findProductLatency = new Trend("pageFindProduct_GroupDuration");

export function findProductAndAddToCart() {
// console.log(' ---=== This is the findProduct() function call ===--- ');

// Select a random Category and Product
let result = generateRandomCategoryAndProduct();
let Category = result[0];
let Product = result[1];

group('Find a Random Category and Product', function () {
    let res = http.get(`${BASE_URL}/index.php?route=product/category&path=${Category}`);
    console.log('Find a Random Category and Product ->' + Category + '_' + Product);
    // console.log('The response body will be displayed or not? -> ' + res.body);   // it WORKS!

    check(res, {
         'Find a Product (& Category) page status - 200': r => r.status === 200,
    });

 /*  const regex = /(?<=product_id=)\d+/;
  const productId = res.body.match(regex)[0];
  console.log('Regex for Product_id: ' + productId);   */
  
  let product_id = findBetween(res.body,`<a href="http://172.23.176.138/opencart/upload/index.php?route=product/product&amp;path=${Category}&amp;product_id=`, `">`);
  console.log('Product_id: ' + product_id);

       // Add_prod
       let response = http.post(
        "http://172.23.176.138/opencart/upload/index.php?route=checkout/cart/add",
        {
          product_id: product_id,
          quantity: "1",
        }
      );

      check(response, {
        "body contains success": response => response.body.includes("success"),
      });

       // Cart_info
       response = http.get(
         "http://172.23.176.138/opencart/upload/index.php?route=common/cart/info");
         
       check(response, {
         "body contains Total": response => response.body.includes("Total"),
      });

    // add duration property to metric
    findProductLatency.add(res.timings.duration);

    sleep(Math.random() * 4 + 1);
    
    });

}