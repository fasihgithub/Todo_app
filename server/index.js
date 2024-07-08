const express = require('express')
const app = express()
const cors = require('cors')
const User = require('./db/user')

const Jwt = require('jsonwebtoken')
const jwtKey = 'my-key'

app.use(express.json())
app.use(cors())

const Todo = require('./db/todos')


app.post('/signUp', async (req, resp) => {
    try {
        const { email } = req.body
        const userExist = await User.findOne({ email });
        if (!userExist) {
            const data = await User(req.body)
            const result = await data.save()
            const finalResult = result.toObject()
            delete finalResult.password
            Jwt.sign({ finalResult }, jwtKey, { expiresIn: '1h' }, (err, token) => {
                if (err) {
                    resp.send({ err: "Token Not Produced" })
                }
                else {
                    resp.send({ finalResult, auth: token })
                }
            })
            // resp.send(result)
        }
        else {
            resp.status(409).json({ error: "User already exists" });
        }
    }
    catch (error) {
        resp.status.json({ error: 'Internal Server Error' })
    }

})

app.post('/login', async (req, resp) => {
    const { email, password } = req.body
    if (email && password) {
        const dataFind = await User.findOne({ email, password }).select('-password')
        if (dataFind) {
            Jwt.sign({dataFind}, jwtKey, {expiresIn:'1h'}, (err, token) => {
                if(err){
                    resp.send({err:"Token Not Found"})
                }
                else{
                    resp.send({dataFind, auth:token})
                }
            })
            // resp.send(data)
        }
        else {
            resp.send({ Result: "Email or Password is Wrong111" })
        }

    } else {
        resp.send({ Result: "Email or Password is Wrong222" })
    }
})


app.post('/todo', verifiToken, async (req, resp) => {
    const { userId, todo } = req.body;
    const data = new Todo({ userId, todo: todo })  //todo:todo 1st is schema and 2nd is from client side
    // const data = new Todo(req.body)
    const result = await data.save()
    resp.send(result)
})

app.get('/listTodo/:userId', verifiToken, async (req, resp) => {
    const userId = req.params.userId
    const data = await Todo.find({ userId })
    resp.send(data)
})

app.delete('/delete/:id', verifiToken, async (req, resp) => {
    const data = await Todo.deleteOne({ _id: req.params.id })
    resp.send(data)
})

app.get('/getWork/:id', async (req, resp) => {
    const data = await Todo.findOne({ _id: req.params.id })
    resp.send(data)
})

app.put('/update/:id', verifiToken, async (req, resp) => {
    const data = await Todo.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    resp.send(data)
})


function verifiToken(req, resp, next){
    let token = req.headers['authorization']
    if(token){
        token = token.split(' ')[1]
        Jwt.verify(token, jwtKey, (err, valid)=>{
            if(err){
                resp.send({err:'Please Add Token in the Header'})
            }
            else{
                next()
            }
        })
    }
    else{
        resp.send({Error:'Please Add token in the Header'})
    }
}

app.listen(4120)