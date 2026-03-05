import { test, expect } from "@playwright/test";
import {
  InputNameEmail,
  SelectGender,
  InputMobileNumber,
} from "../utils/helperFill";

test("Mobile Field must be exactly 10 digits (case less than 10 digits), (Criteria 6.1)", async ({ page }) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  //* Fill First Name, Last Name, and Email
  const [FirstName, Lastname, mail] = await InputNameEmail(
    page,
    "Firstname",
    "Lastname",
    "nameName@example.com",
  );

  //* Select Gender
  const selectedGender = await SelectGender(page, "Female");

  //! Fill Mobile Number
  const mobileNumber = await InputMobileNumber(page, "012345678");

  //* Submit the form
  await page.getByRole("button", { name: "Submit" }).click();

  //* Verify the submitted data
  await expect(
    page.getByText("Thanks for submitting the form"),
  ).not.toBeVisible();
});

test("Mobile Field Alphabetic characters not permitted.(Criteria 6.1)", async ({
  page,
}) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  //* Fill First Name, Last Name, and Email
  const [FirstName, Lastname, mail] = await InputNameEmail(
    page,
    "Firstname",
    "Lastname",
    "nameName@example.com",
  );

  //* Select Gender
  const selectedGender = await SelectGender(page, "Female");

  //! Fill Mobile Number
  const mobileNumber = await InputMobileNumber(page, "012345b67a9");

  //* Submit the form
  await page.getByRole("button", { name: "Submit" }).click();

  //* Verify the submitted data
  await expect(
    page.getByText("Thanks for submitting the form"),
  ).not.toBeVisible();
});

test("Mobile Field special symbols are not permitted.(Criteria 6.1)", async ({ page }) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  //* Fill First Name, Last Name, and Email
  const [FirstName, Lastname, mail] = await InputNameEmail(
    page,
    "Firstname",
    "Lastname",
    "nameName@example.com",
  );

  //* Select Gender
  const selectedGender = await SelectGender(page, "Female");

  //! Fill Mobile Number
  const mobileNumber = await InputMobileNumber(page, "012345@67#9");

  //* Submit the form
  await page.getByRole("button", { name: "Submit" }).click();

  //* Verify the submitted data
  await expect(
    page.getByText("Thanks for submitting the form"),
  ).not.toBeVisible();
});