import React, { useState, useRef } from 'react';
import { ArrowLeft, Eye, FileText, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OrderForm from '../components/OrderForm';
import BillPreview from '../components/BillPreview';

const BillingPage = () => {
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [orderItems, setOrderItems] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const generateBillNumber = () => {
    return `INV-${Date.now().toString().slice(-6)}`;
  };

  const handleCreateBill = () => {
    const validItems = orderItems.filter(item => item.name && item.price);
    if (validItems.length === 0) {
      alert('Please add at least one item to create a bill!');
      return;
    }
    setShowPreview(true);
  };

  const handleBackToForm = () => {
    setShowPreview(false);
  };

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            {/* Back to Form Button - Left aligned with proper spacing */}
            <div className="mb-8">
              <button
                onClick={handleBackToForm}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Form
              </button>
            </div>
            
            {/* Bill Preview Heading - Centered with proper spacing */}
            <div className="text-center">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Bill Preview</h1>
              <p className="text-slate-600">Review your bill details before downloading</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
            <div className="mb-6 flex justify-end">
              <button
                onClick={async (e) => {
                  try {
                    const billElement = document.getElementById('bill-preview');
                    if (!billElement) {
                      alert('Bill preview not found. Please try again.');
                      return;
                    }

                    // Show loading state
                    const button = e.currentTarget;
                    const originalText = button.innerText;
                    button.innerText = 'Generating PDF...';
                    button.disabled = true;

                    // Temporarily replace modern CSS classes with compatible ones
                    const originalClasses = billElement.className;
                    billElement.className = billElement.className.replace(/bg-\[#[0-9a-fA-F]+\]/g, 'bg-white').replace(/text-\[#[0-9a-fA-F]+\]/g, 'text-black');

                    const opt = {
                      margin: 10,
                      filename: `FrameIt_Invoice_${generateBillNumber()}.pdf`,
                      image: { type: 'jpeg', quality: 0.98 },
                      html2canvas: { 
                        scale: 2, 
                        useCORS: true, 
                        logging: false,
                        backgroundColor: '#ffffff',
                        allowTaint: true
                      },
                      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                    };
                    
                    // Dynamic import of html2pdf.js
                    const html2pdf = await import('html2pdf.js');
                    await html2pdf.default().set(opt).from(billElement).save();
                    
                    // Restore original classes
                    billElement.className = originalClasses;
                    
                    // Reset button
                    button.innerText = originalText;
                    button.disabled = false;
                    
                  } catch (error) {
                    console.error('Error generating PDF:', error);
                    alert('Failed to generate PDF. Please try again.');
                    
                    // Reset button
                    if (e.currentTarget) {
                      e.currentTarget.innerText = 'Download PDF';
                      e.currentTarget.disabled = false;
                    }
                  }
                }}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>
            <BillPreview 
              customerInfo={customerInfo} 
              orderItems={orderItems}
              billNumber={generateBillNumber()}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2 flex items-center justify-center gap-3">
            <FileText className="w-8 h-8 text-indigo-600" />
            Billing System
          </h1>
          <p className="text-slate-600">Create professional bills with GST calculations</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <OrderForm
            customerInfo={customerInfo}
            setCustomerInfo={setCustomerInfo}
            orderItems={orderItems}
            setOrderItems={setOrderItems}
          />

          {/* Right Side - Actions and Preview */}
          <div className="space-y-6">
            {/* Create Bill Button */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <button
                onClick={handleCreateBill}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg shadow-lg"
              >
                <Eye className="w-5 h-5" />
                Create Bill Preview
              </button>
              <p className="text-sm text-slate-500 mt-3 text-center">
                Click to generate a professional bill with all details
              </p>
            </div>

            {/* Quick Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Customer:</span>
                  <span className="font-medium">{customerInfo.name || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Items Added:</span>
                  <span className="font-medium">{orderItems.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Valid Items:</span>
                  <span className="font-medium">
                    {orderItems.filter(item => item.name && item.price).length}
                  </span>
                </div>
                {orderItems.some(item => item.name && item.price) && (
                  <>
                    <hr className="my-3" />
                    <div className="flex justify-between">
                      <span className="text-slate-600">Subtotal:</span>
                      <span className="font-medium">
                        ₹{orderItems.reduce((sum, item) => {
                          if (item.name && item.price) {
                            return sum + (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1);
                          }
                          return sum;
                        }, 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Est. GST:</span>
                      <span className="font-medium">
                        ₹{orderItems.reduce((sum, item) => {
                          if (item.name && item.price) {
                            const price = parseFloat(item.price) || 0;
                            const quantity = parseInt(item.quantity) || 1;
                            const gst = (parseFloat(item.gst) || 0) / 100;
                            return sum + (price * quantity * gst);
                          }
                          return sum;
                        }, 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-indigo-600">
                      <span>Est. Total:</span>
                      <span>
                        ₹{orderItems.reduce((sum, item) => {
                          if (item.name && item.price) {
                            const price = parseFloat(item.price) || 0;
                            const quantity = parseInt(item.quantity) || 1;
                            const gst = (parseFloat(item.gst) || 0) / 100;
                            return sum + (price * quantity * (1 + gst));
                          }
                          return sum;
                        }, 0).toFixed(2)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">How to Create Bill</h3>
              <ol className="space-y-2 text-sm text-blue-800">
                <li className="flex gap-2">
                  <span className="font-semibold">1.</span>
                  <span>Fill in customer information</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">2.</span>
                  <span>Add items with price and quantity</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">3.</span>
                  <span>Set GST rate for each item</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">4.</span>
                  <span>Click "Create Bill Preview" to generate</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">5.</span>
                  <span>Download the bill as PDF</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
