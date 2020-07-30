import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from '../../../utils/TextError'

function Azure() {

    const initialValue = {
        ipaddress: "",
    }

    const validationSchema = Yup.object({
        ipaddress: Yup.string().required("Required!")
    })

    const onSubmit = values => {
        console.log(values)
    }
    return (
        <div>
            <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={onSubmit} >
                {
                    formik => {
                        return <Form>
                            <div className="form-group">
                                <label htmlFor="ipaddress">IP Address</label>
                                <Field name="ipaddress" type="text" className="form-control" />
                                <ErrorMessage name="ipaddress" component={TextError} />
                            </div>
                            <br />
                            <div style={{ display: "flex", float: "right", "marginTop": "-8%" }}>
                                <button type="submit" className="btn btn-secondary" disabled={!formik.isValid} >Change Server</button>
                            </div>
                        </Form>
                    }
                }
            </Formik>
        </div>
    )
}

export default Azure
