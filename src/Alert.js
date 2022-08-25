import React, { useEffect } from "react";

const Alert = (props) => {
    const { alertType, alertText } = props.alert;
    return <p className={`alert alert-${alertType}`}>{alertText}</p>;
};

export default Alert;
