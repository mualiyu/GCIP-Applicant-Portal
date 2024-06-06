import React from "react";
import "./styles/messageUser.css";

export default function FAQ() {
  return (
    <div className="message-user-container">
      <div className="container">
        <div className="accordion__wrapper">
          <h1 className="accordion__title">Frequently Asked Questions</h1>

          <div className="accordion">
            <div className="accordion__header">
              <h2 className="accordion__question">
                What is the purpose of this pen?
              </h2>
              <span className="accordion__icon">
                <i id="accordion-icon" className="ri-add-line"></i>
              </span>
            </div>
            <div className="accordion__content">
              <p className="accordion__answer">
                This pen is designed to provide web developers with boilerplate
                code for a FAQ Accordion.
              </p>
            </div>
          </div>

          <div className="accordion">
            <div className="accordion__header">
              <h2 className="accordion__question">What is an accordion?</h2>
              <span className="accordion__icon">
                <i id="accordion-icon" className="ri-add-line"></i>
              </span>
            </div>
            <div className="accordion__content">
              <p className="accordion__answer">
                An accordion is a vertically stacked list of headers that users
                can click on to reveal more information about a business. With
                an accordion, when someone visits your web page, they will see a
                list of headers.
              </p>
            </div>
          </div>

          <div className="accordion">
            <div className="accordion__header">
              <h2 className="accordion__question">
                How can I customize the accordion?
              </h2>
              <span className="accordion__icon">
                <i id="accordion-icon" className="ri-add-line"></i>
              </span>
            </div>
            <div className="accordion__content">
              <p className="accordion__answer">
                You can customize the accordion by modifying the CSS styles and
                changing the HTML structure as per your needs. You can also add
                JavaScript to enhance its functionality.
              </p>
            </div>
          </div>

          <div className="accordion">
            <div className="accordion__header">
              <h2 className="accordion__question">
                Is this accordion responsive?
              </h2>
              <span className="accordion__icon">
                <i id="accordion-icon" className="ri-add-line"></i>
              </span>
            </div>
            <div className="accordion__content">
              <p className="accordion__answer">
                Yes, this accordion is designed to be responsive and will adjust
                its layout based on the screen size to ensure a good user
                experience on both desktop and mobile devices.
              </p>
            </div>
          </div>

          <div className="accordion">
            <div className="accordion__header">
              <h2 className="accordion__question">
                Can I use this accordion in my project?
              </h2>
              <span className="accordion__icon">
                <i id="accordion-icon" className="ri-add-line"></i>
              </span>
            </div>
            <div className="accordion__content">
              <p className="accordion__answer">
                Absolutely! Feel free to use this accordion in your projects.
                You can modify and adapt it as needed to fit your requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
