const db = require('../config/db');

const  Register = async(req, res)=>{
    try{
        const{username, password} = req.body;
        if(!username||!password){
            return res.status(400).json({message:'all fields are required'});
        }
        const[result] = await db.promise().query('INSERT INTO mk_user(username,password) VALUES(?,?)', [username, password]);
        res.status(201).json({user_id: result.insertId, username, password});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'something went wrong'})
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.promise().query(
            'DELETE FROM mk_user WHERE user_id = ?',
            [id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'user record not found' });
        }
        res.json({ message: 'user deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


module.exports = {
    Register,
    deleteUser
}


