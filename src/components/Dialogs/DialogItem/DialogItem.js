import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';
import styles from "./DialogItem.module.css"
import MessagesContainer from './Messages/MessagesContainer';

const DialogItem = (props) => {
    return (
        <div className={styles.wrapper}>
            <Header link={null} title={"Dialogs"} />
            <div className={styles.messages}>
                {props.dialogs.map((item, i) => (<MessagesContainer {...item} key={i} />))}
            </div>
            <Footer />
        </div>
    );
}

export default DialogItem;