const { default: axios } = require('axios');

export default class NewsApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    };

    fetchImages() {
    
    return axios.get(`https://pixabay.com/api/?key=27652237-fecf1e648e251b2f1d2bb2568&q=${this.searchQuery}&per_page=40&page=${this.page}&image_type=photo&orientation=horizontal&safesearch=true`)
        
        .then(({ data }) => {
            this.incrementPage();
            return  data;
        }).catch(error =>  console.log(error) );
        
    };

    incrementPage() {
        this.page += 1;  
    };

    resetPage() {
        this.page = 1;
    };

      get query(){
            return this.searchQuery;
    };

        set query (newQuery){
            this.searchQuery = newQuery;
    };
};