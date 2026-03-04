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

test("Email Field not contain @ symbol.", async ({ page }) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  //! Fill First Name, Last Name, and Email
  const [FirstName, Lastname, mail] = await InputNameEmail(
    page,
    "Firstname",
    "Lastname",
    "nameNameexample.com",
  );

  //* Select Gender
  const selectedGender = await SelectGender(page, "Female");

  //* Fill Mobile Number
  const mobileNumber = await InputMobileNumber(page, "0123456789");

  //* Select Date of Birth
  const expectedDate = "01 March,2026";
  // await SelectDateOfBirth(page, "", "click");
  const selectedDateOfBirthFill = "01 Mar 2026";
  await SelectDateOfBirth(page, selectedDateOfBirthFill, "fill");

  //* Fill Subjects
  // SubjectName:
  // Maths, Accounting, Arts, Social Studies,
  // English, Chemistry, Computer Science, Comerce,
  // Economics, Social Studies, Hindi,
  // Physics, Biology, History, Civics
  const subjects = ["Maths", "Civics"];
  await SelectSubject(page, subjects);

  //* Select Hobbies
  const selectedHobbies = await SelectHobbies(page, ["Sports", "Music"]);

  //* Upload Picture
  const filePath = "data/image.png";
  const uploadedFilePath = await UploadPicture(page, filePath);

  //* Fill Current Address
  const currentAddress = await FillCurrentAddress(page, "123 Main Street");

  //* Select State and City
  const State = "NCR";
  const City = "Delhi";
  await SelectStateAndCity(page, State, City);

  //* Submit the form
  await page.getByRole("button", { name: "Submit" }).click();

  //* Verify the submitted data
  await expect(
    page.getByText("Thanks for submitting the form"),
  ).not.toBeVisible();
});