/* КАСТОМНЫЕ СТИЛИ */
/* рекламная компания ajax шаблон --------------------------------------- */
function ajaxTag(templateId) {
    //console.log(templateId);

    let teaserId = document.getElementById('teaser_id').value;
    console.log(teaserId);

    $.ajax({
        url:"/ads/ajax_template",
        type: "POST",
        data: {
            templateId: templateId,
            teaserId: Number(teaserId),
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: (data) => {
            //console.log(data);
            document.getElementById('ajax_template_block').innerHTML = data;
        }
    })
}
/* рекламная компания ajax шаблон ----------------------------------- end */









/* checkbox на странице авторизации / регистрации */
function checkboxRemember() {
    let rememberCheckbox = document.getElementById("remember");
    rememberCheckbox.classList.toggle('custom-form-check_custom-checked');
}
/* checkbox на странице авторизации / регистрации end */


/* удаление продукта / обновление продукта / добавление продукта в корзину ------ */
function addToCart(productId) {
    selectedElement = document.getElementById('product-item_'+productId); // выбранный продукт
    quantityElement = document.getElementById('catalogQuantityProduct_'+productId); // элемент количества sku

    let quantityBlockContainer = document.getElementById('cart_add-plus_minus-container');
    if(quantityBlockContainer != undefined) { // если элемент есть, значит на странице продукта
        cartAddButton = document.getElementById('cartAddButton');
        cartAddButton.classList.add('display-none'); // скрываем кнопку добавления товара

        quantityBlockContainer = document.getElementById('cart_add-plus_minus-container');
        quantityBlockContainer.classList.remove('display-none'); // показываем переключалку колличества товара

        quantity = quantityElement.innerHTML; // получаем указанное колличество
    } else { // на странице каталога
        quantityElement = document.getElementById('catalogQuantityProduct_'+productId);
        quantity = quantityElement.innerHTML; // получаем указанное колличество
    }

    selectedAttrValues = getSelectedAttributeValues(selectedElement);

    $.ajax({ // добавляем в корзину
        url:"/cart/add",
        type: "POST",
        async: false,
        data: {
            id: productId,
            quantity: quantity,
            selectedAttrValues: selectedAttrValues, // выбранные значения атрибутов
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: (data) => {
            //console.log(data);
        }
    })

    // добавление продукта в header ------------------
    // получаем информацию о продукте
    let product = document.getElementById('product-item_'+productId);
    let name = product.getAttribute('data-name');
    let price = product.getAttribute('data-price');
    let img = product.getAttribute('data-img');

    // добавляем html блок
    let hfCartProductsWrapper = document.getElementById('hf_cart-products_wrapper');
    let template = document.getElementById('hf_cart-product-template'); // берем шаблон карточки продукта для мини корзины
    hfCartProductsWrapper.innerHTML = template.outerHTML + hfCartProductsWrapper.innerHTML; // добавляем шаблон продукта в мини корзину
    let newBlockProductHF = hfCartProductsWrapper.querySelector('.cart-item'); // получаем шаблон продукта, который уже в структуре html

    $.ajax({ // получаем названия атрибутов и имена значений атрибутов
        url:"/cart/get/skuinfo",
        type: "POST",
        data: {
            id: productId,
            selectedAttrValues: selectedAttrValues, // выбранные значения атрибутов
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: (data) => {
            attrsNames = JSON.parse(data)[0]; // имена аттрибутов добавляемого sku
            valuessNames = JSON.parse(data)[1]; // имена значений добавляемого sku
            skuId = JSON.parse(data)[2]; // sku id

            for(i=0; i < attrsNames.length; i++) { // записываем в мини корзину
                newBlockProductHF.querySelector('.hf_cart-product_sku-values').innerHTML =
                newBlockProductHF.querySelector('.hf_cart-product_sku-values').innerHTML +
                '<p>&nbsp;&nbsp;&nbsp;<b>'+attrsNames[i]+': </b>'+valuessNames[i]+'</p>';
            }

            newBlockProductHF.querySelector('.quantity-input').setAttribute('data-id', skuId); // добавляем sku id в элемент с колличеством
            document.getElementById('catalogQuantityProduct_'+productId).setAttribute('data-sku-id', skuId); // добавляем sku id в элемент с колличеством
            newBlockProductHF.setAttribute('id', 'hf_cart-product-'+skuId); // присваиваем новый id обертке
            newBlockProductHF.querySelector('.remove-btn').setAttribute('onclick', 'removeProductCart('+skuId+')'); // добавляем onclick с функцией удаления
        }
    })

    // добавляем значения в блок
    newBlockProductHF.classList.remove('display-none'); // показываем блок добавленного продукта
    newBlockProductHF.removeAttribute('id'); // удаляем старый id

    newBlockProductHF.querySelector('.item-title').innerHTML = name; // добавляем имя продукта
    newBlockProductHF.querySelector('.for-inner-price').innerHTML = price; // добавляем цену
    newBlockProductHF.querySelector('.quantity-input').setAttribute('data-sku-values', selectedAttrValues); // добавляем значения атрибутов sku
    newBlockProductHF.querySelector('.quantity-input').setAttribute('data-product-id', productId); // добавляем id продукта
    newBlockProductHF.querySelector('.hf-img-teg').setAttribute('src', img); // добавляем картинку

    miniCartChanges();
}

/* проверка, установленна ли комбинация --------- */
function checkCombinationSet(productId) {
    selectedProduct = productElement = document.getElementById('product-item_'+productId);
    selectedValues = selectedProduct.querySelectorAll('.active');

    attributesProductWrapper = document.getElementById('attributes-wrapper_product-'+productId); // обертка атрибутов выбранного продукта
    attributesElements = attributesProductWrapper.querySelectorAll('.attribute_container');

    if(selectedValues.length == attributesElements.length) { // если комбинация установленна
        return true;
    } else {
        return false;
    }
}
/* проверка, установленна ли комбинация ----- end */

function addToCartButtonCatalog(productId) {
    let combinationSet = checkCombinationSet(productId); // проверка, установлена ли комбинация
    if(combinationSet == true) { // если установленна комбинация
        quantityElements = document.getElementsByClassName('cart_add-plus_minus-count'); // получаем все элементы с колличеством на странице
        for(i=0;  i < quantityElements.length; i++) { // находим колличество элемента которого добавляют в корзину
            if(quantityElements[i].getAttribute('data-id') == productId) {
                cartAddButton = document.getElementById('cartAddButton_'+productId);
                quantityBlockContainer = document.getElementById('cart_add-plus_minus-container_'+productId);
                cartAddButton.classList.add('display-none'); // скрываем кнопку добавления товара
                quantityBlockContainer.classList.remove('display-none'); // показываем переключалку колличесвта товара
            }
        }

        addToCart(productId);
    }
}

function cartUpdate(productId) { // обновление продуктов (страницы коталог / продукт)
    selectedElement = document.getElementById('product-item_'+productId); // выбранный продукт
    quantityBlock = document.getElementById('catalogQuantityProduct_'+productId);
    quantity = Number(quantityBlock.innerHTML); // приводим к числу и прибавляем единицу

    selectedAttrValues = getSelectedAttributeValues(selectedElement);

    $.ajax({
        url:"/cart/update",
        type: "POST",
        data: {
            id: productId, // передаем id продукта
            quantity: quantity, // передаем количество продукта
            selectedAttrValues: selectedAttrValues, // выбранные значения атрибутов
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: (data) => {
            //console.log(data);
        }
    })

    changeQuantityInAllElements(quantityBlock);

    miniCartChanges();
}

function updateProductInCart(clickedElement) { // обновление продуктов (страница корзины / мини корзина)
    // если значение input < 1
    if(clickedElement.value < 1) {
        clickedElement.value = '1'; // меняем на 1
    }

    quantity = clickedElement.value; // получаем сумму продукта
    productId = clickedElement.getAttribute('data-product-id'); // получаем id продукта
    selectedAttrValues = clickedElement.getAttribute('data-sku-values'); // получаем значения выбраного sku

    // обновляем корзину
    $.ajax({
        url: "/cart/update",
        type: "POST",
        data: {
            id: productId,
            quantity: quantity,
            selectedAttrValues: selectedAttrValues, // выбранные значения атрибутов
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: (data) => {
            //console.log(data); // ответ от php
        }
    })

    changeQuantityInAllElements(clickedElement);

    // обновляем сумму продукта
    let pricesElements = document.getElementsByClassName('product-price_get-price');
    let prices = [];
    for(let i=0; i < pricesElements.length; i++) { // получаем цены продуктов в корзине
        prices.push(pricesElements[i].getAttribute('data-price'));
    }

    // получаем элементы с суммами продуктов
    let quantitiesInput = document.getElementsByClassName('quantity_get-value');

    // формируем массив с суммами продуктов
    let quantities = [];
    for(let i=1; i < quantitiesInput.length; i++) {
        quantities.push(quantitiesInput[i].value);
    }

    let productSum = []; // суммы продуктов
    for(let i=0; i < pricesElements.length; i++) {
        productSum.push(quantities[i] * prices[i]); // умножаем цену продукта на его колличество
    }

    // получаем символ активной валюты
    currencySymbol = document.getElementById('currencySelectElement').getAttribute('data-symbol');

    let productSumElements = document.getElementsByClassName('product-sum_get-sum'); // элементы с суммой продукта
    for(let i=0; i < productSumElements.length; i++) {
        //console.log(productSum[i]);
        productSumElements[i].innerHTML = (productSum[i]).toFixed(2)+currencySymbol; // обновляем сумму продукты
    }

    // обновляем итоговую сумму
    let totalSumElement = document.getElementById('total-price_total');
    let totalSum = 0; // итоговая сумма
    for(let i = 0; i < productSum.length; i++){
        totalSum = totalSum + productSum[i]; // складываем сумму за продукты
    }

    if(totalSumElement != null) {
        totalSumElement.innerHTML = (totalSum).toFixed(2)+currencySymbol; // обновляем итоговую сумму
    }

    miniCartChanges();
}

function changeQuantityInAllElements(clickedElement = null) { // обновляем и связываем колличество товаров в разных местах верстки

    productId = clickedElement.getAttribute('data-product-id');
    skuId = clickedElement.getAttribute('data-id'); // получаем id sku
    positionProductQuantityElem = clickedElement.getAttribute('data-position'); // смотрим откуда был клик

    // если клик из каталога, меняем количество в мини корзине
    if(positionProductQuantityElem == 'catalog') {
        changingProductQuantityElements = document.getElementsByClassName('quantity_get-value'); // элементы колличества sku в корзине
        for (let i=0; i < changingProductQuantityElements.length; i++) {
            if(changingProductQuantityElements[i].getAttribute('data-id') == clickedElement.getAttribute('data-sku-id')){
                changingProductQuantityElements[i].setAttribute('value', Number(clickedElement.innerHTML));
                changingProductQuantityElements[i].value = Number(clickedElement.innerHTML);
            }
        }
    }

    // если клик из мини корзины, меняем в каталоге
    if(positionProductQuantityElem == 'header') {
        changingProductQuantityElement = document.getElementById('catalogQuantityProduct_'+productId);
        if(changingProductQuantityElement.getAttribute('data-sku-id') == skuId) { // если активен переключатель количества нужного sku
            changingProductQuantityElement.innerHTML = Number(clickedElement.value); // записываем количество
        }
    }

    // связываем количества продуктов в корзине и в мини корзине
    if(positionProductQuantityElem == 'cart' || positionProductQuantityElem == 'header-cart') {
        changingProductQuantityElements = document.getElementsByClassName('quantity_get-value');
        for (let i=0; i < changingProductQuantityElements.length; i++) {
            if(changingProductQuantityElements[i].getAttribute('data-id') == clickedElement.getAttribute('data-id')){
                changingProductQuantityElements[i].value = clickedElement.value;
            }
        }
    }
}

function removeProductCart(skuId) {
    $.ajax({ // удаляем sku из корзины в бэк энде
        url:"/cart/remove",
        type: "POST",
        data: {
            id: skuId, // передаем id продукта
            //selectedAttrValues: selectedAttrValues, // передаем выбранные значения атрибутов
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: (data) => {
            productId = JSON.parse(data)['product_id']; // id продукта

            // сбрасываем добавленные продукты в блоке товара (каталог)
            catalogQuantityProduct = document.getElementById('catalogQuantityProduct_'+productId);
            quantityElementSkuId = catalogQuantityProduct.getAttribute('data-sku-id');
            if(quantityElementSkuId == skuId) {
                cartAddButton = document.getElementById('cartAddButton_'+productId);
                cartAddButton.classList.remove('display-none'); // показываем кнопку добавления товара
                cartAddButton.classList.add('display-block'); // показываем кнопку добавления товара

                quantityBlockContainer = document.getElementById('cart_add-plus_minus-container_'+productId);
                quantityBlockContainer.classList.remove('display-block'); // скрываем переключалку колличества товара
                quantityBlockContainer.classList.add('display-none'); // скрываем переключалку колличества товара
            }

            //console.log(catalogQuantityProduct);
            /*if(catalogQuantityProduct != null) { // сбрасываем колличество (походу стало не нужно после того как переделал под sku)
                catalogQuantityProduct.innerHTML = 1;
                catalogProductQuantityBlock = document.getElementById('cart_add-plus_minus-container_'+skuId).classList.add('display-none'); // скрываем кнопки - + обновления товара
                catalogProductBuyButton = document.getElementById('cartAddButton_'+skuId).classList.remove('display-none'); // показываем кнопку добавления в корзину
            }*/
        }
    })

    // удаляем html блок продукта на странице корзины
    productBlockInCart = document.getElementById('productBlockInCart_'+skuId);
    if(productBlockInCart != undefined) {
        productBlockInCart.remove();
    }

    // удаляем html блок продукта в мини корзине header
    productBlockInCart = document.getElementById('hf_cart-product-'+skuId);
    if(productBlockInCart != undefined) {
        productBlockInCart.remove();
    }

    miniCartChanges();
}

function cartMinusProduct(productId) { // минус единица продукта
    quantityBlockContainer = document.getElementById('cart_add-plus_minus-container_'+productId); // блок с колличеством добовляемого товара
    quantityBlock = document.getElementById('catalogQuantityProduct_'+productId); // элемент с колличеством добавляемого товара
    skuId = quantityBlock.getAttribute('data-sku-id'); // sku id

    if(Number(quantityBlock.innerHTML) > 1) {
        quantityBlock.innerHTML = Number(quantityBlock.innerHTML) - 1; // приводим к числу и отнимаем единицу

        cartUpdate(productId);
    } else {
        cartAddButton = document.getElementById('cartAddButton');
        if(cartAddButton == undefined) { // на странице каталога
            quantityBlockContainer.classList.add('display-none'); // скрываем переключалку колличесвта товара
            cartAddButton = document.getElementById('cartAddButton_'+productId);
            cartAddButton.classList.remove('display-none'); // показываем кнопку добавления товара
        } else { // на странице продукта
            quantityBlockContainer = document.getElementById('cart_add-plus_minus-container');
            cartAddButton.classList.remove('display-none'); // показываем кнопку добавления товара
            quantityBlockContainer.classList.add('display-none'); // скрываем переключалку колличесвта товара
        }

        removeProductCart(skuId);
    }
}
function cartPlusProduct(productId) { // плюс единица продукта
    quantityBlock = document.getElementById('catalogQuantityProduct_'+productId);
    quantityBlock.innerHTML = Number(quantityBlock.innerHTML) + 1; // приводим к числу и прибавляем единицу

    cartUpdate(productId);
}

function miniCartChanges() {
    miniCartProductsWrapper = document.getElementById('hf_cart-products_wrapper'); // обертка продуктов мини корзины
    miniCartProductBlocks = miniCartProductsWrapper.querySelectorAll('.cart-item'); // блоки продуктов мини корзины
    emptyMiniCartBlock = document.getElementById('mini-cart_empty-wrapper'); // заглушка пустой коризны

    if(miniCartProductBlocks.length > 0) { // если в корзине есть продукты
        // меняем количество на иконке мини корзины
        miniCartCountIcon = document.getElementById('mini-cart_count').innerHTML = miniCartProductBlocks.length;

        // считаем общую сумму продуктов в корзине и записываем итог в мини корзину
        let miniCartTotalSum = 0; // общая сумма
        for (let i = 0; i < miniCartProductBlocks.length; i++) { // подсчитываем сумму
            productPrice = miniCartProductBlocks[i].querySelector('.color-black').innerHTML;
            productQuantity = miniCartProductBlocks[i].querySelector('.quantity_get-value').value;

            //console.log(parseFloat(productPrice) * productQuantity);
            miniCartTotalSum = miniCartTotalSum + parseFloat(productPrice) * productQuantity;
        }
        currency = document.getElementById('currencySelectElement').getAttribute('data-symbol'); // получаем символ выбранной валюты валюты
        miniCartTotalSumElement = document.getElementById('mini-cart_total-price').innerHTML = (miniCartTotalSum).toFixed(2)+currency; // записываем итоговую сумму в мини корзину

        // скрываем заглушку пустой корзины и показываем элементы корзины
        if(emptyMiniCartBlock.classList.contains('display-none') == false) {
            emptyMiniCartBlock.classList.add('display-none'); // скрываем заглушку

            document.getElementById('mini-cart_top-info').classList.remove('display-none'); // показываем топ мини корзины
            document.getElementById('mini-cart_bottom-info').classList.remove('display-none'); // показываем боттом мини корзины
        }
    } else { // если в корзине нет продуктов
        // меняем количество на иконке мини корзины
        miniCartCountIcon = document.getElementById('mini-cart_count').innerHTML = miniCartProductBlocks.length;

        // показываем заглушку пустой корзины и скрываем элементы корзины
        emptyMiniCartBlock.classList.remove('display-none'); // показываем заглушку

        document.getElementById('mini-cart_top-info').classList.add('display-none'); // скрываем топ мини корзины
        document.getElementById('mini-cart_bottom-info').classList.add('display-none'); // скрываем боттом мини корзины
    }
}
/* удаление продукта / обновление продукта / добавление продукта в корзину / каталог -- end */

/* SKU functions ========================================================================== */
/* получаем выбранные атрибуты ---------------------- */
function getSelectedAttributeValues() { // получаем выбранные атрибуты
    // получаем все выбранные значения атрибутов
    selectedAttrValuesElements = selectedElement.getElementsByClassName('product-attribute_element'); // все значения атрибутов элемента

    selectedAttrValuesArray = []; // массив с выбранными значениями атрибута
    for(i=0; i < selectedAttrValuesElements.length; i++) {
        if(selectedAttrValuesElements[i].classList.contains('active') == true) {
            selectedAttrValuesArray.push(selectedAttrValuesElements[i].getAttribute('data-value'));
        }
    }

    // делаем из массива с выбранными значениями атрибутов строку
    selectedAttrValues = selectedAttrValuesArray.join(',');

    return selectedAttrValues;
}
/* получаем выбранные атрибуты ------------------ end */

function checkSkuInCart(productId) { // узнаем из php session есть ли выбранная комбинация в корзине
    selectedElement = document.getElementById('product-item_'+productId);
    attributes = selectedElement.getElementsByClassName('attribute_container');

    activeValuesElements = selectedElement.querySelectorAll('.active'); // получаем выбранные значения атрибутов
    if(activeValuesElements.length == attributes.length) { // если выбранны все атрибуты
        activeValues = []; // массив с выбранными значениями
        for(i=0; i < activeValuesElements.length; i++) {
            activeValues.push(activeValuesElements[i].getAttribute('data-value'));
        }

        activeValuesString = activeValues.join(','); // делаем из массива строку

        // проверяем наличие sku в корзине
        let theResponse = null;
        $.ajax({
            url:"/cart/check",
            type: "POST",
            async: false,
            data: {
                productId: productId,
                activeValuesString: activeValuesString, // передаем активные значения
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: (data) => {
                //console.log(data);
                theResponse = data;
            }
        })

        return theResponse;
    }
}
/* SKU functions ====================================================================== end */



/* admin panel - show image ------------------------------------ */
function adminShowImage(input) { // предворительный просмотр изображения
    let image = input.files[0];
    let reader = new FileReader(); // ридер файлов

    reader.readAsDataURL(image); // считываем файл как url

    reader.onload = function() { // выводим изображение
        let imgShowElement = document.getElementById('imgShowElement');
        imgShowElement.setAttribute('src', reader.result)
    };
}
function adminEditImg() {
    imageShowElement = document.getElementById('image_show_input').click();
}
function adminDeleteImg() {
    document.getElementById('image_show_input').value = '';
    document.getElementById('imgShowElement').setAttribute('src', 'http://storm-shop.loc/media/photos/photo5.jpg');

    deleteImageDB(); // удаление изображения в бд (страница редактирования)
}
function deleteImageDB() {
    // удаление изображения в бд (страница редактирования)
    delete_image = document.getElementById('delete_image');
    delete_image.setAttribute('value', 'yes');
}
/* admin panel - show image -------------------------------- end */



/* функции ----------------------------------------------------- */
function clickElem(info) { // имитация клика по элементу
    document.getElementById(info).click();
}
/* функции ------------------------------------------------- end */

/* текстовый редактор summernote ------------------------------- */
jQuery(function ($) {
    $("#text").summernote({
        height: 350,
        toolbar:[
            [ 'style', [ 'style' ] ],
            [ 'font', [ 'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear'] ],
            [ 'fontname', [ 'fontname' ] ],
            [ 'fontsize', [ 'fontsize' ] ],
            [ 'color', [ 'color' ] ],
            [ 'para', [ 'ol', 'ul', 'paragraph', 'height' ] ],
            [ 'table', [ 'table' ] ],
            [ 'insert', [ 'link'] ],
            [ 'view', [ 'undo', 'redo', 'fullscreen', 'codeview', 'help' ] ]
        ],
    });
});
jQuery(function ($) {
    $("#text_2").summernote({
        height: 350,
        toolbar:[
            [ 'style', [ 'style' ] ],
            [ 'font', [ 'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear'] ],
            [ 'fontname', [ 'fontname' ] ],
            [ 'fontsize', [ 'fontsize' ] ],
            [ 'color', [ 'color' ] ],
            [ 'para', [ 'ol', 'ul', 'paragraph', 'height' ] ],
            [ 'table', [ 'table' ] ],
            [ 'insert', [ 'link'] ],
            [ 'view', [ 'undo', 'redo', 'fullscreen', 'codeview', 'help' ] ]
        ],
    });
});
/* текстовый редактор summernote --------------------------- end */

/* манипуляции свойствами на странице продукта --- */
function attributeChange(data) {
    productId = data[0];
    valueId = data[1];
    attributeId = data[2];
    //console.log(data);

    selectedElement = document.getElementById('product_'+productId+'_value_'+valueId).classList.add('active');// делаем активным элемент по которому кликнули

    attributesProductWrapper = document.getElementById('attributes-wrapper_product-'+productId); // обертка атрибутов выбранного продукта
    allAttributeValuesElements =  attributesProductWrapper.getElementsByClassName('product-attribute_element'); // все элементы значений свойств продукта

    attributeValueSet = false; // проверка, выбран ли атрибут
    for (i=0; i < allAttributeValuesElements.length; i++) {
        if(allAttributeValuesElements[i].classList.contains('attribute-value_disabled')) {
            attributeValueSet = true;
            break
        }
    }

    $.ajax({ // получаем комбинируемые sku c выбранным аттрибутом
        url:"/catalog/sku",
        type: "POST",
        data: {
            productId: productId, // передаем id продукта
            valueId: valueId, // передаем id свойства
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: (data) => {
            // формаруем два массива (1: с выбранной комбинацией. 2: с привязанными к выбранному значению значениями)
            // массив 1 (с выбранной комбинацией)
            splitDoubleArray = data.split('],[');
            raplaceOneArray = splitDoubleArray[0].replace('[', ''); // обрезаем лишнее
            split1OneArray = raplaceOneArray+']'; // массив с выбранной комбинацией

            // массив 2 (с привязанными к выбранному значению значения)
            raplaceTwoArray = splitDoubleArray[1].replace(']', ''); // обрезаем лишнее
            attachedValuesString = raplaceTwoArray.replace(']', ''); // строка с привязанными к выбранному значению значениями
            attachedValues = attachedValuesString.split(','); // массив с привязанными к выбранному значению значениями

            // ==================================================================
            // получаем свойства в виде массива которые комбинируются с выбранным
            valuesBeforeReplaceSymbols = split1OneArray.split('","');
            combinableValues = []; // массив с комбинируемыми свойствами с выбранным свойством
            for (i=0; i < valuesBeforeReplaceSymbols.length; i++) {
                valuesBeforeReplaceSymbols_1 = valuesBeforeReplaceSymbols[i].replace('["', ''); // убираем лишние символы в начале строки
                valuesBeforeReplaceSymbols_2 = valuesBeforeReplaceSymbols_1.replace('"]', ''); // убираем лишние символы в конце строки
                combinableValues.push(valuesBeforeReplaceSymbols_2);
            }

            if(attributeValueSet == false) { // если аттрибут выбирается первый раз на странице
                // находим в html комбинируемые свойства и устанавливаем как комбинируемые
                for(i=0; i < allAttributeValuesElements.length; i++) {
                    if(combinableValues.indexOf(allAttributeValuesElements[i].getAttribute('data-value')) != -1 == true) { // если значение аттрибута комбинируется
                        allAttributeValuesElements[i].classList.remove('attribute-value_disabled');
                    } else { // если не комбинируется
                        allAttributeValuesElements[i].classList.remove('active');
                        allAttributeValuesElements[i].classList.add('attribute-value_disabled');
                    }
                }
            } else { // если выбранный аттрибут уже не первый выбранный на странице
                if(document.getElementById('product_'+productId+'_value_'+valueId).classList.contains('attribute-value_disabled')) { // если кликнутый аттрибут вне комбинации
                    // находим в html комбинируемые свойства и устанавливаем как комбинируемые
                    for(i=0; i < allAttributeValuesElements.length; i++) {
                        if(combinableValues.indexOf(allAttributeValuesElements[i].getAttribute('data-value')) != -1 == true) { // если значение аттрибута комбинируется
                            allAttributeValuesElements[i].classList.remove('attribute-value_disabled');
                        } else { // если не комбинируется
                            allAttributeValuesElements[i].classList.remove('active');
                            allAttributeValuesElements[i].classList.add('attribute-value_disabled');
                        }
                    }
                } else { // если выбранный аттрибут в комбинации
                    // получаем элементы значений кликнутого атрибута
                    clickedAttributeElements = document.getElementById('product_'+productId+'_attribute_'+attributeId).getElementsByClassName('product-attribute_element');
                    // делаем не активными все кроме кликнутого значения
                    for(i=0; i < clickedAttributeElements.length; i++) {
                        if(clickedAttributeElements[i].getAttribute('id') != 'product_'+productId+'_value_'+valueId) {
                            clickedAttributeElements[i].classList.remove('active');
                        }
                    }

                    // формируем массив с привязаными значениями там что бы елементы массива были вида value_{{id}} как id значений
                    attachedValuesUpdatedArray = []; // обновленный массив
                    for(i=0; i < attachedValues.length; i++) {
                        attachedValuesUpdatedArray.push('product_'+productId+'_value_'+attachedValues[i]);
                    }

                    // получаем элементы значений паралельного атрибута
                    productAttributesWrapper = document.getElementById('attributes-wrapper_product-'+productId); // получаем обертку атрибутов продукта
                    attributeContainers = productAttributesWrapper.getElementsByClassName('attribute_container'); // получаем все атрибуты продукта
                    //console.log(attributeContainers);
                    for(i=0; i < attributeContainers.length; i++) { // находим паралельные атрибуты
                        if(attributeContainers[i].getAttribute('id') != ('product_'+productId+'_attribute_'+attributeId)) { // находим паралельные атрибуты
                            valuesParallelAttrElems = attributeContainers[i].getElementsByClassName('product-attribute_element'); // значения паралельного атрибута
                            for(i=0; i < valuesParallelAttrElems.length; i++) {
                                if(attachedValuesUpdatedArray.indexOf(valuesParallelAttrElems[i].getAttribute('id')) != -1) { // если есть в массиве с привязаными значениями
                                    valuesParallelAttrElems[i].classList.remove('attribute-value_disabled'); // устанавливаем как комбинируемое
                                } else {
                                    valuesParallelAttrElems[i].classList.add('attribute-value_disabled'); // устанавливаем как не комбинируемое
                                }
                            }
                        }
                    }
                }
            }

            skuInCartAndQuantity = checkSkuInCart(productId); // проверяем если ли sku в корзине (ответ true или false)

            if(skuInCartAndQuantity != undefined) { // если полная комбинация и получен ответ от checkSkuInCart (true или false)
                skuInCartAndQuantityData = skuInCartAndQuantity.replace('[', '').replace(']', '').split(',');
                skuInCart = skuInCartAndQuantityData[0]; // ответ от php sku в корзине: true или false
                skuInCartQuantity = skuInCartAndQuantityData[1]; // колличество sku в корзине
                skuId = skuInCartAndQuantityData[2]; // id sku

                cartAddButton = document.getElementById('cartAddButton_'+productId);
                cartAddPlusMinusContainer = document.getElementById('cart_add-plus_minus-container_'+productId);
                productQuantityBlock = document.getElementById('catalogQuantityProduct_'+productId); // элемент с количеством sku

                if(skuInCart == 'true') { // если sku есть в корзине
                    cartAddButton.classList.remove('display-block');
                    cartAddButton.classList.add('display-none');
                    cartAddPlusMinusContainer.classList.remove('display-none');
                    cartAddPlusMinusContainer.classList.add('display-block');

                    productQuantityBlock.innerHTML = skuInCartQuantity; // записываем колличество sku в корзине
                } else if (skuInCart == 'false') { // если sku нет в корзине
                    cartAddButton.classList.remove('display-none');
                    cartAddButton.classList.add('display-block');
                    cartAddPlusMinusContainer.classList.remove('display-block');
                    cartAddPlusMinusContainer.classList.add('display-none');

                    productQuantityBlock.innerHTML = 1; // сбрасываем число элемента количества
                }

                productQuantityBlock.setAttribute('data-sku-id', skuId); // записываем id sku в блок с колличеством sku

                //console.log(productQuantityBlock.innerHTML);
            }

            // скрываем контейнер апдейта, если не установленна полная комбинация
            let combinationSet = checkCombinationSet(productId); // проверка, установлена ли комбинация

            if(combinationSet == false) { // если комбинация не установленна
                cartAddButton = document.getElementById('cartAddButton_'+productId);
                cartAddButton.classList.remove('display-none'); // показываем кнопку добавления товара
                cartAddButton.classList.add('display-block'); // показываем кнопку добавления товара

                quantityBlockContainer = document.getElementById('cart_add-plus_minus-container_'+productId);
                quantityBlockContainer.classList.remove('display-block'); // скрываем переключалку колличесвта товара
                quantityBlockContainer.classList.add('display-none'); // скрываем переключалку колличесвта товара
            }
        }
    });
}
/* манипуляции свойствами на странице продукта end */

/* ajax виды ------------------------------------------------ */
function searchView(view) {
    $.ajax({ // устанавливаем вид в сессию
        url:"/search/view",
        type: "POST",
        data: {
            view: view,
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: (data) => {
            //console.log(data);
        }
    })
}

function viewAdmin() { // вид личного кабинета
    document.getElementById('page-container').classList.toggle('sidebar-o');
    //console.log(view);
    $.ajax({
        url:"/admin/view",
        type: "POST",
        /*data: {
            view: view,
        },*/
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: (data) => {
            //console.log(data);
        }
    })
}

function catalogView(view) {
    $.ajax({ // устанавливаем вид в сессию
        url:"/catalog/view",
        type: "POST",
        data: {
            view: view,
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: (data) => {
            //console.log(data);
        }
    })

    catalogViewChangeProductIds(view);
}
function catalogViewChangeProductIds(view) {
    productsGrid = document.getElementsByClassName('product-item_view-grid');
    productsList = document.getElementsByClassName('product-item_view-list');

    attributesWrapperGrid = document.getElementsByClassName('attributes-wrapper_product-grid');
    attributesWrapperList = document.getElementsByClassName('attributes-wrapper_product-list');

    attributeContainerGrid = document.getElementsByClassName('attribute_container-grid');
    attributeContainerList = document.getElementsByClassName('attribute_container-list');

    attributeValueGrid = document.getElementsByClassName('attribute_value-grid');
    attributeValueList = document.getElementsByClassName('attribute_value-list');

    PlusMinusContainerGrid = document.getElementsByClassName('cart_add-plus_minus-container-grid');
    PlusMinusContainerList = document.getElementsByClassName('cart_add-plus_minus-container-list');

    quantityElementGrig = document.getElementsByClassName('catalogQuantityProduct-grid');
    quantityElementList = document.getElementsByClassName('catalogQuantityProduct-list');

    buttonAddGrid = document.getElementsByClassName('cartAddButton-grid');
    buttonAddList = document.getElementsByClassName('cartAddButton-list');



    if(view == 'grid') {
        if(productsList[0].getAttribute('id') != '') { // переключаем ids в view grid если еще не переключены
            for(i=0; i < productsGrid.length; i++) { // обертки продукта
                productsGrid[i].setAttribute('id', productsList[i].getAttribute('id'));
                productsList[i].setAttribute('id', '');
            }

            for(i=0; i < attributesWrapperGrid.length; i++) { // обертки атрибутов
                attributesWrapperGrid[i].setAttribute('id', attributesWrapperList[i].getAttribute('id'));
                attributesWrapperList[i].setAttribute('id', '');
            }

            for(i=0; i < attributeContainerGrid.length; i++) { // контейнеры атрибутов
                attributeContainerGrid[i].setAttribute('id', attributeContainerList[i].getAttribute('id'));
                attributeContainerList[i].setAttribute('id', '');
            }

            for(i=0; i < attributeValueGrid.length; i++) { // значения атрибутов
                attributeValueGrid[i].setAttribute('id', attributeValueList[i].getAttribute('id'));
                attributeValueList[i].setAttribute('id', '');
            }

            for(i=0; i < PlusMinusContainerGrid.length; i++) { // переключатели количества
                PlusMinusContainerGrid[i].setAttribute('id', PlusMinusContainerList[i].getAttribute('id'));
                PlusMinusContainerList[i].setAttribute('id', '');
            }

            for(i=0; i < quantityElementGrig.length; i++) { // элементы количества
                quantityElementGrig[i].setAttribute('id', quantityElementList[i].getAttribute('id'));
                quantityElementList[i].setAttribute('id', '');
            }

            for(i=0; i < buttonAddGrid.length; i++) { // кнопки добавления
                buttonAddGrid[i].setAttribute('id', buttonAddList[i].getAttribute('id'));
                buttonAddList[i].setAttribute('id', '');
            }
        }
    } else if (view == 'list') {
        if(productsGrid[0].getAttribute('id') != '') { // переключаем ids в view list если еще не переключены
            for(i=0; i < productsList.length; i++) { // обертки продукта
                productsList[i].setAttribute('id', productsGrid[i].getAttribute('id'));
                productsGrid[i].setAttribute('id', '');
            }

            for(i=0; i < attributesWrapperList.length; i++) { // обертки атрибутов
                attributesWrapperList[i].setAttribute('id', attributesWrapperGrid[i].getAttribute('id'));
                attributesWrapperGrid[i].setAttribute('id', '');
            }

            for(i=0; i < attributeContainerList.length; i++) { // контейнеры атрибутов
                attributeContainerList[i].setAttribute('id', attributeContainerGrid[i].getAttribute('id'));
                attributeContainerGrid[i].setAttribute('id', '');
            }

            for(i=0; i < attributeValueList.length; i++) { // значения атрибутов
                attributeValueList[i].setAttribute('id', attributeValueGrid[i].getAttribute('id'));
                attributeValueGrid[i].setAttribute('id', '');
            }

            for(i=0; i < PlusMinusContainerList.length; i++) { // переключатели количества
                PlusMinusContainerList[i].setAttribute('id', PlusMinusContainerGrid[i].getAttribute('id'));
                PlusMinusContainerGrid[i].setAttribute('id', '');
            }

            for(i=0; i < quantityElementList.length; i++) { // элементы количества
                quantityElementList[i].setAttribute('id', quantityElementGrig[i].getAttribute('id'));
                quantityElementGrig[i].setAttribute('id', '');
            }

            for(i=0; i < buttonAddList.length; i++) { // кнопки добавления
                buttonAddList[i].setAttribute('id', buttonAddGrid[i].getAttribute('id'));
                buttonAddGrid[i].setAttribute('id', '');
            }
        }
    }
}
/* ajax виды --------------------------------------------------------- end */

/* desires --------------------------------------------------------------- */
function desire(productId) {
    $.ajax({
        url:"/desire",
        type: "POST",
        data: {
            productId: productId,
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: (data) => {
            let response = data;
            countElement = document.getElementById('wishlist_count-element');
            if(response == '"add"') {
                countElement.innerHTML = Number(countElement.innerHTML) +1;
            } else if(response == '"delete"') {
                countElement.innerHTML = Number(countElement.innerHTML) -1;
            }
        }
    })

    desireActive(productId);
}

function desireActive(productId) {
    clickedElem = document.getElementById('desire_'+productId);
    if(clickedElem != null) {
        clickedElem.classList.toggle('active');
    } else {
        clickedElem = document.getElementById('personal_desire_'+productId);
        clickedElem.remove();
    }
}

function viewPersonal(view) { // вид личного кабинета
    $.ajax({
        url:"/personal/view",
        type: "POST",
        data: {
            view: view,
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: (data) => {
            //console.log(data);
        }
    })
}
/* desires ----------------------------------------------------------- end */

/* filter ---------------------------------------------------------------- */
function filter(clichedElement) { // фильтр
    // манипуляции фильтром во фронте
    filterWrapper = document.getElementById('filter_attributes-wrapper');
    attributeId = clichedElement.getAttribute('data-attribute-id');
    attributeWrapper = document.getElementById('filter_'+attributeId);

    attributeValueElements = attributeWrapper.querySelectorAll('.filter_attribute-value'); // элементы значений выбранного атрибута
    for (i=0; i < attributeValueElements.length; i++) { // делаем элементы значений, кроме выбранного атрибута, не активными
        if(attributeValueElements[i].getAttribute('data-value-id') == clichedElement.getAttribute('data-value-id')) { // если кликнутый элемент

            if(clichedElement.classList.contains('active') == true) { // если элемент уже активен
                attributeValueElements[i].classList.remove('active');
            } else { // если элемент еще не активен, делаем активным
                attributeValueElements[i].classList.add('active');
            }

        } else {
            attributeValueElements[i].classList.remove('active');
        }
    }

    activeElements = filterWrapper.querySelectorAll('.active'); // выбранные значения аттрибутов
    activeValueIds = []; // массив с ids выбранных значений
    for(i=0; i < activeElements.length; i++) {
        activeValueIds.push(activeElements[i].getAttribute('data-value-id'));
    }

    // определение страницы, категории и бренда для фильтрации в зависимости от местоположения
    resultWrapper = document.getElementById('catalog-filter_content');
    let position = resultWrapper.getAttribute('data-position');
    let categoryId = resultWrapper.getAttribute('data-category-id');
    let brandId = resultWrapper.getAttribute('data-brand-id');


    //console.log(position);
    //console.log(categoryId);
    //console.log(brandId);

    if(activeValueIds.length > 0) { // если выбран минимум одно значение атрибута
        $.ajax({
            url:"/catalog/filter",
            type: "POST",
            data: {
                position: position,
                categoryId: categoryId,
                brandId: brandId,
                valueIds: activeValueIds.join(),
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: (data) => {
                //console.log(data);
                document.getElementById('catalog-filter_content').innerHTML = data;
            }
        })
    } else { // если значения атрибутов не выбранны, сброс фильтра
        $.ajax({
            url:"/catalog/filter/reset",
            type: "POST",
            data: {
                position: position,
                categoryId: categoryId,
                brandId: brandId,
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: (data) => {
                //console.log(data);
                resultWrapper.innerHTML = data;
            }
        })
    }
}
/* filter ------------------------------------------------------------ end */

/* products sales, bestsellers, news --------------------------------------- */
function productTabsOnMainPage(tab) { // переключение ids в зависимости от активности табов
    //console.log(tab);
    // табы
    sales = document.getElementById('sales');
    bestsellers = document.getElementById('bestseller');
    news = document.getElementById('news');

    // продукты внутри табов
    salesProducts = sales.getElementsByClassName('product-item');
    bestsellersProducts = bestseller.getElementsByClassName('product-item');
    newsProducts = news.getElementsByClassName('product-item');

    // обертки атрибутов продуктов внутри табов
    salesAttributesWrappers = sales.getElementsByClassName('attributes-wrapper_product-grid');
    bestsellersAttributesWrappers = bestseller.getElementsByClassName('attributes-wrapper_product-grid');
    newsAttributesWrappers = news.getElementsByClassName('attributes-wrapper_product-grid');

    // обертки значений атрибутов
    salesAttributeContainers = sales.getElementsByClassName('attribute_container-grid');
    bestsellersAttributeContainers = bestsellers.getElementsByClassName('attribute_container-grid');
    newsAttributeContainers = news.getElementsByClassName('attribute_container-grid');

    // значения атрибутов
    salesAttributeValues = sales.getElementsByClassName('attribute_value-grid');
    bestsellersAttributeValues = bestsellers.getElementsByClassName('attribute_value-grid');
    newsAttributeValues = news.getElementsByClassName('attribute_value-grid');

    // обертки переключателей колличества
    salesPlusMinusContainers = sales.getElementsByClassName('cart_add-plus_minus-container-grid');
    bestsellersPlusMinusContainers = bestsellers.getElementsByClassName('cart_add-plus_minus-container-grid');
    newsPlusMinusContainers = news.getElementsByClassName('cart_add-plus_minus-container-grid');

    //  элементы колличества
    salesQuantityElements = sales.getElementsByClassName('catalogQuantityProduct-grid');
    bestsellersQuantityElements = bestsellers.getElementsByClassName('catalogQuantityProduct-grid');
    newsQuantityElements = news.getElementsByClassName('catalogQuantityProduct-grid');

    // кнопки добавления в корзину
    salesButtonsAdd = sales.getElementsByClassName('cartAddButton-grid');
    bestsellersButtonsAdd = bestsellers.getElementsByClassName('cartAddButton-grid');
    newsButtonsAdd = news.getElementsByClassName('cartAddButton-grid');

    if(tab == 'sales') { // таб скидок
        // ids оберток продуктов
        for(i=0; i < salesProducts.length; i++) { // убираем ids продуктов не активных табов
            bestsellersProducts[i].setAttribute('id', '');
            newsProducts[i].setAttribute('id', '');
        }

        for(i=0; i < salesProducts.length; i++) { // заполняем ids продуктов активного таба
            saleProductId = salesProducts[i].getAttribute('data-tabs-product-id');
            salesProducts[i].setAttribute('id', 'product-item_'+saleProductId);
        }

        // ids оберток атрибутов
        for(i=0; i < salesAttributesWrappers.length; i++) { // убираем ids атрибутов не активных табов
            bestsellersAttributesWrappers[i].setAttribute('id', '');
            newsAttributesWrappers[i].setAttribute('id', '');
        }

        for(i=0; i < salesAttributesWrappers.length; i++) { // заполняем ids атрибутов активного таба
            saleProductId = salesAttributesWrappers[i].getAttribute('data-tabs-product-id');
            salesAttributesWrappers[i].setAttribute('id', 'attributes-wrapper_product-'+saleProductId);
        }

        // ids оберток значений атрибутов
        for(i=0; i < bestsellersAttributeContainers.length; i++) { // убираем ids
            bestsellersAttributeContainers[i].setAttribute('id', '');
            newsAttributeContainers[i].setAttribute('id', '');
        }

        for(i=0; i < salesAttributeContainers.length; i++) { // заполняем ids
            saleProductId = salesAttributeContainers[i].getAttribute('data-tabs-product-id');
            saleAttributeId = salesAttributeContainers[i].getAttribute('data-attribute-id');
            salesAttributeContainers[i].setAttribute('id', 'product_'+saleProductId+'_attribute_'+saleAttributeId);
        }

        // ids значений атрибутов
        for(i=0; i < bestsellersAttributeValues.length; i++) { // убираем ids
            bestsellersAttributeValues[i].setAttribute('id', '');
        }
        for(i=0; i < newsAttributeValues.length; i++) { // убираем ids
            newsAttributeValues[i].setAttribute('id', '');
        }

        for(i=0; i < salesAttributeValues.length; i++) { // заполняем ids
            saleProductId = salesAttributeValues[i].getAttribute('data-tabs-product-id');
            saleValueId = salesAttributeValues[i].getAttribute('data-value-id');
            salesAttributeValues[i].setAttribute('id', 'product_'+saleProductId+'_value_'+saleValueId);
        }

        // ids оберток переключателей колличества
        for(i=0; i < salesPlusMinusContainers.length; i++) { // убираем ids
            bestsellersPlusMinusContainers[i].setAttribute('id', '');
            newsPlusMinusContainers[i].setAttribute('id', '');
        }

        for(i=0; i < salesPlusMinusContainers.length; i++) { // заполняем ids
            saleProductId = salesPlusMinusContainers[i].getAttribute('data-tabs-product-id');
            salesPlusMinusContainers[i].setAttribute('id', 'cart_add-plus_minus-container_'+saleProductId);
        }

        // ids элементов колличества
        for(i=0; i < salesQuantityElements.length; i++) { // убираем ids
            bestsellersQuantityElements[i].setAttribute('id', '');
            newsQuantityElements[i].setAttribute('id', '');
        }

        for(i=0; i < salesQuantityElements.length; i++) { // заполняем ids
            saleProductId = salesQuantityElements[i].getAttribute('data-tabs-product-id');
            salesQuantityElements[i].setAttribute('id', 'catalogQuantityProduct_'+saleProductId);
        }

        // ids кнопок добавления в корзину
        for(i=0; i < salesButtonsAdd.length; i++) { // убираем ids
            bestsellersButtonsAdd[i].setAttribute('id', '');
            newsButtonsAdd[i].setAttribute('id', '');
        }

        for(i=0; i < salesButtonsAdd.length; i++) { // заполняем ids
            saleProductId = salesButtonsAdd[i].getAttribute('data-tabs-product-id');
            salesButtonsAdd[i].setAttribute('id', 'cartAddButton_'+saleProductId);
        }

        //console.log(newsProducts);
    } else if(tab == 'bestseller') { // таб бестселлеров
        for(i=0; i < bestsellersProducts.length; i++) { // убираем ids продуктов не активных табов
            salesProducts[i].setAttribute('id', '');
            newsProducts[i].setAttribute('id', '');
        }

        for(i=0; i < bestsellersProducts.length; i++) { // заполняем ids продуктов активного таба
            bestsellerProductId = bestsellersProducts[i].getAttribute('data-tabs-product-id');
            bestsellersProducts[i].setAttribute('id', 'product-item_'+bestsellerProductId);
        }

        // ids оберток атрибутов
        for(i=0; i < bestsellersAttributesWrappers.length; i++) { // убираем ids атрибутов не активных табов
            salesAttributesWrappers[i].setAttribute('id', '');
            newsAttributesWrappers[i].setAttribute('id', '');
        }

        for(i=0; i < bestsellersAttributesWrappers.length; i++) { // заполняем ids атрибутов активного таба
            bestsellerProductId = bestsellersAttributesWrappers[i].getAttribute('data-tabs-product-id');
            bestsellersAttributesWrappers[i].setAttribute('id', 'attributes-wrapper_product-'+bestsellerProductId);
        }

        // ids оберток значений атрибутов
        for(i=0; i < bestsellersAttributeContainers.length; i++) { // убираем ids
            salesAttributeContainers[i].setAttribute('id', '');
            newsAttributeContainers[i].setAttribute('id', '');
        }

        for(i=0; i < bestsellersAttributeContainers.length; i++) { // заполняем ids
            bestsellerProductId = bestsellersAttributeContainers[i].getAttribute('data-tabs-product-id');
            bestsellerAttributeId = bestsellersAttributeContainers[i].getAttribute('data-attribute-id');
            bestsellersAttributeContainers[i].setAttribute('id', 'product_'+bestsellerProductId+'_attribute_'+bestsellerAttributeId);
        }

        // ids значений атрибутов
        for(i=0; i < salesAttributeValues.length; i++) { // убираем ids
            salesAttributeValues[i].setAttribute('id', '');
        }
        for(i=0; i < newsAttributeValues.length; i++) { // убираем ids
            newsAttributeValues[i].setAttribute('id', '');
        }

        for(i=0; i < bestsellersAttributeValues.length; i++) { // заполняем ids
            bestsellerProductId = bestsellersAttributeValues[i].getAttribute('data-tabs-product-id');
            bestsellerValueId = bestsellersAttributeValues[i].getAttribute('data-value-id');
            bestsellersAttributeValues[i].setAttribute('id', 'product_'+bestsellerProductId+'_value_'+bestsellerValueId);
        }

        // ids оберток переключателей колличества
        for(i=0; i < bestsellersPlusMinusContainers.length; i++) { // убираем ids
            salesPlusMinusContainers[i].setAttribute('id', '');
            newsPlusMinusContainers[i].setAttribute('id', '');
        }

        for(i=0; i < bestsellersPlusMinusContainers.length; i++) { // заполняем ids
            bestsellerProductId = bestsellersPlusMinusContainers[i].getAttribute('data-tabs-product-id');
            bestsellersPlusMinusContainers[i].setAttribute('id', 'cart_add-plus_minus-container_'+bestsellerProductId);
        }

        // ids элементов колличества
        for(i=0; i < bestsellersQuantityElements.length; i++) { // убираем ids
            salesQuantityElements[i].setAttribute('id', '');
            newsQuantityElements[i].setAttribute('id', '');
        }

        for(i=0; i < bestsellersQuantityElements.length; i++) { // заполняем ids
            bestsellerProductId = bestsellersQuantityElements[i].getAttribute('data-tabs-product-id');
            bestsellersQuantityElements[i].setAttribute('id', 'catalogQuantityProduct_'+bestsellerProductId);
        }

        // ids кнопок добавления в корзину
        for(i=0; i < bestsellersButtonsAdd.length; i++) { // убираем ids
            salesButtonsAdd[i].setAttribute('id', '');
            newsButtonsAdd[i].setAttribute('id', '');
        }

        for(i=0; i < bestsellersButtonsAdd.length; i++) { // заполняем ids
            bestsellerProductId = bestsellersButtonsAdd[i].getAttribute('data-tabs-product-id');
            bestsellersButtonsAdd[i].setAttribute('id', 'cartAddButton_'+bestsellerProductId);
        }

        //console.log(newsProducts);
    } else if(tab == 'news') { // таб новинок
        for(i=0; i < newsProducts.length; i++) { // убираем ids продуктов не активных табов
            salesProducts[i].setAttribute('id', '');
            bestsellersProducts[i].setAttribute('id', '');
        }

        for(i=0; i < newsProducts.length; i++) { // заполняем ids продуктов активного таба
            newProductId = newsProducts[i].getAttribute('data-tabs-product-id');
            newsProducts[i].setAttribute('id', 'product-item_'+newProductId);
        }

        // ids оберток атрибутов
        for(i=0; i < newsAttributesWrappers.length; i++) { // убираем ids атрибутов не активных табов
            salesAttributesWrappers[i].setAttribute('id', '');
            bestsellersAttributesWrappers[i].setAttribute('id', '');
        }

        for(i=0; i < newsAttributesWrappers.length; i++) { // заполняем ids атрибутов активного таба
            newProductId = newsAttributesWrappers[i].getAttribute('data-tabs-product-id');
            newsAttributesWrappers[i].setAttribute('id', 'attributes-wrapper_product-'+newProductId);
        }

        // ids оберток значений атрибутов
        for(i=0; i < newsAttributeContainers.length; i++) { // убираем ids
            salesAttributeContainers[i].setAttribute('id', '');
            bestsellersAttributeContainers[i].setAttribute('id', '');
        }

        for(i=0; i < newsAttributeContainers.length; i++) { // заполняем ids
            newProductId = newsAttributeContainers[i].getAttribute('data-tabs-product-id');
            newAttributeId = newsAttributeContainers[i].getAttribute('data-attribute-id');
            newsAttributeContainers[i].setAttribute('id', 'product_'+newProductId+'_attribute_'+newAttributeId);
        }

        // ids значений атрибутов
        for(i=0; i < salesAttributeValues.length; i++) { // убираем ids
            salesAttributeValues[i].setAttribute('id', '');
        }
        for(i=0; i < bestsellersAttributeValues.length; i++) { // убираем ids
            bestsellersAttributeValues[i].setAttribute('id', '');
        }

        for(i=0; i < newsAttributeValues.length; i++) { // заполняем ids
            newProductId = newsAttributeValues[i].getAttribute('data-tabs-product-id');
            newValueId = newsAttributeValues[i].getAttribute('data-value-id');
            newsAttributeValues[i].setAttribute('id', 'product_'+newProductId+'_value_'+newValueId);
        }

        // ids оберток переключателей колличества
        for(i=0; i < newsPlusMinusContainers.length; i++) { // убираем ids
            salesPlusMinusContainers[i].setAttribute('id', '');
            bestsellersPlusMinusContainers[i].setAttribute('id', '');
        }

        for(i=0; i < newsPlusMinusContainers.length; i++) { // заполняем ids
            newProductId = newsPlusMinusContainers[i].getAttribute('data-tabs-product-id');
            newsPlusMinusContainers[i].setAttribute('id', 'cart_add-plus_minus-container_'+newProductId);
        }

        // ids элементов колличества
        for(i=0; i < newsQuantityElements.length; i++) { // убираем ids
            salesQuantityElements[i].setAttribute('id', '');
            bestsellersQuantityElements[i].setAttribute('id', '');
        }

        for(i=0; i < newsQuantityElements.length; i++) { // заполняем ids
            newProductId = newsQuantityElements[i].getAttribute('data-tabs-product-id');
            newsQuantityElements[i].setAttribute('id', 'catalogQuantityProduct_'+newProductId);
        }

        // ids кнопок добавления в корзину
        for(i=0; i < newsButtonsAdd.length; i++) { // убираем ids
            salesButtonsAdd[i].setAttribute('id', '');
            bestsellersButtonsAdd[i].setAttribute('id', '');
        }

        for(i=0; i < newsButtonsAdd.length; i++) { // заполняем ids
            newProductId = newsButtonsAdd[i].getAttribute('data-tabs-product-id');
            newsButtonsAdd[i].setAttribute('id', 'cartAddButton_'+newProductId);
        }

        //console.log(bestsellerProducts);
    }
}
/* notifications ---------------------------------------------------------------- */
function notificationClose() {
    notificationModal = document.getElementById('notification-modal-large');
    notificationModal.classList.remove('display-block');
    notificationModal.classList.add('display-none');
}
/* notifications ------------------------------------------------------------ end */

/* locale and currency ---------------------------------------------------------------- */
function changeLocale() {
    document.getElementById('locale-button').click();
}
function changeCurrency() {
    document.getElementById('currency-button').click();
}
/* locale and currency ------------------------------------------------------------ end */
