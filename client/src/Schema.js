import * as yup from "yup";


const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
// min 5 char, 1 uppercase, 1 lowercase, 1number, 1 symbol
const pincodeErrorMessage = "Pincode must be a 6 digit number";

export const readerRegSchema  = yup.object().shape({
        firstname: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
        lastname:yup.string().min(1,"Enter minimum 1 characters").required("Required"),
        email:yup.string().email("Please enter a valid email").required("Required"),
        password:  yup.string().min(5).max(16).matches(passwordRule, "1 uppercase, 1 number, 1 symbol").required("Required"),
        confirmpassword: yup.string().oneOf([yup.ref("password"), null], "Password mismatch").required("Required"),
        dob: yup.date().required("Required"),
        gender:  yup.string().required("Required"),
        street: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
        city: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
        state: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
        pincode:  yup.number().min(111111,pincodeErrorMessage).max(999999,"Pincode must be a 6 digit number").positive().integer().required("Required"),
        mobile:  yup.number().min(1000000000,"Contact must be a 10 digit number").max(9999999999,"Contact must be a 10 digit number").positive().integer().required("Required"),
        district: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
        nationality: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
        image: yup.object().required("Required"),     
})

export const clubRegSchema  = yup.object().shape({
        clubname: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
        email:yup.string().email("Please enter a valid email").required("Required"),
        password:  yup.string().min(5).max(16).matches(passwordRule, "1 uppercase, 1 number, 1 symbol").required("Required"),
        confirmpassword: yup.string().oneOf([yup.ref("password"), null], "Password mismatch").required("Required"),
        street: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
        city: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
        state: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
        pincode:  yup.number().min(111111,pincodeErrorMessage).max(999999,"Pincode must be a 6 digit number").positive().integer().required("Required"),
        contact:  yup.number().min(1000000000,"Contact must be a 10 digit number").max(9999999999,"Contact must be a 10 digit number").positive().integer().required("Required"),
        regno:  yup.number().positive().integer().required("Required"),
        district: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
        image: yup.object().required("Required"),     
})

