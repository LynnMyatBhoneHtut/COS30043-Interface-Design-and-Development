

// ---------- Patterns ----------
const LETTERS_ONLY = /^[A-Za-z]+$/;                                      // first & last name
const SPECIAL_CHAR = /[^A-Za-z0-9\s]/;                                   // any symbol, e.g. $ % ^ & *
const EMAIL_FORMAT = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; // name@example.com
const FOUR_DIGITS  = /^\d{4}$/;                                          // postcode, e.g. 3122 or 0800
const MOBILE_04    = /^04\d{8}$/;                                        // 04 + 8 more digits = 10 digits
const MIN_AGE = 16;

// Age in whole years for a 'YYYY-MM-DD' string (negative if the date is in the future).
// The string is split into numbers instead of using new Date('YYYY-MM-DD'), which reads it as UTC.
function ageFrom(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  const today = new Date();
  let age = today.getFullYear() - year;
  const birthdayStillToCome =
    today.getMonth() + 1 < month ||
    (today.getMonth() + 1 === month && today.getDate() < day);
  if (birthdayStillToCome) age--;
  return age;
}

// Checks the whole form.
//   form          – the field values, e.g. { firstName: 'Jane', ... }
//   jobCategories – the options offered in the dropdown
//   dobBadInput   – true when the date box holds something the browser couldn't read
// Returns one message per invalid field, e.g. { postcode: 'Postcode must be ...' }.
// An empty object means everything is valid.
function validateApplication(form, jobCategories, dobBadInput) {
  const errors = {};

  // 1 & 2. First and last name: required, letters only
  if (!form.firstName) errors.firstName = 'Please enter your first name.';
  else if (!LETTERS_ONLY.test(form.firstName)) errors.firstName = 'First name can only contain letters (A–Z).';

  if (!form.lastName) errors.lastName = 'Please enter your last name.';
  else if (!LETTERS_ONLY.test(form.lastName)) errors.lastName = 'Last name can only contain letters (A–Z).';

  // 3. Username: required, at least 3 characters
  if (!form.username) errors.username = 'Please enter a username.';
  else if (form.username.length < 3) errors.username = 'Username must be at least 3 characters.';

  // 4. Password: required, at least 8 characters, at least one special character
  if (!form.password) {
    errors.password = 'Please enter a password.';
  } else {
    const problems = [];
    if (form.password.length < 8) problems.push('be at least 8 characters');
    if (!SPECIAL_CHAR.test(form.password)) problems.push('include a special character such as $ % ^ & *');
    if (problems.length > 0) errors.password = 'Password must ' + problems.join(' and ') + '.';
  }

  // 5. Confirm password: must match the password
  if (!form.confirmPassword) errors.confirmPassword = 'Please re-enter your password.';
  else if (form.confirmPassword !== form.password) errors.confirmPassword = 'Passwords do not match.';

  // 6. Email: required, valid format
  if (!form.email) errors.email = 'Please enter your email address.';
  else if (!EMAIL_FORMAT.test(form.email)) errors.email = 'Please enter a valid email address, e.g. name@example.com.';

  // 7 & 8. Street address and suburb: optional, but with a maximum length
  if (form.streetAddress.length > 40) {
    errors.streetAddress = `Street address must be 40 characters or fewer (currently ${form.streetAddress.length}).`;
  }
  if (form.suburb.length > 20) {
    errors.suburb = `Suburb must be 20 characters or fewer (currently ${form.suburb.length}).`;
  }

  // 9. Postcode: required, exactly 4 digits (it may start with 0)
  if (!form.postcode) errors.postcode = 'Please enter your postcode.';
  else if (!FOUR_DIGITS.test(form.postcode)) errors.postcode = 'Postcode must be exactly 4 digits, e.g. 3122.';

  // 10. Mobile number: exactly 10 digits, starting with 04
  if (!form.mobileNumber) errors.mobileNumber = 'Please enter your mobile number.';
  else if (!MOBILE_04.test(form.mobileNumber)) {
    errors.mobileNumber = 'Mobile number must be 10 digits starting with 04, e.g. 0412345678.';
  }

  // 11. Date of birth: required, a real date, applicant at least 16 years old
  if (!form.dateOfBirth) {
    errors.dateOfBirth = dobBadInput ? 'Please enter a valid date.' : 'Please enter your date of birth.';
  } else {
    const age = ageFrom(form.dateOfBirth);
    if (age < 0) errors.dateOfBirth = "Date of birth can't be in the future.";
    else if (age < MIN_AGE) errors.dateOfBirth = `You must be at least ${MIN_AGE} years old to apply.`;
    else if (age > 120) errors.dateOfBirth = 'Please enter a valid date of birth.';
  }

  // 12. Job category: must be one of the options in the dropdown
  if (!jobCategories.includes(form.jobCategory)) errors.jobCategory = 'Please select a job category.';

  return errors;
}
