const info = '               Welcome To Radon Batch My Name Is  Dhruval Moradiya                        '

function trim(){
    let ab = info.trim()
    console.log(ab)
}

  function upperCase() {
  let bc = info.toUpperCase()
  console.log(bc)
}

function lowerCase() {
    let cd = info.toLowerCase()
    console.log(cd)
    
}

module.exports.trim=trim
module.exports.upperCase=upperCase
module.exports.lowerCase=lowerCase