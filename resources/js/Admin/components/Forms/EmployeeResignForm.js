import React, { useState } from 'react'
import { Formik, Field, Form } from 'formik'
import SubmitResignModal from '../Modals/SubmitResignModal';

import * as Yup from 'yup';

const ResignSchema = Yup.object().shape({
    employeeID: Yup.string()
        .required('Required'),
    password: Yup.string()
        .required('Required'),
    reason: Yup.string()
        .min(5, 'Too Short!')
        .required('Required'),
    effectiveDate: Yup.date('Invalid Date').required('Required'),
    resignLetter: Yup.mixed().required('Required').test(
        "fileSize",
        "Your video is too big :(",
        value => value && value.size <= 262144000
    ),
});

const EmployeeResignForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [submitted, setSubmitted] = useState('loading');

    return (
        <>
            <h2 className="text-2xl font-bold">Resignation Form</h2>
            <hr className="mb-3" />
            <Formik
                initialValues={{
                    // employeeName: '',
                    employeeID: '',
                    password: '',
                    reason: '',
                    resignLetter: '',
                    effectiveDate: '',
                }}
                validationSchema={ResignSchema}
                onSubmit={async (values, { resetForm }) => {
                    setIsOpen(true);
                    // console.log(values);
                    const formData = new FormData();
                    // await new Promise((r) => setTimeout(r, 500));
                    // alert(JSON.stringify(values, null, 2));
                    formData.append('employeeNameIn', values.employeeName);
                    formData.append('employeeIDIn', values.employeeID);
                    formData.append('password', values.password);
                    formData.append('reason', values.reason);
                    formData.append('effective_date', values.effectiveDate);
                    formData.append('process_type', 1);
                    formData.append("resign_letter", values.resignLetter);
                    console.log(formData);
                    // // Post the form, just make sure to set the 'Content-Type' header
                    const res = await axios.post('/api/resignform', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(response => {
                        console.log(response)
                        return response
                    }).catch(error => {
                        // console.log(error.response)
                        // setSubmitted(true)
                        return error.response
                    });
                    if (res.status == '200') {
                        setSubmitted(true)
                    } else {
                        setSubmitted(false)
                    }


                    console.log(res.data);
                }}
            >
                {({ formProps, errors, touched, setFieldValue }) => (
                    <Form autocomplete="off">
                        {/* <label htmlFor="employeeName">Employee Name</label>
            <Field id="employeeName" name="employeeName" placeholder="Employee Name" /> */}

                        <label htmlFor="employeeID">Employee ID</label>
                        <Field id="employeeID" name="employeeID" placeholder="Employee ID" />
                        {errors.employeeID && touched.employeeID ? (
                            <div className="-mt-4 mb-4 text-red-600 text-sm">{errors.employeeID}</div>
                        ) : null}

                        <label htmlFor="password">Employee Password</label>
                        <Field id="password" name="password" type="password" placeholder="Employee Password" />
                        {errors.password && touched.password ? (
                            <div className="-mt-4 mb-4 text-red-600 text-sm">{errors.password}</div>
                        ) : null}

                        <label htmlFor="reason">Resign Reason</label>
                        <Field id="reason" type="textarea" name="reason" placeholder="Resign Reason" />
                        {errors.reason && touched.reason ? (
                            <div className="-mt-4 mb-4 text-red-600 text-sm">{errors.reason}</div>
                        ) : null}

                        <label htmlFor="effectiveDate">Effective Date</label>
                        <Field type="date" id="effectiveDate" name="effectiveDate" />
                        {errors.effectiveDate && touched.effectiveDate ? (
                            <div className="-mt-4 mb-4 text-red-600 text-sm">{errors.effectiveDate}</div>
                        ) : null}

                        <label htmlFor="resignLetter">Resign Letter</label>
                        <input id="resignLetter" name="resignLetter" type="file" placeholder="Resign Letter"
                            onChange={(event) => {
                                setFieldValue("resignLetter", event.target.files[0]);
                            }}
                        />
                        {errors.resignLetter && touched.resignLetter ? (
                            <div className="-mt-4 mb-4 text-red-600 text-sm">{errors.resignLetter}</div>
                        ) : null}
                        <button type="submit" className="bg-primary text-white">Submit</button>
                    </Form>


                )}
            </Formik>
            {/* <button onClick={openModal}>Open Modal</button> */}
            <SubmitResignModal
                openModal={isOpen}
                submitted={submitted}
                stateChanger={setIsOpen}
            />
        </>
    )
}

export default EmployeeResignForm
