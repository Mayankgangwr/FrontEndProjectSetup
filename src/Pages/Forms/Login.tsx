import React, { useState } from "react";
import Styles from "./Forms.module.scss";
import { Form, InputField, Checkbox, Flex } from "../../Components";
import { Link } from "react-router-dom";
import validation from "../../Utils/Validations/Validation";
import authController from "../../DataProvider/Controllers/AuthController";
import { useDispatch } from "react-redux";
import { login } from "../../Store/authSlice";
import { ILoginState } from "../../Types";

const Login: React.FC = () => {
    const [user, setUser] = useState<ILoginState>({
        username: "",
        password: "",
    });
    const [error, setError] = useState<ILoginState>({
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string>("");

    const dispatch = useDispatch();

    const handleChange = async (value: string, name: string) => {
        const err = await validation.fieldValidation(value, name);
        setError(prevError => ({ ...prevError, [name]: err }));
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(() => true);
        // Validate fields before making API call
        const keys = Object.keys(error) as (keyof ILoginState)[];
        const validationPromises = keys.map(async (key) => {
            const err = await validation.fieldValidation(user[key], key);
            return { key, err };
        });

        const results = await Promise.all(validationPromises);
        const hasErrors = results.some(result => {
            setError(prevError => ({ ...prevError, [result.key]: result.err }));
            return result.err !== "";
        });

        if (hasErrors) {
            return;
        }

        setLoading(true);
        try {
            const response = await authController.login(user);
            const { accessToken, refreshToken, restaurant } = response;

            const data = restaurant;

            // Store tokens in local storage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            // Dispatch tokens and user data to Redux
            dispatch(login({
                userdata: {
                    _id: data._id,
                    displayName: data.displayName,
                    username: data.username,
                    avatar: data.avatar,
                    managerName: data.managerName,
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                    city: data.city,
                    state: data.state,
                    country: data.country,
                    pincode: data.pincode,
                    status: data.status,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt
                },
                accessToken,
                refreshToken
            }));
            alert("Login successful!");
        } catch (err) {
            setLoginError("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    const hasError = (): boolean => {
        return Object.keys(error).some(key => user[key as keyof ILoginState] === "" || error[key as keyof ILoginState] !== "");
    };

    return (
        <div>
            <Form
                onSubmit={handleSubmit}
                formHeader="User Login"
                hasError={hasError()}
                authLink="login"
            >
                <InputField
                    type="text"
                    name="username"
                    label="Username:"
                    className={Styles.InputField}
                    value={user.username}
                    setValue={handleChange}
                    placeholder="Enter username"
                    clearable
                    error={error.username}
                />
                <InputField
                    type="password"
                    name="password"
                    label="Password:"
                    className={Styles.InputField}
                    value={user.password}
                    setValue={handleChange}
                    placeholder="Enter password"
                    clearable
                    error={error.password}
                />
                {loginError && <div className={Styles.loginError}>{loginError}</div>}
                <Flex className="mt-4">
                    <Checkbox
                        label="Remember me"
                        labelPosition="after"
                        setValue={(value: string, name: string) => {
                            console.log(value, name);
                        }}
                    />
                    <Link className={Styles.Link} to="/forgotpassword">
                        Forgot password?
                    </Link>
                </Flex>
            </Form>
        </div>
    );
};

export default Login;
