import React, { useState, useEffect } from "react";

var style: any = {
  backgroundColor: "#F8F8F8",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "60px",
  width: "100%",
};

var phantom = {
  display: "block",
  padding: "20px",
  height: "60px",
  width: "100%",
};

const Footer = () => {
  const [footer, setFooter] = useState<string>("");

  useEffect(() => {
    fetch(`https://api.chucknorris.io/jokes/random`)
      .then((res) => res.json())
      .then((json) => {
        setFooter(json.value);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div style={phantom} />
      <div style={style}>{footer}</div>
    </div>
  );
};

export default Footer;
