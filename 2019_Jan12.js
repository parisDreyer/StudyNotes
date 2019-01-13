/*
    Dijkstra's Dutch Flag problem,
    puzzling it out myself

    you have an array with values from the set {0,1,2} in it
    you want to return a sorted array in O(n) time 
    and in constant space



    ____________________________________________________________________________________________________________________
    https://coderbyte.com/algorithm/dutch-national-flag-sorting-problem
    (1) Create a low pointer at the beginning of the array and a high pointer at the end of the array.
    (2) Create a mid pointer that starts at the beginning of the array and iterates through each element.
    (3) If the element at arr[mid] is a 2, then swap arr[mid] and arr[high] and decrease the high pointer by 1.
    (4) If the element at arr[mid] is a 0, then swap arr[mid] and arr[low] and increase the low and mid pointers by 1.
    (5) If the element at arr[mid] is a 1, don't swap anything and just increase the mid pointer by 1.
    ____________________________________________________________________________________________________________________


    e.g.
    dutchFlag([1,2,0,0,2,1]) //=> [0,0,1,1,2,2]
*/

function dutchFlag(arr){
   let low = 0, mid = 0, high = arr.length - 1;

    while(mid <= high){
        if (arr[mid] === 0) {
            swapVals(arr, mid, low);
            low += 1;
            mid += 1;
        }else if(arr[mid] === 2) {
            swapVals(arr, mid, high);
            high -= 1;
        } else if(arr[mid] === 1) mid += 1;
    }
    
    return arr;
}

function swapVals(arr, i, j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

dutchFlag([1, 2, 0, 0, 2, 1]);

dutchFlag([2, 0, 1, 2, 0, 0, 2, 1, 0, 2]);