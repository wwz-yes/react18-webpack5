import {Spin} from "antd";
import './index.scss'
const Index = ()=>{
    return <div className={'loading'}>
        <Spin size="large" tip="加载中..." />
    </div>
}

export default Index;