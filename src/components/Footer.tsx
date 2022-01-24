import React, { useState, useEffect } from "react";
import '../assets/scss/footerStyle.scss'

const Footer = () => {
  const [footer, setFooter] = useState<string>("");

  useEffect(() => {
    fetch(`https://type.fit/api/quotes`)
      .then((res) => res.json())
      .then((json) => {
        const rndInt: number = Math.floor(Math.random() * 50) + 1
        setFooter(json[rndInt].text);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div className="styler">{footer}</div>
    </div>
  );
};

export default Footer;
