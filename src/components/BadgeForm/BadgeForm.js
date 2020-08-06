import {
  Button,
  Dropdown,
  InlineNotification,
  SkeletonText,
  TextArea,
} from "carbon-components-react";
import { Column, Row } from "gatsby-theme-carbon";
import { Controller, useForm } from "react-hook-form";
import { H2, P } from "gatsby-theme-carbon/src/components/markdown";
import React, { useEffect, useState } from "react";

import badgeConfig from "../../../config/badges";
import style from "./BadgeForm.module.scss";
import { useAuth } from "../../util/hooks/use-auth.js";

const cleanPRs = (prs) => {
  return prs.map((pr) => {
    const { number, state, title, url } = pr;

    const approved = pr.labels.reduce((approved, label) => {
      if (label.name === "status: approved") {
        approved = true;
      }
      return approved;
    }, false);

    const correction = pr.labels.reduce((correction, label) => {
      if (label.name === "status: needs correction") {
        correction = true;
      }
      return correction;
    }, false);

    const step = title.toLowerCase().match(/step \d/gi);

    return {
      number,
      state,
      status: approved ? "approved" : correction ? "correction" : "",
      step: step ? step[0] : "",
      url,
    };
  });
};

const BadgeForm = () => {
  const [emails, setEmails] = useState([]);
  const [steps, setSteps] = useState([]);
  const { token } = useAuth();
  const {
    handleSubmit,
    watch,
    errors,
    control,
    formState,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });

  const selectedTutorial = watch("badge", {});

  useEffect(() => {
    if (!token) return;

    fetch(`/api/github/user-emails?access_token=${token}`)
      .then((response) => response.json())
      .then((data) => {
        setEmails(data || []);
      });
  }, [token]);

  useEffect(() => {
    setError("stepsInput", {
      type: "manual",
      message: "All five pull requests must be approved to receive the badge.",
    });
  }, [setError]);

  useEffect(() => {
    if (!selectedTutorial.id) {
      return;
    }

    const preSetSteps = (prs) => {
      const items = cleanPRs(prs)
        .filter((item) => item.step)
        .sort((a, b) => {
          if (a.step < b.step) return -1;
          if (a.step > b.step) return 1;
          if (a.status < b.status) return -1;
          if (a.status > b.status) return 1;
          return 0;
        });

      // find first of each step
      // if not found, inset one
      // if all found, clear error

      clearErrors("stepsInput");
      setSteps(items);
    };

    fetch(
      `/api/github/pull-requests?access_token=${token}&tutorial=${selectedTutorial.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        preSetSteps(data.items || []);
      });
  }, [clearErrors, selectedTutorial, token]);

  const onSubmit = (values) => console.log(values);

  if (!token) return null;

  return (
    <>
      <Row>
        <Column colLg={8}>
          <H2>Badge application</H2>
          <P>
            IBM Digital Badges are available upon completing all five steps of
            each Carbon tutorial. The badges are available to anybody — not just
            IBM employees.
          </P>
        </Column>
      </Row>
      <Row>
        <Column colLg={8}>
          {emails.length === 0 ? (
            <SkeletonText paragraph={true} width="320px" />
          ) : (
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
              <div className={style.field}>
                <Controller
                  control={control}
                  name="email"
                  rules={{ required: true }}
                  render={({ onChange, value }) => (
                    <Dropdown
                      id="email"
                      invalid={!!errors.email}
                      selectedItem={value}
                      onChange={(item) => onChange(item.selectedItem)}
                      invalidText="A value is required."
                      ariaLabel="Email dropdown"
                      titleText="Email address"
                      label="Choose an email address"
                      helperText="Don't see your work email address? Verify it in GitHub email settings to use here."
                      items={emails
                        .filter((email) => email.verified)
                        .map((email) => email.email)}
                      light={true}
                    />
                  )}
                />
              </div>

              <div className={style.field}>
                <Controller
                  control={control}
                  name="badge"
                  rules={{ required: true }}
                  render={({ onChange, value }) => (
                    <Dropdown
                      id="badge"
                      invalid={!!errors.badge}
                      selectedItem={value}
                      onChange={(item) => onChange(item.selectedItem)}
                      invalidText="A value is required."
                      ariaLabel="Badge dropdown"
                      titleText="Carbon tutorial"
                      label="Choose a badge"
                      items={Object.keys(badgeConfig).map((name) => {
                        return {
                          id: name,
                          text: badgeConfig[name].label,
                        };
                      })}
                      itemToString={(item) => (item ? item.text : "")}
                      light={true}
                    />
                  )}
                />
              </div>

              <div className={style.field}>
                {steps.map((step, i) => (
                  <InlineNotification
                    key={i}
                    hideCloseButton={true}
                    kind={
                      step.status === "approved"
                        ? "success"
                        : step.status === "correction"
                        ? "error"
                        : "warning"
                    }
                    lowContrast={true}
                    title={
                      step.step.charAt(0).toUpperCase() + step.step.slice(1)
                    }
                    subtitle={
                      <span>
                        <a href={step.url} rel="noreferrer" target="_blank">
                          PR #{step.number}
                        </a>{" "}
                        {step.status === "approved"
                          ? "approved."
                          : step.status === "correction"
                          ? "needs correction."
                          : "not reviewed."}
                      </span>
                    }
                  ></InlineNotification>
                ))}
              </div>

              <div className={style.field}>
                <TextArea
                  id="questionHowDescribe"
                  name="questionHowDescribe"
                  invalid={!!errors.questionHowDescribe}
                  invalidText="A value is required."
                  labelText="How would you describe the tutorial in one or more words? (Optional)"
                  rows={3}
                  light={true}
                  disabled={!formState.isValid}
                />
              </div>

              <div className={style.field}>
                <TextArea
                  id="questionLikeBest"
                  name="questionLikeBest"
                  invalid={!!errors.questionLikeBest}
                  invalidText="A value is required."
                  labelText="What did you like best about the tutorial? (Optional)"
                  rows={3}
                  light={true}
                  disabled={!formState.isValid}
                />
              </div>

              <div className={style.field}>
                <TextArea
                  id="questionHowImprove"
                  name="questionHowImprove"
                  invalid={!!errors.questionHowImprove}
                  invalidText="A value is required."
                  labelText="How can we improve the tutorial? (Optional)"
                  rows={3}
                  light={true}
                  disabled={!formState.isValid}
                />
              </div>

              <div className={style.field}>
                <TextArea
                  id="questionSuggestion"
                  name="questionSuggestion"
                  invalid={!!errors.questionSuggestion}
                  invalidText="A value is required."
                  labelText="Anything you'd like help with going forward? Future tutorial topics? (Optional)"
                  rows={3}
                  light={true}
                  disabled={!formState.isValid}
                />
              </div>

              <div className={style.field}>
                <TextArea
                  id="questionFreeform"
                  name="questionFreeform"
                  invalidText="A value is required."
                  labelText="Anything else you'd like to share with the Carbon team? (Optional)"
                  rows={3}
                  light={true}
                  disabled={!formState.isValid}
                />
              </div>

              <Button
                className={style.button}
                disabled={!formState.isValid}
                size="field"
                type="submit"
              >
                Apply for badge
              </Button>
            </form>
          )}
        </Column>
      </Row>
    </>
  );
};

export default BadgeForm;
