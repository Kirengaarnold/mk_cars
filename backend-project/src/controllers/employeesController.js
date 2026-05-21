const db = require('../config/db');

const addUser = async (req, res)=>{
    try{
        const{firstname,lastname,gender,dateofbirth,email,phonenumber,position,HireDate,salary,status,department,address} = req.body;
        if(!firstname||!lastname||!gender||!dateofbirth||!email||!phonenumber||!position||!HireDate||!salary||!status||!department||!address){
            return res.status(400).json({error:'all the fields are required'});
        }
        const [result] = await db.promise().query('INSERT INTO mk_employees (firstname,lastname,gender,dateofbirth,email,phonenumber,position,HireDate,salary,status,department,address) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',[firstname,lastname,gender,dateofbirth,email,phonenumber,position,HireDate,salary,status,department,address])
        res.status(201).json({employee_id : result.insertId, firstname,lastname,gender,dateofbirth,email,phonenumber,position,HireDate,salary,status,department,address})
    }catch(err){
        console.log(err);
        res.status(500).json({error:'something went wrong'})
    }
    
};

const listEmployees = async (req, res) => {
    try{
        const [rows] = await db.promise().query('SELECT * FROM mk_employees');
        res.json(rows);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'something went wrong'});
    }
}

const updateEmployee = async (req, res) => {
    try{
        const { id } = req.params;
        const { firstname, lastname, gender, dateofbirth, email, phonenumber, position, HireDate, salary, status, department, address } = req.body;
        
        if(!firstname||!lastname||!gender||!dateofbirth||!email||!phonenumber||!position||!HireDate||!salary||!status||!department||!address){
            return res.status(400).json({error:'all the fields are required'});
        }

        const [result] = await db.promise().query(
            'UPDATE mk_employees SET firstname=?, lastname=?, gender=?, dateofbirth=?, email=?, phonenumber=?, position=?, HireDate=?, salary=?, status=?, department=?, address=? WHERE employee_id=?',
            [firstname, lastname, gender, dateofbirth, email, phonenumber, position, HireDate, salary, status, department, address, id]
        );

        if(result.affectedRows === 0){
            return res.status(404).json({error:'Employee not found'});
        }

        res.json({message:'Employee updated successfully', employee_id: id, firstname, lastname, gender, dateofbirth, email, phonenumber, position, HireDate, salary, status, department, address});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'something went wrong'});
    }
}

const deleteEmployee = async (req, res) => {
    try{
        const { id } = req.params;
        
        const [result] = await db.promise().query('DELETE FROM mk_employees WHERE employee_id=?', [id]);

        if(result.affectedRows === 0){
            return res.status(404).json({error:'Employee not found'});
        }

        res.json({message:'Employee deleted successfully', employee_id: id});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'something went wrong'});
    }
}

module.exports = {addUser, listEmployees, updateEmployee, deleteEmployee}