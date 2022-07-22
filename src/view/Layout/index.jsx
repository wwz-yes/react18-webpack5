import {Layout, Menu} from 'antd';
import React, {useState} from 'react';
import {Outlet, useNavigate} from "react-router";
import {ContainerOutlined, DesktopOutlined, PieChartOutlined,} from '@ant-design/icons';

const {Header, Content, Footer} = Layout;

const MyHeader = () => {
    const navigate = useNavigate();

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    const items = [
        getItem('首页', '/home', <PieChartOutlined/>),
        getItem('关于', '/about', <DesktopOutlined/>),
        getItem('Option 3', '3', <ContainerOutlined/>),
    ];
    const urlParams = new URL(window.location.href);
    const pathname = urlParams?.pathname;
    const [keys, setKeys] = useState(pathname);
    const changeMenu = ({key}) => {
        navigate(key);
    }
    return <div>
        <Header>
            <div className="logo"/>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={keys}
                items={items}
                onSelect={(e) => changeMenu(e)}
            />
        </Header>
    </div>
}

const MyContent = () => {
    return <Content className={'layContent'}>

        <Outlet></Outlet>

    </Content>
}

const MyFooter = () => {
    return <Footer
        style={{
            textAlign: 'center',
        }}
    >
        Ant Design ©2018 Created by Ant UED
    </Footer>
}

const Index = () => {
    return <Layout style={{minHeight: '100vh'}}>
        <MyHeader></MyHeader>
        <MyContent></MyContent>
        <MyFooter></MyFooter>
    </Layout>

}

export default Index;