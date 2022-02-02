import axios from "axios";

export default class PostService {
    static async getCategory() {
        const response = await axios.get('http://localhost:5000/categories')
        return response.data;
    }

    static async getCategoryById(id) {
        const response = await axios.get('http://localhost:5000/categories/'+id)
        return response.data;
    }

    static async removeCategory(id) {
        axios.delete('http://localhost:5000/categories/'+id) 
    }

    static async addCategory(category) {
        const response = await axios.post('http://localhost:5000/categories/add', category) 
        console.log(response);

    } 
    static async updateCategory(category, id) {
        axios.patch('http://localhost:5000/categories/update/' + id, category) 

    } 
 
    static async getTransaction() {
        const response = await axios.get('http://localhost:5000/transactions')
        return response.data;
    }

    static async getTransactionById(id) {
        const response = await axios.get('http://localhost:5000/transactions/'+id)
        return response.data;
    }

    static async removeTransaction(id) {
        axios.delete('http://localhost:5000/transactions/'+id) 
    }

    static async addTransaction(transaction) {
        axios.post('http://localhost:5000/transactions/add', transaction) 

    } 
    static async updateTransaction(transaction, id) {
        axios.patch('http://localhost:5000/transactions/update/' + id, transaction) 

    } 
}