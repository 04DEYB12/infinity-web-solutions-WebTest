function showAlert(message, type = 'success') {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'fixed top-4 right-4 z-[9999] space-y-3 w-80';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    const toastId = 'toast-' + Date.now();
    const typeStyles = {
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800'
    };
    
    const iconMap = {
        success: 'check-circle',
        error: 'error',
        warning: 'error',
        info: 'info-circle'
    };
    
    const toastType = type in typeStyles ? type : 'info';
    const progressBarColor = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500'
    }[toastType];
    
    // Add toast HTML with progress bar
    toast.className = `relative overflow-hidden ${typeStyles[toastType]} border rounded-lg shadow-xl transform transition-all duration-300 ease-in-out opacity-0 translate-x-8`;
    toast.style.position = 'relative';
    toast.style.zIndex = '10000';
    toast.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    toast.id = toastId;
    
    // Progress bar container
    const progressBar = document.createElement('div');
    progressBar.className = 'h-1 w-full bg-opacity-20 absolute top-0 left-0';
    progressBar.style.background = 'rgba(0,0,0,0.1)';
    
    // Animated progress bar
    const progress = document.createElement('div');
    progress.className = `h-full ${progressBarColor} transition-all duration-100`;
    progress.style.width = '100%';
    progress.style.transitionTimingFunction = 'linear';
    progressBar.appendChild(progress);
    
    // Toast content
    const toastContent = document.createElement('div');
    toastContent.className = 'p-4 flex items-start';
    toastContent.innerHTML = `
        <i class='bx bx-${iconMap[toastType]} text-xl mr-3 mt-0.5'></i>
        <div class='flex-1'>
            <div class='font-medium'>${type.charAt(0).toUpperCase() + type.slice(1)}</div>
            <div class='text-sm mt-1'>${message}</div>
        </div>
        <button type='button' class='ml-2 text-gray-500 hover:text-gray-700' onclick='document.getElementById("${toastId}").remove()'>
            <i class='bx bx-x text-xl'></i>
        </button>
    `;
    
    toast.appendChild(progressBar);
    toast.appendChild(toastContent);
    
    // Add to container
    toastContainer.prepend(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.remove('opacity-0', 'translate-x-8');
        toast.classList.add('opacity-100');
    }, 10);
    
    // Start progress bar animation
    const duration = 5000; // 5 seconds
    const startTime = Date.now();
    
    const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, duration - elapsed);
        const percentage = (remaining / duration) * 100;
        
        progress.style.width = `${percentage}%`;
        
        if (remaining > 0) {
            progress.animationFrame = requestAnimationFrame(updateProgress);
        }
    };
    
    updateProgress();
    
    // Auto-remove after delay
    const autoRemove = setTimeout(() => {
        cancelAnimationFrame(progress.animationFrame);
        toast.classList.add('opacity-0', 'translate-x-8');
        setTimeout(() => toast.remove(), 300);
    }, duration);
    
    // Pause auto-remove and progress on hover
    toast.addEventListener('mouseenter', () => {
        clearTimeout(autoRemove);
        cancelAnimationFrame(progress.animationFrame);
        progress.style.transition = 'width 0.3s ease';
        progress.style.width = '100%';
    });
    
    toast.addEventListener('mouseleave', () => {
        const remainingTime = Math.max(0, duration - (Date.now() - startTime));
        progress.style.transition = `width ${remainingTime}ms linear`;
        progress.style.width = '0%';
        
        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-x-8');
            setTimeout(() => toast.remove(), 300);
        }, remainingTime);
    });
}