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

function formatDate(day, month, year) {
  const date = new Date(`${month} ${day}, ${year}`);
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
  const formattedMonth = date.toLocaleDateString("en-US", { month: "long" }); 
  const d = parseInt(day, 10);
  let OrdinalSuffix;
  switch (d % 10) {
    case 1:
      OrdinalSuffix = "st";
      break;
    case 2:
      OrdinalSuffix = "nd";
      break;
    case 3:
      OrdinalSuffix = "rd";
      break;
    default:
      OrdinalSuffix = "th";
  }
  day = day.replace(/^0/, ""); // Remove leading zero if present
  const formattedDay = `${day}${OrdinalSuffix}`;
  const formattedDate = `Choose ${dayOfWeek}, ${formattedMonth} ${formattedDay},`;
  console.log('Formatted Date:', formattedDate);
  return formattedDate;
}

export async function SelectDateOfBirth(page, DateOfBirth, method) {
  // example of DateOfBirth: "01 August,2020"
  if (method === "click" && DateOfBirth) {
    // format DateOfBirth
    const mappingMonths = {
      January: "0",
      February: "1",
      March: "2",
      April: "3",
      May: "4",
      June: "5",
      July: "6",
      August: "7",
      September: "8",
      October: "9",
      November: "10",
      December: "11",
    };
    // format date "18 August,2020" -> "Choose Wednesday, August 18th,"
    const [day, month, year] = DateOfBirth.split(/[\s,]+/);
    const formattedDate = formatDate(day, month, year);

    // click Date of Birth
    await page.locator("#dateOfBirthInput").click();
    await page.getByRole("combobox").nth(1).selectOption(year);
    await page.getByRole("combobox").first().selectOption(mappingMonths[month]);
    await page.getByRole("gridcell", { name: formattedDate }).click();
  }
  if (method === "fill" && DateOfBirth) {
    await page.locator("#dateOfBirthInput").click();
    // change correct format of DateOfBirth to match the input format
    DateOfBirth = DateOfBirth.replace(/,/g, " ").trim();
    // fill Date of Birth
    await page.locator("#dateOfBirthInput").press("ControlOrMeta+a");
    await page.locator("#dateOfBirthInput").fill(DateOfBirth);
    await page.locator("#dateOfBirthInput").press("Enter");
    await page.locator("#dateOfBirth").click();
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
