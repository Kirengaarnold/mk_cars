const db = require('../config/db');

const addPost = async (req, res)=>{
    try{
        const{postname} = req.body;
        if(!postname){
            return res.status(400).json({error:'postname required'});
        }
        const [result] = await db.promise().query('INSERT INTO mk_post(postname) VALUES(?)',[postname]);
        res.status(201).json({post_id: result.insertId, postname});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'something wemt wrong'});
    }
};

module.exports = {addPost}