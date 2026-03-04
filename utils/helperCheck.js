import { expect } from "@playwright/test";

export async function CheckData(
  page,
  FirstName,
  Lastname,
  mail,
  selectedGender,
  mobileNumber,
  expectedDate,
  subjects,
  selectedHobbies,
  uploadedFilePath,
  currentAddress,
  State,
  City,
) {
  const dateInput = page.locator("#dateOfBirthInput");
  await expect(
    page.getByRole("cell", { name: FirstName + " " + Lastname }),
  ).toBeVisible();
  await expect(page.getByRole("cell", { name: mail })).toBeVisible();
  await expect(page.getByRole("cell", { name: selectedGender })).toBeVisible();
  await expect(page.getByRole("cell", { name: mobileNumber })).toBeVisible();
  await expect(page.getByRole("cell", { name: expectedDate })).toBeVisible();
  await expect(
    page.getByRole("cell", { name: subjects.join(", ") }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: selectedHobbies.join(", ") }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: uploadedFilePath.split("/")[1] }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: currentAddress }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: State + " " + City }),
  ).toBeVisible();
}
