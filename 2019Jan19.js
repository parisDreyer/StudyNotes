/*
    Here is a data structure that I found useful in solving
    a maze generating algorithm. It provides efficient lookup
    while using the flood-fill or a-star algorithms to check already
    searched paths.
    The function twoDcooridinateArrayToHashSet(coords) takes in an array
    of arrays that are [y, x] coordinate pairs and returns the hashSet
    data structure

    The below merge function is an example function to merge two hash sets
    of the twoDcooridinateArrayToHashSet(coords) return type
*/

// example: 
//  coords = [[0,1], [0, 2] [2, 4], [3, 7]]
//  twoDcooridinateArrayToHashSet(coords) === { 0: {1: true, 2: true}, 2: {4: true}, 3: { 7: true } }
function twoDcooridinateArrayToHashSet(coords){
    let hash_set = {};
    for(let i = 0; i < coords.length; ++i){
        let [y, x] = paths[i];
        if(!hash_set[y]) hash_set[y] = { x: true };
        else if(!hash_set[y][x]) hash_set[y][x] = true;
    }
    return hash_set;
}


function merge(a, b){
    Object.keys(b).forEach(y => {
        let group = b[y];
        Object.keys(group).forEach(x => {
          if (!a[y]) a[y] = {};
          if (!a[y][x]) a[y][x] = true;
        })
    });
    return a;
}
