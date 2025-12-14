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
        padding: '16px',
        maxWidth: '100%',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
        overflowX: 'auto'
      }}
    >
      {/* Header */}
      <div style={{ borderBottom: '2px solid #1f2937', paddingBottom: '16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <h1 style={{ fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px', lineHeight: '1.2' }}>PPS Photo Frames</h1>
            <p style={{ color: '#6b7280', fontStyle: 'italic', fontSize: 'clamp(12px, 3vw, 14px)' }}>Professional Photography & Framing Services</p>
          </div>
          <div style={{ textAlign: 'right', minWidth: '120px' }}>
            <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '6px 12px', borderRadius: '8px' }}>
              <p style={{ fontSize: 'clamp(10px, 2.5vw, 12px)', fontWeight: 'medium' }}>TAX INVOICE</p>
              <p style={{ fontSize: 'clamp(14px, 3.5vw, 18px)', fontWeight: 'bold' }}>#{billNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Company & Customer Info */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        <div>
          <h3 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={16} />
            Our Details
          </h3>
          <div style={{ fontSize: 'clamp(11px, 3vw, 14px)', color: '#6b7280' }}>
            <p style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '4px' }}>
              <MapPin size={14} style={{ marginTop: '2px', flexShrink: 0 }} />
              <span>Opp DLF Phase 2, In Front of Metro Pillar No 67 A<br />
             Gurugram, Haryana 122002<br />
              India</span>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Phone size={14} />
              <span>+91 9810774052</span>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Mail size={14} />
              <span>ppssharmaartgallery@gmail.com</span>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={14} />
              <span>www.PPSPhotoFrames.com</span>
            </p>
          </div>
        </div>
        
        <div>
          <h3 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={16} />
            Bill To
          </h3>
          <div style={{ fontSize: 'clamp(11px, 3vw, 14px)', color: '#6b7280' }}>
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px', marginBottom: '20px', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <div>
          <p style={{ fontSize: 'clamp(12px, 3vw, 14px)', color: '#6b7280' }}>Bill Date</p>
          <p style={{ fontWeight: '600', fontSize: 'clamp(13px, 3vw, 15px)' }}>{formatDate()}</p>
        </div>
        <div>
          <p style={{ fontSize: 'clamp(12px, 3vw, 14px)', color: '#6b7280' }}>Payment Method</p>
          <p style={{ fontWeight: '600', fontSize: 'clamp(13px, 3vw, 15px)' }}>Cash/Card/UPI</p>
        </div>
        <div>
          <p style={{ fontSize: 'clamp(12px, 3vw, 14px)', color: '#6b7280' }}>Status</p>
          <p style={{ fontWeight: '600', color: '#16a34a', fontSize: 'clamp(13px, 3vw, 15px)' }}>Pending</p>
        </div>
      </div>

      {/* Items Table */}
      <div style={{ marginBottom: '20px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f3f4f6' }}>
              <th style={{ border: '1px solid #d1d5db', padding: '8px', textAlign: 'left', fontWeight: '600', color: '#1f2937', fontSize: 'clamp(10px, 2.5vw, 12px)' }}>S.No</th>
              <th style={{ border: '1px solid #d1d5db', padding: '8px', textAlign: 'left', fontWeight: '600', color: '#1f2937', fontSize: 'clamp(10px, 2.5vw, 12px)' }}>Item Description</th>
              <th style={{ border: '1px solid #d1d5db', padding: '8px', textAlign: 'center', fontWeight: '600', color: '#1f2937', fontSize: 'clamp(10px, 2.5vw, 12px)' }}>Qty</th>
              <th style={{ border: '1px solid #d1d5db', padding: '8px', textAlign: 'right', fontWeight: '600', color: '#1f2937', fontSize: 'clamp(10px, 2.5vw, 12px)' }}>Price (₹)</th>
              <th style={{ border: '1px solid #d1d5db', padding: '8px', textAlign: 'right', fontWeight: '600', color: '#1f2937', fontSize: 'clamp(10px, 2.5vw, 12px)' }}>GST (%)</th>
              <th style={{ border: '1px solid #d1d5db', padding: '8px', textAlign: 'right', fontWeight: '600', color: '#1f2937', fontSize: 'clamp(10px, 2.5vw, 12px)' }}>Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            {validItems.map((item, index) => {
              const totals = calculateItemTotal(item);
              return (
                <tr key={item.id} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb' }}>
                  <td style={{ border: '1px solid #d1d5db', padding: '8px', textAlign: 'center', fontSize: 'clamp(11px, 2.5vw, 13px)' }}>{index + 1}</td>
                  <td style={{ border: '1px solid #d1d5db', padding: '8px', fontSize: 'clamp(11px, 2.5vw, 13px)' }}>{item.name}</td>
                  <td style={{ border: '1px solid #d1d5db', padding: '8px', textAlign: 'center', fontSize: 'clamp(11px, 2.5vw, 13px)' }}>{item.quantity}</td>
                  <td style={{ border: '1px solid #d1d5db', padding: '8px', textAlign: 'right', fontSize: 'clamp(11px, 2.5vw, 13px)' }}>{parseFloat(item.price).toFixed(2)}</td>
                  <td style={{ border: '1px solid #d1d5db', padding: '8px', textAlign: 'right', fontSize: 'clamp(11px, 2.5vw, 13px)' }}>{item.gst}</td>
                  <td style={{ border: '1px solid #d1d5db', padding: '8px', textAlign: 'right', fontWeight: '600', fontSize: 'clamp(11px, 2.5vw, 13px)' }}>{totals.total.toFixed(2)}</td>
                </tr>
              );
            })}
            {validItems.length === 0 && (
              <tr>
                <td colSpan="6" style={{ border: '1px solid #d1d5db', padding: '20px', textAlign: 'center', color: '#6b7280', fontSize: 'clamp(12px, 3vw, 14px)' }}>
                  No items added to the bill
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <div style={{ width: '100%', maxWidth: '350px' }}>
          <div style={{ backgroundColor: '#f9fafb', borderRadius: '8px', padding: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(14px, 3.5vw, 16px)', marginBottom: '6px' }}>
              <span style={{ color: '#6b7280' }}>Subtotal:</span>
              <span style={{ fontWeight: '500' }}>₹{overallTotals.subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(14px, 3.5vw, 16px)', marginBottom: '6px' }}>
              <span style={{ color: '#6b7280' }}>CGST ({(overallTotals.gst / 2).toFixed(2)}):</span>
              <span style={{ fontWeight: '500' }}>₹{(overallTotals.gst / 2).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(14px, 3.5vw, 16px)', marginBottom: '6px' }}>
              <span style={{ color: '#6b7280' }}>SGST ({(overallTotals.gst / 2).toFixed(2)}):</span>
              <span style={{ fontWeight: '500' }}>₹{(overallTotals.gst / 2).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(16px, 4vw, 18px)', fontWeight: 'bold', color: '#2563eb', borderTop: '1px solid #d1d5db', paddingTop: '6px' }}>
              <span>Grand Total:</span>
              <span>₹{overallTotals.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '2px solid #1f2937', paddingTop: '16px', marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ fontSize: 'clamp(11px, 3vw, 13px)', color: '#6b7280', flex: 1, minWidth: '200px' }}>
            <p style={{ fontWeight: '600', marginBottom: '8px' }}>Terms & Conditions:</p>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: 'clamp(10px, 2.5vw, 11px)' }}>
              <li style={{ marginBottom: '3px' }}>• Payment should be made within 7 days of invoice date</li>
              <li style={{ marginBottom: '3px' }}>• Goods once sold will not be taken back</li>
              <li style={{ marginBottom: '3px' }}>• Subject to Mumbai jurisdiction</li>
              <li>• This is a computer-generated invoice</li>
            </ul>
          </div>
          <div style={{ textAlign: 'center', minWidth: '120px' }}>
            <p style={{ fontSize: 'clamp(11px, 3vw, 13px)', color: '#6b7280', marginBottom: '20px' }}>Authorized Signature</p>
            <div style={{ borderTop: '2px solid #9ca3af', width: 'clamp(100px, 25vw, 150px)' }}></div>
          </div>
        </div>
        <div style={{ textAlign: 'center', fontSize: 'clamp(11px, 3vw, 13px)', color: '#6b7280', marginTop: '16px' }}>
          <p>Thank you for your business! | Visit us at www.frameitstudio.com</p>
        </div>
      </div>
    </div>
  );
};

export default BillPreview;
