export async function InputNameEmail(page, Firstname, Lastname, email) {
  if (Firstname) {
    await page.getByRole("textbox", { name: "First Name" }).click();
    await page.getByRole("textbox", { name: "First Name" }).fill(Firstname);
  }
  if (Lastname) {
    await page.getByRole("textbox", { name: "Last Name" }).click();
    await page.getByRole("textbox", { name: "Last Name" }).fill(Lastname);
  }
  if (email) {
    await page.getByRole("textbox", { name: "name@example.com" }).click();
    await page.getByRole("textbox", { name: "name@example.com" }).fill(email);
  }
  return [Firstname, Lastname, email];
}

export async function SelectGender(page, Gender) {
  if (Gender === "Male") {
    await page.getByRole("radio", { name: "Male", exact: true }).check();
  } else if (Gender === "Female") {
    await page.getByRole("radio", { name: "Female" }).check();
  } else if (Gender === "Other") {
    await page.getByRole("radio", { name: "Other" }).check();
  }
  return Gender;
}

export async function InputMobileNumber(page, MobileNumber) {
  if (MobileNumber) {
    await page.getByRole("textbox", { name: "Mobile Number" }).click();
    await page
      .getByRole("textbox", { name: "Mobile Number" })
      .fill(MobileNumber);
  }
  return MobileNumber;
}

export async function SelectDateOfBirth(page, DateOfBirth, method) {
  if (method) {
    await page.locator("#dateOfBirthInput").click();
    if (method === "click") {
      await page
        .locator(
          "xpath=//*[@id='dateOfBirth']/div[2]/div[2]/div/div/div/div/div[2]/div[2]/div[1]/div[1]",
        )
        .click();
      await page.locator("#dateOfBirth").click();
    }
    if (method === "fill" && DateOfBirth) {
      await page.locator("#dateOfBirthInput").press("ControlOrMeta+a");
      await page.locator("#dateOfBirthInput").fill(DateOfBirth);
      await page.locator("#dateOfBirthInput").press("Enter");
      await page.locator("#dateOfBirth").click();
    }
  }
  return DateOfBirth;
}

export async function SelectSubject(page, Subjects) {
  for (const subject of Subjects) {
    await page.locator(".subjects-auto-complete__input-container").click();
    await page.locator("#subjectsInput").fill(subject);
    await page.getByRole("option", { name: subject }).click();
  }
  return Subjects;
}

export async function SelectHobbies(page, Hobbies) {
  for (const hobby of Hobbies) {
    await page.getByRole("checkbox", { name: hobby }).check();
  }
  return Hobbies;
}

export async function UploadPicture(page, filePath) {
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles(filePath);
  return filePath;
}

export async function FillCurrentAddress(page, CurrentAddress) {
  if (CurrentAddress) {
    await page.getByRole("textbox", { name: "Current Address" }).click();
    await page
      .getByRole("textbox", { name: "Current Address" })
      .fill(CurrentAddress);
  }
  return CurrentAddress;
}

export async function SelectStateAndCity(page, State, City) {
  if (State) {
    await page
      .locator("div")
      .filter({ hasText: /^Select State$/ })
      .nth(3)
      .click();
    await page.locator("#react-select-3-input").fill(State);
    await page.locator("#react-select-3-input").press("Enter");
  }
  if (City) {
    await page
      .locator("div")
      .filter({ hasText: /^Select City$/ })
      .nth(3)
      .click();
    await page.locator("#react-select-4-input").fill(City);
    await page.locator("#react-select-4-input").press("Enter");
  }
}
