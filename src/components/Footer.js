import React from 'react';

const Footer = () => {

    const style = {
        position: "fixed",
        left: "0",
        bottom: "0",
        width: "100%",
        height: "20px",
        backgroundColor: "#ADD8E6",
        color: "#A7937D",
        fontSize:"15px",
        textAlign: "center",
        paddingBottom: "20px",
        borderTop: "3px double black",
        borderBottom: "1px solid black",
        borderLeft: "3px double black",
        borderRight: "3px double black",
    }

    return (
        <footer style={style}>&copy; Created by Atalia Mucharsky <a href="https://github.com/AtaliaM" target="_blank" rel="noopener noreferrer" alt="github"><i className="fab fa-github"></i></a></footer>
    )


}

export default Footer;