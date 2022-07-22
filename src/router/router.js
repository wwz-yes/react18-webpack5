
const routes = [
    {
        path: '/',
        component: () => import('@/view/Layout'),
        children: [
            {
                path: '/',
                redirect: '/home',
            },
            {
                path: '/home',
                component: () => import('@/view/Home'),
                meta: {
                    title: "首页",
                }
            },
            {
                path: '/about',
                component: () => import('@/view/About'),
                meta: {
                    title: "关于",
                }
            },

        ],
    },
    //    404
    {
        path: '*',
        component: () => import('@/view/NotFound'),
        meta: {
            title: "404",
        }
    }
]

export default routes;