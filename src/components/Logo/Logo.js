import sheet from '../../assets/presentation.svg';
import MyLogo from "./Logo.module.css";

const Logo = () => {

    return <img className={MyLogo.logo} alt='milegrid-logo' src={sheet}/>
};

export default Logo;