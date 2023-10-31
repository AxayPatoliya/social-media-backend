const navigateUser = (req, res, next) => {
    return res.status(200).json({
        info: "these are the api's enpoints along with it's operation. happy hacking!!",
        for_user_apis: {
            list_users: '/api/user/',
            signup_user: '/api/user/signup',
            login_user: '/api/user/login',
        },
        for_blog_apis: {
            list_blogs: '/api/blog/',
            add_blog: '/api/blog/add',
            update_blog: '/api/blog/update/:id',
            get_blog: '/api/blog/:id',
            delete_blog: '/api/blog/delete/:id',
            blog_for_specific_user: '/api/blog/user/:id',
        }
    })
}

export default navigateUser