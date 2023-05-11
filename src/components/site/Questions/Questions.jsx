import React from 'react';
import styles from './Questions.module.scss';
import { Box } from '@mui/material';
import QuestionItem from '../QuestionItem/QuestionItem';
const Questions = ({ data }) => {
  return (
    <Box>
      {data?.map((item) => (
        <QuestionItem {...item} />
      ))}
    </Box>
  );
};

export default Questions;
