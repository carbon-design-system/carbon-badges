import React, { useEffect } from "react";

import { ArrowRight32 } from "@carbon/icons-react";
import { Button } from "carbon-components-react";
import { Helmet } from "react-helmet";
import Layout from "gatsby-theme-carbon/src/components/Layout";
import { navigate } from "gatsby";
import pictogram from "../images/carbon-pictogram-gradient.png";
import style from "./landing.module.scss";
import { useAuth } from "../util/hooks/use-auth.js";

const Landing = () => {
  const { login, token } = useAuth();

  useEffect(() => {
    if (token) {
      navigate("/badges", {
        replace: true,
      });
    }
  }, [token]);

  return (
    <Layout homepage>
      <Helmet title="Carbon Badges" />
      <div className="bx--grid bx--grid--full-width">
        <div className="bx--row">
          <div className="bx--col-lg-8 bx--col-md-7">
            <h1 className={style.heading}>
              The Carbon Design System offers IBM Digital Badges based on
              completion of the{" "}
              <a href="https://www.carbondesignsystem.com/tutorial/angular/overview">
                Angular
              </a>
              ,{" "}
              <a href="https://www.carbondesignsystem.com/tutorial/react/overview">
                React
              </a>
              ,{" "}
              <a href="https://www.carbondesignsystem.com/tutorial/vue/overview">
                Vue
              </a>
              , and{" "}
              <a href="https://www.ibm.com/standards/carbon/developing/web-components-tutorial/overview">
                Carbon for IBM.com Web Components
              </a>
              tutorials. Log in with GitHub to view and apply for Carbon badges.
            </h1>
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col-lg-3">
            <Button
              className={style.button}
              kind="primary"
              onClick={() => login()}
              renderIcon={ArrowRight32}
              type="button"
            >
              Log in with GitHub
            </Button>
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col">
            <p className={style.copy}>
              Don't have a GitHub account?{" "}
              <a href="https://github.com/join">Join GitHub</a>
            </p>
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--offset-lg-10 bx--col-lg-2 bx--offset-md-6 bx--col-md-2 bx--offset-sm-3 bx--col-sm-1">
            <img
              className={style.pictogram}
              src={pictogram}
              alt="Carbon pictogram"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Landing;
