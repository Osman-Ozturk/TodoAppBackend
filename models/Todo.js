import {Schema,model} from 'mongoose'

const TodoSchema = new Schema({
        todo:{
                type:String,
                required:true
        },
        deadline:{
                type:String,
                required:true
        },
        isDone:{type:Boolean}
})

const TodoModel =model('TodoApp',TodoSchema)

export default TodoModel;
