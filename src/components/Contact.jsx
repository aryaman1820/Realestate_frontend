const Contact = () =>{
    return (
        <>
        <div>
  <div className="page-heading contact-heading header-text" style={{backgroundImage: 'url(https://media.istockphoto.com/photos/got-a-problem-contact-us-picture-id1129113667?k=20&m=1129113667&s=170667a&w=0&h=TXHUBn3OW_FUpBC-flhsqPhmlYi4pTlt665483SnKhM=)'}}>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="text-content">
            <h4>Real Estate Postings</h4>
            <h2>Contact Us</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="find-us">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="section-heading">
            <h2>Our Location on Maps</h2>
          </div>
        </div>
        <div className="col-md-8">
          <div id="map">
            <img src="https://img.freepik.com/free-vector/office-background-video-conferencing_23-2148641674.jpg?w=2000" width="100%" height="330px" frameBorder={0} style={{border: 0}}/>
          </div>
        </div>
        <div className="col-md-4">
          <div className="left-content">
            <h4>About our office</h4>
            <p>Our Head office is located in the national capital of India<br>
            </br><br/>You can find us here: <br>
            </br><br></br>Z-20 Sector 12<br>
            </br>Tilaknagar,Delhi,500044,India</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="send-message">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="section-heading">
            <h2>Send us a Message</h2>
          </div>
        </div>
        <div className="col-md-8">
          <div className="contact-form">
            <form id="contact" action method="post">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <fieldset>
                    <input name="name" type="text" className="form-control" id="name" placeholder="Full Name" required />
                  </fieldset>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <fieldset>
                    <input name="email" type="text" className="form-control" id="email" placeholder="E-Mail Address" required />
                  </fieldset>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <fieldset>
                    <input name="subject" type="text" className="form-control" id="subject" placeholder="Subject" required />
                  </fieldset>
                </div>
                <div className="col-lg-12">
                  <fieldset>
                    <textarea name="message" rows={6} className="form-control" id="message" placeholder="Your Message" required defaultValue={""} />
                  </fieldset>
                </div>
                <div className="col-lg-12">
                  <fieldset>
                    <button type="submit" id="form-submit" className="filled-button">Send Message</button>
                  </fieldset>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-4">
          <h5 className="text-center" style={{marginTop: 15}}>Our Contact Information:-</h5>
          <ol>
            <li>For complaints: complaints@realestate.com </li>
            <li>For assistance: assistance@realestate.com </li>
            <li>For queries: publicrelations@realestate.com</li>
            <li>For any information regarding appointments: appointments@realestate.com </li>
            <li>Our contact Numbers:
              <ul>
                <li>Head Office: +91-8899774455 </li>
                <li>Bangalore Office: +91-8899774456 </li>
                <li>Lucknow Office: +91-8899774457</li>
                <li>Complaints Number: +91-8899774466</li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</div>

        </>
    )
}

export default Contact;