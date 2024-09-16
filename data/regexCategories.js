import http from 'k6/http';

// Define the regex pattern to match the categories numbers
//const regex1 = /category-(\d+)/g;
//const regex = /category&amp;path=\d+/g;
const regexCategories = /path=\d+"/g;
const regexProducts = /=product\/category&amp;path=(\d+)_(\d+)/g;

export default function () {

  // Make a HTTP request to the HTML page
  const response = http.get('http://172.23.176.138/opencart/upload/');

  // Use the categories variable as needed
  // console.log(response.body.match(regexProducts)); // Print the number of Products
  console.log(response.body.match(regexCategories)); // print the Categories
  //console.log(array[0]); // Print the first category
}
