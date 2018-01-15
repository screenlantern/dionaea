'use strict';

const itemsPerCollection = (arr) => {
    let result = {};
    if (arr instanceof Array) { 
        arr.forEach(function (v, i) {
            if (!result[v]) { 
                result[v] = [i]; 
            } else { 
                result[v].push(i);
            }
        });
    }
    return result;
}

export {
    itemsPerCollection
  };