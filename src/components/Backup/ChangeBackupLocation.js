import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from '../../utils/TextError'
import Azure from './Server/Azure'


function ChangeBackupLocation() {
    const options = [
        { key: '', value: '' },
        { key: 'azure', value: 'azure' },
    ]
    const initialValue = {
        servername: "",
    }

    const validationSchema = Yup.object({
        servername: Yup.string().required("Required!"),
    })

    const getServerForm = (serverFormName) => {
        switch (serverFormName) {
            case 'azure':
                return <Azure />
            default:
                return ""
        }
    }

    return (
        <div>
            <div className="template" style={{ color: 'black' }}>
                <div className="card">
                    <h4 className="card-header">Change Backup Location</h4>
                    <div className="card-body">
                        <Formik initialValues={initialValue} validationSchema={validationSchema}>
                            {
                                formik => {
                                    return <Form>
                                        <div className="form-group">
                                            <label htmlFor="servername">Server Name</label>
                                            <Field as='select' id="servername" name="servername" className="form-control"  >
                                                {
                                                    options.map(option => {
                                                        return (
                                                            <option key={option.key} value={option.value}>
                                                                {option.key}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </Field>
                                            {
                                                formik.values.servername ? getServerForm(formik.values.servername) : ""
                                            }
                                            <ErrorMessage name="projectname" component={TextError} />
                                        </div>
                                    </Form>
                                }
                            }
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangeBackupLocation
