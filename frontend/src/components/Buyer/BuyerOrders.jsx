import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BuyerProdNav from './BuyerProdNav';
import './BuyerOrders.css'; 

const BuyerOrders = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userid');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/user-transactions/${userId}`);
        setTransactions(res.data);
      } catch (err) {
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchTransactions();
    }
  }, [userId]);

  return (
    <div className="profile-dashboard">
      <BuyerProdNav />
      <div className="store-container">
        <div className="profile-header-main">
          <h2>Order <span>History</span></h2>
          <p>Track your recent purchases and transaction status.</p>
        </div>

        {loading ? (
          <div className="loading-box">
            <div className="spinner"></div>
            <p>Loading transactions...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="no-results-box">
            <i className="bi bi-clock-history" style={{ fontSize: '3rem' }}></i>
            <p>No transactions found in your history.</p>
          </div>
        ) : (
          <div className="glass-table-container">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn._id}>
                    <td><code>{txn.transactionId}</code></td>
                    <td className="price-cell">₹{txn.amount}</td>
                    <td>{txn.paymentMode.toUpperCase()}</td>
                    <td>
                      <span className={`badge-payment ${txn.paymentStatus === 'success' ? 'success' : 'pending'}`}>
                        {txn.paymentStatus}
                      </span>
                    </td>
                    <td>{new Date(txn.paidAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerOrders;