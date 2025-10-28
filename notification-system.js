/**
 * ═══════════════════════════════════════════════════════════════
 * NOTIFICATION SYSTEM - Security Alerts & Push Notifications
 * ═══════════════════════════════════════════════════════════════
 * Features:
 * - Real-time security alerts
 * - Browser push notifications (with permission)
 * - In-app notification center
 * - Notification history
 * - Multiple notification types (success, warning, error, info)
 * - Sound alerts (optional)
 * - Auto-dismiss with customizable duration
 */

class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.notificationCounter = 0;
        this.maxNotifications = 100; // Max stored in history
        this.soundEnabled = this.getSoundPreference();
        this.pushEnabled = false;

        this.notificationTypes = {
            success: {
                icon: '✅',
                color: '#00ff00',
                sound: 'success'
            },
            warning: {
                icon: '⚠️',
                color: '#ffff00',
                sound: 'warning'
            },
            error: {
                icon: '❌',
                color: '#ff0000',
                sound: 'error'
            },
            info: {
                icon: 'ℹ️',
                color: '#00ffff',
                sound: 'info'
            },
            threat: {
                icon: '🛡️',
                color: '#ff00ff',
                sound: 'alert'
            }
        };

        this.init();
    }

    init() {
        // Create notification center UI
        this.createNotificationCenter();

        // Load saved notifications from localStorage
        this.loadNotifications();

        // Request push notification permission
        this.requestPushPermission();

        // Start demo security alerts (simulated threats)
        this.startSecurityAlertSimulation();

        console.log('🔔 Notification System initialized');
    }

    createNotificationCenter() {
        // Create notification container (top-right stack)
        const toastContainer = document.createElement('div');
        toastContainer.id = 'notification-toast-container';
        toastContainer.className = 'notification-toast-container';
        document.body.appendChild(toastContainer);

        // Create notification center button in header
        const header = document.querySelector('.cyber-header .header-content');
        if (!header) return;

        const notificationBtn = document.createElement('div');
        notificationBtn.className = 'notification-center-btn-container';
        notificationBtn.innerHTML = `
            <button class="notification-center-btn" id="notification-center-btn" aria-label="Notifications">
                <span class="notification-icon">🔔</span>
                <span class="notification-badge" id="notification-badge">0</span>
            </button>
        `;

        // Insert before nav or at end
        const langSwitcher = header.querySelector('.language-switcher-container');
        if (langSwitcher) {
            langSwitcher.after(notificationBtn);
        } else {
            const nav = header.querySelector('.nav-menu');
            if (nav) {
                header.insertBefore(notificationBtn, nav);
            } else {
                header.appendChild(notificationBtn);
            }
        }

        // Create notification center panel (dropdown)
        const notificationPanel = document.createElement('div');
        notificationPanel.id = 'notification-panel';
        notificationPanel.className = 'notification-panel';
        notificationPanel.innerHTML = `
            <div class="notification-panel-header">
                <h3>🔔 Notifications</h3>
                <div class="notification-panel-actions">
                    <button class="notification-action-btn" id="notification-sound-toggle" title="Toggle sound">
                        <span class="sound-icon">${this.soundEnabled ? '🔊' : '🔇'}</span>
                    </button>
                    <button class="notification-action-btn" id="notification-clear-all" title="Clear all">
                        <span>🗑️</span>
                    </button>
                    <button class="notification-action-btn" id="notification-close" title="Close">
                        <span>✖️</span>
                    </button>
                </div>
            </div>
            <div class="notification-panel-body" id="notification-panel-body">
                <div class="notification-empty">
                    <span class="empty-icon">📭</span>
                    <p>No notifications yet</p>
                </div>
            </div>
        `;
        document.body.appendChild(notificationPanel);

        // Add event listeners
        document.getElementById('notification-center-btn').addEventListener('click', () => {
            this.toggleNotificationPanel();
        });

        document.getElementById('notification-close').addEventListener('click', () => {
            this.closeNotificationPanel();
        });

        document.getElementById('notification-clear-all').addEventListener('click', () => {
            this.clearAllNotifications();
        });

        document.getElementById('notification-sound-toggle').addEventListener('click', () => {
            this.toggleSound();
        });

        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            const panel = document.getElementById('notification-panel');
            const btn = document.getElementById('notification-center-btn');
            if (panel.classList.contains('open') &&
                !panel.contains(e.target) &&
                !btn.contains(e.target)) {
                this.closeNotificationPanel();
            }
        });
    }

    show(title, message, type = 'info', duration = 5000) {
        const id = ++this.notificationCounter;
        const notification = {
            id,
            title,
            message,
            type,
            timestamp: Date.now(),
            read: false
        };

        // Add to notifications array
        this.notifications.unshift(notification);
        if (this.notifications.length > this.maxNotifications) {
            this.notifications.pop();
        }

        // Save to localStorage
        this.saveNotifications();

        // Update badge
        this.updateBadge();

        // Show toast notification
        this.showToast(notification, duration);

        // Add to notification center panel
        this.addToPanel(notification);

        // Play sound
        if (this.soundEnabled) {
            this.playSound(type);
        }

        // Try to show browser push notification
        if (this.pushEnabled && type === 'threat') {
            this.showPushNotification(notification);
        }

        return id;
    }

    showToast(notification, duration) {
        const container = document.getElementById('notification-toast-container');
        const typeConfig = this.notificationTypes[notification.type];

        const toast = document.createElement('div');
        toast.className = `notification-toast notification-${notification.type}`;
        toast.setAttribute('data-notification-id', notification.id);
        toast.innerHTML = `
            <div class="notification-toast-icon">${typeConfig.icon}</div>
            <div class="notification-toast-content">
                <div class="notification-toast-title">${notification.title}</div>
                <div class="notification-toast-message">${notification.message}</div>
            </div>
            <button class="notification-toast-close" aria-label="Close">✖</button>
        `;

        container.appendChild(toast);

        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 10);

        // Close button
        toast.querySelector('.notification-toast-close').addEventListener('click', () => {
            this.dismissToast(toast);
        });

        // Auto dismiss
        if (duration > 0) {
            setTimeout(() => {
                this.dismissToast(toast);
            }, duration);
        }
    }

    dismissToast(toast) {
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }

    addToPanel(notification) {
        const panelBody = document.getElementById('notification-panel-body');
        const emptyState = panelBody.querySelector('.notification-empty');
        if (emptyState) {
            emptyState.remove();
        }

        const typeConfig = this.notificationTypes[notification.type];
        const timeAgo = this.getTimeAgo(notification.timestamp);

        const item = document.createElement('div');
        item.className = `notification-item notification-${notification.type}${notification.read ? ' read' : ''}`;
        item.setAttribute('data-notification-id', notification.id);
        item.innerHTML = `
            <div class="notification-item-icon">${typeConfig.icon}</div>
            <div class="notification-item-content">
                <div class="notification-item-title">${notification.title}</div>
                <div class="notification-item-message">${notification.message}</div>
                <div class="notification-item-time">${timeAgo}</div>
            </div>
            <button class="notification-item-delete" aria-label="Delete" data-id="${notification.id}">
                <span>🗑️</span>
            </button>
        `;

        panelBody.insertBefore(item, panelBody.firstChild);

        // Mark as read when clicked
        item.addEventListener('click', (e) => {
            if (!e.target.closest('.notification-item-delete')) {
                this.markAsRead(notification.id);
            }
        });

        // Delete button
        item.querySelector('.notification-item-delete').addEventListener('click', (e) => {
            e.stopPropagation();
            this.deleteNotification(notification.id);
        });
    }

    toggleNotificationPanel() {
        const panel = document.getElementById('notification-panel');
        panel.classList.toggle('open');

        // Mark all as read when opened
        if (panel.classList.contains('open')) {
            this.markAllAsRead();
        }
    }

    closeNotificationPanel() {
        const panel = document.getElementById('notification-panel');
        panel.classList.remove('open');
    }

    updateBadge() {
        const badge = document.getElementById('notification-badge');
        const unreadCount = this.notifications.filter(n => !n.read).length;
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }

    markAsRead(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification) {
            notification.read = true;
            this.saveNotifications();
            this.updateBadge();

            const item = document.querySelector(`.notification-item[data-notification-id="${id}"]`);
            if (item) {
                item.classList.add('read');
            }
        }
    }

    markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
        this.saveNotifications();
        this.updateBadge();

        document.querySelectorAll('.notification-item').forEach(item => {
            item.classList.add('read');
        });
    }

    deleteNotification(id) {
        this.notifications = this.notifications.filter(n => n.id !== id);
        this.saveNotifications();
        this.updateBadge();

        const item = document.querySelector(`.notification-item[data-notification-id="${id}"]`);
        if (item) {
            item.classList.add('delete-animation');
            setTimeout(() => item.remove(), 300);
        }

        // Show empty state if no notifications
        if (this.notifications.length === 0) {
            const panelBody = document.getElementById('notification-panel-body');
            panelBody.innerHTML = `
                <div class="notification-empty">
                    <span class="empty-icon">📭</span>
                    <p>No notifications</p>
                </div>
            `;
        }
    }

    clearAllNotifications() {
        this.notifications = [];
        this.saveNotifications();
        this.updateBadge();

        const panelBody = document.getElementById('notification-panel-body');
        panelBody.innerHTML = `
            <div class="notification-empty">
                <span class="empty-icon">📭</span>
                <p>No notifications</p>
            </div>
        `;

        this.show('Notifications cleared', 'All notifications have been removed', 'success', 3000);
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        localStorage.setItem('cyberguard-notifications-sound', this.soundEnabled);

        const soundIcon = document.querySelector('#notification-sound-toggle .sound-icon');
        if (soundIcon) {
            soundIcon.textContent = this.soundEnabled ? '🔊' : '🔇';
        }

        this.show(
            this.soundEnabled ? 'Sound enabled' : 'Sound disabled',
            `Notification sounds are now ${this.soundEnabled ? 'on' : 'off'}`,
            'info',
            2000
        );
    }

    playSound(type) {
        // Create simple beep sounds using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // Different frequencies for different notification types
            const frequencies = {
                success: 800,
                warning: 600,
                error: 400,
                info: 700,
                threat: 500
            };

            oscillator.frequency.value = frequencies[type] || 700;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }

    async requestPushPermission() {
        if (!('Notification' in window)) {
            console.warn('Browser does not support push notifications');
            return;
        }

        if (Notification.permission === 'granted') {
            this.pushEnabled = true;
        } else if (Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission();
            this.pushEnabled = permission === 'granted';
        }
    }

    showPushNotification(notification) {
        if (!this.pushEnabled) return;

        const typeConfig = this.notificationTypes[notification.type];
        new Notification(notification.title, {
            body: notification.message,
            icon: '⚡', // You can replace with actual icon path
            badge: typeConfig.icon,
            tag: `cyberguard-${notification.id}`,
            requireInteraction: notification.type === 'threat'
        });
    }

    startSecurityAlertSimulation() {
        // Simulate random security alerts for demo purposes
        const alertMessages = [
            { title: 'Threat Blocked', message: 'Malware detected and quarantined', type: 'threat' },
            { title: 'Scan Complete', message: 'System scan completed - No threats found', type: 'success' },
            { title: 'Firewall Alert', message: 'Suspicious connection attempt blocked', type: 'warning' },
            { title: 'Update Available', message: 'New security definitions available', type: 'info' },
            { title: 'DDoS Attempt', message: 'DDoS attack detected and mitigated', type: 'threat' },
            { title: 'Password Alert', message: 'Weak password detected on account', type: 'warning' }
        ];

        // Show welcome notification
        setTimeout(() => {
            this.show(
                'CyberGuard Active',
                'Security monitoring initialized - Protection active',
                'success',
                4000
            );
        }, 2000);

        // Random security alerts every 15-45 seconds
        const scheduleNextAlert = () => {
            const delay = 15000 + Math.random() * 30000; // 15-45 seconds
            setTimeout(() => {
                const alert = alertMessages[Math.floor(Math.random() * alertMessages.length)];
                this.show(alert.title, alert.message, alert.type, 5000);
                scheduleNextAlert();
            }, delay);
        };

        scheduleNextAlert();
    }

    getTimeAgo(timestamp) {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);

        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        return `${Math.floor(seconds / 86400)}d ago`;
    }

    saveNotifications() {
        try {
            localStorage.setItem('cyberguard-notifications', JSON.stringify(this.notifications));
        } catch (e) {
            console.warn('Failed to save notifications to localStorage');
        }
    }

    loadNotifications() {
        try {
            const saved = localStorage.getItem('cyberguard-notifications');
            if (saved) {
                this.notifications = JSON.parse(saved);
                this.notificationCounter = Math.max(...this.notifications.map(n => n.id), 0);

                // Render saved notifications in panel
                this.notifications.forEach(notification => {
                    this.addToPanel(notification);
                });

                this.updateBadge();
            }
        } catch (e) {
            console.warn('Failed to load notifications from localStorage');
        }
    }

    getSoundPreference() {
        const saved = localStorage.getItem('cyberguard-notifications-sound');
        return saved === null ? true : saved === 'true';
    }
}

// Initialize notification system when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.notificationSystem = new NotificationSystem();
    });
} else {
    window.notificationSystem = new NotificationSystem();
}
