import { expect } from "@playwright/test";

export async function CheckSubmittedData(
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
  await expect(
    page.getByRole("cell", { name: FirstName + " " + Lastname }),
  ).toBeVisible();
  await expect(page.getByRole("cell", { name: mail })).toBeVisible();
  await expect(page.getByRole("cell", { name: selectedGender })).toBeVisible();
  await expect(page.getByRole("cell", { name: mobileNumber })).toBeVisible();
  if(expectedDate){
    await expect(page.getByRole("cell", { name: expectedDate })).toBeVisible();
  }
  if(subjects){
     await expect(
    page.getByRole("cell", { name: subjects.join(", ") }),
  ).toBeVisible();
  }
  if(selectedHobbies){
    await expect(
      page.getByRole("cell", { name: selectedHobbies.join(", ") }),
    ).toBeVisible();
  }
  if(uploadedFilePath){
    await expect(
      page.getByRole("cell", { name: uploadedFilePath.split("/")[1] }),
    ).toBeVisible();
  }
  if(currentAddress){
    await expect(
      page.getByRole("cell", { name: currentAddress }),
    ).toBeVisible();
  }
  if(State && City){
    await expect(
      page.getByRole("cell", { name: State + " " + City }),
    ).toBeVisible();
  }
}
