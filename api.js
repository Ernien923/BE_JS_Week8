// ========================================
// API 請求函式
// ========================================

const axios = require("axios");
const { API_PATH, BASE_URL, ADMIN_TOKEN } = require("./config");

//管理員 token
const headers = { authorization: ADMIN_TOKEN };

// ========== 客戶端 API ==========

/**
 * 取得產品列表
 * @returns {Promise<Array>}
 */
async function fetchProducts() {
  // 請實作此函式
  // 回傳 response.data.products
  const getProductsUrl = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/products`;
  try {
    const response = await axios.get(getProductsUrl);
    return response.data.products;
  } catch (error) {
    console.log("取得產品失敗", error.message);
  }
}

/**
 * 取得購物車
 * @returns {Promise<Object>} - 回傳 { carts: [...], total: 數字, finalTotal: 數字 }
 */
async function fetchCart() {
  // 請實作此函式
  const getCartstUrl = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`;
  try {
    const response = await axios.get(getCartstUrl);
    return {
      carts: response.data.carts,
      total: response.data.total,
      finalTotal: response.data.finalTotal,
    };
  } catch (error) {
    console.log("取得購物車失敗", error.message);
  }
}

/**
 * 加入購物車
 * @param {string} productId - 產品 ID
 * @param {number} quantity - 數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function addToCart(productId, quantity) {
  // 請實作此函式
  try {
    const addCartUrl = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`;
    const response = await axios.post(addCartUrl, {
      data: {
        productId,
        quantity,
      },
    });
    return response.data;
  } catch (error) {
    console.error("加入購物車失敗", error.message);
  }
}

/**
 * 更新購物車商品數量
 * @param {string} cartId - 購物車項目 ID
 * @param {number} quantity - 新數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function updateCartItem(cartId, quantity) {
  // 請實作此函式
  try {
    const updatCartUrl = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`;
    const response = await axios.patch(updatCartUrl, {
      data: {
        id: cartId,
        quantity,
      },
    });
    return response;
  } catch (error) {
    console.error("更新購物車失敗", error.message);
  }
}

/**
 * 刪除購物車商品
 * @param {string} cartId - 購物車項目 ID
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function deleteCartItem(cartId) {
  // 請實作此函式
  try {
    const delCartItemUrl = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts/${cartId}`;
    const response = await axios.delete(delCartItemUrl);
    return response;
  } catch (error) {
    console.error("刪除購物車商品失敗", error.message);
  }
}

/**
 * 清空購物車
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function clearCart() {
  // 請實作此函式
  try {
    const clearCartUrl = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`;
    const response = await axios.delete(clearCartUrl);
    return response.data;
  } catch (error) {
    console.error("清空購物車失敗", error.message);
  }
}

/**
 * 建立訂單
 * @param {Object} userInfo - 使用者資料
 * @returns {Promise<Object>}
 */
async function createOrder(userInfo) {
  // 請實作此函式
  try {
    const createOrderUrl = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/orders`;
    const userData = {
      user: {
        name: userInfo.name,
        tel: userInfo.tel,
        email: userInfo.email,
        address: userInfo.address,
        payment: userInfo.payment,
      },
    };
    const response = await axios.post(createOrderUrl, {
      data: userData,
    });
    return response;
  } catch (error) {
    console.error("建立訂單失敗", error.message);
  }
}

// ========== 管理員 API ==========

/**
 * 管理員 API 需加上認證
 * 提示：
    headers: {
      authorization: ADMIN_TOKEN
    }
 */

/**
 * 取得訂單列表
 * @returns {Promise<Array>}
 */
async function fetchOrders() {
  // 請實作此函式
  try {
    const adminGetOrderUrl = `${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders`;
    const response = await axios.get(adminGetOrderUrl, {
      headers: headers,
    });
    return response.data.orders;
  } catch (error) {
    console.error("取得訂單列表失敗", error.message);
  }
}

/**
 * 更新訂單狀態
 * @param {string} orderId - 訂單 ID
 * @param {boolean} isPaid - 是否已付款
 * @returns {Promise<Object>}
 */
async function updateOrderStatus(orderId, isPaid) {
  // 請實作此函式
  try {
    const adminGetOrderUrl = `${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders`;
    const data = {
      id: orderId,
      paid: isPaid,
    };
    const response = await axios.get(adminGetOrderUrl, {
      headers: headers,
      data: data,
    });
    return response;
  } catch (error) {
    console.error("更新訂單狀態失敗", error.message);
  }
}

/**
 * 刪除訂單
 * @param {string} orderId - 訂單 ID
 * @returns {Promise<Object>}
 */
async function deleteOrder(orderId) {
  // 請實作此函式
  try {
    const adminDeleteOrderItem = `${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders/${orderId}`;
    const response = await axios.delete(adminDeleteOrderItem, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.error("刪除訂單失敗", error.message);
  }
}

module.exports = {
  fetchProducts,
  fetchCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
  createOrder,
  fetchOrders,
  updateOrderStatus,
  deleteOrder,
};
