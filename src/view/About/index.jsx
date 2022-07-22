import './index.scss';

import {InputNumber} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {setCounter} from "@/store/modules/home";

const Index = ()=>{
    // 通过useDispatch 派发事件
    const dispatch = useDispatch();

    // 通过useSelector直接拿到store中定义的value
    const { counter } = useSelector((store) => store.home);

    const [value, setValue] = useState(counter);

    const changeVal = (e)=>{
        dispatch(setCounter({ counter: e }))
        setValue(e);
    }
    return(
        <div className={'about'}>
            <InputNumber value={value} onChange={value => changeVal(value)} />

        </div>
    )
}

export default Index;