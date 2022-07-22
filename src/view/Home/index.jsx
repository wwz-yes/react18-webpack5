
import './index.scss';

import {Button, InputNumber} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {setCounter} from "@/store/modules/home";
import {getUserInfo} from "@/http/home";

const Index = () => {

    // useEffect(() => {
    //     console.log('useEffect');
    //     getUserInfo({
    //         type: "ABOUT_NFT"
    //     }).then(res=>{
    //         console.log(res)
    //     })
    // }, []);

    // 通过useDispatch 派发事件
    const dispatch = useDispatch();

    // 通过useSelector直接拿到store中定义的value
    const { counter } = useSelector((store) => store.home);

    const [value, setValue] = useState(counter);

    return (
        <div className={'home'}>
            <InputNumber value={value} onChange={value => setValue(value)} />
            <Button type={'primary'} onClick={() => dispatch(setCounter({ counter: value}))}>+</Button>
        </div>
    );
}

export default Index;