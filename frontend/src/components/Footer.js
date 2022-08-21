import React from "react";

function Footer() {

const now = new Date().getFullYear();

    return(
        <footer className="footer">
            <p className="footer__copyright">© {now} Mesto Russia</p>
        </footer>
    )
}

export default Footer