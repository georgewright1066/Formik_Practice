import React from 'react';
import { Formik } from 'formik';
import { useFormik } from 'formik';

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (values.lastName.length > 20) {
    errors.lastName = 'Must be 20 characters or less';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};
 
 const SignupForm = () => {
   // Pass the useFormik() hook initial form values and a submit function that will
   // be called when the form is submitted
   const formik = useFormik({
     initialValues: {
       firstName: '',
       lastName: '',
       email: '',
     },
     validate,
     onSubmit: values => {
       alert(JSON.stringify(values, null, 2));
     },
   });
   return (
     <form onSubmit={formik.handleSubmit}>
       <label htmlFor="firstName">First Name</label>
       <input
         id="firstName"
         name="firstName"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.firstName}
       />
       {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}

       {/* HandleChange works like a useState method which sets the value of values. 
       It then updates the values object with a new entry using the name of the 
       input as the key and the e.target.value as the value. and so can be accessed via formik.values.name */}
       <label htmlFor="lastName">Last Name</label>
       <input
       id="lastName"
       name="lastName"
       type="text"
         onChange={formik.handleChange}
         value={formik.values.lastName}
       />
       {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
       <label htmlFor="email">Email Address</label>
       <input
         id="email"
         name="email"
         type="email"
         onChange={formik.handleChange}
         value={formik.values.email}
       />
       {formik.errors.email ? <div>{formik.errors.email}</div> : null}


       <button type="submit">Submit</button>
     </form>
   );
 };

export default SignupForm;

{/*
  
Notes on Formik
A functional component called SignUpForm immediately activates a function which stores the result in a variable called formic. The formic uses the import useFormic which takes an object as an argument. This object contains 3 keys: initialValues, validate, and onSubmit.
Outside of formic, the original component SignupForm is returning a form which onsubmit uses formik’s handleSubmit method which calls the formic onSubmit key and calls the value whatever that is. 
The inpus use the formic handle change which isn’t defined in the formik method. What it does is essentially update a hidden object which has the name of the input of the key and updates its value with the input’s new value. This hidden object can be accessed via formic.values.input_name. This is what the input element also has as its value.

Validating
Underneath each form is a reference to another hidden object called errors with the name of each input as the key. It uses a ternary operator. If it is null it returns null. If it has a value, it returns the value of the key inside a div. Presumably there is no problem, even if the error value is a list for example. I don’t know how a list appears when in a div.
The validate key, despite having no value, calls a function outside of the original SignupForm component. This validate function returns an object which keys are identical to the name of the input’s. I will assume tht there is syntax whereby this form is called as it is identical with the key. The object is also called. Because it is inside the formic method it takes the values object as its argument. 
A new object is defined called errors. It then iterates through each value in the values to check that they exist, or are greater than a certain number etc. Only one error is logged to each key. This solves the problem of how to render a list. It uses regex aswell in some. If any values do not meet the criteria, the corresponsing key in the errors object is added the value such as “must be 15 chaacters” etc. Finally this object is returned.
Each error is checked either whilst the field is being changed or after the submit. If there is an error I don’t see why the form still couldn’t submit just fine. It only executes the on submit if the validation function returned {}. Nothing.
 */}