const Home=()=>{
    return(
        <>
        <div>
          <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleCaptions" data-slide-to={0} className="active" />
    <li data-target="#carouselExampleCaptions" data-slide-to={1} />
    <li data-target="#carouselExampleCaptions" data-slide-to={2} />
  </ol>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img style={{height:"600px"}} src="https://media.istockphoto.com/photos/real-estate-house-insurance-domino-chain-challenge-picture-id1341380752?b=1&k=20&m=1341380752&s=170667a&w=0&h=BTVVzn3OHkm6yY5RW7H9iqnrjmnQa5Chzk4BI-_8I8g=" className="d-block w-100" alt="Slides" />
      <div className="carousel-caption d-none d-md-block">
        <h5>Find your property today!</h5>
        <h4>Book the best Properties for you</h4>
      </div>
    </div>
    <div className="carousel-item">
      <img style={{height:"600px"}} src="https://thumbs.dreamstime.com/b/real-estate-online-mobile-phone-small-house-85486808.jpg" className="d-block w-100" alt="Slides" />
      <div className="carousel-caption d-none d-md-block">
        <h5>Find the best Builders</h5>
        <h4>A lot of properties available</h4>
      </div>
    </div>
    <div className="carousel-item">
      <img style={{height:"600px"}} src="https://www.thebalance.com/thmb/4NPsuI3VxtXXeCwQMFsKl-hulig=/1333x1000/smart/filters:no_upscale()/real-estate-what-it-is-and-how-it-works-3305882-1f1ca22206274467862367e2dc59f25b.png" className="d-block w-100" alt="Slides" />
      <div className="carousel-caption d-none d-md-block">
        <h5>Best Services</h5>
        <h4>Full Functional Feedback System</h4>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev bg-transparent border-0" type="button" data-target="#carouselExampleCaptions" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="sr-only">Previous</span>
  </button>
  <button className="carousel-control-next bg-transparent border-0" type="button" data-target="#carouselExampleCaptions" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="sr-only">Next</span>
  </button>
</div>
</div>

        </>
    )
}

export default Home;