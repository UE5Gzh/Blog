export function addCopyButtons() {
  // Find all pre elements inside article.post
  document.querySelectorAll('article.post pre').forEach(pre => {
    // Skip if already has a copy button
    if (pre.querySelector('.copy-button')) return;

    // Create copy button
    const button = document.createElement('button');
    button.textContent = 'Copy';
    button.className = 'copy-button';
    button.setAttribute('aria-label', 'Copy code to clipboard');

    // Position the pre relatively so button can be absolute-positioned
    pre.style.position = 'relative';
    pre.appendChild(button);

    // Add click handler
    button.addEventListener('click', () => {
      const code = pre.querySelector('code');
      const text = code?.textContent || '';
      navigator.clipboard.writeText(text).then(() => {
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 2000);
      }).catch(() => {
        button.textContent = 'Error';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 2000);
      });
    });
  });
}
