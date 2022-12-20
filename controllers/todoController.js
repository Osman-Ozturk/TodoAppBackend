import TodoModel from '../models/Todo.js'

const getAllTodo = async(req,res,next)=>{
        try {
                const todoList = await TodoModel.find({})
                res.status(201).json(todoList)
        } catch (error) {
                next(error)
        }
}
const addTodo = async(req,res,next)=>{
        try {
                const todo = await TodoModel.create(req.body)
                res.status(201).json(todo)
        } catch (error) {
                next(error)
        }
}
const updateTodo = async(req,res,next)=>{
        try {
            const todo = await TodoModel.findByIdAndUpdate(req.params.id,req.body,{new:true})  
            todo ? res.status(201).json(todo):res.status(401).send(`Es gibt keinen TodoModel mit der id ${req.params.id}`)  
        } catch (error) {
                next(error)
        }
}
const deleteTodo = async(req,res,next)=>{
        try {
                const todo = await TodoModel.findByIdAndDelete(req.params.id);
                if (!todo) {
                  const error = new Error(
                    `Es gibt keinen TodoModel mit der id ${req.params.id}`
                  );
                  error.statusCode = 404;
                  throw error;
                }
                res.send('Todo wurde gelöscht');
              } catch (error) {
                next(error);
              }
        
}

export {getAllTodo,addTodo,updateTodo,deleteTodo}