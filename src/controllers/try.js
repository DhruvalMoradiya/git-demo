function getPairsCount(arr, n, sum)
{
    let count = 0; 
    for (let i = 0; i < n; i++)
        for (let j = i + 1; j < n; j++)
            if (arr[i] + arr[j] == sum)
                count++;
 
    return count;
}
 
    let arr = [ 1, 5, 7, -1, 5 ];
    let n = arr.length;
    let sum = 6;
  console.log(getPairsCount)
