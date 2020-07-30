import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getBackupData, getProjects } from '../../store'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from '../../utils/TextError'
import DateView from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DownloadLink from "react-download-link";
import GetAppIcon from '@material-ui/icons/GetApp';
import '../../style/date.css'

const BackupManually = ({ backupData, getBackupData, projects, getProjects }) => {

    useEffect(() => {
        getProjects()
    }, [getProjects])


    const options = [
        { key: '', value: '' },
    ]

    let projectData = projects.projects

    projectData.map(project => {
        options.push({ key: project, value: project })
    })
    console.log(options)

    const initialValue = {
        projectname: "",
        backupdate: null
    }

    const validationSchema = Yup.object({
        projectname: Yup.string().required("Required!"),
        backupdate: Yup.date().required('Required!').nullable()

    })

    const onSubmit = values => {
        getBackupData(values)
    }
    const [state, setState] = useState({ value: 'some\ntext', copied: false })
    const onCopy = () => {
        setState({ ...state, copied: true });
    };

    let tempData = JSON.stringify(backupData.backupData)
    return (
        <div>
            <div className="template" style={{ color: 'black' }}>
                <div className="card">
                    <h4 className="card-header">Back-up</h4>
                    <div className="card-body">
                        <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={onSubmit} >
                            {
                                formik => {
                                    return <Form>
                                        <div className="form-group">
                                            <label htmlFor="projectname">Project Name</label>
                                            <Field as='select' id="projectname" name="projectname" className="form-control"  >
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
                                            <ErrorMessage name="projectname" component={TextError} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="backupdate">Back-up Date</label>
                                            <Field name="backupdate" type="date">
                                                {
                                                    ({ form, field }) => {
                                                        const { setFieldValue } = form
                                                        const { value } = field
                                                        return <DateView id="backupdate" className="form-control demo" {...field}
                                                            selected={value} onChange={val => setFieldValue("backupdate", val)} />
                                                    }
                                                }
                                            </Field>
                                            <ErrorMessage name="backupdate" component={TextError} />
                                        </div>
                                        <br />
                                        <div style={{ display: "flex", float: "right", "marginTop": "-8%" }}>
                                            <button type="submit" className="btn btn-secondary" disabled={!formik.isValid} >Export</button>
                                        </div>
                                        <br />
                                        {
                                            tempData.length && backupData.loading ? <div>
                                                <div className="form-group">
                                                    <label htmlFor="backupdata">Back-up data</label>
                                                    <Field as="textarea" name="backupdata" className="form-control" value={tempData} />
                                                </div>
                                                <div style={{ display: "flex", float: "right", display: "inline" }}>
                                                    <DownloadLink
                                                        label={<GetAppIcon color="disabled" fontSize="small" />}
                                                        filename={`${formik.values.projectname}.json`}
                                                        exportFile={() => tempData}
                                                    />&nbsp;&nbsp;&nbsp;
                                                                            <CopyToClipboard onCopy={onCopy} text={tempData}>
                                                        <FileCopyIcon fontSize="smallo" color="disabled" />
                                                    </CopyToClipboard>
                                                </div>
                                                {state.copied ? <span style={{ color: '#6c757d' }}>Copied.</span> : null}
                                            </div> : ""
                                        }
                                    </Form>
                                }
                            }
                        </Formik>
                    </div>
                </div>
            </div>
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        backupData: state.backupData,
        projects: state.projects
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getBackupData: (backupParameters) => dispatch(getBackupData(backupParameters)),
        getProjects: () => dispatch(getProjects())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BackupManually)
