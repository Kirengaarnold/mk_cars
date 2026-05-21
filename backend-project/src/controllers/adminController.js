const { Connection } = require('mysql2');
const db = require('../config/db');

const  Register = async(req, res)=>{
    try{
        const{name, password} = req.body;
        if(!name||!password){
            return res.status(400).json({message:'all fields are required'});
        }
        const[result] = await db.promise().query('INSERT INTO admin(name,password) VALUES(?,?)', [name, password]);
        res.status(201).json({admin_id: result.insertId, name, password});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'something went wrong'})
    }
};


const login = async (req, res)=>{
    try{
        const {name, password} = req.body;
        if(!name||!password){
            return res.status(400).json({error:'username and password required'});
        }
        const [rows] = await db.promise().query('SELECT * FROM admin');
        if (rows.length == 0){
            return res.status(404).json({error:'user not found'});
        }
        const user = rows[0];
        if(user.password !== password){
            return res.status(401).json({error:'incorrect password '});
        }
        res.json({admin_id: user.admin_id, name, password});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'something went wrong'});
    }
}

module.exports = {
    Register,
    login
}