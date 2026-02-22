(function() {
    const STORAGE_KEY = 'theme';
    const DARK_CLASS = 'dark-mode';

    // ১. থিম ডিটারমাইন করা (Saved Preference > System Preference > Default Light)
    const getTheme = () => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) return saved;
        } catch (e) { console.warn('Storage blocked'); }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const currentTheme = getTheme();

    // ২. সাদা ঝিলিক (FOUC) বন্ধ করতে DOM লোড হওয়ার আগেই html-এ ক্লাস বসানো
    if (currentTheme === 'dark') {
        document.documentElement.classList.add(DARK_CLASS);
    }

    const applyTheme = (theme) => {
        const isDark = theme === 'dark';
        document.body.classList.toggle(DARK_CLASS, isDark);
        
        const btn = document.getElementById('themeToggle');
        if (btn) {
            const icon = btn.querySelector('i');
            if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
    };

    // ৩. DOM পুরোপুরি তৈরি হলে ইভেন্ট লিসেনার সেট করা
    document.addEventListener('DOMContentLoaded', () => {
        applyTheme(getTheme());

        const btn = document.getElementById('themeToggle');
        if (btn) {
            btn.addEventListener('click', () => {
                const newTheme = document.body.classList.contains(DARK_CLASS) ? 'light' : 'dark';
                applyTheme(newTheme);
                try {
                    localStorage.setItem(STORAGE_KEY, newTheme);
                } catch (e) {}
            });
        }
    });
})();

