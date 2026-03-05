import { test, expect } from "@playwright/test";
import {
  InputNameEmail,
  SelectGender,
  InputMobileNumber,
  SelectHobbies,
  UploadPicture,
  FillCurrentAddress,
  SelectDateOfBirth,
  SelectSubject,
  SelectStateAndCity,
} from "../utils/helperFill";

test("mandatory First Name (Criteria 2)", async ({
  page,
}) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  //* Fill First Name, Last Name, and Email
  const [FirstName, Lastname, mail] = await InputNameEmail(
    page,
    null,
    "Lastname",
    "nameName@example.com",
  );

  //* Select Gender
  const selectedGender = await SelectGender(page, "Female");

  //* Fill Mobile Number
  const mobileNumber = await InputMobileNumber(page, "0123456789");

  //* Submit the form
  await page.getByRole("button", { name: "Submit" }).click();

  //* Verify the submitted data
  await expect(
    page.getByText("Thanks for submitting the form"),
  ).not.toBeVisible();
});

test("mandatory Last Name (Criteria 2)", async ({ page }) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  //* Fill First Name, Last Name, and Email
  const [FirstName, Lastname, mail] = await InputNameEmail(
    page,
    "Firstname",
    null,
    "nameName@example.com",
  );

  //* Select Gender
  const selectedGender = await SelectGender(page, "Female");

  //* Fill Mobile Number
  const mobileNumber = await InputMobileNumber(page, "0123456789");

  //* Submit the form
  await page.getByRole("button", { name: "Submit" }).click();

  //* Verify the submitted data
  await expect(
    page.getByText("Thanks for submitting the form"),
  ).not.toBeVisible();
});

test("mandatory Gender (Criteria 2)", async ({ page }) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  //* Fill First Name, Last Name, and Email
  const [FirstName, Lastname, mail] = await InputNameEmail(
    page,
    "Firstname",
    "Lastname",
    "nameName@example.com",
  );

  //* Select Gender
  const selectedGender = await SelectGender(page, null);

  //* Fill Mobile Number
  const mobileNumber = await InputMobileNumber(page, "0123456789");

  //* Submit the form
  await page.getByRole("button", { name: "Submit" }).click();

  //* Verify the submitted data
  await expect(
    page.getByText("Thanks for submitting the form"),
  ).not.toBeVisible();
});

test("mandatory Mobile (Criteria 2)", async ({ page }) => {
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

  //* Fill Mobile Number
  const mobileNumber = await InputMobileNumber(page, null); 

  //* Submit the form
  await page.getByRole("button", { name: "Submit" }).click();

  //* Verify the submitted data
  await expect(
    page.getByText("Thanks for submitting the form"),
  ).not.toBeVisible();
});