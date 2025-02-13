document.addEventListener('DOMContentLoaded', () => {
    // Load all sections
    const sections = ['home', 'about', 'experience', 'projects', 'hobbies'];
    
    sections.forEach(async (section) => {
        try {
            const response = await fetch(`sections/${section}.html`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const content = await response.text();
            document.getElementById(section).innerHTML = content;
        } catch (error) {
            console.error(`Error loading ${section} section:`, error);
        }
    });
}); 