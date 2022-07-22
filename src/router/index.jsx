import React from "react";
import {useRoutes, useNavigate, Navigate} from "react-router";
import router from './router';
import Loading from '@/components/Loading';
export default function Routes() {
    const element = useRoutes(renderRoutes(router));
    return element;
}


function renderRoutes(routes) {
    return routes.map((item) => {
        let res = {...item};
        if (!item?.path) return;

        // component
        if (item?.component) {
            const Component = React.lazy(item.component);
            res.element = (<React.Suspense fallback={<Loading></Loading>}>
                <BeforeEach route={item}>
                    <Component/>
                </BeforeEach>
            </React.Suspense>);
        }

        // children
        if (item?.children) {
            res.children = renderRoutes(item.children);
        }

        // 重定向
        if (item?.redirect) {
            res.element = (
                <Navigate to={item.redirect} replace/>
            )
        }

        return res;
    })
}

function BeforeEach(props) {
    if (props?.route?.meta?.title) {
        document.title = props.route.meta.title;
    }

    if (props?.route?.meta?.needLogin) {
        // 看是否登录
        // const navigate = useNavigate();
        // navigate('/login');
    }

    return <div>
        {props.children}
        {/*<Loading/>*/}
    </div>
}