import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Spinner,
} from "reactstrap";
import * as yup from "yup";
import { handleUserLogin } from "../../redux/action/auth";

const LoginPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [resErr, setResErr] = useState("");

  const schema = yup.object().shape({
    userName: yup.string().trim().required().label("Username"),
    password: yup.string().trim().min(6).max(15).required().label("Password"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const onFormSubmit = async (data) => {
    const { userName, password } = data;
    try {
      setLoading(true);
      setResErr("");

      const apiData = {
        username: userName,
        password: password,
      };
      const loginRes = await handleUserLogin(apiData);
    } catch (e) {
      setResErr(e.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Form onSubmit={handleSubmit(onFormSubmit)}>
            <h3>Sign In</h3>
            {resErr && (
              <div className="alert alert-danger" role="alert">
                {resErr}
              </div>
            )}

            <FormGroup className="mb-1">
              <Label>Username*</Label>
              <Controller
                control={control}
                name="userName"
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="text"
                    id="userName"
                    value={value}
                    onChange={onChange}
                    placeholder="Enter Username"
                    invalid={!!errors.userName}
                  />
                )}
              />

              {errors?.userName && (
                <FormFeedback> {errors?.userName?.message}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup className="mb-1">
              <Label>Password*</Label>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="password"
                    id="password"
                    value={value}
                    onChange={onChange}
                    placeholder="Enter Password"
                    invalid={!!errors.password}
                  />
                )}
              />

              {errors?.password && (
                <FormFeedback> {errors?.password?.message}</FormFeedback>
              )}
            </FormGroup>

            <div className="d-grid">
              <Button type="submit" color="primary" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner size={"sm"} /> ...Loading
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
