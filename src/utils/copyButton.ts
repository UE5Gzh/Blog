export function addCopyButtons() {
  // Find all pre elements inside article.post
  document.querySelectorAll('article.post pre').forEach(pre => {
    // Skip if already has a copy button
    if (pre.querySelector('.copy-button')) return;

    // Create copy button
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.setAttribute('aria-label', 'Copy code to clipboard');
    button.innerHTML = `
      <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;

    // Position the pre relatively so button can be absolute-positioned
    pre.style.position = 'relative';
    pre.appendChild(button);

    // Add click handler
    button.addEventListener('click', () => {
      const code = pre.querySelector('code');
      const text = code?.textContent || '';
      navigator.clipboard.writeText(text).then(() => {
        button.classList.add('copied');
        setTimeout(() => {
          button.classList.remove('copied');
        }, 2000);
      }).catch(() => {
        button.classList.add('error');
        setTimeout(() => {
          button.classList.remove('error');
        }, 2000);
      });
    });
  });
}
