// Business Card Manager Application

// Data storage in localStorage
class CardStorage {
    constructor() {
        this.storageKey = 'businessCards';
    }

    // Get all cards from storage
    getCards() {
        const cards = localStorage.getItem(this.storageKey);
        return cards ? JSON.parse(cards) : [];
    }

    // Save cards to storage
    saveCards(cards) {
        localStorage.setItem(this.storageKey, JSON.stringify(cards));
    }

    // Add a new card
    addCard(card) {
        const cards = this.getCards();
        card.id = Date.now().toString(); // Use timestamp as ID
        cards.push(card);
        this.saveCards(cards);
        return card;
    }

    // Update an existing card
    updateCard(updatedCard) {
        const cards = this.getCards();
        const index = cards.findIndex(card => card.id === updatedCard.id);
        if (index !== -1) {
            cards[index] = updatedCard;
            this.saveCards(cards);
            return true;
        }
        return false;
    }

    // Delete a card
    deleteCard(id) {
        const cards = this.getCards();
        const newCards = cards.filter(card => card.id !== id);
        if (newCards.length !== cards.length) {
            this.saveCards(newCards);
            return true;
        }
        return false;
    }

    // Search cards by query string
    searchCards(query) {
        if (!query) return this.getCards();
        
        const cards = this.getCards();
        const lowerQuery = query.toLowerCase();
        
        return cards.filter(card => 
            (card.name && card.name.toLowerCase().includes(lowerQuery)) ||
            (card.company && card.company.toLowerCase().includes(lowerQuery)) ||
            (card.position && card.position.toLowerCase().includes(lowerQuery)) ||
            (card.email && card.email.toLowerCase().includes(lowerQuery)) ||
            (card.phone && card.phone.includes(lowerQuery)) ||
            (card.address && card.address.toLowerCase().includes(lowerQuery)) ||
            (card.note && card.note.toLowerCase().includes(lowerQuery))
        );
    }
}

// UI Controller
class UIController {
    constructor() {
        this.cardStorage = new CardStorage();
        this.currentCards = [];
        
        // DOM Elements
        this.form = document.getElementById('card-form');
        this.cardsContainer = document.getElementById('cards-container');
        this.searchInput = document.getElementById('search-input');
        this.modal = document.getElementById('card-detail-modal');
        this.modalContent = document.getElementById('card-detail-content');
        this.closeModalBtn = document.querySelector('.close');
        
        // Initialize
        this.setupEventListeners();
        this.renderCards();
    }
    
