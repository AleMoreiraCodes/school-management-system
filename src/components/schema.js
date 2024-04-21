const Yup = require('yup');
const { validateInputEmail, validateInputPhone, validateOnlyLetters, validatePassword } = require('../validateInputs');

const schema = Yup.object().shape({
  firstName: Yup.string().min(0).required('First name is required').test('Only letters', 'Only letters and bigger than 3 letters', value => validateOnlyLetters(value)),
  lastName: Yup.string().required('Last name is required').test('Only letters', 'Only letters and bigger than 3 letters', value => validateOnlyLetters(value)),
  phone: Yup.string().required('Phone is required').test('Phone', 'Phone is not valid', value => validateInputPhone(value)),
  email: Yup.string().email('Email is invalid').required('Email is required').test('Email', 'Accents not allowed', value => validateInputEmail(value)),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required').test('one-uppercase character special character and a number', 'Password must contain at least one uppercase letter, one special character, and one number', value => validatePassword(value)),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
});

module.exports = schema;
