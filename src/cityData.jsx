export const cityDistances = {
  // --- UP - BIHAR CONNECTIVITY ---
  "Lucknow, UP-Patna, Bihar": 500, "Patna, Bihar-Lucknow, UP": 500,
  "Varanasi, UP-Patna, Bihar": 250, "Patna, Bihar-Varanasi, UP": 250,
  "Gorakhpur, UP-Patna, Bihar": 255, "Patna, Bihar-Gorakhpur, UP": 255,
  "Kanpur, UP-Patna, Bihar": 580, "Patna, Bihar-Kanpur, UP": 580,
  "Lucknow, UP-Gaya, Bihar": 560, "Gaya, Bihar-Lucknow, UP": 560,
  "Varanasi, UP-Gaya, Bihar": 250, "Gaya, Bihar-Varanasi, UP": 250,

  // --- UP INTERNAL ---
  "Lucknow, UP-Gorakhpur, UP": 270, "Gorakhpur, UP-Lucknow, UP": 270,
  "Lucknow, UP-Prayagraj, UP": 200, "Prayagraj, UP-Lucknow, UP": 200,
  "Varanasi, UP-Prayagraj, UP": 120, "Prayagraj, UP-Varanasi, UP": 120,
  "Lucknow, UP-Kanpur, UP": 95, "Kanpur, UP-Lucknow, UP": 95,
  "Aligarh, UP-Mathura, UP": 65, "Mathura, UP-Aligarh, UP": 65,
  "Delhi, NCR-Noida, UP": 35, "Noida, UP-Delhi, NCR": 35,
  "Agra, UP-Delhi, NCR": 230, "Delhi, NCR-Agra, UP": 230,
  "Lucknow, UP-Varanasi, UP": 310, "Varanasi, UP-Lucknow, UP": 310,
  "Lucknow, UP-Delhi, NCR": 530, "Delhi, NCR-Lucknow, UP": 530,

  // --- BIHAR INTERNAL ---
  "Patna, Bihar-Gaya, Bihar": 100, "Gaya, Bihar-Patna, Bihar": 100,
  "Patna, Bihar-Muzaffarpur, Bihar": 75, "Muzaffarpur, Bihar-Patna, Bihar": 75,
  "Patna, Bihar-Bhagalpur, Bihar": 250, "Bhagalpur, Bihar-Patna, Bihar": 250,

  // --- NATIONAL MAJOR ROUTES ---
  // North
  "Delhi, NCR-Chandigarh, Punjab": 250, "Chandigarh, Punjab-Delhi, NCR": 250,
  "Delhi, NCR-Jaipur, Rajasthan": 280, "Jaipur, Rajasthan-Delhi, NCR": 280,
  "Delhi, NCR-Dehradun, Uttarakhand": 240, "Dehradun, Uttarakhand-Delhi, NCR": 240,
  
  // West & Central
  "Mumbai, Maharashtra-Pune, Maharashtra": 150, "Pune, Maharashtra-Mumbai, Maharashtra": 150,
  "Mumbai, Maharashtra-Surat, Gujarat": 280, "Surat, Gujarat-Mumbai, Maharashtra": 280,
  "Ahmedabad, Gujarat-Mumbai, Maharashtra": 530, "Mumbai, Maharashtra-Ahmedabad, Gujarat": 530,
  "Indore, MP-Bhopal, MP": 195, "Bhopal, MP-Indore, MP": 195,
  
  // South
  "Bangalore, Karnataka-Chennai, Tamil Nadu": 350, "Chennai, Tamil Nadu-Bangalore, Karnataka": 350,
  "Bangalore, Karnataka-Hyderabad, Telangana": 570, "Hyderabad, Telangana-Bangalore, Karnataka": 570,
  "Hyderabad, Telangana-Chennai, Tamil Nadu": 630, "Chennai, Tamil Nadu-Hyderabad, Telangana": 630,
  "Kochi, Kerala-Bangalore, Karnataka": 550, "Bangalore, Karnataka-Kochi, Kerala": 550,
  
  // East
  "Kolkata, WB-Bhubaneswar, Odisha": 440, "Bhubaneswar, Odisha-Kolkata, WB": 440,
  "Kolkata, WB-Patna, Bihar": 580, "Patna, Bihar-Kolkata, WB": 580,
  "Ranchi, Jharkhand-Patna, Bihar": 330, "Patna, Bihar-Ranchi, Jharkhand": 330,
};

export const citiesList = [
  // UP & Bihar
  "Lucknow, UP", "Kanpur, UP", "Varanasi, UP", "Agra, UP", "Noida, UP", 
  "Mathura, UP", "Aligarh, UP", "Gorakhpur, UP", "Prayagraj, UP",
  "Patna, Bihar", "Gaya, Bihar", "Muzaffarpur, Bihar", "Bhagalpur, Bihar",
  
  // Metro & Major Cities
  "Delhi, NCR", "Mumbai, Maharashtra", "Bangalore, Karnataka", "Hyderabad, Telangana",
  "Ahmedabad, Gujarat", "Chennai, Tamil Nadu", "Kolkata, West Bengal", "Surat, Gujarat",
  "Pune, Maharashtra", "Jaipur, Rajasthan", "Indore, MP", "Bhopal, MP",
  "Chandigarh, Punjab", "Dehradun, Uttarakhand", "Ranchi, Jharkhand", 
  "Bhubaneswar, Odisha", "Kochi, Kerala", "Guwahati, Assam"
];