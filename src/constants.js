/**
 * @name- constants.js
 * 
 * @chill- We have to practice letting go of our ideas in order to see life everywhere,,, you are not enlcosed in your small shell of your body or the small shell of your lifespan- Thich Nhat Hanh
 * 
 * 
 * @description- Fixtures constant stuff used in app
 * 
 * @author- heartit pirates were here
 */
"use strict";

export const Report = [
  {
    name: "Inappropriate post",
    id: 0
  },
  {
    name: "Irrelevant post",
    id: 1
  },
  {
    name: "Spam",
    id: 2
  }
];

export const UserMenu = [
  { name: "See T&C", id: 0 },
  { name: "Change Password", id: 1 },
  { name: "Edit Profile", id: 2 },
  { name: "Log out", id: 3 }
];

export const Categories = [
  { name: "Cameras & accessories", id: 0 },
  { name: "Fashion & Accessories", id: 1 },
  { name: "Home & furniture", id: 2 },
  { name: "Appliances & tools", id: 3 },
  { name: "Games & Sports", id: 4 },
  { name: "Books & Stationary", id: 5 },
  { name: "Music & Instruments", id: 6 },
  { name: "Medical", id: 7 },
  { name: "Lifesstyle & Leisure", id: 8 },
  { name: "Others", id: 9 }
];

