
function printDate(){
    let today = new Date();

 let date = today.getDate();
 
 console.log('new Date : ' + date)
    
}
 
function printMonth(){
    let month = new Date().toLocaleString("en-us",{month: "long"});
 
 console.log('new Month : ' + month)

}

function printBatch(){
    console.log('Roadon, W3D3, the topic for today is Nodejs module system')
}
module.exports.printDate=printDate
module.exports.printMonth=printMonth
module.exports.printBatch=printBatch