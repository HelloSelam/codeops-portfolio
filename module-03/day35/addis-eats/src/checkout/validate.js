export function validateCheckout(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Name is required";
  }

  if (!form.telebirr.trim()) {
    errors.telebirr = "TeleBirr number is required";
  } else if (!/^09\d{8}$/.test(form.telebirr)) {
    errors.telebirr = "Enter a valid TeleBirr number";
  }

  if (!form.area.trim()) {
    errors.area = "Delivery area is required";
  }

  return errors;
}