import Footer from "../Footer/Footer";
import styles from "./Home.module.css"
import HomePostsContainer from "./HomePosts/HomePostsContainer";
import { withAuthRedirectHOC } from "../../hoc/withAuthRedirect";
import { connect } from "react-redux";
import Header from "../Header/Header";


const Home = (props) => {
    return (
        <div className={styles.wrapper}>
            <Header link={null} title="Posts" />
            <div className={styles.posts}>
                <HomePostsContainer />
            </div>
            <Footer />
        </div>
    )
}
let AuthRedirectComponent = withAuthRedirectHOC(Home)
export default connect()(AuthRedirectComponent);