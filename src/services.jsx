

export function Services() {
  return (
    <div className="services-container">
      <div className="services-header">
        <h1>Welcome to Vikas-Taxi Services</h1>
        <p>Reliable, Fast, and Affordable Rides for Every Need</p>
      </div>

      <div className="services-box-container">
        <div className="service-row">
          <div className="service-text-box">
            <h2>Book for Now</h2>
            <h3>
              Whether you need to go anywhere within the city, V-Taxi is at your
              doorstep. Fast and affordable rides for office, shopping, or
              meeting friends. <br />
              <strong>Specialty:</strong> Minimum waiting time and traffic-friendly routes.
            </h3>
          </div>
          <div className="service-image-box">
            <img src="/services-image1.jpg" alt="City Rides" />
          </div>
        </div>

        <div className="service-row reverse">
          <div className="service-text-box">
            <h2>Outstation (Inter-city)</h2>
            <h3>
              Traveling from one city to another is now even easier. We provide
              one-way and round-trip options at budget-friendly rates. <br />
              <strong>Specialty:</strong> Highway-certified drivers and comfortable long-drive cars.
            </h3>
          </div>
          <div className="service-image-box">
            <img src="/services-image2.jpg" alt="Outstation" />
          </div>
        </div>

    
        <div className="service-row">
          <div className="service-text-box">
            <h2>Village Connectivity</h2>
            <h3>
              Where big companies don't reach, V-Taxi goes. A safe journey from
              village to city or city to village. <br />
              <strong>Specialty:</strong> Tough SUVs that run smoothly even on rough rural roads.
            </h3>
          </div>
          <div className="service-image-box">
            <img src="/services-image3.jpg" alt="Rural Service" />
          </div>
        </div>

        <div className="service-row reverse">
          <div className="service-text-box">
            <h2>Book by Hour</h2>
            <h3>
              Book a car on an hourly basis. Best for wedding functions,
              business meetings, or a full day of shopping. <br />
              <strong>Specialty:</strong> No more hassle of booking a new taxi again and again.
            </h3>
          </div>
          <div className="service-image-box">
            <img src="/services-image4.jpg" alt="Rental" />
          </div>
        </div>

        <div className="service-row">
          <div className="service-text-box">
            <h2>Airport/Railway Transfers</h2>
            <h3>
              Forget the fear of being late. Guaranteed on-time pick-up and drop
              so that you never miss your flight or train.
            </h3>
          </div>
          <div className="service-image-box">
            <img src="/services-image5.jpg" alt="Transfers" />
          </div>
        </div>
      </div>
    </div>
  );
}