import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import dayjs from 'dayjs';
import transactionData from '../data/transactionData.json';
import './Transaction.css';

const Transaction = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const filteredTransactions = transactionData.transactions.filter(transaction => {
    let matchesDate = true;
    let matchesStatus = true;

    if (selectedDate) {
      const transDate = dayjs(transaction.date);
      matchesDate = transDate.isSame(selectedDate, 'day');
    }

    if (selectedStatus !== 'all') {
      matchesStatus = (selectedStatus === 'sent' && transaction.amount < 0) ||
                     (selectedStatus === 'received' && transaction.amount > 0);
    }

    return matchesDate && matchesStatus;
  });

  return (
    <Box className="transaction-section">
      <Paper elevation={3} className="transaction-paper">
        <Box className="header-container">
          <Typography variant="h6" className="section-title">
            Transactions
          </Typography>
          <Box className="filters">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker 
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  slotProps={{ 
                    textField: { 
                      size: "small",
                      sx: { width: '150px' }
                    } 
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <FormControl className="status-filter" size="small">
              <Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                IconComponent={KeyboardArrowDownIcon}
                className="status-select"
                displayEmpty
                sx={{ width: '150px' }}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="sent">Sent</MenuItem>
                <MenuItem value="received">Received</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        
        <TableContainer>
          <Table className="transaction-table">
            <TableHead>
              <TableRow>
                <TableCell className="table-header">Date</TableCell>
                <TableCell className="table-header">Beneficiary</TableCell>
                <TableCell className="table-header">Status</TableCell>
                <TableCell className="table-header" align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id} className="table-row">
                  <TableCell className="table-cell">{formatDate(transaction.date)}</TableCell>
                  <TableCell className="table-cell">{transaction.description}</TableCell>
                  <TableCell className="table-cell">
                    <span className={`status ${transaction.amount < 0 ? 'sent' : 'received'}`}>
                      {transaction.amount < 0 ? 'Sent' : 'Received'}
                    </span>
                  </TableCell>
                  <TableCell className="table-cell" align="right">
                    £{Math.abs(transaction.amount).toFixed(2)}
                  </TableCell>
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