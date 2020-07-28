import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Header from './Header'
import '../style/dashboard.css'
import drawerCss from '../style/drawer'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import classNames from "classnames";
import { getBackupData } from '../store'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'
import DateView from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DownloadLink from "react-download-link";
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles((theme) => (drawerCss(theme)))

const Backup = ({ backupData, getBackupData }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [time, setTime] = useState(Date.now());
    let drawer = JSON.parse(localStorage.getItem("open"))
    let loginStatus = localStorage.getItem("isAuth")

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, [])




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

    let tempData = "Rahul"
    const [state, setState] = useState({ value: 'some\ntext', copied: false })
    const onCopy = () => {
        setState({ ...state, copied: true });
    };

    if (loginStatus === "false") {
        return <Redirect to='/' />
    }
    return (
        <div>
            <section id="cover" className="min-vh-100" style={{ marginTop: '1%' }} >
                <Header />
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: drawer.open ? false : true,
                    })}>
                    <div id="cover-caption">
                        <div className="container-fluid">
                            <div className="row text-white">
                                <div className="col-xl-5 col-lg-8 col-md-8 col-sm-12 col-xs-12 col mx-auto form-4">
                                    <div className="template" style={{ color: 'black' }}>
                                        <div className="card">
                                            <h4 className="card-header">Backup</h4>
                                            <div className="card-body">
                                                <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={onSubmit} >
                                                    {
                                                        formik => {
                                                            return <Form>
                                                                <div className="form-group">
                                                                    <label htmlFor="projectname">Project Name</label>
                                                                    <Field type="text" name="projectname" className="form-control" />
                                                                    <ErrorMessage name="projectname" component={TextError} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="backupdate">Back-up Date</label><br />
                                                                    <Field name="backupdate" className="form-control">
                                                                        {
                                                                            ({ form, field }) => {
                                                                                const { setFieldValue } = form
                                                                                const { value } = field
                                                                                return <DateView className="form-control" style={{ width: "150%" }} id="backupdate" {...field}
                                                                                    selected={value} onChange={val => setFieldValue("backupdate", val)} />
                                                                            }
                                                                        }
                                                                    </Field>
                                                                    <ErrorMessage name="backupdate" component={TextError} />
                                                                </div>
                                                                <div style={{ display: "flex", float: "right", "marginTop": "-8%" }}>
                                                                    <button type="submit" className="btn btn-success" disabled={!formik.isValid} >Export</button>
                                                                </div>
                                                                <br />
                                                                <div>
                                                                    <div className="form-group">
                                                                        <label htmlFor="backupdata">Back-up data</label>
                                                                        <Field as="textarea" name="backupdata" className="form-control" value={tempData} />
                                                                    </div>
                                                                    <div style={{ display: "flex", float: "right" }}>
                                                                        <DownloadLink
                                                                            label={<GetAppIcon color="disabled" fontSize="large" />}
                                                                            filename={`${formik.values.projectname}.json`}
                                                                            exportFile={() => tempData}
                                                                        />
                                                                        <CopyToClipboard onCopy={onCopy} text={tempData}>
                                                                            <button ><FileCopyIcon fontSize="large" color="disabled" /></button>
                                                                        </CopyToClipboard>    
                                                                    </div>
                                                                    {state.copied ? <span style={{ color: 'green' }}>Copied.</span> : null}
                                                                </div>
                                                            </Form>
                                                        }
                                                    }
                                                </Formik>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                </main>
            </section>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        backupData: state.backupData
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getBackupData: (backupParameters) => dispatch(getBackupData(backupParameters))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Backup)
