import React from 'react'
import {GiClapperboard} from "react-icons/gi";
import {BiCameraMovie} from "react-icons/bi"; 
import {MdMovieFilter} from "react-icons/md"; 
import {SiThemoviedatabase} from "react-icons/si"; 
export default function Header() {
    return (
        <section className="header-section">
            <div className="container-h-padding header">
                <SiThemoviedatabase className="logo" />
                <span>Find popular movies...</span>
            </div>
        </section>
    )
}
