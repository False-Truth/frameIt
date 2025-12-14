import React from 'react';
import { FileText, MapPin, Phone, Mail, Globe } from 'lucide-react';

const BillPreview = ({ customerInfo, orderItems, billNumber }) => {
  const calculateItemTotal = (item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 0;
    const gst = (parseFloat(item.gst) || 0) / 100;
    const itemTotal = price * quantity;
    const gstAmount = itemTotal * gst;
    return {
      subtotal: itemTotal,
      gst: gstAmount,
      total: itemTotal + gstAmount
    };
  };

  const calculateOverallTotal = () => {
    return orderItems.reduce((acc, item) => {
      const totals = calculateItemTotal(item);
      return {
        subtotal: acc.subtotal + totals.subtotal,
        gst: acc.gst + totals.gst,
        total: acc.total + totals.total
      };
    }, { subtotal: 0, gst: 0, total: 0 });
  };

  const formatDate = () => {
    return new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const overallTotals = calculateOverallTotal();
  const validItems = orderItems.filter(item => item.name && item.price);

  return (
    <div 
      id="bill-preview" 
      style={{
        backgroundColor: 'white',
        padding: '32px',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      {/* Header */}
      <div style={{ borderBottom: '2px solid #1f2937', paddingBottom: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>FrameIt Studio</h1>
            <p style={{ color: '#6b7280', fontStyle: 'italic' }}>Professional Photography & Framing Services</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '8px 16px', borderRadius: '8px' }}>
              <p style={{ fontSize: '14px', fontWeight: 'medium' }}>TAX INVOICE</p>
              <p style={{ fontSize: '20px', fontWeight: 'bold' }}>#{billNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Company & Customer Info */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div>
          <h3 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={16} />
            Our Details
          </h3>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            <p style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '4px' }}>
              <MapPin size={14} style={{ marginTop: '2px', flexShrink: 0 }} />
              <span>123 Photography Street, Studio Complex<br />
              Mumbai, Maharashtra - 400001<br />
              India</span>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Phone size={14} />
              <span>+91 98765 43210</span>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Mail size={14} />
              <span>billing@frameitstudio.com</span>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={14} />
              <span>www.frameitstudio.com</span>
            </p>
          </div>
        </div>
        
        <div>
          <h3 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={16} />
            Bill To
          </h3>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            <p style={{ fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>{customerInfo.name || 'Customer Name'}</p>
            {customerInfo.email && <p style={{ marginBottom: '4px' }}>Email: {customerInfo.email}</p>}
            {customerInfo.phone && <p style={{ marginBottom: '4px' }}>Phone: {customerInfo.phone}</p>}
            {customerInfo.address && (
              <p>Address: {customerInfo.address}</p>
            )}
          </div>
        </div>
      </div>

      {/* Bill Details */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <div>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>Bill Date</p>
          <p style={{ fontWeight: '600' }}>{formatDate()}</p>
        </div>
        <div>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>Payment Method</p>
          <p style={{ fontWeight: '600' }}>Cash/Card/UPI</p>
        </div>
        <div>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>Status</p>
          <p style={{ fontWeight: '600', color: '#16a34a' }}>Pending</p>
        </div>
      </div>

      {/* Items Table */}
      <div style={{ marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f3f4f6' }}>
              <th style={{ border: '1px solid #d1d5db', padding: '12px', textAlign: 'left', fontWeight: '600', color: '#1f2937' }}>S.No</th>
              <th style={{ border: '1px solid #d1d5db', padding: '12px', textAlign: 'left', fontWeight: '600', color: '#1f2937' }}>Item Description</th>
              <th style={{ border: '1px solid #d1d5db', padding: '12px', textAlign: 'center', fontWeight: '600', color: '#1f2937' }}>Qty</th>
              <th style={{ border: '1px solid #d1d5db', padding: '12px', textAlign: 'right', fontWeight: '600', color: '#1f2937' }}>Price (₹)</th>
              <th style={{ border: '1px solid #d1d5db', padding: '12px', textAlign: 'right', fontWeight: '600', color: '#1f2937' }}>GST (%)</th>
              <th style={{ border: '1px solid #d1d5db', padding: '12px', textAlign: 'right', fontWeight: '600', color: '#1f2937' }}>Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            {validItems.map((item, index) => {
              const totals = calculateItemTotal(item);
              return (
                <tr key={item.id} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb' }}>
                  <td style={{ border: '1px solid #d1d5db', padding: '12px', textAlign: 'center' }}>{index + 1}</td>
                  <td style={{ border: '1px solid #d1d5db', padding: '12px' }}>{item.name}</td>
                  <td style={{ border: '1px solid #d1d5db', padding: '12px', textAlign: 'center' }}>{item.quantity}</td>
                  <td style={{ border: '1px solid #d1d5db', padding: '12px', textAlign: 'right' }}>{parseFloat(item.price).toFixed(2)}</td>
                  <td style={{ border: '1px solid #d1d5db', padding: '12px', textAlign: 'right' }}>{item.gst}</td>
                  <td style={{ border: '1px solid #d1d5db', padding: '12px', textAlign: 'right', fontWeight: '600' }}>{totals.total.toFixed(2)}</td>
                </tr>
              );
            })}
            {validItems.length === 0 && (
              <tr>
                <td colSpan="6" style={{ border: '1px solid #d1d5db', padding: '32px', textAlign: 'center', color: '#6b7280' }}>
                  No items added to the bill
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ backgroundColor: '#f9fafb', borderRadius: '8px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', marginBottom: '8px' }}>
              <span style={{ color: '#6b7280' }}>Subtotal:</span>
              <span style={{ fontWeight: '500' }}>₹{overallTotals.subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', marginBottom: '8px' }}>
              <span style={{ color: '#6b7280' }}>CGST ({(overallTotals.gst / 2).toFixed(2)}):</span>
              <span style={{ fontWeight: '500' }}>₹{(overallTotals.gst / 2).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', marginBottom: '8px' }}>
              <span style={{ color: '#6b7280' }}>SGST ({(overallTotals.gst / 2).toFixed(2)}):</span>
              <span style={{ fontWeight: '500' }}>₹{(overallTotals.gst / 2).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 'bold', color: '#2563eb', borderTop: '1px solid #d1d5db', paddingTop: '8px' }}>
              <span>Grand Total:</span>
              <span>₹{overallTotals.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '2px solid #1f2937', paddingTop: '24px', marginTop: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            <p style={{ fontWeight: '600', marginBottom: '8px' }}>Terms & Conditions:</p>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '12px' }}>
              <li style={{ marginBottom: '4px' }}>• Payment should be made within 7 days of invoice date</li>
              <li style={{ marginBottom: '4px' }}>• Goods once sold will not be taken back</li>
              <li style={{ marginBottom: '4px' }}>• Subject to Mumbai jurisdiction</li>
              <li>• This is a computer-generated invoice</li>
            </ul>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '32px' }}>Authorized Signature</p>
            <div style={{ borderTop: '2px solid #9ca3af', width: '192px' }}></div>
          </div>
        </div>
        <div style={{ textAlign: 'center', fontSize: '14px', color: '#6b7280', marginTop: '24px' }}>
          <p>Thank you for your business! | Visit us at www.frameitstudio.com</p>
        </div>
      </div>
    </div>
  );
};

export default BillPreview;
