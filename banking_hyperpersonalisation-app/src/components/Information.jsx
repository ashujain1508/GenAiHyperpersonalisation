import React from 'react';
import { Alert, Box, Link } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import customerData from '../data/customerData.json';
import hyperpersonalisationInfo from '../data/hyperpersonalisationInfo.json';
import './Information.css';

const Information = () => {
  const { firstName } = customerData.customer.personalInfo;
  const { description } = hyperpersonalisationInfo.personalizedInfo;

  return (
    <Box className="information">
      <Alert 
        icon={<InfoIcon sx={{ fontSize: '1.2rem' }} />}
        severity="info"
        className="information__alert"
        variant="outlined"
      >
        <div className="information__content">
          <span className="information__message">
            Hi {firstName}! {description}
          </span>
          <Link
            href="#"
            className="information__link"
            onClick={(e) => {
              e.preventDefault();
              // Add your navigation logic here
              console.log('Explore More clicked');
            }}
          >
            Explore More <ArrowForwardIcon sx={{ fontSize: '1rem', marginLeft: '4px' }} />
          </Link>
        </div>
      </Alert>
    </Box>
  );
};

export default Information; 