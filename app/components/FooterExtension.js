<div className="payment-logo-placeholder">
  <img 
    src="/images/payment/DEIN-LOGO.svg" 
    alt="Zahlungsart" 
    className="h-8 w-auto opacity-70 hover:opacity-100 transition"
    onError={(e) => {
      e.target.style.display = 'none';
      e.target.parentElement.innerHTML = '<div class="w-16 h-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">NAME</div>';
    }}
  />
</div>