import React, { useState, useEffect } from 'react'

const getProgressBar = (value) => {
    let temp;
    if (value <= 30 && value > 0) {
        temp = <div className="progress-bar bg-success" role="progressbar" style={{ width: "45%" }} aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">{value}%</div>
    } if (value > 30 && value <= 70) {
        temp = <div className="progress-bar bg-warning" role="progressbar" style={{ width: "70%" }} aria-valuenow="70" aria-valuemin="45" aria-valuemax="100">{value}%</div>
    } if (value > 70) {
        temp = <div className="progress-bar bg-danger" role="progressbar" style={{ width: "100%" }} aria-valuenow="100" aria-valuemin="70" aria-valuemax="100">{value}%</div>
    } if (value < 0) {
        temp = <div className="progress-bar bg-danger" role="progressbar" style={{ width: "100%" }} aria-valuenow="100" aria-valuemin="70" aria-valuemax="100">expired  </div>
    }
    return <div className="progress">{temp} </div>
}
export default getProgressBar