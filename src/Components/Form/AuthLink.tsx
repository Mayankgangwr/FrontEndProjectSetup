import { FC } from "react";
import Styles from "./Form.module.scss";
import Flex, { JustifyContent } from "../Flex/Flex";
import { Link } from "react-router-dom";
interface IAuthLinkProps {
    authLink?: string
}
const AuthLink: FC<IAuthLinkProps> = ({ authLink }) => {
    return (
        <Flex className="mt-2" justifyContent={JustifyContent.CENTER}>
            <span>
                {authLink === "login"
                    ? "Already have an account? "
                    : "Don't have an account? "}
                <Link className={Styles.link} to={authLink === "login" ? "/signup" : "/login"}>
                    {authLink === "login" ? "Sign up" : "Login"}
                </Link>
            </span>
        </Flex>
    )
};

export default AuthLink;