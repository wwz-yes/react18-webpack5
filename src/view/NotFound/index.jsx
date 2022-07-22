import './index.scss';
import Found from '@/assets/img/notfound.gif';
import { useNavigate } from 'react-router-dom';
const Index = ()=>{
    const navigate = useNavigate();
    // 返回
    const handleBack = () => navigate(-1);
    return <div className={'notfound'}>
        <img src={Found} alt="" className={'bg'}/>
        <section className="error-container">
            <span className="four"><span className="screen-reader-text">4</span></span>
            <span className="zero"><span className="screen-reader-text">0</span></span>
            <span className="four"><span className="screen-reader-text">4</span></span>
        </section>
        <div className={'back'} onClick={handleBack}>返回</div>
    </div>
}

export default Index;