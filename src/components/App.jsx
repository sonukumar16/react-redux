import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./home";
import About from "./about";
import Courses from "./courses";
import ManageCoursePage from "./courses/ManageCoursePage";
import { Header, Footer } from "./common";
import PageNotFound from "./PageNotFound";

const App = () => (
  <div className="container-fluid">
    <Header />
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path="/about" exact component={About}></Route>
      <Route path="/courses" exact component={Courses}></Route>
      <Route path="/course/:slug" exact component={ManageCoursePage}></Route>
      <Route path="/course" exact component={ManageCoursePage}></Route>
      <Route component={PageNotFound}></Route>
      <Footer />
    </Switch>
     <ToastContainer autoClose={3000} hideProgressBar />
  </div>
);

export default App;
