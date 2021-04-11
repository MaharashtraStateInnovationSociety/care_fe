import React from "react";
import { Box, Grid, InputLabel, makeStyles } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { comorbitiesList, facilitiesList } from "./testData";
import {
  DateInputField,
  MultilineInputField,
  MultiSelectField,
  SelectField,
  TextInputField,
} from "../../Common/HelperInputFields";

const useStyle = makeStyles((theme) => ({
  heading: {
    marginBottom: theme.spacing(2),
  },
  radioContainer: {
    marginTop: theme.spacing(4),
  },
  radioBtnWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  radioLabel: {
    marginRight: theme.spacing(4),
  },
}));

interface AboutCovidProps {
  handleChange: <T = any>(e: T) => void;
  handleValueChange: (value: any, name: string) => void;
  handleDateChange: (date: any, field: string) => void;
  post_covid_time: number;
  date_of_test_positive: string;
  date_of_test_negative: string;
  testing_centre: string;
  pre_covid_comorbidities: { [key: string]: any };
  post_covid_comorbidities: { [key: string]: any };

  treatment_facility: number;
}

const AboutCovid: React.FC<AboutCovidProps> = (props) => {
  const className = useStyle();
  const {
    handleChange,
    handleValueChange,
    handleDateChange,
    post_covid_time,
    date_of_test_positive,
    date_of_test_negative,
    testing_centre,
    pre_covid_comorbidities,
    post_covid_comorbidities,

    treatment_facility,
  } = props;

  const handleMultiSelect = (
    e: any,
    prevValues: { [key: string]: any },
    field: string
  ) => {
    const newValues = e.target.value.reduce(
      (acc: object, cur: string) => ({
        ...acc,
        [cur]: prevValues[cur] || "",
      }),
      {}
    );
    handleValueChange(newValues, field);
  };

  return (
    <>
      <Typography variant="h4" color="primary" className={className.heading}>
        About Covid
      </Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* POST COVID DURATION */}
            <FormControl
              component="fieldset"
              className={className.radioContainer}
            >
              <FormLabel component="legend">Post Covid</FormLabel>
              <RadioGroup
                aria-label="post_covid_time"
                name="post_covid_time"
                className={className.radioBtnWrapper}
                onChange={(e) => handleChange(e)}
                value={post_covid_time}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio color="primary" />}
                  label="Less Than 3 Weeks"
                  className={className.radioLabel}
                />
                <FormControlLabel
                  value="2"
                  control={<Radio color="primary" />}
                  label="3 to 12 weeks"
                  className={className.radioLabel}
                />
                <FormControlLabel
                  value="3"
                  control={<Radio color="primary" />}
                  label="More Than 12 Weeks"
                  className={className.radioLabel}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel id="date_of_test_positive">
              Date of test positive
            </InputLabel>
            <DateInputField
              errors={""}
              defaultValue={null}
              inputVariant="outlined"
              margin="dense"
              onChange={(e) => handleDateChange(e, "date_of_test_positive")}
              value={date_of_test_positive}
              name="date_of_test_positive"
              emptyLabel={"dd/mm/yyyy"}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel id="date_of_test_negative">
              Date of test negative
            </InputLabel>
            <DateInputField
              errors={""}
              defaultValue={null}
              inputVariant="outlined"
              margin="dense"
              onChange={(e) => handleDateChange(e, "date_of_test_negative")}
              value={date_of_test_negative}
              emptyLabel={"dd/mm/yyyy"}
              fullWidth
              name="date_of_test_negative"
              size={"medium"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel id="pre_covid_comrbities-label">
              Testing Center
            </InputLabel>
            <TextInputField
              variant="outlined"
              margin="dense"
              name="testing_centre"
              fullWidth
              value={testing_centre}
              errors={""}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel id="srf_id-label">SRF ID</InputLabel>
            <TextInputField
              variant="outlined"
              margin="dense"
              name="srf_id"
              fullWidth
              errors={""}
              value="SOME_ID"
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel id="post_covid_comrbities-label">
              Pre-covid comorbities
            </InputLabel>
            <MultiSelectField
              name="pre_covid_comrbities"
              variant="outlined"
              margin="dense"
              color="primary"
              label="pre_covid_comrbities"
              options={comorbitiesList}
              optionValue={"name"}
              value={Object.keys(pre_covid_comorbidities)}
              onChange={(e) =>
                handleMultiSelect(
                  e,
                  pre_covid_comorbidities,
                  "pre_covid_comorbidities"
                )
              }
            />
            {Object.keys(pre_covid_comorbidities).map((item, index) => {
              return (
                <MultilineInputField
                  label={`${item} (optional)`}
                  key={index}
                  rows={3}
                  margin="dense"
                  variant="outlined"
                  value={pre_covid_comorbidities[item]}
                  errors=""
                  onChange={(e) =>
                    handleValueChange(
                      e.target.value,
                      `pre_covid_comorbidities.${item}`
                    )
                  }
                />
              );
            })}
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel id="post_covid_comrbities-label">
              Post-covid comorbities
            </InputLabel>
            <MultiSelectField
              variant="outlined"
              margin="dense"
              color="primary"
              label="post_covid_comrbities"
              options={comorbitiesList}
              optionValue={"name"}
              value={Object.keys(post_covid_comorbidities)}
              onChange={(e) =>
                handleMultiSelect(
                  e,
                  post_covid_comorbidities,
                  "post_covid_comorbidities"
                )
              }
            />
            {Object.keys(post_covid_comorbidities).map((item, index) => {
              return (
                <MultilineInputField
                  label={`${item} (optional)`}
                  key={index}
                  rows={3}
                  margin="dense"
                  variant="outlined"
                  value={post_covid_comorbidities[item]}
                  errors=""
                  onChange={(e) =>
                    handleValueChange(
                      e.target.value,
                      `post_covid_comorbidities.${item}`
                    )
                  }
                />
              );
            })}
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel id="treatment_facility-label">
              Treatment Facility
            </InputLabel>
            <SelectField
              name="treatment_facility"
              variant="outlined"
              color="primary"
              margin="dense"
              options={facilitiesList}
              optionValue={"name"}
              value={treatment_facility}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    </>
  );
};

export default AboutCovid;