export const Locations = [
  { city: "Mumbai", state: "Maharashtra", id: 0 },
  { city: "New Delhi", state: "Delhi", id: 1 },
  { city: "Bengaluru", state: "Karnataka", id: 2 },
  { city: "Hyderabad", state: "Telangana", id: 3 },
  { city: "Ahmedabad", state: "Gujarat", id: 4 },
  { city: "Chennai", state: "Tamil Nadu", id: 5 },
  { city: "Kolkata", state: "West Bengal", id: 6 },
  { city: "Surat", state: "Gujarat", id: 7 },
  { city: "Pune", state: "Maharashtra", id: 8 },
  { city: "Jaipur", state: "Rajasthan", id: 9 },
  { city: "Lucknow", state: "Uttar Pradesh", id: 10 },
  { city: "Kanpur", state: "Uttar Pradesh", id: 11 },
  { city: "Nagpur", state: "Maharashtra", id: 12 },
  { city: "Indore", state: "Madhya Pradesh", id: 13 },
  { city: "Thane", state: "Maharashtra", id: 14 },
  { city: "Bhopal", state: "Madhya Pradesh", id: 15 },
  { city: "Visakhapatnam", state: "Andhra Pradesh", id: 16 },
  { city: "Pimpri Chinchwad", state: "Maharashtra", id: 17 },
  { city: "Patna", state: "Bihar", id: 18 },
  { city: "Vadodara", state: "Gujarat", id: 19 },
  { city: "Ghaziabad", state: "Uttar Pradesh", id: 20 },
  { city: "Ludhiana", state: "Punjab", id: 21 },
  { city: "Agra", state: "Uttar Pradesh", id: 22 },
  { city: "Nashik", state: "Maharashtra", id: 23 },
  { city: "Faridabad", state: "Haryana", id: 24 },
  { city: "Meerut", state: "Uttar Pradesh", id: 25 },
  { city: "Rajkot", state: "Gujarat", id: 26 },
  { city: "Kalyan and Dombivali", state: "Maharashtra", id: 27 },
  { city: "Vasai Virar", state: "Maharashtra", id: 28 },
  { city: "Varanasi", state: "Uttar Pradesh", id: 29 },
  { city: "Srinagar", state: "Jammu and Kashmir", id: 30 },
  { city: "Aurangabad", state: "Maharashtra", id: 31 },
  { city: "Dhanbad", state: "Jharkhand", id: 32 },
  { city: "Amritsar", state: "Punjab", id: 33 },
  { city: "Navi Mumbai", state: "Maharashtra", id: 34 },
  { city: "Allahabad", state: "Uttar Pradesh", id: 35 },
  { city: "Haora", state: "West Bengal", id: 36 },
  { city: "Ranchi", state: "Jharkhand", id: 37 },
  { city: "Gwalior", state: "Madhya Pradesh", id: 38 },
  { city: "Jabalpur", state: "Madhya Pradesh", id: 39 },
  { city: "Coimbatore", state: "Tamil Nadu", id: 40 },
  { city: "Vijayawada", state: "Andhra Pradesh", id: 41 },
  { city: "Jodhpur", state: "Rajasthan", id: 42 },
  { city: "Madurai", state: "Tamil Nadu", id: 43 },
  { city: "Raipur", state: "Chhattisgarh", id: 44 },
  { city: "Kota", state: "Rajasthan", id: 45 },
  { city: "Chandigarh", state: "Chandigarh", id: 46 },
  { city: "Guwahati", state: "Assam", id: 47 },
  { city: "Solapur", state: "Maharashtra", id: 48 },
  { city: "Hubli and Dharwad", state: "Karnataka", id: 49 },
  { city: "Bareilly", state: "Uttar Pradesh", id: 50 },
  { city: "Mysore", state: "Karnataka", id: 51 },
  { city: "Moradabad", state: "Uttar Pradesh", id: 52 },
  { city: "Gurugram", state: "Haryana", id: 53 },
  { city: "Aligarh", state: "Uttar Pradesh", id: 54 },
  { city: "Jalandhar", state: "Punjab", id: 55 },
  { city: "Tiruchirappalli", state: "Tamil Nadu", id: 56 },
  { city: "Bhubaneswar", state: "Orissa", id: 57 },
  { city: "Salem", state: "Tamil Nadu", id: 58 },
  { city: "Mira and Bhayander", state: "Maharashtra", id: 59 },
  { city: "Thiruvananthapuram", state: "Kerala", id: 60 },
  { city: "Bhiwandi", state: "Maharashtra", id: 61 },
  { city: "Saharanpur", state: "Uttar Pradesh", id: 62 },
  { city: "Gorakhpur", state: "Uttar Pradesh", id: 63 },
  { city: "Guntur", state: "Andhra Pradesh", id: 64 },
  { city: "Amravati", state: "Maharashtra", id: 65 },
  { city: "Bikaner", state: "Rajasthan", id: 66 },
  { city: "Noida", state: "Uttar Pradesh", id: 67 },
  { city: "Jamshedpur", state: "Jharkhand", id: 68 },
  { city: "Bhilai Nagar", state: "Chhattisgarh", id: 69 },
  { city: "Warangal", state: "Andhra Pradesh", id: 70 },
  { city: "Cuttack", state: "Orissa", id: 71 },
  { city: "Firozabad", state: "Uttar Pradesh", id: 72 },
  { city: "Kochi", state: "Kerala", id: 73 },
  { city: "Bhavnagar", state: "Gujarat", id: 74 },
  { city: "Dehradun", state: "Uttarakhand", id: 75 },
  { city: "Durgapur", state: "West Bengal", id: 76 },
  { city: "Asansol", state: "West Bengal", id: 77 },
  { city: "Nanded Waghala", state: "Maharashtra", id: 78 },
  { city: "Kolapur", state: "Maharashtra", id: 79 },
  { city: "Ajmer", state: "Rajasthan", id: 80 },
  { city: "Gulbarga", state: "Karnataka", id: 81 },
  { city: "Loni", state: "Uttar Pradesh", id: 82 },
  { city: "Ujjain", state: "Madhya Pradesh", id: 83 },
  { city: "Siliguri", state: "West Bengal", id: 84 },
  { city: "Ulhasnagar", state: "Maharashtra", id: 85 },
  { city: "Jhansi", state: "Uttar Pradesh", id: 86 },
  { city: "Sangli Miraj Kupwad", state: "Maharashtra", id: 87 },
  { city: "Jammu", state: "Jammu and Kashmir", id: 88 },
  { city: "Nellore", state: "Andhra Pradesh", id: 89 },
  { city: "Mangalore", state: "Karnataka", id: 90 },
  { city: "Belgaum", state: "Karnataka", id: 91 },
  { city: "Jamnagar", state: "Gujarat", id: 92 },
  { city: "Tirunelveli", state: "Tamil Nadu", id: 93 },
  { city: "Malegaon", state: "Maharashtra", id: 94 },
  { city: "Gaya", state: "Bihar", id: 95 },
  { city: "Ambattur", state: "Tamil Nadu", id: 96 },
  { city: "Jalgaon", state: "Maharashtra", id: 97 },
  { city: "Udaipur", state: "Rajasthan", id: 98 },
  { city: "Maheshtala", state: "West Bengal", id: 99 },
  { city: "Tiruppur", state: "Tamil Nadu", id: 100 },
  { city: "Davanagere", state: "Karnataka", id: 101 },
  { city: "Kozhikode", state: "Kerala", id: 102 },
  { city: "Kurnool", state: "Andhra Pradesh", id: 103 },
  { city: "Akola", state: "Maharashtra", id: 104 },
  { city: "Rajpur Sonarpur", state: "West Bengal", id: 105 },
  { city: "Bokaro Steel", state: "Jharkhand", id: 106 },
  { city: "Bellary", state: "Karnataka", id: 107 },
  { city: "Patiala", state: "Punjab", id: 108 },
  { city: "South Dum Dum", state: "West Bengal", id: 109 },
  { city: "Rajarhat Gopalpur", state: "West Bengal", id: 110 },
  { city: "Bhagalpur", state: "Bihar", id: 111 },
  { city: "Agartala", state: "Tripura", id: 112 },
  { city: "Muzaffarnagar", state: "Uttar Pradesh", id: 113 },
  { city: "Bhatpara", state: "West Bengal", id: 114 },
  { city: "Latur", state: "Maharashtra", id: 115 },
  { city: "Panihati", state: "West Bengal", id: 116 },
  { city: "Dhule", state: "Maharashtra", id: 117 },
  { city: "Rohtak", state: "Haryana", id: 118 },
  { city: "Korba", state: "Chhattisgarh", id: 119 },
  { city: "Bhilwara", state: "Rajasthan", id: 120 },
  { city: "Brahmapur Town", state: "Orissa", id: 121 },
  { city: "Muzaffarpur", state: "Bihar", id: 122 },
  { city: "Ahmadnagar", state: "Maharashtra", id: 123 },
  { city: "Mathura", state: "Uttar Pradesh", id: 124 },
  { city: "Kollam", state: "Kerala", id: 125 },
  { city: "Avadi", state: "Tamil Nadu", id: 126 },
  { city: "Kadapa", state: "Andhra Pradesh", id: 127 },
  { city: "Rajahmundry", state: "Andhra Pradesh", id: 128 },
  { city: "Bilaspur", state: "Chhattisgarh", id: 129 },
  { city: "Kamarhati", state: "West Bengal", id: 130 },
  { city: "Shahjahanpur", state: "Uttar Pradesh", id: 131 },
  { city: "Bijapur", state: "Karnataka", id: 132 },
  { city: "Rampur", state: "Uttar Pradesh", id: 133 },
  { city: "Shimoga", state: "Karnataka", id: 134 },
  { city: "Chandrapur", state: "Maharashtra", id: 135 },
  { city: "Junagadh", state: "Gujarat", id: 136 },
  { city: "Thrissur", state: "Kerala", id: 137 },
  { city: "Alwar", state: "Rajasthan", id: 138 },
  { city: "Barddhaman", state: "West Bengal", id: 139 },
  { city: "Kulti", state: "West Bengal", id: 140 },
  { city: "Kakinada", state: "Andhra Pradesh", id: 141 },
  { city: "Nizamabad", state: "Andhra Pradesh", id: 142 },
  { city: "Parbhani", state: "Maharashtra", id: 143 },
  { city: "Tumkur", state: "Karnataka", id: 144 },
  { city: "Hisar", state: "Haryana", id: 145 },
  { city: "Ozhukarai", state: "Puducherry", id: 146 },
  { city: "Biharsharif", state: "Bihar", id: 147 },
  { city: "Darbhanga", state: "Bihar", id: 148 },
  { city: "Panipat", state: "Haryana", id: 149 },
  { city: "Aizawl", state: "Mizoram", id: 150 },
  { city: "Bally", state: "West Bengal", id: 151 },
  { city: "Dewas", state: "Madhya Pradesh", id: 152 },
  { city: "Tirupati", state: "Andhra Pradesh", id: 153 },
  { city: "Ichalkaranji", state: "Maharashtra", id: 154 },
  { city: "Karnal", state: "Haryana", id: 155 },
  { city: "Bathinda", state: "Punjab", id: 156 },
  { city: "Jalna", state: "Maharashtra", id: 157 },
  { city: "Kirari Suleman Nagar", state: "Delhi", id: 158 },
  { city: "Purnia", state: "Bihar", id: 159 },
  { city: "Satna", state: "Madhya Pradesh", id: 160 },
  { city: "Maunath Bhanjan", state: "Uttar Pradesh", id: 161 },
  { city: "Barasat", state: "West Bengal", id: 162 },
  { city: "Sonipat", state: "Haryana", id: 163 },
  { city: "Farrukhabad and Fatehgarh", state: "Uttar Pradesh", id: 164 },
  { city: "Sagar", state: "Madhya Pradesh", id: 165 },
  { city: "Raurkela", state: "Orissa", id: 166 },
  { city: "Durg", state: "Chhattisgarh", id: 167 },
  { city: "Imphal", state: "Manipur", id: 168 },
  { city: "Ratlam", state: "Madhya Pradesh", id: 169 },
  { city: "Hapur", state: "Uttar Pradesh", id: 170 },
  { city: "Arrah", state: "Bihar", id: 171 },
  { city: "Karimnagar", state: "Andhra Pradesh", id: 172 },
  { city: "Anantapur", state: "Andhra Pradesh", id: 173 },
  { city: "NDMC", state: "Delhi", id: 174 },
  { city: "Etawah", state: "Uttar Pradesh", id: 175 },
  { city: "Ambernath", state: "Maharashtra", id: 176 },
  { city: "Bharatpur", state: "Rajasthan", id: 177 },
  { city: "Begusarai", state: "Bihar", id: 178 },
  { city: "Tiruvottiyur", state: "Tamil Nadu", id: 179 },
  { city: "North Dum Dum", state: "West Bengal", id: 180 },
  { city: "Gandhidham", state: "Gujarat", id: 181 },
  { city: "Baranagar", state: "West Bengal", id: 182 },
  { city: "Puducherry", state: "Puducherry", id: 183 },
  { city: "Thoothukkudi", state: "Tamil Nadu", id: 184 },
  { city: "Sikar", state: "Rajasthan", id: 185 },
  { city: "Rewa", state: "Madhya Pradesh", id: 186 },
  { city: "Mirzapur and Vindhyachal", state: "Uttar Pradesh", id: 187 },
  { city: "Raichur", state: "Karnataka", id: 188 },
  { city: "Pali", state: "Rajasthan", id: 189 },
  { city: "Ramagundam", state: "Andhra Pradesh", id: 190 },
  { city: "Hardwar", state: "Uttarakhand", id: 191 },
  { city: "Vizianagaram", state: "Andhra Pradesh", id: 192 },
  { city: "Katihar", state: "Bihar", id: 193 },
  { city: "Nagercoil", state: "Tamil Nadu", id: 194 },
  { city: "Ganganagar", state: "Rajasthan", id: 195 },
  { city: "Karawal Nagar", state: "Delhi", id: 196 },
  { city: "Mango", state: "Jharkhand", id: 197 },
  { city: "Thanjavur", state: "Tamil Nadu", id: 198 },
  { city: "Bulandshahr", state: "Uttar Pradesh", id: 199 },
  { city: "Uluberia", state: "West Bengal", id: 200 },
  { city: "Murwara", state: "Madhya Pradesh", id: 201 },
  { city: "Sambhal", state: "Uttar Pradesh", id: 202 },
  { city: "Singrauli", state: "Madhya Pradesh", id: 203 },
  { city: "Nadiad", state: "Gujarat", id: 204 },
  { city: "Secunderabad", state: "Andhra Pradesh", id: 205 },
  { city: "Naihati", state: "West Bengal", id: 206 },
  { city: "Yamunanagar", state: "Haryana", id: 207 },
  { city: "Bidhan Nagar", state: "West Bengal", id: 208 },
  { city: "Pallavaram", state: "Tamil Nadu", id: 209 },
  { city: "Bidar", state: "Karnataka", id: 210 },
  { city: "Munger", state: "Bihar", id: 211 },
  { city: "Panchkula", state: "Haryana", id: 212 },
  { city: "Burhanpur", state: "Madhya Pradesh", id: 213 },
  { city: "Raurkela Industrial Township", state: "Orissa", id: 214 },
  { city: "Kharagpur", state: "West Bengal", id: 215 },
  { city: "Dindigul", state: "Tamil Nadu", id: 216 },
  { city: "Hospet", state: "Karnataka", id: 217 },
  { city: "Gandhinagar", state: "Gujarat", id: 218 },
  { city: "Nangloi Jat", state: "Delhi", id: 219 },
  { city: "English Bazar", state: "West Bengal", id: 220 },
  { city: "Ongole", state: "Andhra Pradesh", id: 221 },
  { city: "Eluru", state: "Andhra Pradesh", id: 222 },
  { city: "Deoghar", state: "Jharkhand", id: 223 },
  { city: "Chapra", state: "Bihar", id: 224 },
  { city: "Haldia", state: "West Bengal", id: 225 },
  { city: "Khandwa", state: "Madhya Pradesh", id: 226 },
  { city: "Puri Town", state: "Orissa", id: 227 },
  { city: "Nandyal", state: "Andhra Pradesh", id: 228 },
  { city: "Morena", state: "Madhya Pradesh", id: 229 },
  { city: "Amroha", state: "Uttar Pradesh", id: 230 },
  { city: "Anand", state: "Gujarat", id: 231 },
  { city: "Bhind", state: "Madhya Pradesh", id: 232 },
  { city: "Bhalswa Jahangir Pur", state: "Delhi", id: 233 },
  { city: "Madhyamgram", state: "West Bengal", id: 234 },
  { city: "Bhiwani", state: "Haryana", id: 235 },
  { city: "Navi Mumbai Panvel Raigad", state: "Maharashtra", id: 236 },
  { city: "Baharampur", state: "West Bengal", id: 237 },
  { city: "Ambala", state: "Haryana", id: 238 },
  { city: "Morvi", state: "Gujarat", id: 239 },
  { city: "Fatehpur", state: "Uttar Pradesh", id: 240 },
  { city: "Rae Bareli", state: "Uttar Pradesh", id: 241 },
  { city: "Khora", state: "Uttar Pradesh", id: 242 },
  { city: "Bhusawal", state: "Maharashtra", id: 243 },
  { city: "Orai", state: "Uttar Pradesh", id: 244 },
  { city: "Bahraich", state: "Uttar Pradesh", id: 245 },
  { city: "Vellore", state: "Tamil Nadu", id: 246 },
  { city: "Mahesana", state: "Gujarat", id: 247 },
  { city: "Khammam", state: "Andhra Pradesh", id: 248 },
  { city: "Sambalpur", state: "Orissa", id: 249 },
  { city: "Raiganj", state: "West Bengal", id: 250 },
  { city: "Sirsa", state: "Haryana", id: 251 },
  { city: "Dinapur Nizamat", state: "Bihar", id: 252 },
  { city: "Serampore", state: "West Bengal", id: 253 },
  { city: "Sultan Pur Majra", state: "Delhi", id: 254 },
  { city: "Guna", state: "Madhya Pradesh", id: 255 },
  { city: "Jaunpur", state: "Uttar Pradesh", id: 256 },
  { city: "Panvel", state: "Maharashtra", id: 257 },
  { city: "Shivpuri", state: "Madhya Pradesh", id: 258 },
  { city: "Surendranagar Dudhrej", state: "Gujarat", id: 259 },
  { city: "Unnao", state: "Uttar Pradesh", id: 260 },
  { city: "Hugli and Chinsurah", state: "West Bengal", id: 261 },
  { city: "Sitapur", state: "Uttar Pradesh", id: 262 },
  { city: "Hastsal", state: "Delhi", id: 263 },
  { city: "Tambaram", state: "Tamil Nadu", id: 264 },
  { city: "Adityapur", state: "Jharkhand", id: 265 },
  { city: "Badalapur", state: "Maharashtra", id: 266 },
  { city: "Alappuzha", state: "Kerala", id: 267 },
  { city: "Cuddalore", state: "Tamil Nadu", id: 268 },
  { city: "Silchar", state: "Assam", id: 269 },
  { city: "Gadag and Betigeri", state: "Karnataka", id: 270 },
  { city: "Bahadurgarh", state: "Haryana", id: 271 },
  { city: "Machilipatnam", state: "Andhra Pradesh", id: 272 },
  { city: "Shimla", state: "Himachal Pradesh", id: 273 },
  { city: "Medinipur", state: "West Bengal", id: 274 },
  { city: "Deoli", state: "Delhi", id: 275 },
  { city: "Bharuch", state: "Gujarat", id: 276 },
  { city: "Hoshiarpur", state: "Punjab", id: 277 },
  { city: "Jind", state: "Haryana", id: 278 },
  { city: "Chandannagar", state: "West Bengal", id: 279 },
  { city: "Adoni", state: "Andhra Pradesh", id: 280 },
  { city: "Tonk", state: "Rajasthan", id: 281 },
  { city: "Faizabad", state: "Uttar Pradesh", id: 282 },
  { city: "Tenali", state: "Andhra Pradesh", id: 283 },
  { city: "Alandur", state: "Tamil Nadu", id: 284 },
  { city: "Kancheepuram", state: "Tamil Nadu", id: 285 },
  { city: "Vapi", state: "Gujarat", id: 286 },
  { city: "Rajnandgaon", state: "Chhattisgarh", id: 287 },
  { city: "Proddatur", state: "Andhra Pradesh", id: 288 },
  { city: "Navsari", state: "Gujarat", id: 289 },
  { city: "Budaun", state: "Uttar Pradesh", id: 290 },
  { city: "Uttarpara Kotrung", state: "West Bengal", id: 291 },
  { city: "Mahbubnagar", state: "Andhra Pradesh", id: 292 },
  { city: "Erode", state: "Tamil Nadu", id: 293 },
  { city: "Batala", state: "Punjab", id: 294 },
  { city: "Saharsa", state: "Bihar", id: 295 },
  { city: "Haldwani and Kathgodam", state: "Uttarakhand", id: 296 },
  { city: "Vidisha", state: "Madhya Pradesh", id: 297 },
  { city: "Thanesar", state: "Haryana", id: 298 },
  { city: "Kishangarh", state: "Rajasthan", id: 299 },
  { city: "Dallo Pura", state: "Delhi", id: 300 },
  { city: "Veraval", state: "Gujarat", id: 301 },
  { city: "Banda", state: "Uttar Pradesh", id: 302 },
  { city: "Chittoor", state: "Andhra Pradesh", id: 303 },
  { city: "Krishnanagar", state: "West Bengal", id: 304 },
  { city: "Barrackpur", state: "West Bengal", id: 305 },
  { city: "Lakhimpur", state: "Uttar Pradesh", id: 306 },
  { city: "Santipur", state: "West Bengal", id: 307 },
  { city: "Porbandar", state: "Gujarat", id: 308 },
  { city: "Hindupur", state: "Andhra Pradesh", id: 309 },
  { city: "Balurghat", state: "West Bengal", id: 310 },
  { city: "Bhadravati", state: "Karnataka", id: 311 },
  { city: "Hanumangarh", state: "Rajasthan", id: 312 },
  { city: "Moga", state: "Punjab", id: 313 },
  { city: "Pathankot", state: "Punjab", id: 314 },
  { city: "Hajipur", state: "Bihar", id: 315 },
  { city: "Sasaram", state: "Bihar", id: 316 },
  { city: "Habra", state: "West Bengal", id: 317 },
  { city: "Bid", state: "Maharashtra", id: 318 },
  { city: "Mohali", state: "Punjab", id: 319 },
  { city: "Burari", state: "Delhi", id: 320 },
  { city: "Beawar", state: "Rajasthan", id: 321 },
  { city: "Abohar", state: "Punjab", id: 322 },
  { city: "Tiruvannamalai", state: "Tamil Nadu", id: 323 },
  { city: "Jamuria", state: "West Bengal", id: 324 },
  { city: "Kaithal", state: "Haryana", id: 325 },
  { city: "Godhra", state: "Gujarat", id: 326 },
  { city: "Bhuj", state: "Gujarat", id: 327 },
  { city: "Robertson Pet", state: "Karnataka", id: 328 },
  { city: "Shillong", state: "Meghalaya", id: 329 },
  { city: "Rewari", state: "Haryana", id: 330 },
  { city: "Hazaribag", state: "Jharkhand", id: 331 },
  { city: "Bhimavaram", state: "Andhra Pradesh", id: 332 },
  { city: "Mandsaur", state: "Madhya Pradesh", id: 333 },
  { city: "Chas", state: "Jharkhand", id: 334 },
  { city: "Rudrapur", state: "Uttarakhand", id: 335 },
  { city: "Chitradurga", state: "Karnataka", id: 336 },
  { city: "Kumbakonam", state: "Tamil Nadu", id: 337 },
  { city: "Dibrugarh", state: "Assam", id: 338 },
  { city: "Kolar", state: "Karnataka", id: 339 },
  { city: "Chhindwara", state: "Madhya Pradesh", id: 340 },
  { city: "Bankura", state: "West Bengal", id: 341 },
  { city: "Mandya", state: "Karnataka", id: 342 },
  { city: "Dehri", state: "Bihar", id: 343 },
  { city: "Raigarh", state: "Chhattisgarh", id: 344 },
  { city: "Madanapalle", state: "Andhra Pradesh", id: 345 },
  { city: "Nalgonda", state: "Andhra Pradesh", id: 346 },
  { city: "Hathras", state: "Uttar Pradesh", id: 347 },
  { city: "Malerkotla", state: "Punjab", id: 348 },
  { city: "Siwan", state: "Bihar", id: 349 },
  { city: "Chhattarpur", state: "Madhya Pradesh", id: 350 },
  { city: "Hassan", state: "Karnataka", id: 351 },
  { city: "Lalitpur", state: "Uttar Pradesh", id: 352 },
  { city: "Gondiya", state: "Maharashtra", id: 353 },
  { city: "North Barrackpur", state: "West Bengal", id: 354 },
  { city: "Bettiah", state: "Bihar", id: 355 },
  { city: "Palakkad", state: "Kerala", id: 356 },
  { city: "Rajapalayam", state: "Tamil Nadu", id: 357 },
  { city: "Botad", state: "Gujarat", id: 358 },
  { city: "Modinagar", state: "Uttar Pradesh", id: 359 },
  { city: "Deoria", state: "Uttar Pradesh", id: 360 },
  { city: "Raniganj", state: "West Bengal", id: 361 },
  { city: "Palwal", state: "Haryana", id: 362 },
  { city: "Khanna", state: "Punjab", id: 363 },
  { city: "Neemuch", state: "Madhya Pradesh", id: 364 },
  { city: "Pilibhit", state: "Uttar Pradesh", id: 365 },
  { city: "Mustafabad", state: "Delhi", id: 366 },
  { city: "Hardoi", state: "Uttar Pradesh", id: 367 },
  { city: "Guntakal", state: "Andhra Pradesh", id: 368 },
  { city: "Pithampur", state: "Madhya Pradesh", id: 369 },
  { city: "Motihari", state: "Bihar", id: 370 },
  { city: "Dhaulpur", state: "Rajasthan", id: 371 },
  { city: "Srikakulam", state: "Andhra Pradesh", id: 372 },
  { city: "Nabadwip", state: "West Bengal", id: 373 },
  { city: "Patan", state: "Gujarat", id: 374 },
  { city: "Jagdalpur", state: "Chhattisgarh", id: 375 },
  { city: "Udupi", state: "Karnataka", id: 376 },
  { city: "Basirhat", state: "West Bengal", id: 377 },
  { city: "Damoh", state: "Madhya Pradesh", id: 378 },
  { city: "Halisahar", state: "West Bengal", id: 379 },
  { city: "Jagadhri", state: "Haryana", id: 380 },
  { city: "Rishra", state: "West Bengal", id: 381 },
  { city: "Kurichi", state: "Tamil Nadu", id: 382 },
  { city: "Dimapur", state: "Nagaland", id: 383 },
  { city: "Palanpur", state: "Gujarat", id: 384 },
  { city: "Dharmavaram", state: "Andhra Pradesh", id: 385 },
  { city: "Gokal Pur", state: "Delhi", id: 386 },
  { city: "Kashipur", state: "Uttarakhand", id: 387 },
  { city: "Ashokenagar Kalyangarh", state: "West Bengal", id: 388 },
  { city: "Baidyabati", state: "West Bengal", id: 389 },
  { city: "Sawai Madhopur", state: "Rajasthan", id: 390 },
  { city: "Puruliya", state: "West Bengal", id: 391 },
  { city: "Mandoli", state: "Delhi", id: 392 },
  { city: "Mainpuri", state: "Uttar Pradesh", id: 393 },
  { city: "Kanchrapara", state: "West Bengal", id: 394 },
  { city: "Satara", state: "Maharashtra", id: 395 },
  { city: "Churu", state: "Rajasthan", id: 396 },
  { city: "Madavaram", state: "Tamil Nadu", id: 397 },
  { city: "Gangapur", state: "Rajasthan", id: 398 },
  { city: "Dabgram", state: "West Bengal", id: 399 },
  { city: "Darjiling", state: "West Bengal", id: 400 },
  { city: "Barshi", state: "Maharashtra", id: 401 },
  { city: "Etah", state: "Uttar Pradesh", id: 402 },
  { city: "Jhunjhunun", state: "Rajasthan", id: 403 },
  { city: "Chikmagalur", state: "Karnataka", id: 404 },
  { city: "Jetpur Navagadh", state: "Gujarat", id: 405 },
  { city: "Roorkee", state: "Uttarakhand", id: 406 },
  { city: "Gudivada", state: "Andhra Pradesh", id: 407 },
  { city: "Baleshwar", state: "Orissa", id: 408 },
  { city: "Baran", state: "Rajasthan", id: 409 },
  { city: "Hoshangabad", state: "Madhya Pradesh", id: 410 },
  { city: "Nagaon", state: "Assam", id: 411 },
  { city: "Pudukkottai", state: "Tamil Nadu", id: 412 },
  { city: "Adilabad", state: "Andhra Pradesh", id: 413 },
  { city: "Hosur", state: "Tamil Nadu", id: 414 },
  { city: "Muktsar", state: "Punjab", id: 415 },
  { city: "Yavatmal", state: "Maharashtra", id: 416 },
  { city: "Titagarh", state: "West Bengal", id: 417 },
  { city: "Barnala", state: "Punjab", id: 418 },
  { city: "Chittaurgarh", state: "Rajasthan", id: 419 },
  { city: "Narasaraopet", state: "Andhra Pradesh", id: 420 },
  { city: "Dum Dum", state: "West Bengal", id: 421 },
  { city: "Basti", state: "Uttar Pradesh", id: 422 },
  { city: "Valsad", state: "Gujarat", id: 423 },
  { city: "Ambur", state: "Tamil Nadu", id: 424 },
  { city: "Giridih", state: "Jharkhand", id: 425 },
  { city: "Chandausi", state: "Uttar Pradesh", id: 426 },
  { city: "Gonda", state: "Uttar Pradesh", id: 427 },
  { city: "Bally Town", state: "West Bengal", id: 428 },
  { city: "Kalol", state: "Gujarat", id: 429 },
  { city: "Bagaha", state: "Bihar", id: 430 },
  { city: "Ambikapur", state: "Chhattisgarh", id: 431 },
  { city: "Achalpur", state: "Maharashtra", id: 432 },
  { city: "Gondal", state: "Gujarat", id: 433 },
  { city: "Bagalkot", state: "Karnataka", id: 434 },
  { city: "Osmanabad", state: "Maharashtra", id: 435 },
  { city: "Akbarpur", state: "Uttar Pradesh", id: 436 },
  { city: "Champdani", state: "West Bengal", id: 437 },
  { city: "Deesa", state: "Gujarat", id: 438 },
  { city: "Khurja", state: "Uttar Pradesh", id: 439 },
  { city: "Nandurbar", state: "Maharashtra", id: 440 },
  { city: "Azamgarh", state: "Uttar Pradesh", id: 441 },
  { city: "Ghazipur", state: "Uttar Pradesh", id: 442 },
  { city: "Delhi Cantonment", state: "Delhi", id: 443 },
  { city: "Firozpur", state: "Punjab", id: 444 },
  { city: "Baripada", state: "Orissa", id: 445 },
  { city: "Mughalsarai", state: "Uttar Pradesh", id: 446 },
  { city: "Anantnag", state: "Jammu and Kashmir", id: 447 },
  { city: "Sehore", state: "Madhya Pradesh", id: 448 },
  { city: "Bongaon", state: "West Bengal", id: 449 },
  { city: "Kanpur Cantonment", state: "Uttar Pradesh", id: 450 },
  { city: "Khardaha", state: "West Bengal", id: 451 },
  { city: "Tadpatri", state: "Andhra Pradesh", id: 452 },
  { city: "Port Blair", state: "Andaman and Nicobar Islands", id: 453 },
  { city: "Sultanpur", state: "Uttar Pradesh", id: 454 },
  { city: "Bhadrak", state: "Orissa", id: 455 },
  { city: "Shikohabad", state: "Uttar Pradesh", id: 456 },
  { city: "Jalpaiguri", state: "West Bengal", id: 457 },
  { city: "Shamli", state: "Uttar Pradesh", id: 458 },
  { city: "Karaikkudi", state: "Tamil Nadu", id: 459 },
  { city: "Khargone", state: "Madhya Pradesh", id: 460 },
  { city: "Wardha", state: "Maharashtra", id: 461 },
  { city: "Ranibennur", state: "Karnataka", id: 462 },
  { city: "Kishanganj", state: "Bihar", id: 463 },
  { city: "Neyveli", state: "Tamil Nadu", id: 464 },
  { city: "Amreli", state: "Gujarat", id: 465 },
  { city: "Suryapet", state: "Andhra Pradesh", id: 466 },
  { city: "Gangawati", state: "Karnataka", id: 467 },
  { city: "Hindaun", state: "Rajasthan", id: 468 },
  { city: "Jamalpur", state: "Bihar", id: 469 },
  { city: "Bhiwadi", state: "Rajasthan", id: 470 },
  { city: "Ballia", state: "Uttar Pradesh", id: 471 },
  { city: "Bansberia", state: "West Bengal", id: 472 },
  { city: "Tadepalligudem", state: "Andhra Pradesh", id: 473 },
  { city: "Miryalaguda", state: "Andhra Pradesh", id: 474 },
  { city: "Baraut", state: "Uttar Pradesh", id: 475 },
  { city: "Udgir", state: "Maharashtra", id: 476 },
  { city: "Betul", state: "Madhya Pradesh", id: 477 },
  { city: "Bundi", state: "Rajasthan", id: 478 },
  { city: "Jehanabad", state: "Bihar", id: 479 },
  { city: "Ambala Sadar", state: "Haryana", id: 480 },
  { city: "Nagapattinam", state: "Tamil Nadu", id: 481 },
  { city: "Nagaur", state: "Rajasthan", id: 482 },
  { city: "Buxar", state: "Bihar", id: 483 },
  { city: "Seoni", state: "Madhya Pradesh", id: 484 },
  { city: "Aurangabad", state: "Bihar", id: 485 },
  { city: "Greater Noida", state: "Uttar Pradesh", id: 486 },
  { city: "Hinganghat", state: "Maharashtra", id: 487 },
  { city: "Sujangarh", state: "Rajasthan", id: 488 },
  { city: "Bhadreswar", state: "West Bengal", id: 489 },
  { city: "Chilakaluripet", state: "Andhra Pradesh", id: 490 },
  { city: "Kasganj", state: "Uttar Pradesh", id: 491 },
  { city: "Kalyani", state: "West Bengal", id: 492 },
  { city: "Gangtok", state: "Sikkim", id: 493 },
  { city: "Datia", state: "Madhya Pradesh", id: 494 },
  { city: "Nagda", state: "Madhya Pradesh", id: 495 },
  { city: "Banswara", state: "Rajasthan", id: 496 },
  { city: "Kapurthala", state: "Punjab", id: 497 }
];
