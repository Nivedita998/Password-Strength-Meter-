const strengthMeter = document.getElementById("strength-meter");
const passwordInput = document.getElementById("password-input");
const reasonsContainer = document.getElementById("reasons");

// this event  is for every time we type on password INPUT
// THE cALCULATEpASSWORDsTRENGTH   method will automatically get called.
//which is actually  inside updateStrength method
passwordInput.addEventListener("input", updateStengthMeter);

//calling this function seperately because if there is any value of passwordInput defined in html so with the
//refresh of page it is also updated.
updateStengthMeter();

//function to show update changes visible  on page
function updateStengthMeter() {
  const weaknesses = CalculatePasswordStrength(passwordInput.value);

  //calctulating strength value-- so that we can subtract all of our deduction from 100.
  let strength = 100;

  //   updating reasons div to balnk whn we refresh the page.
  reasonsContainer.innerHTML = "";

  weaknesses.forEach((weakness) => {
    if (weakness == null) return;
    strength -= weakness.deduction; //subtracting deduction from strength and then resaving that to strength value.

    //updating reasons on page
    const messageElement = document.createElement("div");
    messageElement.innerText = weakness.message;
    reasonsContainer.appendChild(messageElement);
  });

  //updatig it to strengthMeter to visible
  strengthMeter.style.setProperty("--strength", strength);
}

//function to calculate password strength----
function CalculatePasswordStrength(password) {
  const weaknesses = []; //array to store all weakness in password
  weaknesses.push(lengthWeakness(password));
  weaknesses.push(lowercaseWeakness(password));
  weaknesses.push(uppercaseWeakness(password));
  weaknesses.push(numberWeakness(password));
  weaknesses.push(specialCharactersWeakness(password));
  weaknesses.push(repeatCharactersWeakness(password));
  return weaknesses;
}

//function to calculate  all the weakness related to length --
function lengthWeakness(password) {
  const length = password.length;
  if (length <= 5) {
    // return an object which will be pushed inside and array of weakness.
    //which contains message and deduction which affects the strength meter.
    return {
      message: "Your Password is too short",
      deduction: 40,
    };
  }

  if (length <= 10) {
    return {
      message: "Your Password could be longer",
      deduction: 15,
    };
  }
}

//function to check or calculate the lower case characters and using regex to do that.
function lowercaseWeakness(password) {
  //regex for lowercase char is "/[a-z]/g" and match function is used to match it in the password or any string.

  return charaterTypeWeakness(password, /[a-z]/g, "lowercase");
}

//function to check or calculate the Upper case characters and using regex to do that.
function uppercaseWeakness(password) {
  //regex for Uppercase char is "/[A-Z]/g" and match function is used to match it in the password or any string.

  return charaterTypeWeakness(password, /[A-Z]/g, "uppercase");
}

//function to check or calculate the Number case characters and using regex to do that.
function numberWeakness(password) {
  //regex for Number is "/[0-9]/g" and match function is used to match it in the password or any string.

  return charaterTypeWeakness(password, /[0-9]/g, "numbers");
}

//function to check or calculate the special characters characters and using regex to do that.
function specialCharactersWeakness(password) {
  //regex for special Character is "/[^0-9a-zA-z\s]/g" and match function is used to match it in the password or any string.
  // this regex is checking tht no numbers no uppercase no lowercase character is allowed and '^' is used for no in regex

  return charaterTypeWeakness(
    password,
    /[^0-9a-zA-z\s]/g,
    "special characters"
  );
}

//helper function  to use in lowercase and uppercase and numbers and special chars because expect regex all code is same
function charaterTypeWeakness(password, regex, type) {
  // checking in password and returning array if it is blank '[]'
  const matches = password.match(regex) || [];
  if (matches.length === 0) {
    return {
      message: `Your password has no ${type}  characters`,
      deduction: 20,
    };
  }
  if (matches.length <= 2) {
    return {
      message: `Your password could use more ${type} characters`,
      deduction: 5,
    };
  }
}

//function to check for repeating character
function repeatCharactersWeakness(password) {
  //regex for special Character is "/(.)\1/g" and match function is used to match it in the password or any string.
  // '.' is for anything inside '()' for group if  followed by exact '1' thing which is in first group so essentially two
  //things in a row

  const matches = password.match(/(.)\1/g) || [];

  if (matches.length > 0) {
    return {
      message: "Your Password has repeat characters",
      deduction: matches.length * 10, // means the more matches you have the more pasword is weak
    };
  }
}
