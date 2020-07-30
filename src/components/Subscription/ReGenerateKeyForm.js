import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import TextError from '../../utils/TextError'

const getReGenerateKeyForm = (subscriptionKey, initialValue, validationSchema, onSubmit) => {
    const options = [
        { key: 'Select an option', value: '' },
        { key: 'development', value: 'development' },
        { key: 'production', value: 'production' },
        { key: 'test', value: 'test' }
    ]
    return (
        <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={onSubmit}>
            {
                formik => {
                    return <Form>
                        <div className="form-group">
                            <label htmlFor="reason">Reason</label>
                            <Field type="text" name="reason" className="form-control" placeholder="Reason" />
                            <ErrorMessage name="reason" component={TextError} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="keyType">keyType</label>
                            <Field as='select' id="keytype" name="keytype" className="form-control"  >
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
                            <ErrorMessage name="keytype" component={TextError} />
                        </div>
                        {
                            subscriptionKey.loading ? <div className="alert alert-success alert-dismissible fade show" role="alert">
                                <span className="help-block">Subscription key re-generate successfully</span>
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div> : ""
                        }
                        {
                            subscriptionKey.error ? <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                <span className="help-block">hello</span>
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div> : ""
                        }
                        <div style={{ display: "flex", float: "right", display: "inline" }}>
                            <button type='submit' className="btn btn-secondary" disabled={!formik.isValid} style={{ marginBottom: '15px' }}>Generate</button>
                        </div>

                    </Form>
                }
            }
        </Formik>)
}
export { getReGenerateKeyForm }
