{
    const giftSidebarEl = document.querySelector('.gift-sidebar')
    function openSidebar () {   
        giftSidebarEl.classList.add('gift-sidebar-open')
    }
    function closeSidebar () {
        giftSidebarEl.classList.remove('gift-sidebar-open')
    }
    const btnGiftEl = document.getElementById('btn-gift')
    btnGiftEl.addEventListener('click', openSidebar)
    
    const btnCloseGiftEl = document.querySelector('#btn-close-gift')
    btnCloseGiftEl.addEventListener('click', closeSidebar) 
    }
    
    const fetchProducts = () => {
        const groupsRootEl = document.querySelector('#groups-root')
       fetch('http://127.0.0.1:5500/productslist.json') 
        .then(res => res.json())
        .then(data => {
            groupsRootEl.innerHTML = ''
            data.groups.forEach((group) => {
                const groupSectionEl = getSectionElement(group)
                groupsRootEl.appendChild(groupSectionEl)
            })
        })
        .catch(() => {
            groupsRootEl.innerHTML = '<p class="error-alert">Falha ao buscar produtos. <br>Por favor, tente novamente.</p>'
        })
    }
    const getSectionElement = (group) => {
        const sectionEl = document.createElement('section')
        const sectionTitleEl = document.createElement('h2')
        sectionTitleEl.textContent = group.name
        sectionEl.appendChild(sectionTitleEl)
        const productsGridEl =  document.createElement('div')
        productsGridEl.classList.add('products-grid')
        sectionEl.appendChild(productsGridEl)
        group.products.forEach((product) => {
            const cardWrapEl = document.createElement('article')
            cardWrapEl.classList.add('card')
            cardWrapEl.innerHTML = 
                `<img src="${product.image}" width="316" height="193" alt="
                           ${product.name}"/><div class="card-content">
                           ${product.name ? `<h4>
                           ${product.name}</h4>` : ''}
                           ${product.description ? `<p>
                           ${product.description}</p>` : ''}
                           ${product.points ? `<h5 class="points">Por 
                           ${product.points} pontos</h5>` : ''}
                <button class="btn">Resgatar</button>
            </div>`
    
            const btnAddGiftEl = cardWrapEl.querySelector('button')
            btnAddGiftEl.addEventListener('click', () => {
                addToCart(product)
            })
            productsGridEl.appendChild(cardWrapEl)
        })
    
        return sectionEl
    }
    fetchProducts()
    
    const productsCart = []
    const addToCart = newProduct => {
        const productIndex = productsCart.findIndex(
            item => item.id === newProduct.id
        )
        if (productIndex === -1) {
            productsCart.push({
            ...newProduct,
            qty: 1
            })
        } else {
            productsCart[productIndex].qty++
        }
    
        handleCartUpdate()
    }
    const handleCartUpdate = () => {
        if (productsCart.length > 0) {
            const btnCartBadgeEl = document.querySelector('.btn-cart-badge')
            btnCartBadgeEl.classList.add('btn-cart-badge-show')
            let total = 0
            productsCart.forEach(product => {
                total = total + product.qty
            })
            btnCartBadgeEl.textContent = total
        }
    }
    addToCart()