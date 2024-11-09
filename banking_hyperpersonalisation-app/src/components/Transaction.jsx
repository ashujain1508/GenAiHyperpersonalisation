import React from 'react';
import { 
  Paper, 
  Typography, 
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import transactionData from '../data/transactionData.json';
import './Transaction.css';

const Transaction = () => {
  return (
    <Box className="transaction">
      <Paper elevation={3} className="transaction__container">
        <Typography variant="h6" className="transaction__title">
          Recent Transactions
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactionData.transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell 
                    align="right" 
                    className={transaction.amount > 0 ? 'positive-amount' : 'negative-amount'}
                  >
                    £{Math.abs(transaction.amount).toFixed(2)}
                  </TableCell>
                  <TableCell>{transaction.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Transaction; 