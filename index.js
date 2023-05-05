// requiring our controller i.e express
const express = require('express');
const app = express();
const port = 8000;
const path = require('path');

const bodyparser = require('body-parser');

app.use(express.static('assets'));

app.use(bodyparser.urlencoded({extended: false}));

// setting up view engine EJS
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));


var taskList = [
       {
            category: "Work",
            discp: "Annual Report ",
            date: "2023-11-12"
        }
]




app.get('/',function(req,res){
    
    return res.render('home',{ 
        title: "To Do List",
        task_list: taskList
    });


});


// to create new task

app.post('/create-task',function(req,res){
   
    taskList.push(req.body);

    console.log('task added');
    return res.redirect('back');
})


// to delete task

app.get('/delete_Task',function(req,res){

    let discp = req.query.discp;
    let date = req.query.date;

    let taskIndex = taskList.findIndex(task => task.discp == discp);
    let dateIndex = taskList.findIndex(task => task.date == date);


    if(taskIndex != -1){
        taskList.splice(taskIndex,1);
    }
    else{
        if(dateIndex != -1){
            taskList.splice(dateIndex,1);
        }
    }

    console.log(taskIndex);
    
    return res.redirect('back');


})

app.listen(port,function(err){
    if(err){
        return console.log('Error! in loding server')
    }

    return console.log('server is running on port' ,port);
});










