// js/app.js

// 1. Disable Right-Click
document.addEventListener('contextmenu', event => event.preventDefault());

// 2. Disable Zooming (Pinch to zoom)
document.addEventListener('touchmove', function (event) {
    if (event.scale !== 1) { event.preventDefault(); }
}, { passive: false });

// 3. Tab Switching Logic (Used in Login & My Tournaments)
function switchTab(tabId, groupClass, btnClass, activeBtnClass) {
    // Hide all tabs
    document.querySelectorAll('.' + groupClass).forEach(el => el.classList.add('hidden'));
    // Show selected tab
    document.getElementById(tabId).classList.remove('hidden');
    
    // Reset button styles
    document.querySelectorAll('.' + btnClass).forEach(btn => {
        btn.classList.remove(...activeBtnClass.split(' '));
        btn.classList.add('text-gray-400', 'border-transparent');
    });
    
    // Set active button style
    event.currentTarget.classList.remove('text-gray-400', 'border-transparent');
    event.currentTarget.classList.add(...activeBtnClass.split(' '));
}

// 4. Placeholder logic for joining tournament (To be replaced with Firebase later)
function joinTournament(btn) {
    let originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
    btn.disabled = true;
    
    setTimeout(() => {
        alert("Redirecting to payment/Firebase logic...");
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 1500);
}
