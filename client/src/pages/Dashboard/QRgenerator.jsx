import React, { useState } from "react";

// eslint-disable-next-line import/no-unresolved
import QRCode from "react-qr-code";

import { Container, Divider } from "@mui/material";

import { BoxMain } from "../../dashboard";
import { CustomInput } from "../../componenets";

function QRgenerator() {
  const [qr, setQr] = useState("lintangwisesa");
  const handleChange = (event) => {
    setQr(event.target.value);
  };

  return (
    <Container maxWidth="sm">
      <BoxMain sx={{ p: 4, my: { md: 10, xs: 3 } }} textAlign="center">
        <div>
          {/* <Typography variant="h3">QR Generator</Typography> */}
          {/* <Divider
            sx={{
              my: 3,
              background:
                "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
              height: "2px",
            }}
          /> */}

          <div style={{ background: "white", padding: "30px" }}>
            {qr ? (
              <QRCode
                id="myqr"
                value={qr}
                size={320}
                //   sincludeMargin={true}
                background="#fff"
              />
            ) : (
              <p>No QR code preview</p>
            )}
          </div>
          <Divider
            sx={{
              my: 3,
              background:
                "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
              height: "2px",
            }}
          />
          <CustomInput
            onChange={handleChange}
            //   style={{ width: 320 }}
            value={qr}
            placeholder="QRgenerator"
          />
        </div>
      </BoxMain>
    </Container>
  );
}

export default QRgenerator;
