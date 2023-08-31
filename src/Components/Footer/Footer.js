import React from "react";
import logo from "../../logo/logo3.png";

const Footer = () => {
  return (
    <div>
      <div className="bg-dark text-center text-white">
        <div className="container p-4">
          <section className="">
            <div className="row">
              <div className=" d-flex align-items-start flex-column col-lg-6 col-md-6 mb-6 mb-md-0">
                <img
                  src={logo}
                  style={{ height: "80px", width: "150px" }}
                  alt=""
                  srcSet=""
                />
              </div>

              <div className="d-flex align-items-start flex-column col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Resources</h5>

                <ul className="d-flex align-items-start flex-column list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      For Authors
                    </a>
                  </li>
                  <li>
                    <a href="/copyright" className="text-white">
                      Copyright & Permissions
                    </a>
                  </li>

                  <li>
                    <a href="explore/contactus" className="text-white">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>

              <div className=" d-flex align-items-start flex-column  col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">About Us & Help</h5>

                <ul className=" d-flex align-items-start flex-column  list-unstyled mb-0">
                  <li>
                    <a href="/about" className="text-white">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/news" className="text-white">
                      News
                    </a>
                  </li>
                  <li>
                    <a href="/help" className="text-white">
                      Help
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <div className="text-center p-3">
          <a
            className="text-white"
            href="/"
          >
                International Journal of Computer and Electronics Engineering 
          </a>
          <span className="text-danger"> © 2023 All Rights Reserved</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
