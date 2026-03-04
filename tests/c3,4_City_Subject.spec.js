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
  CheckCity,
} from "../utils/helperFill";

test("If change City then State should also change (Criteria 3)", async ({ page }) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  // just select State
  const State = "NCR";
  await SelectStateAndCity(page, State, null);
  const Cities = ["Delhi", "Gurgaon", "Noida"];

  // check if all Cities are visible
  await page
    .locator("div")
    .filter({ hasText: /^Select City$/ })
    .nth(3)
    .click();
  for (const City of Cities) {
    await expect(page.getByRole("option", { name: City })).toBeVisible();
  }
});

test("Subjects allows multiple entries and displays them as removable tags (Criteria 4)", async ({ page }) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  //* Fill Subjects
  // SubjectName:
  // Maths, Accounting, Arts, Social Studies,
  // English, Chemistry, Computer Science, Comerce,
  // Economics, Social Studies, Hindi,
  // Physics, Biology, History, Civics
  const subjects = ["Maths", "Civics", "Computer Science"];
  await SelectSubject(page, subjects);

  // Verify that each selected subject is displayed as a removable tag
  await expect(page.getByText("Maths")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Remove Maths" }),
  ).toBeVisible();
  await expect(page.getByText("Civics")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Remove Civics" }),
  ).toBeVisible();
  await expect(page.getByText("Computer Science")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Remove Computer Science" }),
  ).toBeVisible();
});