const errorHandler = (err,req,res,next)=>{
        const statusCode = err.statusCode ?? 500
        res.status(err.statusCode).send({
                status:statusCode,
                message:err.message
        })
}
export default  errorHandler