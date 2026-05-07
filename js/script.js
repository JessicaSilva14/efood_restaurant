class EfoodApp {
    constructor() {
        this.restaurants = [];
        this.currentRestaurant = null;
        this.currentMenuItem = null;
        this.init();
    }

    init() {
        this.loadRestaurants();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Modal de cardápio
        document.getElementById('modalClose').addEventListener('click', () => {
            this.closeMenuModal();
        });

        document.getElementById('modalOverlay').addEventListener('click', () => {
            this.closeMenuModal();
        });

        // Modal de compra
        document.getElementById('purchaseModalClose').addEventListener('click', () => {
            this.closePurchaseModal();
        });

        document.getElementById('purchaseModalOverlay').addEventListener('click', () => {
            this.closePurchaseModal();
        });

        // Formulário de compra
        document.getElementById('purchaseForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handlePurchase();
        });

        // Input de quantidade
        document.getElementById('quantity').addEventListener('input', (e) => {
            this.updateTotalPrice();
        });
    }

    async loadRestaurants() {
        try {
            const response = await fetch('https://api-ebac.vercel.app/api/efood/restaurantes');
            this.restaurants = await response.json();
            this.renderRestaurants();
        } catch (error) {
            console.error('Erro ao carregar restaurantes:', error);
            this.showError('Não foi possível carregar os restaurantes. Tente novamente mais tarde.');
        }
    }

    renderRestaurants() {
        const grid = document.getElementById('restaurantsGrid');
        grid.innerHTML = '';

        this.restaurants.forEach(restaurant => {
            const card = this.createRestaurantCard(restaurant);
            grid.appendChild(card);
        });
    }

    createRestaurantCard(restaurant) {
        const card = document.createElement('div');
        card.className = 'restaurant-card';
        card.innerHTML = `
            <img src="${restaurant.capa}" alt="${restaurant.titulo}" class="restaurant-image">
            <div class="restaurant-info">
                <h3 class="restaurant-name">${restaurant.titulo}</h3>
                <span class="restaurant-type">${restaurant.tipo}</span>
                <div class="restaurant-rating">
                    <span class="rating-stars">⭐</span>
                    <span class="rating-number">${restaurant.avaliacao}</span>
                </div>
                <p class="restaurant-description">${restaurant.descricao}</p>
                <button class="view-menu-btn" onclick="app.openMenuModal(${restaurant.id})">
                    Ver Cardápio
                </button>
            </div>
        `;
        return card;
    }

    openMenuModal(restaurantId) {
        this.currentRestaurant = this.restaurants.find(r => r.id === restaurantId);
        if (!this.currentRestaurant) return;

        const modal = document.getElementById('menuModal');
        const modalOverlay = document.getElementById('modalOverlay');
        
        // Preencher informações do restaurante
        document.getElementById('modalRestaurantImage').src = this.currentRestaurant.capa;
        document.getElementById('modalRestaurantImage').alt = this.currentRestaurant.titulo;
        document.getElementById('modalRestaurantName').textContent = this.currentRestaurant.titulo;
        document.getElementById('modalRestaurantDescription').textContent = this.currentRestaurant.descricao;
        
        // Renderizar cardápio
        this.renderMenuItems();
        
        // Mostrar modal
        modal.classList.remove('hidden');
        modalOverlay.classList.remove('hidden');
    }

    closeMenuModal() {
        const modal = document.getElementById('menuModal');
        const modalOverlay = document.getElementById('modalOverlay');
        
        modal.classList.add('hidden');
        modalOverlay.classList.add('hidden');
    }

    renderMenuItems() {
        const menuItemsContainer = document.getElementById('menuItems');
        menuItemsContainer.innerHTML = '';

        this.currentRestaurant.cardapio.forEach(item => {
            const menuItem = this.createMenuItem(item);
            menuItemsContainer.appendChild(menuItem);
        });
    }

    createMenuItem(item) {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <img src="${item.foto}" alt="${item.nome}" class="menu-item-image">
            <div class="menu-item-info">
                <h4 class="menu-item-name">${item.nome}</h4>
                <p class="menu-item-description">${item.descricao}</p>
                <p class="menu-item-portion">Porção: ${item.porcao}</p>
                <div class="menu-item-footer">
                    <span class="menu-item-price">R$ ${item.preco.toFixed(2)}</span>
                    <button class="buy-btn" onclick="app.openPurchaseModal(${JSON.stringify(item).replace(/"/g, '&quot;')})">
                        Comprar
                    </button>
                </div>
            </div>
        `;
        return menuItem;
    }

    openPurchaseModal(menuItem) {
        this.currentMenuItem = menuItem;
        
        const modal = document.getElementById('purchaseModal');
        const modalOverlay = document.getElementById('purchaseModalOverlay');
        
        // Preencher informações do item
        document.getElementById('purchaseItem').innerHTML = `
            <h4>${menuItem.nome}</h4>
            <p>${menuItem.descricao}</p>
            <p><strong>Porção:</strong> ${menuItem.porcao}</p>
            <p><strong>Preço unitário:</strong> R$ ${menuItem.preco.toFixed(2)}</p>
        `;
        
        // Resetar formulário
        document.getElementById('purchaseForm').reset();
        document.getElementById('quantity').value = 1;
        this.updateTotalPrice();
        
        // Mostrar modal
        modal.classList.remove('hidden');
        modalOverlay.classList.remove('hidden');
    }

    closePurchaseModal() {
        const modal = document.getElementById('purchaseModal');
        const modalOverlay = document.getElementById('purchaseModalOverlay');
        
        modal.classList.add('hidden');
        modalOverlay.classList.add('hidden');
    }

    updateTotalPrice() {
        const quantity = parseInt(document.getElementById('quantity').value) || 1;
        const totalPrice = this.currentMenuItem.preco * quantity;
        document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
    }

    async handlePurchase() {
        const formData = {
            customerName: document.getElementById('customerName').value,
            customerPhone: document.getElementById('customerPhone').value,
            deliveryAddress: document.getElementById('deliveryAddress').value,
            quantity: parseInt(document.getElementById('quantity').value),
            observations: document.getElementById('observations').value,
            item: this.currentMenuItem,
            restaurant: this.currentRestaurant,
            totalPrice: this.currentMenuItem.preco * parseInt(document.getElementById('quantity').value)
        };

        try {
            // Simulação de envio do pedido
            console.log('Pedido enviado:', formData);
            
            // Mostrar mensagem de sucesso
            this.showSuccess('Pedido realizado com sucesso! Em breve você receberá sua comida.');
            
            // Fechar modal
            this.closePurchaseModal();
            this.closeMenuModal();
            
        } catch (error) {
            console.error('Erro ao processar pedido:', error);
            this.showError('Não foi possível processar seu pedido. Tente novamente.');
        }
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 6px;
            color: white;
            font-weight: 500;
            z-index: 3000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        if (type === 'success') {
            notification.style.backgroundColor = '#27ae60';
        } else {
            notification.style.backgroundColor = '#e74c3c';
        }

        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Inicializar aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.app = new EfoodApp();
});

// Adicionar estilos para notificações
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
`;
document.head.appendChild(notificationStyles);
