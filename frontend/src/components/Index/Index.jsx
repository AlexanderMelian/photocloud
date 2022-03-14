import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import s from "./Index.module.css";

export default function Index() {
    return (
        <div className={s.background}>
        <h1>Inicio</h1>
        <Link to="/singleupload"><h3>singleupload</h3></Link>
        <Link to="/multiupload"><h3>multiupload</h3></Link>
        <Link to="/getimages"><h3>getimages</h3></Link>
        <Link to="/deleteimage"><h3>deleteimage</h3></Link>
        </div>
    )
}