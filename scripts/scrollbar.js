// Modern custom scrollbar
const style = document.createElement("style");

style.textContent = `
/* Firefox */
* {
    scrollbar-width: thin;
    scrollbar-color: #06b6d4 #1f2937;
}

/* Chrome, Edge, Safari */
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

::-webkit-scrollbar-track {
    background: #111827;
    border-radius: 9999px;
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(
        180deg,
        #22d3ee 0%,
        #0891b2 100%
    );
    border-radius: 9999px;
    border: 2px solid #111827;
    transition: background 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(
        180deg,
        #67e8f9 0%,
        #06b6d4 100%
    );
}

::-webkit-scrollbar-corner {
    background: #111827;
}
`;

document.head.appendChild(style);