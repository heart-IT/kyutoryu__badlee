/**
 * @name- Picker.js
 * 
 * @chill- Men concern themselves most about that which passes away- They are like a blind man set to look after a burning lamp.- Buddha
 * 
 * 
 * @description- Component for creating a autocomplete search like dropdown.
 * 
 * @author- heartit pirates were here
 */
import Fuse from 'fuse.js';
import {
    Body,
    Button,
    Card,
    CardItem,
    CheckBox,
    Container,
    Content,
    Input,
    Item,
    List,
    ListItem,
    Right,
    StyleProvider,
    Text,
    View,
} from 'native-base';
import React from 'react';
import { Component } from 'react';
import { TouchableOpacity } from 'react-native';

import getTheme from '../theme/components';
import Icon from './Icon';

("use strict");

const Locations = [
  { city: "Mumbai", state: "Maharashtra" },
  { city: "New Delhi", state: "Delhi" },
  { city: "Bengaluru", state: "Karnataka" },
  { city: "Hyderabad", state: "Telangana" },
  { city: "Ahmedabad", state: "Gujarat" },
  { city: "Chennai", state: "Tamil Nadu" },
  { city: "Kolkata", state: "West Bengal" },
  { city: "Surat", state: "Gujarat" },
  { city: "Pune", state: "Maharashtra" },
  { city: "Jaipur", state: "Rajasthan" },
  { city: "Lucknow", state: "Uttar Pradesh" },
  { city: "Kanpur", state: "Uttar Pradesh" },
  { city: "Nagpur", state: "Maharashtra" },
  { city: "Indore", state: "Madhya Pradesh" },
  { city: "Thane", state: "Maharashtra" },
  { city: "Bhopal", state: "Madhya Pradesh" },
  { city: "Visakhapatnam", state: "Andhra Pradesh" },
  { city: "Pimpri Chinchwad", state: "Maharashtra" },
  { city: "Patna", state: "Bihar" },
  { city: "Vadodara", state: "Gujarat" },
  { city: "Ghaziabad", state: "Uttar Pradesh" },
  { city: "Ludhiana", state: "Punjab" },
  { city: "Agra", state: "Uttar Pradesh" },
  { city: "Nashik", state: "Maharashtra" },
  { city: "Faridabad", state: "Haryana" },
  { city: "Meerut", state: "Uttar Pradesh" },
  { city: "Rajkot", state: "Gujarat" },
  { city: "Kalyan and Dombivali", state: "Maharashtra" },
  { city: "Vasai Virar", state: "Maharashtra" },
  { city: "Varanasi", state: "Uttar Pradesh" },
  { city: "Srinagar", state: "Jammu and Kashmir" },
  { city: "Aurangabad", state: "Maharashtra" },
  { city: "Dhanbad", state: "Jharkhand" },
  { city: "Amritsar", state: "Punjab" },
  { city: "Navi Mumbai", state: "Maharashtra" },
  { city: "Allahabad", state: "Uttar Pradesh" },
  { city: "Haora", state: "West Bengal" },
  { city: "Ranchi", state: "Jharkhand" },
  { city: "Gwalior", state: "Madhya Pradesh" },
  { city: "Jabalpur", state: "Madhya Pradesh" },
  { city: "Coimbatore", state: "Tamil Nadu" },
  { city: "Vijayawada", state: "Andhra Pradesh" },
  { city: "Jodhpur", state: "Rajasthan" },
  { city: "Madurai", state: "Tamil Nadu" },
  { city: "Raipur", state: "Chhattisgarh" },
  { city: "Kota", state: "Rajasthan" },
  { city: "Chandigarh", state: "Chandigarh" },
  { city: "Guwahati", state: "Assam" },
  { city: "Solapur", state: "Maharashtra" },
  { city: "Hubli and Dharwad", state: "Karnataka" },
  { city: "Bareilly", state: "Uttar Pradesh" },
  { city: "Mysore", state: "Karnataka" },
  { city: "Moradabad", state: "Uttar Pradesh" },
  { city: "Gurugram", state: "Haryana" },
  { city: "Aligarh", state: "Uttar Pradesh" },
  { city: "Jalandhar", state: "Punjab" },
  { city: "Tiruchirappalli", state: "Tamil Nadu" },
  { city: "Bhubaneswar", state: "Orissa" },
  { city: "Salem", state: "Tamil Nadu" },
  { city: "Mira and Bhayander", state: "Maharashtra" },
  { city: "Thiruvananthapuram", state: "Kerala" },
  { city: "Bhiwandi", state: "Maharashtra" },
  { city: "Saharanpur", state: "Uttar Pradesh" },
  { city: "Gorakhpur", state: "Uttar Pradesh" },
  { city: "Guntur", state: "Andhra Pradesh" },
  { city: "Amravati", state: "Maharashtra" },
  { city: "Bikaner", state: "Rajasthan" },
  { city: "Noida", state: "Uttar Pradesh" },
  { city: "Jamshedpur", state: "Jharkhand" },
  { city: "Bhilai Nagar", state: "Chhattisgarh" },
  { city: "Warangal", state: "Andhra Pradesh" },
  { city: "Cuttack", state: "Orissa" },
  { city: "Firozabad", state: "Uttar Pradesh" },
  { city: "Kochi", state: "Kerala" },
  { city: "Bhavnagar", state: "Gujarat" },
  { city: "Dehradun", state: "Uttarakhand" },
  { city: "Durgapur", state: "West Bengal" },
  { city: "Asansol", state: "West Bengal" },
  { city: "Nanded Waghala", state: "Maharashtra" },
  { city: "Kolapur", state: "Maharashtra" },
  { city: "Ajmer", state: "Rajasthan" },
  { city: "Gulbarga", state: "Karnataka" },
  { city: "Loni", state: "Uttar Pradesh" },
  { city: "Ujjain", state: "Madhya Pradesh" },
  { city: "Siliguri", state: "West Bengal" },
  { city: "Ulhasnagar", state: "Maharashtra" },
  { city: "Jhansi", state: "Uttar Pradesh" },
  { city: "Sangli Miraj Kupwad", state: "Maharashtra" },
  { city: "Jammu", state: "Jammu and Kashmir" },
  { city: "Nellore", state: "Andhra Pradesh" },
  { city: "Mangalore", state: "Karnataka" },
  { city: "Belgaum", state: "Karnataka" },
  { city: "Jamnagar", state: "Gujarat" },
  { city: "Tirunelveli", state: "Tamil Nadu" },
  { city: "Malegaon", state: "Maharashtra" },
  { city: "Gaya", state: "Bihar" },
  { city: "Ambattur", state: "Tamil Nadu" },
  { city: "Jalgaon", state: "Maharashtra" },
  { city: "Udaipur", state: "Rajasthan" },
  { city: "Maheshtala", state: "West Bengal" },
  { city: "Tiruppur", state: "Tamil Nadu" },
  { city: "Davanagere", state: "Karnataka" },
  { city: "Kozhikode", state: "Kerala" },
  { city: "Kurnool", state: "Andhra Pradesh" },
  { city: "Akola", state: "Maharashtra" },
  { city: "Rajpur Sonarpur", state: "West Bengal" },
  { city: "Bokaro Steel", state: "Jharkhand" },
  { city: "Bellary", state: "Karnataka" },
  { city: "Patiala", state: "Punjab" },
  { city: "South Dum Dum", state: "West Bengal" },
  { city: "Rajarhat Gopalpur", state: "West Bengal" },
  { city: "Bhagalpur", state: "Bihar" },
  { city: "Agartala", state: "Tripura" },
  { city: "Muzaffarnagar", state: "Uttar Pradesh" },
  { city: "Bhatpara", state: "West Bengal" },
  { city: "Latur", state: "Maharashtra" },
  { city: "Panihati", state: "West Bengal" },
  { city: "Dhule", state: "Maharashtra" },
  { city: "Rohtak", state: "Haryana" },
  { city: "Korba", state: "Chhattisgarh" },
  { city: "Bhilwara", state: "Rajasthan" },
  { city: "Brahmapur Town", state: "Orissa" },
  { city: "Muzaffarpur", state: "Bihar" },
  { city: "Ahmadnagar", state: "Maharashtra" },
  { city: "Mathura", state: "Uttar Pradesh" },
  { city: "Kollam", state: "Kerala" },
  { city: "Avadi", state: "Tamil Nadu" },
  { city: "Kadapa", state: "Andhra Pradesh" },
  { city: "Rajahmundry", state: "Andhra Pradesh" },
  { city: "Bilaspur", state: "Chhattisgarh" },
  { city: "Kamarhati", state: "West Bengal" },
  { city: "Shahjahanpur", state: "Uttar Pradesh" },
  { city: "Bijapur", state: "Karnataka" },
  { city: "Rampur", state: "Uttar Pradesh" },
  { city: "Shimoga", state: "Karnataka" },
  { city: "Chandrapur", state: "Maharashtra" },
  { city: "Junagadh", state: "Gujarat" },
  { city: "Thrissur", state: "Kerala" },
  { city: "Alwar", state: "Rajasthan" },
  { city: "Barddhaman", state: "West Bengal" },
  { city: "Kulti", state: "West Bengal" },
  { city: "Kakinada", state: "Andhra Pradesh" },
  { city: "Nizamabad", state: "Andhra Pradesh" },
  { city: "Parbhani", state: "Maharashtra" },
  { city: "Tumkur", state: "Karnataka" },
  { city: "Hisar", state: "Haryana" },
  { city: "Ozhukarai", state: "Puducherry" },
  { city: "Biharsharif", state: "Bihar" },
  { city: "Darbhanga", state: "Bihar" },
  { city: "Panipat", state: "Haryana" },
  { city: "Aizawl", state: "Mizoram" },
  { city: "Bally", state: "West Bengal" },
  { city: "Dewas", state: "Madhya Pradesh" },
  { city: "Tirupati", state: "Andhra Pradesh" },
  { city: "Ichalkaranji", state: "Maharashtra" },
  { city: "Karnal", state: "Haryana" },
  { city: "Bathinda", state: "Punjab" },
  { city: "Jalna", state: "Maharashtra" },
  { city: "Kirari Suleman Nagar", state: "Delhi" },
  { city: "Purnia", state: "Bihar" },
  { city: "Satna", state: "Madhya Pradesh" },
  { city: "Maunath Bhanjan", state: "Uttar Pradesh" },
  { city: "Barasat", state: "West Bengal" },
  { city: "Sonipat", state: "Haryana" },
  { city: "Farrukhabad and Fatehgarh", state: "Uttar Pradesh" },
  { city: "Sagar", state: "Madhya Pradesh" },
  { city: "Raurkela", state: "Orissa" },
  { city: "Durg", state: "Chhattisgarh" },
  { city: "Imphal", state: "Manipur" },
  { city: "Ratlam", state: "Madhya Pradesh" },
  { city: "Hapur", state: "Uttar Pradesh" },
  { city: "Arrah", state: "Bihar" },
  { city: "Karimnagar", state: "Andhra Pradesh" },
  { city: "Anantapur", state: "Andhra Pradesh" },
  { city: "NDMC", state: "Delhi" },
  { city: "Etawah", state: "Uttar Pradesh" },
  { city: "Ambernath", state: "Maharashtra" },
  { city: "Bharatpur", state: "Rajasthan" },
  { city: "Begusarai", state: "Bihar" },
  { city: "Tiruvottiyur", state: "Tamil Nadu" },
  { city: "North Dum Dum", state: "West Bengal" },
  { city: "Gandhidham", state: "Gujarat" },
  { city: "Baranagar", state: "West Bengal" },
  { city: "Puducherry", state: "Puducherry" },
  { city: "Thoothukkudi", state: "Tamil Nadu" },
  { city: "Sikar", state: "Rajasthan" },
  { city: "Rewa", state: "Madhya Pradesh" },
  { city: "Mirzapur and Vindhyachal", state: "Uttar Pradesh" },
  { city: "Raichur", state: "Karnataka" },
  { city: "Pali", state: "Rajasthan" },
  { city: "Ramagundam", state: "Andhra Pradesh" },
  { city: "Hardwar", state: "Uttarakhand" },
  { city: "Vizianagaram", state: "Andhra Pradesh" },
  { city: "Katihar", state: "Bihar" },
  { city: "Nagercoil", state: "Tamil Nadu" },
  { city: "Ganganagar", state: "Rajasthan" },
  { city: "Karawal Nagar", state: "Delhi" },
  { city: "Mango", state: "Jharkhand" },
  { city: "Thanjavur", state: "Tamil Nadu" },
  { city: "Bulandshahr", state: "Uttar Pradesh" },
  { city: "Uluberia", state: "West Bengal" },
  { city: "Murwara", state: "Madhya Pradesh" },
  { city: "Sambhal", state: "Uttar Pradesh" },
  { city: "Singrauli", state: "Madhya Pradesh" },
  { city: "Nadiad", state: "Gujarat" },
  { city: "Secunderabad", state: "Andhra Pradesh" },
  { city: "Naihati", state: "West Bengal" },
  { city: "Yamunanagar", state: "Haryana" },
  { city: "Bidhan Nagar", state: "West Bengal" },
  { city: "Pallavaram", state: "Tamil Nadu" },
  { city: "Bidar", state: "Karnataka" },
  { city: "Munger", state: "Bihar" },
  { city: "Panchkula", state: "Haryana" },
  { city: "Burhanpur", state: "Madhya Pradesh" },
  { city: "Raurkela Industrial Township", state: "Orissa" },
  { city: "Kharagpur", state: "West Bengal" },
  { city: "Dindigul", state: "Tamil Nadu" },
  { city: "Hospet", state: "Karnataka" },
  { city: "Gandhinagar", state: "Gujarat" },
  { city: "Nangloi Jat", state: "Delhi" },
  { city: "English Bazar", state: "West Bengal" },
  { city: "Ongole", state: "Andhra Pradesh" },
  { city: "Eluru", state: "Andhra Pradesh" },
  { city: "Deoghar", state: "Jharkhand" },
  { city: "Chapra", state: "Bihar" },
  { city: "Haldia", state: "West Bengal" },
  { city: "Khandwa", state: "Madhya Pradesh" },
  { city: "Puri Town", state: "Orissa" },
  { city: "Nandyal", state: "Andhra Pradesh" },
  { city: "Morena", state: "Madhya Pradesh" },
  { city: "Amroha", state: "Uttar Pradesh" },
  { city: "Anand", state: "Gujarat" },
  { city: "Bhind", state: "Madhya Pradesh" },
  { city: "Bhalswa Jahangir Pur", state: "Delhi" },
  { city: "Madhyamgram", state: "West Bengal" },
  { city: "Bhiwani", state: "Haryana" },
  { city: "Navi Mumbai Panvel Raigad", state: "Maharashtra" },
  { city: "Baharampur", state: "West Bengal" },
  { city: "Ambala", state: "Haryana" },
  { city: "Morvi", state: "Gujarat" },
  { city: "Fatehpur", state: "Uttar Pradesh" },
  { city: "Rae Bareli", state: "Uttar Pradesh" },
  { city: "Khora", state: "Uttar Pradesh" },
  { city: "Bhusawal", state: "Maharashtra" },
  { city: "Orai", state: "Uttar Pradesh" },
  { city: "Bahraich", state: "Uttar Pradesh" },
  { city: "Vellore", state: "Tamil Nadu" },
  { city: "Mahesana", state: "Gujarat" },
  { city: "Khammam", state: "Andhra Pradesh" },
  { city: "Sambalpur", state: "Orissa" },
  { city: "Raiganj", state: "West Bengal" },
  { city: "Sirsa", state: "Haryana" },
  { city: "Dinapur Nizamat", state: "Bihar" },
  { city: "Serampore", state: "West Bengal" },
  { city: "Sultan Pur Majra", state: "Delhi" },
  { city: "Guna", state: "Madhya Pradesh" },
  { city: "Jaunpur", state: "Uttar Pradesh" },
  { city: "Panvel", state: "Maharashtra" },
  { city: "Shivpuri", state: "Madhya Pradesh" },
  { city: "Surendranagar Dudhrej", state: "Gujarat" },
  { city: "Unnao", state: "Uttar Pradesh" },
  { city: "Hugli and Chinsurah", state: "West Bengal" },
  { city: "Sitapur", state: "Uttar Pradesh" },
  { city: "Hastsal", state: "Delhi" },
  { city: "Tambaram", state: "Tamil Nadu" },
  { city: "Adityapur", state: "Jharkhand" },
  { city: "Badalapur", state: "Maharashtra" },
  { city: "Alappuzha", state: "Kerala" },
  { city: "Cuddalore", state: "Tamil Nadu" },
  { city: "Silchar", state: "Assam" },
  { city: "Gadag and Betigeri", state: "Karnataka" },
  { city: "Bahadurgarh", state: "Haryana" },
  { city: "Machilipatnam", state: "Andhra Pradesh" },
  { city: "Shimla", state: "Himachal Pradesh" },
  { city: "Medinipur", state: "West Bengal" },
  { city: "Deoli", state: "Delhi" },
  { city: "Bharuch", state: "Gujarat" },
  { city: "Hoshiarpur", state: "Punjab" },
  { city: "Jind", state: "Haryana" },
  { city: "Chandannagar", state: "West Bengal" },
  { city: "Adoni", state: "Andhra Pradesh" },
  { city: "Tonk", state: "Rajasthan" },
  { city: "Faizabad", state: "Uttar Pradesh" },
  { city: "Tenali", state: "Andhra Pradesh" },
  { city: "Alandur", state: "Tamil Nadu" },
  { city: "Kancheepuram", state: "Tamil Nadu" },
  { city: "Vapi", state: "Gujarat" },
  { city: "Rajnandgaon", state: "Chhattisgarh" },
  { city: "Proddatur", state: "Andhra Pradesh" },
  { city: "Navsari", state: "Gujarat" },
  { city: "Budaun", state: "Uttar Pradesh" },
  { city: "Uttarpara Kotrung", state: "West Bengal" },
  { city: "Mahbubnagar", state: "Andhra Pradesh" },
  { city: "Erode", state: "Tamil Nadu" },
  { city: "Batala", state: "Punjab" },
  { city: "Saharsa", state: "Bihar" },
  { city: "Haldwani and Kathgodam", state: "Uttarakhand" },
  { city: "Vidisha", state: "Madhya Pradesh" },
  { city: "Thanesar", state: "Haryana" },
  { city: "Kishangarh", state: "Rajasthan" },
  { city: "Dallo Pura", state: "Delhi" },
  { city: "Veraval", state: "Gujarat" },
  { city: "Banda", state: "Uttar Pradesh" },
  { city: "Chittoor", state: "Andhra Pradesh" },
  { city: "Krishnanagar", state: "West Bengal" },
  { city: "Barrackpur", state: "West Bengal" },
  { city: "Lakhimpur", state: "Uttar Pradesh" },
  { city: "Santipur", state: "West Bengal" },
  { city: "Porbandar", state: "Gujarat" },
  { city: "Hindupur", state: "Andhra Pradesh" },
  { city: "Balurghat", state: "West Bengal" },
  { city: "Bhadravati", state: "Karnataka" },
  { city: "Hanumangarh", state: "Rajasthan" },
  { city: "Moga", state: "Punjab" },
  { city: "Pathankot", state: "Punjab" },
  { city: "Hajipur", state: "Bihar" },
  { city: "Sasaram", state: "Bihar" },
  { city: "Habra", state: "West Bengal" },
  { city: "Bid", state: "Maharashtra" },
  { city: "Mohali", state: "Punjab" },
  { city: "Burari", state: "Delhi" },
  { city: "Beawar", state: "Rajasthan" },
  { city: "Abohar", state: "Punjab" },
  { city: "Tiruvannamalai", state: "Tamil Nadu" },
  { city: "Jamuria", state: "West Bengal" },
  { city: "Kaithal", state: "Haryana" },
  { city: "Godhra", state: "Gujarat" },
  { city: "Bhuj", state: "Gujarat" },
  { city: "Robertson Pet", state: "Karnataka" },
  { city: "Shillong", state: "Meghalaya" },
  { city: "Rewari", state: "Haryana" },
  { city: "Hazaribag", state: "Jharkhand" },
  { city: "Bhimavaram", state: "Andhra Pradesh" },
  { city: "Mandsaur", state: "Madhya Pradesh" },
  { city: "Chas", state: "Jharkhand" },
  { city: "Rudrapur", state: "Uttarakhand" },
  { city: "Chitradurga", state: "Karnataka" },
  { city: "Kumbakonam", state: "Tamil Nadu" },
  { city: "Dibrugarh", state: "Assam" },
  { city: "Kolar", state: "Karnataka" },
  { city: "Chhindwara", state: "Madhya Pradesh" },
  { city: "Bankura", state: "West Bengal" },
  { city: "Mandya", state: "Karnataka" },
  { city: "Dehri", state: "Bihar" },
  { city: "Raigarh", state: "Chhattisgarh" },
  { city: "Madanapalle", state: "Andhra Pradesh" },
  { city: "Nalgonda", state: "Andhra Pradesh" },
  { city: "Hathras", state: "Uttar Pradesh" },
  { city: "Malerkotla", state: "Punjab" },
  { city: "Siwan", state: "Bihar" },
  { city: "Chhattarpur", state: "Madhya Pradesh" },
  { city: "Hassan", state: "Karnataka" },
  { city: "Lalitpur", state: "Uttar Pradesh" },
  { city: "Gondiya", state: "Maharashtra" },
  { city: "North Barrackpur", state: "West Bengal" },
  { city: "Bettiah", state: "Bihar" },
  { city: "Palakkad", state: "Kerala" },
  { city: "Rajapalayam", state: "Tamil Nadu" },
  { city: "Botad", state: "Gujarat" },
  { city: "Modinagar", state: "Uttar Pradesh" },
  { city: "Deoria", state: "Uttar Pradesh" },
  { city: "Raniganj", state: "West Bengal" },
  { city: "Palwal", state: "Haryana" },
  { city: "Khanna", state: "Punjab" },
  { city: "Neemuch", state: "Madhya Pradesh" },
  { city: "Pilibhit", state: "Uttar Pradesh" },
  { city: "Mustafabad", state: "Delhi" },
  { city: "Hardoi", state: "Uttar Pradesh" },
  { city: "Guntakal", state: "Andhra Pradesh" },
  { city: "Pithampur", state: "Madhya Pradesh" },
  { city: "Motihari", state: "Bihar" },
  { city: "Dhaulpur", state: "Rajasthan" },
  { city: "Srikakulam", state: "Andhra Pradesh" },
  { city: "Nabadwip", state: "West Bengal" },
  { city: "Patan", state: "Gujarat" },
  { city: "Jagdalpur", state: "Chhattisgarh" },
  { city: "Udupi", state: "Karnataka" },
  { city: "Basirhat", state: "West Bengal" },
  { city: "Damoh", state: "Madhya Pradesh" },
  { city: "Halisahar", state: "West Bengal" },
  { city: "Jagadhri", state: "Haryana" },
  { city: "Rishra", state: "West Bengal" },
  { city: "Kurichi", state: "Tamil Nadu" },
  { city: "Dimapur", state: "Nagaland" },
  { city: "Palanpur", state: "Gujarat" },
  { city: "Dharmavaram", state: "Andhra Pradesh" },
  { city: "Gokal Pur", state: "Delhi" },
  { city: "Kashipur", state: "Uttarakhand" },
  { city: "Ashokenagar Kalyangarh", state: "West Bengal" },
  { city: "Baidyabati", state: "West Bengal" },
  { city: "Sawai Madhopur", state: "Rajasthan" },
  { city: "Puruliya", state: "West Bengal" },
  { city: "Mandoli", state: "Delhi" },
  { city: "Mainpuri", state: "Uttar Pradesh" },
  { city: "Kanchrapara", state: "West Bengal" },
  { city: "Satara", state: "Maharashtra" },
  { city: "Churu", state: "Rajasthan" },
  { city: "Madavaram", state: "Tamil Nadu" },
  { city: "Gangapur", state: "Rajasthan" },
  { city: "Dabgram", state: "West Bengal" },
  { city: "Darjiling", state: "West Bengal" },
  { city: "Barshi", state: "Maharashtra" },
  { city: "Etah", state: "Uttar Pradesh" },
  { city: "Jhunjhunun", state: "Rajasthan" },
  { city: "Chikmagalur", state: "Karnataka" },
  { city: "Jetpur Navagadh", state: "Gujarat" },
  { city: "Roorkee", state: "Uttarakhand" },
  { city: "Gudivada", state: "Andhra Pradesh" },
  { city: "Baleshwar", state: "Orissa" },
  { city: "Baran", state: "Rajasthan" },
  { city: "Hoshangabad", state: "Madhya Pradesh" },
  { city: "Nagaon", state: "Assam" },
  { city: "Pudukkottai", state: "Tamil Nadu" },
  { city: "Adilabad", state: "Andhra Pradesh" },
  { city: "Hosur", state: "Tamil Nadu" },
  { city: "Muktsar", state: "Punjab" },
  { city: "Yavatmal", state: "Maharashtra" },
  { city: "Titagarh", state: "West Bengal" },
  { city: "Barnala", state: "Punjab" },
  { city: "Chittaurgarh", state: "Rajasthan" },
  { city: "Narasaraopet", state: "Andhra Pradesh" },
  { city: "Dum Dum", state: "West Bengal" },
  { city: "Basti", state: "Uttar Pradesh" },
  { city: "Valsad", state: "Gujarat" },
  { city: "Ambur", state: "Tamil Nadu" },
  { city: "Giridih", state: "Jharkhand" },
  { city: "Chandausi", state: "Uttar Pradesh" },
  { city: "Gonda", state: "Uttar Pradesh" },
  { city: "Bally Town", state: "West Bengal" },
  { city: "Kalol", state: "Gujarat" },
  { city: "Bagaha", state: "Bihar" },
  { city: "Ambikapur", state: "Chhattisgarh" },
  { city: "Achalpur", state: "Maharashtra" },
  { city: "Gondal", state: "Gujarat" },
  { city: "Bagalkot", state: "Karnataka" },
  { city: "Osmanabad", state: "Maharashtra" },
  { city: "Akbarpur", state: "Uttar Pradesh" },
  { city: "Champdani", state: "West Bengal" },
  { city: "Deesa", state: "Gujarat" },
  { city: "Khurja", state: "Uttar Pradesh" },
  { city: "Nandurbar", state: "Maharashtra" },
  { city: "Azamgarh", state: "Uttar Pradesh" },
  { city: "Ghazipur", state: "Uttar Pradesh" },
  { city: "Delhi Cantonment", state: "Delhi" },
  { city: "Firozpur", state: "Punjab" },
  { city: "Baripada", state: "Orissa" },
  { city: "Mughalsarai", state: "Uttar Pradesh" },
  { city: "Anantnag", state: "Jammu and Kashmir" },
  { city: "Sehore", state: "Madhya Pradesh" },
  { city: "Bongaon", state: "West Bengal" },
  { city: "Kanpur Cantonment", state: "Uttar Pradesh" },
  { city: "Khardaha", state: "West Bengal" },
  { city: "Tadpatri", state: "Andhra Pradesh" },
  { city: "Port Blair", state: "Andaman and Nicobar Islands" },
  { city: "Sultanpur", state: "Uttar Pradesh" },
  { city: "Bhadrak", state: "Orissa" },
  { city: "Shikohabad", state: "Uttar Pradesh" },
  { city: "Jalpaiguri", state: "West Bengal" },
  { city: "Shamli", state: "Uttar Pradesh" },
  { city: "Karaikkudi", state: "Tamil Nadu" },
  { city: "Khargone", state: "Madhya Pradesh" },
  { city: "Wardha", state: "Maharashtra" },
  { city: "Ranibennur", state: "Karnataka" },
  { city: "Kishanganj", state: "Bihar" },
  { city: "Neyveli", state: "Tamil Nadu" },
  { city: "Amreli", state: "Gujarat" },
  { city: "Suryapet", state: "Andhra Pradesh" },
  { city: "Gangawati", state: "Karnataka" },
  { city: "Hindaun", state: "Rajasthan" },
  { city: "Jamalpur", state: "Bihar" },
  { city: "Bhiwadi", state: "Rajasthan" },
  { city: "Ballia", state: "Uttar Pradesh" },
  { city: "Bansberia", state: "West Bengal" },
  { city: "Tadepalligudem", state: "Andhra Pradesh" },
  { city: "Miryalaguda", state: "Andhra Pradesh" },
  { city: "Baraut", state: "Uttar Pradesh" },
  { city: "Udgir", state: "Maharashtra" },
  { city: "Betul", state: "Madhya Pradesh" },
  { city: "Bundi", state: "Rajasthan" },
  { city: "Jehanabad", state: "Bihar" },
  { city: "Ambala Sadar", state: "Haryana" },
  { city: "Nagapattinam", state: "Tamil Nadu" },
  { city: "Nagaur", state: "Rajasthan" },
  { city: "Buxar", state: "Bihar" },
  { city: "Seoni", state: "Madhya Pradesh" },
  { city: "Aurangabad", state: "Bihar" },
  { city: "Greater Noida", state: "Uttar Pradesh" },
  { city: "Hinganghat", state: "Maharashtra" },
  { city: "Sujangarh", state: "Rajasthan" },
  { city: "Bhadreswar", state: "West Bengal" },
  { city: "Chilakaluripet", state: "Andhra Pradesh" },
  { city: "Kasganj", state: "Uttar Pradesh" },
  { city: "Kalyani", state: "West Bengal" },
  { city: "Gangtok", state: "Sikkim" },
  { city: "Datia", state: "Madhya Pradesh" },
  { city: "Nagda", state: "Madhya Pradesh" },
  { city: "Banswara", state: "Rajasthan" },
  { city: "Kapurthala", state: "Punjab" }
];

