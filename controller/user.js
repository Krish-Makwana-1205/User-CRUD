const user = require('../model/user');
const {v4 : uuidv4} = require('uuid');
const {set_User, get_User} = require('../services/auth');

async function insertuser(req, res){
    const body = req.body;
    await user.create({
        name: body.name,
        email: body.email,
        gender: body.gender,
    });
    const ticket = await set_User(user);
    console.log(ticket);
    return res.json({
        token: ticket,
    });
}

async function getall(req, res){
    //console.log(req.cookies.ID);
    const auth = req.headers['authorization'];
    if(auth == null){
        return res.json({});
    }
    const user_id = get_User(auth);
    if(user_id == null){
        return res.json({});
    }
    const body = await user.find({});
    return res.json(body);
}

async function findoneuser(req, res){
    const ans = await user.findById(req.params.id);
    const ses_id = uuidv4();
    if(ans != null){
        res.cookie("ID", ses_id);
        res.cookie("uid",await set_User(ans));
    }
    return res.json(ans);
}

async function patch_user(req, res){
    const body = req.body;
    await user.findByIdAndUpdate(
        {_id : req.params.id},
        {
            name : body.name,
            email : body.email,
            gender : body.gender
        }
    )
    return res.json({
        success: 'done'
    });
}

async function delete_user(req, res){
    await user.findByIdAndDelete(req.params.id);
    return res.json({
        success: 'done'
    });
}

module.exports = {
    insertuser,
    getall,
    findoneuser,
    patch_user,
    delete_user
}