import { test, expect } from "@playwright/test";
import { FullTestEmail } from "../utils/helperEmail";

const testDataEmail = [
  "nameexample.com", // Email Without '@' Symbol
  "nameName@domain", // Email Without Domain Extension
  "nameName@domain!.com", // Email With Invalid Characters
  "nameName@@example.com", // Email With Multiple '@' Symbols
  "nameName@example.c", // Email With Invalid Domain Extension
  " nameName@example.com ", // Email With Leading or Trailing Spaces
  "@example.com", // Email With Missing Username
  "nameName@.com", // Email With Missing Domain Name
];

test("Email Field with out @ symbol. (Criteria 6.2)", async ({ page }) => {
  await FullTestEmail(page, testDataEmail[0]);
});

test("Email Field not contain domain extension.(Criteria 6.2)", async ({ page }) => {
  await FullTestEmail(page, testDataEmail[1]);
});

test("Email Field contain invalid characters.(Criteria 6.2)", async ({ page }) => {
  await FullTestEmail(page, testDataEmail[2]);
});

test("Email Field contain multiple @ symbols.(Criteria 6.2)", async ({ page }) => {
  await FullTestEmail(page, testDataEmail[3]);
});

test("Email Field contain invalid domain extension.(Criteria 6.2)", async ({ page }) => {
  await FullTestEmail(page, testDataEmail[4]);
});

test("Email Field contain leading or trailing spaces.(Criteria 6.2)", async ({ page }) => {
  await FullTestEmail(page, testDataEmail[5]);
});

test("Email Field contain missing username.(Criteria 6.2)", async ({ page }) => {
  await FullTestEmail(page, testDataEmail[6]);
});

test("Email Field contain missing domain name.(Criteria 6.2)", async ({ page }) => {
  await FullTestEmail(page, testDataEmail[7]);
});