import { test, expect } from "@playwright/test";
import {
  InputNameEmail,
  SelectGender,
  InputMobileNumber,
  SelectDateOfBirth,
  SelectStateAndCity,
} from "../utils/helperFill";
import { CheckSubmittedData } from "../utils/helperCheck";

test("Date of Birth: The field should default to the current system date. (Criteria 6.3)", async ({
  page,
}) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  const now = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  await expect(page.locator("//*[@id='dateOfBirthInput']")).toHaveValue(now);
});

test("Date of Birth: allow manual selection via a calendar widget. (Criteria 6.3)", async ({
  page,
}) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  //* Select Date of Birth
  const selectedDateOfBirthFill = "01 August,2020";
  await SelectDateOfBirth(page, selectedDateOfBirthFill, "click");
  // await SelectDateOfBirth(page, selectedDateOfBirthFill, "fill");

  const expectedFormattedDate = "01 Aug 2020";
  await expect(page.locator("//*[@id='dateOfBirthInput']")).toHaveValue(expectedFormattedDate);
});

test("Dynamic Dropdowns: No State then empty City. (Criteria 7)", async ({
  page,
}) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  // Not select State
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Select State$/ })
      .nth(3),
  ).toBeVisible();

  // Not select City
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Select City$/ })
      .first(),
  ).toBeVisible();
});

test("Dynamic Dropdowns: City belong to selected State. (Criteria 7)", async ({
  page,
}) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  // just select State
  const State = "NCR";
  await SelectStateAndCity(page, State, null);

  // check if all Cities are in NCR are visible
  const Cities = ["Delhi", "Gurgaon", "Noida"];
  await page
    .locator("div")
    .filter({ hasText: /^Select City$/ })
    .nth(3)
    .click();
  for (const City of Cities) {
    await expect(page.getByRole("option", { name: City })).toBeVisible();
  }
});
