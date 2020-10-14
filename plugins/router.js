export default  ({app, redirect }) => {
    // console.log("router.js 插件");

    /**
     * app == vue 实例
     * redirect跳转函数  √，只能用这个来进行页面跳转，不能使用 next()跳转
     * next(true) next(false) √, next("/login") ×
     * 插件前置守卫
     */
    // app.router.beforeEach((to, from, next) => {
    //     //to and from are Route Object,next() must be called to resolve the hook}
    //     console.log("插件配置，全局前置：", to);
    //     if(to.name === "login" || to.name === "reg") {
    //         next(true)
    //     }else {
    //         //不是 登录、注册者跳转到 登录页
    //         redirect("/login")
    //     }
    // })

    /**
     * 插件全局前置
     */
    app.router.afterEach( (to, from) => {
        //these hooks do not get a next function and cannot affect the navigation}
        // console.log("插件全局后置守卫");
    })

}