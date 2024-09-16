import http from "k6/http";
import { Trend } from "k6/metrics";
import { group, sleep, check } from "k6";
import { BASE_URL } from '../utils/utils.js';
import {generateRandomCategoryAndProduct} from '../data/categ_prod_extr.js';

const findCategoryLatency = new Trend("pageFindCategory_GroupDuration");

export function findCategory() {
// console.log(' ---=== This is the findCategory() function call ===--- ');

// Select a random Category
let result = generateRandomCategoryAndProduct();
let Category = result[0];
//let Product = result[1];

group('Find a Random Category ', function () {
    let res = http.get(`${BASE_URL}index.php?route=product/category&path=${Category}`);
    //console.log('Find a Random Category, the random Category is ->' + Category);

    check(res, {
         'Find Category page status - 200': r => r.status === 200,
    });

    // add duration property to metric
    findCategoryLatency.add(res.timings.duration);

    sleep(Math.random() * 4 + 1);
    
    });
    
  }