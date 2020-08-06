import {
  Button,
  Dropdown,
  SkeletonText,
  TextArea,
  TextInput,
} from "carbon-components-react";
import { Column, Row } from "gatsby-theme-carbon";
import { Controller, useForm } from "react-hook-form";
import { H2, P } from "gatsby-theme-carbon/src/components/markdown";
import React, { useEffect, useState } from "react";

import badgeConfig from "../../../config/badges";
import style from "./BadgeForm.module.scss";
import { useAuth } from "../../util/hooks/use-auth.js";

const BadgeForm = () => {
  const [emails, setEmails] = useState([]);
  const { token } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    errors,
    formState,
    control,
  } = useForm();

  useEffect(() => {
    if (!token) return;

    fetch(`/api/github/user-emails?access_token=${token}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setEmails(data || []);
      });
  }, [token]);

  const badgeItems = Object.keys(badgeConfig).map((name) => {
    return {
      id: name,
      text: badgeConfig[name].label,
    };
  });

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
                      items={badgeItems}
                      itemToString={(item) => (item ? item.text : "")}
                      light={true}
                    />
                  )}
                />
              </div>

              <div className={style.field}>
                <TextInput
                  id="questionHowDescribe"
                  name="questionHowDescribe"
                  invalid={!!errors.questionHowDescribe}
                  invalidText="A value is required."
                  labelText="How would you describe the tutorial in one or more words?"
                  light={true}
                  ref={register({
                    required: true,
                  })}
                />
              </div>

              <div className={style.field}>
                <TextArea
                  id="questionLikeBest"
                  name="questionLikeBest"
                  invalid={!!errors.questionLikeBest}
                  invalidText="A value is required."
                  labelText="What did you like best about the tutorial?"
                  rows={3}
                  light={true}
                  ref={register({
                    required: true,
                  })}
                />
              </div>

              <div className={style.field}>
                <TextArea
                  id="questionHowImprove"
                  name="questionHowImprove"
                  invalid={!!errors.questionHowImprove}
                  invalidText="A value is required."
                  labelText="How can we improve the tutorial?"
                  rows={3}
                  light={true}
                  ref={register({
                    required: true,
                  })}
                />
              </div>

              <div className={style.field}>
                <TextArea
                  id="questionSuggestion"
                  name="questionSuggestion"
                  invalid={!!errors.questionSuggestion}
                  invalidText="A value is required."
                  labelText="Anything you'd like help with going forward? Future tutorial topics?"
                  rows={3}
                  light={true}
                  ref={register({
                    required: true,
                  })}
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
                />
              </div>

              <Button className={style.button} size="field" type="submit">
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
