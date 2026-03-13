// export function Services() {
//   return (
//     <>
//       <div className="services-container">
//         <div className="services-box1">
//           <h1> Welcome to Vikas-Taxi Services</h1>
//         </div>

//         <div className="services-box-container">
//           <div className="services-box2">
//             <h2>1. City Rides (Local Travel)</h2>
//             <h3>
//               Whether you need to go anywhere within the city. V-Taxi is at your
//               doorstep. Fast and affordable rides for office. shopping, or
//               meeting friends. Specialty: Minimum waiting time and
//               traffic-friendly routes.
//             </h3>
//           </div>
//           <img className="image1" src="public/services-image1.jpg" alt="" />
//           <img className="image2" src="public/services-image2.jpg" alt="" />
//           <div className="services-box3">
//             <h2>2. Outstation (Inter-city)</h2>
//             <h3>
//               Traveling from one city to another is now even easier. We provide
//               one-way and round-trip options at budget-friendly rates.
//               Specialty: Highway-certified drivers and comfortable long-drive
//               cars.
//             </h3>
//           </div>
//           <div className="services-box4">
//             <h2>3. Village Connectivity (Rural Service)</h2>
//             <h3>
//               Where big companies don't reach, V-Taxi goes. A safe journey from
//               village to city or city to village. Specialty: Tough SUVs that run
//               smoothly even on rough rural roads.
//             </h3>
//           </div>
//           <img className="image3" src="public/services-image3.jpg" alt="" />
//           <img className="image4" src="public/services-image4.jpg" alt="" />
//           <div className="services-box5">
//             <h2>4. Rental Packages</h2>
//             <h3>
//               Book a car on an hourly basis. Best for wedding functions,
//               business meetings, or a full day of shopping. Specialty: No more
//               hassle of booking a new taxi again and again.
//             </h3>
//           </div>
//           <div className="services-box6">
//             <h2>5. Airport/Railway Transfers</h2>
//             <h3>
//               Forget the fear of being late. Guaranteed on-time pick-up and drop
//               so that you never miss your flight or train.
//             </h3>
//           </div>
//           <img className="image5" src="public/services-image5.jpg" alt="" />
//         </div>
//       </div>
//     </>
//   );
// }


export function Services() {
  return (
    <div className="services-container">
      <div className="services-header">
        <h1>Welcome to Vikas-Taxi Services</h1>
        <p>Reliable, Fast, and Affordable Rides for Every Need</p>
      </div>

      <div className="services-box-container">
        {/* Row 1: Text Left, Image Right */}
        <div className="service-row">
          <div className="service-text-box">
            <h2>1. City Rides (Local Travel)</h2>
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

        {/* Row 2: Image Left, Text Right (Zig-Zag) */}
        <div className="service-row reverse">
          <div className="service-text-box">
            <h2>2. Outstation (Inter-city)</h2>
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

        {/* Row 3: Text Left, Image Right */}
        <div className="service-row">
          <div className="service-text-box">
            <h2>3. Village Connectivity</h2>
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

        {/* Row 4: Image Left, Text Right */}
        <div className="service-row reverse">
          <div className="service-text-box">
            <h2>4. Rental Packages</h2>
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

        {/* Row 5: Text Left, Image Right */}
        <div className="service-row">
          <div className="service-text-box">
            <h2>5. Airport/Railway Transfers</h2>
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