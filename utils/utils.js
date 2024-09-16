import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

// Define the base URL
export const BASE_URL = 'http://172.23.176.138/opencart/upload/';

// read Data from a CSV file and put into a SharedArray - the most efficent way of using data 
export const csvData = new SharedArray('read csvData', function() {
  return papaparse.parse(open('../data/data.csv'), {header: true}).data;
});

