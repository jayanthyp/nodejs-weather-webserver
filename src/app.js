const path=require('path')
const express=require('express')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const app=express()
const hbs=require('hbs')

const port=process.env.PORT | 3000

const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
//Configuring custom view path
app.set('views',viewsPath)

//configuring Static files
app.use(express.static(publicDirectoryPath))

//configuring Partials
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        name:'Jayanth',
        title:'Weather'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Jayanth',
        title:'About'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'You are being helped!',
        title:'Help',
        name:'Jayanth'
    })
})

// app.get('/help',(req,res)=>{
//     res.send('This is Help Page!')
// })

// app.get('/about',(req,res)=>{
//     // res.send('<h1>This is about page!</h1>')
//     // app.use(express.static(path.join(__dirname,'../public/about')))
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'There is no address in your query'
        })
    }
    geocode(req.query.address,(error,{longitude,latitude}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }
        else
        console.log(longitude+','+latitude)
        forecast(longitude,latitude,(error,resp)=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                location:resp.location,
                forecast:resp.forecast,
                address:req.query.address
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('errorPage',{
        errorMessage:'Help article not found',
        title:'No Help',
        name:'Jayanth'
    })
})

app.get('*',(req,res)=>{
    res.render('errorPage',{
        errorMessage:'Page not Found',
        title:'404',
        name:'Jayanth'
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});