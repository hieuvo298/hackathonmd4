
import Todo from "./todo.model";


const createTable = () => {
   
    Todo.sync().then(()=>{
        console.log('Todo table created');
    })
}

export default createTable