    // Set up all event listeners
    setupEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });
        
        // Search input
        this.searchInput.addEventListener('input', () => {
            this.handleSearch();
        });
        
        // Close modal
        this.closeModalBtn.addEventListener('click', () => {
            this.closeModal();
        });
        
        // Click outside modal to close
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
    }
    
    // Handle form submission
    handleFormSubmit() {
        const newCard = {
            name: document.getElementById('name').value,
            company: document.getElementById('company').value,
            position: document.getElementById('position').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            note: document.getElementById('note').value,
            meetingDate: document.getElementById('meeting-date').value
        };
        
        // Add card to storage
        this.cardStorage.addCard(newCard);
        
        // Clear form
        this.form.reset();
        
        // Update display
        this.renderCards();
    }
    
    // Handle search functionality
    handleSearch() {
        const query = this.searchInput.value.trim();
        this.currentCards = this.cardStorage.searchCards(query);
        this.renderCards(this.currentCards);
    }
    
    // Render cards in the container
    renderCards() {
        const cards = this.cardStorage.getCards();
        this.currentCards = cards;
        
        // Clear container
        this.cardsContainer.innerHTML = '';
        
        if (cards.length === 0) {
            this.cardsContainer.innerHTML = '<p>名刺がありません。新しい名刺を追加してください。</p>';
            return;
        }
        
        // Create card elements
        cards.forEach(card => {
            const cardElement = this.createCardElement(card);
            this.cardsContainer.appendChild(cardElement);
        });
    }
    
    // Create a card element
    createCardElement(card) {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.dataset.id = card.id;
        
        // Format meeting date if exists
        let formattedDate = '';
        if (card.meetingDate) {
            const date = new Date(card.meetingDate);
            formattedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
        }
        
        cardElement.innerHTML = `
            <h3>${card.name || '名前なし'}</h3>
            <div class="company">${card.company || ''}</div>
            <div class="details">
                ${card.position ? `<div>${card.position}</div>` : ''}
                ${card.email ? `<div>${card.email}</div>` : ''}
                ${card.phone ? `<div>${card.phone}</div>` : ''}
            </div>
            ${card.meetingDate ? `<div class="meeting-date">初回面会: ${formattedDate}</div>` : ''}
        `;
        
        // Add click event to show details
        cardElement.addEventListener('click', () => {
            this.showCardDetails(card);
        });
        
        return cardElement;
    }
    
    // Show card details in modal
    showCardDetails(card) {
        // Format meeting date if exists
        let formattedDate = '';
        if (card.meetingDate) {
            const date = new Date(card.meetingDate);
            formattedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
        }
        
        this.modalContent.innerHTML = `
            <div class="card-detail">
                <h2>${card.name || '名前なし'}</h2>
                
                <div class="card-detail-row">
                    <span class="card-detail-label">会社名:</span>
                    <span>${card.company || '未設定'}</span>
                </div>
                
                <div class="card-detail-row">
                    <span class="card-detail-label">役職:</span>
                    <span>${card.position || '未設定'}</span>
                </div>
                
                <div class="card-detail-row">
                    <span class="card-detail-label">メールアドレス:</span>
                    <span>${card.email || '未設定'}</span>
                </div>
                
                <div class="card-detail-row">
                    <span class="card-detail-label">電話番号:</span>
                    <span>${card.phone || '未設定'}</span>
                </div>
                
                <div class="card-detail-row">
                    <span class="card-detail-label">住所:</span>
                    <span>${card.address || '未設定'}</span>
                </div>
                
                <div class="card-detail-row">
                    <span class="card-detail-label">メモ:</span>
                    <span>${card.note || '未設定'}</span>
                </div>
                
                <div class="card-detail-row">
                    <span class="card-detail-label">初回面会日:</span>
                    <span>${formattedDate || '未設定'}</span>
                </div>
                
                <div class="card-actions">
                    <button class="btn btn-primary edit-card" data-id="${card.id}">編集</button>
                    <button class="btn btn-secondary delete-card" data-id="${card.id}">削除</button>
                </div>
            </div>
        `;
        
        // Add event listeners for edit and delete buttons
        const editBtn = this.modalContent.querySelector('.edit-card');
        const deleteBtn = this.modalContent.querySelector('.delete-card');
        
        editBtn.addEventListener('click', () => {
            this.editCard(card);
        });
        
        deleteBtn.addEventListener('click', () => {
            this.deleteCard(card.id);
        });
        
        // Show modal
        this.modal.style.display = 'block';
    }
    
    // Edit a card
    editCard(card) {
        // Fill form with card data
        document.getElementById('name').value = card.name || '';
        document.getElementById('company').value = card.company || '';
        document.getElementById('position').value = card.position || '';
        document.getElementById('email').value = card.email || '';
        document.getElementById('phone').value = card.phone || '';
        document.getElementById('address').value = card.address || '';
        document.getElementById('note').value = card.note || '';
        document.getElementById('meeting-date').value = card.meetingDate || '';
        
        // Close modal
        this.closeModal();
        
        // Delete the old card
        this.cardStorage.deleteCard(card.id);
        
        // Focus on form
        document.getElementById('name').focus();
        
        // Update display
        this.renderCards();
    }
    
    // Delete a card
    deleteCard(id) {
        if (confirm('この名刺を削除してもよろしいですか？')) {
            this.cardStorage.deleteCard(id);
            this.closeModal();
            this.renderCards();
        }
    }
    
    // Close the modal
    closeModal() {
        this.modal.style.display = 'none';
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UIController();
    
    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    }
});
