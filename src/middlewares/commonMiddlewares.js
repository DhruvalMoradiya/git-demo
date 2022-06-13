
// const mid= function ( req, res, next) {
//     let  available = req.headers.isfreeappuser
//     if(!available){
//         res.send(" Headers is  required")
//     }else{
//         if(available === "true")
//         req['isFreeAppUser'] = true
//         if(available === "false")
//         req['isFreeAppUser'] = false
//         next()
//     }
//     }


    // const mid = async ( req, res, next) => {
    //     let header = req.headers.isfreeappuser;
    //    if(!(header == "true" || header == "false"))
    //     return res.send({msg:"Headers is  required"})
    //     next()
    // };
    
    const mid = function ( req, res, next) {

    const getHeader = req.headers
    if (!getHeader.isfreeappuser){
    return res.send ({status:false, msg:" Headers is  required"})  
    }   
        next()
 }


module.exports.mid= mid
