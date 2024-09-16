import { makeUniqueRandom } from '../utils/utils.js';
 
export{generateRandomCategoryAndProduct};

export default function generateRandomCategoryAndProduct() {
    //  Categories        Products
    //    268         283,278,247,274,270,316
    //    271         272
    //     34         42,76,43,44,47,48,49,50,51,52,53,54,55,56,38,41,37,258   
    //     57         310,159,33
    //     24         238,239,244,243
    let data = "268 283,278,247,274,270,316\n271 272\n34 42,76,43,44,47,48,49,50,51,52,53,54,55,56,38,41,37,258\n57 310,159,33\n24 238,239,244,243";

    // Split the data by newline characters to get an array of rows
    let rows = data.split("\n");
    
    // Pick a random row from the array
    let randomRow = rows[Math.floor(Math.random() * rows.length)];
    
    // Split the row by space to get the first column and the right values
    let [firstColumn, rightValues] = randomRow.split(" ");
    
    // Split the right values by comma to get an array of values
    let values = rightValues.split(",");
    
    // Pick a random value from the array
    let randomValue = values[Math.floor(Math.random() * values.length)];
     
    // Display the result - firstColumn contains values from Categories, randomValue - a random value from the firstColumn/Categories
    return [firstColumn,randomValue];
}