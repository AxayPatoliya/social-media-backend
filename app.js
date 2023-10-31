import express from 'express';
import home_routes from './routes/home-routes.js'
import user_routes from './routes/user-routes.js'
import blog_routes from './routes/blog-routes.js'

const PORT = process.env.PORT || 3000

const app = express();

app.use(express.json())

app.use('/', home_routes) // "/api/blog" endpoint
app.use('/api/user', user_routes) // "/api/user" endpoint
app.use('/api/blog', blog_routes) // "/api/blog" endpoint

app.listen(PORT, (err) => {
    console.log(`server listening on localhost:${PORT}`);
    if (err){
        console.log(err);
    }
})