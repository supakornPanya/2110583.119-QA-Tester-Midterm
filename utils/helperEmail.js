import { test, expect } from "@playwright/test";
import {
  InputNameEmail,
  SelectGender,
  InputMobileNumber,
} from "../utils/helperFill";

export async function FullTestEmail(page, Email) {
  await page.goto("https://demoqa.com/automation-practice-form");

  //! Fill First Name, Last Name, and Email
  const [FirstName, Lastname, mail] = await InputNameEmail(
    page,
    "Firstname",
    "Lastname",
    Email,
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
}