const Categories = [
  "Computers & Gadgets",
  "Cameras & accessories",
  "Fashion & Accessories",
  "Home & furniture",
  "Appliances & tools",
  "Games & Sports",
  "Books & Stationary",
  "Music & Instruments",
  "Medical",
  "Lifesstyle & Leisure",
  "Others"
];

export default class Picker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInputValue: "",
      data: this.props.type === "location" ? Locations : Categories,
      multiselect: this.props.type === "location",
      selectedValues: []
    };
    this.closeIconClicked = this.closeIconClicked.bind(this);
    this.itemClicked = this.itemClicked.bind(this);
  }
  onSearchType(text) {
    if (text) {
      var options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ["city", "state"]
      };
      var fuse = new Fuse(Locations, options); // "list" is the item array
      var result = fuse.search(text);
      this.setState({ searchInputValue: text, data: result });
    } else {
      this.setState({ data: Locations, searchInputValue: text });
    }
  }
  closeIconClicked() {
    this.props.goBack();
  }

  itemClicked(item) {
    const value = `${item.city}, ${item.state}`;
    const values = Object.assign([], this.state.selectedValues);
    if (values.indexOf(value) === -1) {
      values.push(value);
    } else {
      values.pop(value);
    }
    console.log(values);
    this.setState({
      selectedValues: values
    });
    // this.props.itemClicked();
  }

  render() {
    var items = this.state.data;
    console.log("is render", this.state.selectedValues);
    let selectedValues = this.state.selectedValues;

    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
          <Content
            style={{ flex: 1 }}
            contentContainerStyle={{
              flex: 1,
              padding: 9,
              backgroundColor: "#eeeeee"
            }}
          >
            <Card>
              <CardItem
                header
                style={{
                  backgroundColor: "#fff"
                }}
              >
                <View
                  style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: "#611265",
                    paddingTop: 3,
                    position: "relative"
                  }}
                >
                  <Text style={{ color: "#611265", fontSize: 17 }}>
                    Select a location
                  </Text>
                  <TouchableOpacity
                    onPress={this.closeIconClicked}
                    style={{
                      width: 24,
                      paddingLeft: 7,
                      position: "absolute",
                      top: 0,
                      right: 0
                    }}
                  >
                    <Icon
                      name="menuCloseIcon"
                      width="12"
                      height="12"
                      stroke="rgba(0, 0 ,0 ,0.87)"
                      fill="rgba(0, 0 ,0 ,0.87)"
                      strokeWidth="2"
                    />
                  </TouchableOpacity>
                </View>
              </CardItem>
              <CardItem style={{ flex: 1 }}>
                <Body style={{ paddingTop: 6, flex: 1 }}>
                  <Item
                    style={{
                      height: 36,
                      borderColor: "#bdbdbd"
                    }}
                    regular
                  >
                    <Input
                      placeholder="search.."
                      value={this.state.searchInputValue}
                      onChangeText={text => this.onSearchType(text)}
                      style={{
                        height: 36,
                        fontSize: 16,
                        lineHeight: 9,
                        color: "rgba(0, 0, 0, 0.87)",
                        paddingLeft: 9
                      }}
                    />
                  </Item>
                  {items.length > 0 && (
                    <List
                      style={{ flex: 1, width: "100%", paddingTop: 6 }}
                      dataArray={items}
                      button={true}
                      renderRow={item => (
                        <ListItem
                          style={{
                            paddingTop: 6,
                            paddingBottom: 9,
                            width: "100%"
                          }}
                          onPress={() => this.itemClicked(item)}
                        >
                          <Body
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              paddingRight: 18
                            }}
                          >
                            <Text style={{ fontSize: 15 }}>
                              {item.city}, {item.state}
                            </Text>
                            {console.log(
                              selectedValues.indexOf(
                                `${item.city}, ${item.state}`
                              ) === -1
                            )}
                            <CheckBox
                              style={{
                                borderColor: "#611265",
                                width: 15,
                                height: 15,
                                backgroundColor: "green"
                              }}
                              checked={
                                selectedValues.indexOf(
                                  `${item.city}, ${item.state}`
                                ) === -1
                                  ? false
                                  : true
                              }
                            />
                          </Body>
                        </ListItem>
                      )}
                    />
                  )}
                  {items.length === 0 && (
                    <View style={{ marginTop: 18, width: "100%" }}>
                      <Text style={{ textAlign: "center" }}>No Results!</Text>
                    </View>
                  )}
                </Body>
              </CardItem>
              <CardItem footer style={{ height: 40 }}>
                <Right>
                  <Button style={{ height: 30 }}>
                    <Text>Select</Text>
                  </Button>
                </Right>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}
