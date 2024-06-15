import React, { Fragment, useState } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { User } from "react-feather";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input } from "reactstrap";
import axios from "../../utils/axios";
import { errorToast, successToast } from "../../shared/Toast";
// import { Unlock } from "react-feather";
// import { Label } from "reactstrap";

const LoginTabset = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const clickActive = (event) => {
    document.querySelector(".nav-link").classList.remove("show");
    event.target.classList.add("show");
  };

  const handleLogin = async () => {
    try {
      const { data } = await axios.post("/api/auth/login", credentials);

      if (data) {

        const location = data?.user?.location;
        const token = data.token;
        // console.log(token)
        // const token = "12345";
        localStorage.setItem("authToken", token);
        localStorage.setItem("location", location);
        navigate("/dashboard");
        successToast(data?.message ?? "Login successfully");
      } else {
        errorToast(data?.message ?? "Login failed");
        console.error("Login failed. Status is not true.");
      }
    } catch (error) {
      errorToast(error?.message ?? "Login failed");

      console.error("Login failed", error);
    }
  };

  const handleInputChange = (e, key) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [key]: e.target.value,
    }));
  };

  return (
    <div>
      <Fragment>
        <Tabs>
          <TabList className="nav nav-tabs tab-coupon">
            <Tab className="nav-link" onClick={(e) => clickActive(e)}>
              <User />
              Login
            </Tab>
            {/* <Tab className="nav-link" onClick={(e) => clickActive(e)}>
							<Unlock />
							Register
						</Tab> */}
          </TabList>

          <TabPanel>
            <Form className="form-horizontal auth-form">
              <FormGroup>
                <Input
                  required
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  value={credentials.email}
                  onChange={(e) => handleInputChange(e, "email")}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  required
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) => handleInputChange(e, "password")}
                />
              </FormGroup>
              <div className="form-terms">
                <div className="custom-control custom-checkbox me-sm-2">
                  {/* <Label className="d-block">
                    <Input
                      className="checkbox_animated"
                      id="chk-ani2"
                      type="checkbox"
                    />
                    Reminder Me{" "}
                    <span className="pull-right">
                      {" "}
                      <a href="/#" className="btn btn-default forgot-pass p-0">
                        lost your password
                      </a>
                    </span>
                  </Label> */}
                </div>
              </div>
              <div className="form-button">
                <Button color="primary" onClick={handleLogin}>
                  Login
                </Button>
              </div>
            </Form>
          </TabPanel>
        </Tabs>
      </Fragment>
    </div>
  );
};

export default LoginTabset;
