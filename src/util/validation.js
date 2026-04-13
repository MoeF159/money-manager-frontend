// Validates a full name (first + optional middle/last names)
// Rules:
// - Only letters allowed (A–Z, a–z)
// - Words are separated by single spaces
// - No numbers or special characters
export const validateFullName = (name) => {
  if(name.trim()){
    const regex = /^[A-Za-z]+(\s[A-Za-z]+)*$/;
    return regex.test(name.trim());
  }else{
    return false;
  }

};


// Validates an email address format
// Rules:
// - Must contain username + @ + domain + extension
// - Allows common email characters in username
export const validateEmail = (email) => {
  if(email.trim()){
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email.trim());
  }else{
    return false;
  }
};