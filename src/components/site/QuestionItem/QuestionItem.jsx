import React, { useState } from 'react';
import styles from './QuestionItem.module.scss';
import AnimateHeight from 'react-animate-height';
import { Box } from '@mui/material';
import { ArrowBackIosNew, ArrowBackIosSharp, ChevronLeft } from '@mui/icons-material';
const QuestionItem = ({ question, answer }) => {
  const [height, setHeight] = useState(0);

  return (
    <Box sx={{ '& + &': { marginTop: '15px' } }}>
      <Box sx={{ fontSize: '16px', lineHeight: '24px', paddingBottom: '15px', borderBottom: '1px solid #E0E0E0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setHeight(height === 0 ? 'auto' : 0)}>
        {question}

        <ArrowBackIosNew sx={{ transform: height === 0 ? 'rotate(-90deg)' : 'rotate(90deg)', color: '#343A3F', fontSize: '18px' }} />
      </Box>
      <AnimateHeight duration={500} height={height}>
        <Box sx={{ paddingTop: '15px', fontSize: '16px', lineHeight: '24px' }}>{answer}</Box>
      </AnimateHeight>
    </Box>
  );
};

export default QuestionItem;
